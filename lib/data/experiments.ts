export type ExperimentStatus = "placeholder" | "building" | "shipped";

export type Experiment = {
  readonly id: string;
  readonly title: string;
  /** The question being explored. Never state results that do not exist. */
  readonly description: string;
  readonly stack: readonly string[];
  readonly year: number;
  readonly status: ExperimentStatus;
  /** What the experiment is made of, revealed by the deconstruction interaction. */
  readonly layers: readonly string[];
};

export const statusLabels: Record<ExperimentStatus, string> = {
  placeholder: "Placeholder",
  building: "In progress",
  shipped: "Shipped",
};

/**
 * Every entry is a placeholder until a real experiment replaces it.
 * Replace an entry in place (keep its id) and update its status honestly.
 * Add new experiments at the end; ids are never reused.
 */
export const experiments: readonly Experiment[] = [
  {
    id: "001",
    title: "Natural language → website",
    description:
      "Can a plain-language brief become a complete web experience that still has a point of view?",
    stack: ["AI", "Next.js", "TypeScript"],
    year: 2026,
    status: "placeholder",
    layers: ["Language", "Model", "Components", "Interface"],
  },
  {
    id: "002",
    title: "AI automation",
    description:
      "Where does automating a small, repetitive workflow with a model stop saving time and start costing trust?",
    stack: ["Python", "LLMs", "TypeScript"],
    year: 2026,
    status: "placeholder",
    layers: ["AI", "Logic", "Data", "Interface"],
  },
  {
    id: "003",
    title: "Image → interface",
    description:
      "How much of a screen's structure can be recovered from a picture of it, and what has to stay human?",
    stack: ["Vision", "TypeScript", "Figma"],
    year: 2026,
    status: "placeholder",
    layers: ["Pixels", "Structure", "Components", "Code"],
  },
  {
    id: "004",
    title: "Creative code study",
    description:
      "A small generative piece built from one rule and a lot of restraint, made to be looked at rather than explained.",
    stack: ["Canvas", "SVG", "TypeScript"],
    year: 2026,
    status: "placeholder",
    layers: ["Rule", "Motion", "Noise", "Form"],
  },
];