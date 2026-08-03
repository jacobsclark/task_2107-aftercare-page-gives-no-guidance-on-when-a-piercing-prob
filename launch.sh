#!/usr/bin/env bash
# Task-level launch script (design §4) -- REQUIRED contract artifact.
#
# Boots the app from environment/1yvAB781u1ok7n7fYn4N on a deterministic port, polls
# until reachable, and prints the URL as:  APP_URL=http://127.0.0.1:<port>
# Exits nonzero if the app cannot boot. Works offline inside the task env.
#
# Boot logic is shared with the verifier via tests/lib/boot.sh -- this script
# is intentionally thin so the two launch paths stay identical.
set -u

TASK_ROOT="$(cd "$(dirname "$0")" && pwd)"

# Locate the app dir across the layouts the offline image may use.
APP_DIR="${APP_DIR:-}"
if [ -z "$APP_DIR" ]; then
  for d in "/app/1yvAB781u1ok7n7fYn4N" "$TASK_ROOT/environment/1yvAB781u1ok7n7fYn4N" "/app" "$(pwd)"; do
    if [ -d "$d" ]; then APP_DIR="$d"; break; fi
  done
fi
export APP_DIR

# Ports are deterministic (design §4.1): override via env, else profile default.
export PORT="${PORT:=3000}"
export BOOT_LOG="${BOOT_LOG:-/tmp/sand_launch.log}"
: > "$BOOT_LOG"

# Source the shared boot helper (also used by tests/run_script.sh).
BOOT_LIB=""
for c in "$TASK_ROOT/tests/lib/boot.sh" "$TASK_ROOT/lib/boot.sh" "/app/tests/lib/boot.sh"; do
  if [ -f "$c" ]; then BOOT_LIB="$c"; break; fi
done
if [ -z "$BOOT_LIB" ]; then
  echo "launch.sh: ERROR could not find shared boot helper (tests/lib/boot.sh)" >&2
  exit 3
fi
# shellcheck disable=SC1090
. "$BOOT_LIB"

trap 'sand_boot_cleanup' EXIT INT TERM

sand_boot
if ! sand_wait_healthy; then
  echo "launch.sh: ERROR app did not become reachable on $APP_URL" >&2
  cat "$BOOT_LOG" >&2 || true
  exit 1
fi

echo "APP_URL=${APP_URL}"
echo "launch.sh: app is up at ${APP_URL}"

# Stay in the foreground so callers can use the app; ./launch.sh is the manual
# entrypoint. The verifier sources boot.sh directly instead of calling this.
wait
