export type ExperimentSlug =
  | "generative-ui"
  | "rough-to-refined"
  | "image-to-interface"
  | "creative-coding";

export type Experiment = {
  readonly slug: ExperimentSlug;
  readonly title: string;
  /** One plain sentence. Used on the work index and as the page description. */
  readonly summary: string;
  /** Short category shown on the index. */
  readonly kind: string;
  /** Opening line on the project page: what to do with the demo. */
  readonly intro: string;
  /** Why it exists. One short paragraph. */
  readonly idea: string;
  /** How it is built. Only things that are true of the code. */
  readonly how: readonly string[];
  readonly tech: readonly string[];
  readonly year: number;
  readonly status: string;
};

export const work = {
  label: "Experiments",
  intro: "Four small experiments you can try. They're sketches, not client work.",
} as const;

/** Add new experiments at the end. Slugs are never reused. */
export const experiments: readonly Experiment[] = [
  {
    slug: "generative-ui",
    title: "Generative UI",
    summary: "Pick what a visitor wants to do and watch the layout change to fit.",
    kind: "Interface",
    intro: "Pick what you want to do. The layout rearranges to suit it.",
    idea: "Most pages show everyone the same layout. But reading an article, comparing options and making a decision are different jobs, and each works better with a different layout. This sketch shows that idea on a small scale.",
    how: [
      "Each layout is six rectangles with a position, a size and a weight.",
      "Switching intent moves the same six rectangles, so they glide into place instead of being swapped.",
      "The layouts are drawn by hand. Nothing is generated yet.",
    ],
    tech: ["React", "TypeScript", "SVG"],
    year: 2026,
    status: "Working demo",
  },
  {
    slug: "rough-to-refined",
    title: "Rough to refined",
    summary: "Scroll to watch one rough sketch turn into a finished page.",
    kind: "Scroll story",
    intro: "Scroll down. A rough sketch gets structure, then polish, then colour.",
    idea: "A finished design hides every decision that led to it. I wanted to show the stages instead. It's the same page each time, with the same content. Only the care changes.",
    how: [
      "Four layers of the same page sit in one SVG: sketch, structure, type and colour.",
      "Your scroll position sets a single number from 0 to 3, and each layer fades in or out as it passes.",
      "On small screens, or with reduced motion, the four stages are shown as a plain list.",
    ],
    tech: ["React", "TypeScript", "SVG", "CSS"],
    year: 2026,
    status: "Working demo",
  },
  {
    slug: "image-to-interface",
    title: "Image to interface",
    summary: "Step through how a drawn wireframe could be read, one pass at a time.",
    kind: "Vision",
    intro: "Move the slider through four passes, from marks on a canvas to markup.",
    idea: "A sketch carries more structure than it looks like it does: where things sit, what is big, what belongs together. This shows the steps a tool could take to read it.",
    how: [
      "The wireframe is drawn by hand. No image is being analysed.",
      "Each pass adds a layer on top: outlines first, then names, then markup.",
      "The markup at the end is written out ahead of time.",
    ],
    tech: ["React", "TypeScript", "SVG"],
    year: 2026,
    status: "Working demo",
  },
  {
    slug: "creative-coding",
    title: "Creative coding",
    summary: "A grid of small lines that turn to follow your pointer.",
    kind: "Creative code",
    intro: "Move your pointer over the field, then switch the rule.",
    idea: "One simple rule, repeated many times, can look surprisingly alive. Each line only knows where the target is. Everything you see comes from that.",
    how: [
      "The canvas holds a grid of short lines, each with its own angle.",
      "Every frame, each line turns a little towards the angle the current rule asks for.",
      "The loop stops when nothing is moving, so an idle field uses no processing.",
    ],
    tech: ["Canvas 2D", "TypeScript"],
    year: 2026,
    status: "Working demo",
  },
];

export function getExperiment(slug: string): Experiment | undefined {
  return experiments.find((experiment) => experiment.slug === slug);
}

/** The next experiments in order, wrapping around. Never includes the current one. */
export function relatedExperiments(slug: string, count = 2): readonly Experiment[] {
  const index = experiments.findIndex((experiment) => experiment.slug === slug);
  if (index === -1) return [];

  const others: Experiment[] = [];
  for (let step = 1; step < experiments.length && others.length < count; step++) {
    const next = experiments[(index + step) % experiments.length];
    if (next) others.push(next);
  }
  return others;
}
