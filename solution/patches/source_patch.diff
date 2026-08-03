#!/usr/bin/env bash
# Oracle solution for task_2107-aftercare-page-gives-no-guidance-on-when-a-piercing-prob.
# Applies the gold patch (the real session fix) that makes the F2P tests pass.
set -euo pipefail

APP_DIR="${APP_DIR:-/app/1yvAB781u1ok7n7fYn4N}"
cd "$APP_DIR"

PATCH="/solution/patches/source_patch.diff"
[ -f "$PATCH" ] || PATCH="$(cd "$(dirname "$0")" && pwd)/patches/source_patch.diff"

if [ -d .git ]; then
  git apply --ignore-whitespace --whitespace=nowarn "$PATCH"
else
  patch -p1 --no-backup-if-mismatch --batch -i "$PATCH"
fi
echo "[solve.sh] applied $PATCH"

echo "[solve.sh] done."
