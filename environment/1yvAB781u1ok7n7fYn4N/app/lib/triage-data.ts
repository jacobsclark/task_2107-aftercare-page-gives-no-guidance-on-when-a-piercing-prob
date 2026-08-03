export type Area = "ear" | "nose" | "navel" | "oral";
export type AreaScope = Area | "all";
export type Severity = "normal" | "monitor" | "studio" | "urgent" | "emergency";
export type Phase = "fresh" | "settling" | "late" | "healed";

export type PhaseRule = { phase: Phase; severity: Severity };

export type TriageRule = {
  id: string;
  text: string;
  areas: AreaScope[];
  base: Severity;
  window: { fromDay: number; toDay: number | null };
  phaseRules?: PhaseRule[];
  neverNormal?: boolean;
};

export type PhaseEntry = { phase: Phase; until: number | null };

export const SEVERITY_RANK: Record<Severity, number> = {
  normal: 0,
  monitor: 1,
  studio: 2,
  urgent: 3,
  emergency: 4,
};

export const AREA_LABELS: Record<Area, string> = {
  ear: "Ear",
  nose: "Nose",
  navel: "Navel",
  oral: "Oral",
};

export const PHASE_TABLE: Record<Area, PhaseEntry[]> = {
  ear: [
    { phase: "fresh", until: 14 },
    { phase: "settling", until: 60 },
    { phase: "late", until: 365 },
    { phase: "healed", until: null },
  ],
  nose: [
    { phase: "fresh", until: 14 },
    { phase: "settling", until: 60 },
    { phase: "late", until: 180 },
    { phase: "healed", until: null },
  ],
  navel: [
    { phase: "fresh", until: 14 },
    { phase: "settling", until: 60 },
    { phase: "late", until: 365 },
    { phase: "healed", until: null },
  ],
  oral: [
    { phase: "fresh", until: 14 },
    { phase: "settling", until: 60 },
    { phase: "late", until: 120 },
    { phase: "healed", until: null },
  ],
};

export const TRIAGE_RULES: TriageRule[] = [
  {
    id: "fever-chills",
    text: "You have a fever, chills, or feel unwell all over",
    areas: ["all"],
    base: "emergency",
    window: { fromDay: 0, toDay: null },
    phaseRules: [{ phase: "fresh", severity: "monitor" }],
    neverNormal: true,
  },
  {
    id: "spreading-redness",
    text: "Redness is spreading outward across the surrounding skin",
    areas: ["all"],
    base: "emergency",
    window: { fromDay: 0, toDay: null },
    phaseRules: [{ phase: "fresh", severity: "monitor" }],
    neverNormal: true,
  },
  {
    id: "red-streaks",
    text: "Red streaks are running away from the piercing",
    areas: ["all"],
    base: "emergency",
    window: { fromDay: 0, toDay: null },
    neverNormal: true,
  },
  {
    id: "heavy-bleeding",
    text: "Bleeding that does not stop with gentle pressure",
    areas: ["all"],
    base: "emergency",
    window: { fromDay: 0, toDay: null },
    neverNormal: true,
  },
  {
    id: "worsening-pain",
    text: "Pain that gets rapidly worse instead of easing",
    areas: ["all"],
    base: "urgent",
    window: { fromDay: 0, toDay: null },
    phaseRules: [{ phase: "fresh", severity: "monitor" }],
    neverNormal: true,
  },
  {
    id: "foul-discharge",
    text: "Thick green, grey, or foul-smelling discharge",
    areas: ["all"],
    base: "urgent",
    window: { fromDay: 0, toDay: null },
    neverNormal: true,
  },
  {
    id: "embedded-jewelry",
    text: "Jewelry is sinking into or disappearing under the skin",
    areas: ["all"],
    base: "urgent",
    window: { fromDay: 0, toDay: null },
    phaseRules: [{ phase: "fresh", severity: "monitor" }],
    neverNormal: true,
  },
  {
    id: "clear-crust",
    text: "Light clear or pale fluid that dries into crust",
    areas: ["all"],
    base: "normal",
    window: { fromDay: 0, toDay: 60 },
  },
  {
    id: "early-swelling",
    text: "Mild swelling in the first week",
    areas: ["all"],
    base: "normal",
    window: { fromDay: 0, toDay: 7 },
    phaseRules: [{ phase: "settling", severity: "studio" }],
  },
  {
    id: "airway-swelling",
    text: "Swelling that makes breathing or swallowing difficult",
    areas: ["oral"],
    base: "emergency",
    window: { fromDay: 0, toDay: null },
    phaseRules: [{ phase: "fresh", severity: "monitor" }],
    neverNormal: true,
  },
  {
    id: "tongue-swelling",
    text: "Tongue swelling in the first few days",
    areas: ["oral"],
    base: "normal",
    window: { fromDay: 0, toDay: 5 },
    phaseRules: [{ phase: "settling", severity: "studio" }],
  },
  {
    id: "tight-oral-jewelry",
    text: "The jewelry feels tight against the tissue",
    areas: ["oral"],
    base: "studio",
    window: { fromDay: 0, toDay: 21 },
  },
  {
    id: "tongue-coating",
    text: "A white coating on the tongue while healing",
    areas: ["oral"],
    base: "monitor",
    window: { fromDay: 0, toDay: 30 },
  },
  {
    id: "tooth-damage",
    text: "A chipped tooth or receding gum where the jewelry rests",
    areas: ["oral"],
    base: "urgent",
    window: { fromDay: 0, toDay: null },
    neverNormal: true,
  },
  {
    id: "ear-crust",
    text: "Clear crust collecting around the jewelry on the ear",
    areas: ["ear"],
    base: "normal",
    window: { fromDay: 0, toDay: 90 },
  },
  {
    id: "sleep-tenderness",
    text: "Mild tenderness when you sleep on that side",
    areas: ["ear"],
    base: "normal",
    window: { fromDay: 0, toDay: 30 },
    phaseRules: [{ phase: "late", severity: "monitor" }],
  },
  {
    id: "cartilage-lump",
    text: "A firm lump behind cartilage that keeps growing",
    areas: ["ear"],
    base: "studio",
    window: { fromDay: 7, toDay: null },
    phaseRules: [{ phase: "late", severity: "urgent" }],
  },
  {
    id: "hot-ear",
    text: "The ear feels hot to the touch",
    areas: ["ear"],
    base: "studio",
    window: { fromDay: 0, toDay: null },
    neverNormal: true,
  },
  {
    id: "pink-nostril",
    text: "Light pink tissue around the opening",
    areas: ["nose"],
    base: "normal",
    window: { fromDay: 0, toDay: 60 },
  },
  {
    id: "nose-bump",
    text: "A bump that grows quickly around the jewelry",
    areas: ["nose"],
    base: "studio",
    window: { fromDay: 5, toDay: null },
  },
  {
    id: "nose-knock",
    text: "The jewelry became embedded after a knock",
    areas: ["nose"],
    base: "urgent",
    window: { fromDay: 0, toDay: null },
    neverNormal: true,
  },
  {
    id: "navel-friction",
    text: "Slight redness where clothing rubs",
    areas: ["navel"],
    base: "normal",
    window: { fromDay: 0, toDay: 120 },
  },
  {
    id: "navel-migration",
    text: "The piercing looks like it is moving or migrating",
    areas: ["navel"],
    base: "studio",
    window: { fromDay: 14, toDay: null },
    phaseRules: [{ phase: "late", severity: "urgent" }],
  },
  {
    id: "navel-cellulitis",
    text: "Warm swollen skin spreading across the abdomen",
    areas: ["navel"],
    base: "emergency",
    window: { fromDay: 0, toDay: null },
    neverNormal: true,
  },
];
