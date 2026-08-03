"use client";

import { useMemo, useState } from "react";
import { buildTriage, emergencySummary, getHealingPhase, PHASE_LABELS } from "../lib/triage";
import { AREA_LABELS } from "../lib/triage-data";
import type { Area } from "../lib/triage-data";

const AREAS: Area[] = ["ear", "nose", "navel", "oral"];

const DAY_OPTIONS: { value: number | null; label: string }[] = [
  { value: 0, label: "Today" },
  { value: 1, label: "Day 1" },
  { value: 7, label: "1 week" },
  { value: 30, label: "1 month" },
  { value: 90, label: "3 months" },
  { value: 400, label: "Over a year" },
  { value: null, label: "I'm not sure" },
];

const TONE_STYLES: Record<string, string> = {
  normal: "border-zinc-200 bg-white",
  monitor: "border-amber-200 bg-amber-50",
  studio: "border-zinc-300 bg-zinc-50",
  emergency: "border-[#8f1d2c] bg-[#fdeced]",
};

export default function TriagePanel() {
  const [area, setArea] = useState<Area>("ear");
  const [day, setDay] = useState<number | null>(7);
  const phase = day === null ? "fresh" : getHealingPhase(day, area);
  const triage = useMemo(() => buildTriage(area, day), [area, phase]);
  const emergency = emergencySummary(triage);
  const phaseLabel = PHASE_LABELS[phase];

  return (
    <section className="border-b border-zinc-200 bg-zinc-50" data-testid="triage-panel">
      <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8">
        <h2 className="text-3xl font-semibold tracking-tight text-zinc-950">Symptom triage</h2>
        <p className="mt-3 max-w-2xl leading-7 text-zinc-600">
          Choose the piercing area and how long ago you were pierced. The lists below sort what is
          usually part of healing from what needs the studio or a doctor.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-[220px_1fr]">
          <div>
            <label
              className="block text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500"
              htmlFor="triage-area"
            >
              Area
            </label>
            <select
              id="triage-area"
              data-testid="triage-area"
              value={area}
              onChange={(event) => setArea(event.target.value as Area)}
              className="mt-3 w-full rounded-2xl border border-zinc-300 bg-white px-4 py-3 text-sm font-semibold text-zinc-950 outline-none transition focus:border-[#8f1d2c]"
            >
              {AREAS.map((item) => (
                <option key={item} value={item}>
                  {AREA_LABELS[item]}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
              Days since your appointment
            </p>
            <div className="mt-3 flex flex-nowrap gap-0 overflow-hidden">
              {DAY_OPTIONS.map((option) => {
                const active = option.value === day;
                return (
                  <button
                    key={String(option.value)}
                    type="button"
                    data-testid={`triage-day-${String(option.value)}`}
                    onClick={() => setDay(option.value)}
                    className={`w-16 shrink-0 whitespace-nowrap rounded-none border border-zinc-300 px-3 py-2 text-sm font-semibold transition ${
                      active ? "bg-zinc-950 text-white" : "bg-white text-zinc-700"
                    }`}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <p className="mt-4 text-sm text-zinc-600" data-testid="triage-phase">
          {triage.areaLabel} · healing phase: {phaseLabel}
        </p>

        {emergency.count > 0 ? (
          <div
            className="relative mt-6 rounded-2xl border border-[#8f1d2c] bg-[#fdeced] px-5 py-5"
            data-testid="emergency-banner"
          >
            <span className="absolute left-5 top-5 rounded-full bg-[#8f1d2c] px-3 py-1 text-xs font-bold text-white">
              {emergency.count}
            </span>
            <p className="text-base font-semibold text-[#8f1d2c]">{emergency.headline}</p>
            <p className="mt-1 text-sm leading-6 text-zinc-700">
              If you notice any of these, contact a doctor or emergency service now.
            </p>
          </div>
        ) : null}

        <div className="mt-8 grid gap-6 lg:grid-cols-2" data-testid="triage-groups">
          {triage.groups.map((group) => (
            <div
              key={group.key}
              data-testid={`triage-group-${group.key}`}
              className={`rounded-[2rem] border p-6 shadow-sm ${TONE_STYLES[group.tone]}`}
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-lg font-semibold text-zinc-950">{group.title}</h3>
                <span className="rounded-full bg-white px-3 py-1 text-xs font-semibold text-zinc-600 ring-1 ring-zinc-200">
                  {group.items.length}
                </span>
              </div>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-6 text-zinc-700">
                {group.items.map((item) => (
                  <li key={item.id} data-testid={`triage-item-${item.id}`}>
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
