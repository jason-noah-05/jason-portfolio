export type MaterialId = "python" | "typescript" | "nextjs" | "llms" | "figma" | "webgl";

export type Material = {
  readonly id: MaterialId;
  readonly name: string;
  /** Two or three words: what it is for. */
  readonly purpose: string;
  /** Why it is used. Never imply years of experience or results. */
  readonly reason: string;
  /** What is literally true of this site's code. */
  readonly onSite: string;
};

export const materialsSection = {
  label: "Materials",
  lines: ["The tools I reach for,", "and why."] as readonly string[],
  note: "These are choices, not credentials. They say nothing about how long I've used any of them.",
  legend: "Pick one to see why",
  siteLabel: "In this site's code",
} as const;

/** Add new materials at the end. */
export const materials: readonly Material[] = [
  {
    id: "python",
    name: "Python",
    purpose: "AI work",
    reason: "Most AI tools and data code are written in it first. It's easy to read, which helps when the logic gets tricky.",
    onSite: "None. There's no Python on this site.",
  },
  {
    id: "typescript",
    name: "TypeScript",
    purpose: "Interfaces",
    reason: "Interfaces are full of small mistakes. Types catch most of them before a visitor does.",
    onSite: "All of it, including the four experiments.",
  },
  {
    id: "nextjs",
    name: "Next.js",
    purpose: "The site itself",
    reason: "Pages are built on the server, so they load quickly and still read with scripts switched off.",
    onSite: "This site runs on it.",
  },
  {
    id: "llms",
    name: "LLMs",
    purpose: "Language tasks",
    reason: "They're good with language and judgement calls, and unreliable about being right. I use them with a person checking the result.",
    onSite: "None. No model runs on this site.",
  },
  {
    id: "figma",
    name: "Figma",
    purpose: "Sketching ideas",
    reason: "A place to look at an idea and argue with it before it becomes code.",
    onSite: "Not applicable. It's a design tool, so none of it is in the code.",
  },
  {
    id: "webgl",
    name: "WebGL",
    purpose: "Heavy graphics",
    reason: "I keep it for ideas that really need the GPU. If a page can do without it, it should.",
    onSite: "Not used. The experiments here use SVG and Canvas 2D.",
  },
];
