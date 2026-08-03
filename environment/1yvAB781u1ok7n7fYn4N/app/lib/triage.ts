import { AREA_LABELS, PHASE_TABLE, SEVERITY_RANK, TRIAGE_RULES } from "./triage-data";
import type { Area, Phase, PhaseEntry, Severity, TriageRule } from "./triage-data";

export type ClassifiedRule = {
  id: string;
  text: string;
  severity: Severity;
  rank: number;
  phase: Phase;
};

export type TriageGroup = {
  key: string;
  title: string;
  tone: string;
  items: ClassifiedRule[];
};

export type Triage = {
  area: Area;
  areaLabel: string;
  day: number | null;
  phase: Phase;
  classified: ClassifiedRule[];
  groups: TriageGroup[];
};

export type EmergencySummary = {
  count: number;
  level: Severity | null;
  headline: string;
  items: string[];
};

export const PHASE_LABELS: Record<Phase, string> = {
  fresh: "Fresh (first two weeks)",
  settling: "Settling",
  late: "Late healing",
  healed: "Healed",
};

export const UNKNOWN_PHASE_LABEL = "Not sure yet";

type GroupDef = { key: string; title: string; tone: string; min: number; max: number };

const GROUP_DEFS: GroupDef[] = [
  { key: "normal", title: "Usually part of healing", tone: "normal", min: 0, max: 1 },
  { key: "monitor", title: "Keep an eye on", tone: "monitor", min: 1, max: 2 },
  { key: "studio", title: "Contact the studio if", tone: "studio", min: 2, max: 3 },
  { key: "emergency", title: "See a doctor right away if", tone: "emergency", min: 3, max: 4 },
];

export function severityRank(severity: Severity): number {
  return SEVERITY_RANK[severity];
}

export function phaseUpperBound(entry: PhaseEntry): number {
  return entry.until as number;
}

export function windowUpperBound(rule: TriageRule): number {
  return rule.window.toDay as number;
}

export function getHealingPhase(day: number, area: Area): Phase {
  const table = PHASE_TABLE[area];
  const match = table.find((entry) => day < phaseUpperBound(entry));
  return match ? match.phase : "fresh";
}

export function windowMatches(rule: TriageRule, day: number): boolean {
  return day >= rule.window.fromDay && day <= windowUpperBound(rule);
}

export function mergeSeverity(base: Severity, adjustment?: Severity | null): Severity {
  return adjustment ?? base;
}

export function applyPhaseRules(rule: TriageRule, phase: Phase, severity: Severity): Severity {
  if (!rule.phaseRules) {
    return severity;
  }
  let current = severity;
  for (const entry of rule.phaseRules) {
    if (entry.phase === phase) {
      current = mergeSeverity(current, entry.severity);
    }
  }
  return current;
}

export function classifyRule(rule: TriageRule, day: number | null, area: Area): ClassifiedRule {
  const d = day ?? 0;
  const phase = getHealingPhase(d, area);
  let severity = rule.base;
  if (rule.neverNormal && severityRank(severity) < severityRank("studio")) {
    severity = "studio";
  }
  severity = applyPhaseRules(rule, phase, severity);
  return { id: rule.id, text: rule.text, severity, rank: severityRank(severity), phase };
}

function appliesToArea(rule: TriageRule, area: Area): boolean {
  return rule.areas.includes(area) || rule.areas.includes("all");
}

export function groupItems(classified: ClassifiedRule[], def: GroupDef): ClassifiedRule[] {
  return classified.filter((item) => item.rank >= def.min && item.rank < def.max);
}

export function buildTriage(area: Area, day: number | null): Triage {
  const resolvedDay = day === null ? 0 : day;
  const phase = getHealingPhase(resolvedDay, area);
  const classified: ClassifiedRule[] = [];
  for (const rule of TRIAGE_RULES) {
    if (!appliesToArea(rule, area)) {
      continue;
    }
    if (!windowMatches(rule, resolvedDay)) {
      continue;
    }
    classified.push(classifyRule(rule, day, area));
  }
  const groups: TriageGroup[] = [];
  for (const def of GROUP_DEFS) {
    const items = groupItems(classified, def);
    if (items.length === 0) {
      continue;
    }
    groups.push({ key: def.key, title: def.title, tone: def.tone, items });
  }
  return { area, areaLabel: AREA_LABELS[area], day, phase, classified, groups };
}

export function phaseLabelFor(triage: Triage): string {
  return PHASE_LABELS[triage.phase];
}

export function emergencySummary(triage: Triage): EmergencySummary {
  const group = triage.groups.find((entry) => entry.key === "emergency");
  const rules = group ? group.items : [];
  const items: string[] = [];
  let level: Severity | null = null;
  for (const item of rules) {
    if (!items.includes(item.text)) {
      items.push(item.text);
    }
    if (level === null || severityRank(item.severity) > severityRank(level)) {
      level = item.severity;
    }
  }
  const headline =
    items.length > 0
      ? `${items.length} symptom${items.length === 1 ? "" : "s"} on this list need medical attention now`
      : "";
  return { count: items.length, level, headline, items };
}
