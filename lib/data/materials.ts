export type Material = {
  readonly index: string;
  readonly name: string;
  /** What the material is for, read straight after the name. */
  readonly purpose: string;
  /** Why it is used. Never imply years of experience or results. */
  readonly reason: string;
};

export const materialsSection = {
  label: "The Materials",
  statement: "Not a logo wall. A short list of what I reach for, and the reason each one earns its place.",
  disclosure:
    "These are choices, not credentials. The list will change as the work does, and it says nothing about how long I've used any of it.",
} as const;

/** Add new materials at the end. */
export const materials: readonly Material[] = [
  {
    index: "01",
    name: "Python",
    purpose: "for intelligence",
    reason:
      "Where models, data and glue code live. Readable enough to think in, and the language most AI tooling speaks first.",
  },
  {
    index: "02",
    name: "TypeScript",
    purpose: "for interfaces",
    reason: "Interfaces are full of small mistakes. Types catch most of them before a visitor does.",
  },
  {
    index: "03",
    name: "Next.js",
    purpose: "for systems",
    reason:
      "Server rendering by default, so pages arrive fast and still read with scripts switched off. This site is built on it.",
  },
  {
    index: "04",
    name: "LLMs",
    purpose: "for reasoning",
    reason:
      "Strong with language and judgement calls, unreliable about being right. I use them with a person checking the result.",
  },
  {
    index: "05",
    name: "Figma",
    purpose: "for visual thinking",
    reason: "A place to look at an idea before committing it to code, and to argue with it cheaply.",
  },
  {
    index: "06",
    name: "WebGL",
    purpose: "when the browser needs to do something unreasonable",
    reason: "Held in reserve for ideas that genuinely need the GPU, and only then.",
  },
];