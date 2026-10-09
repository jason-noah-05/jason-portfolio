export type LabStudyId = "generative-ui" | "automation" | "image-to-interface" | "creative-coding";

export type LabStudyEntry = {
  readonly id: LabStudyId;
  /** Two-digit index within the lab. */
  readonly index: string;
  readonly title: string;
  /** The question the study asks, set large in the serif. One entry per deliberate line break; the last line is italic. */
  readonly question: readonly string[];
  readonly description: string;
  /** What the sketch is actually built with. Never list technology the sketch does not use. */
  readonly tech: readonly string[];
  readonly status: string;
  readonly year: number;
};

export const lab = {
  label: "AI Lab",
  /** One entry per deliberate line break; the last line is italic. */
  intro: ["I like finding out what", "happens when you give", "software a little more", "imagination."],
  status: "Sketches, not products",
  disclosure:
    "Each study is a small interactive written for this site to explain an idea. They are illustrations: nothing here is a benchmark or a client result, and no model is running in your browser.",
} as const;

/** Original studies. Add new ones at the end; ids are never reused. */
export const studies: readonly LabStudyEntry[] = [
  {
    id: "generative-ui",
    index: "01",
    title: "Generative UI",
    question: ["Should every visitor", "see the same layout?"],
    description:
      "One layout is rarely right for every purpose. This sketch moves between three compositions as the intent changes, the way a generative interface might. The layouts are authored by hand; the idea is the part being studied.",
    tech: ["React", "TypeScript", "SVG"],
    status: "Sketch",
    year: 2026,
  },
  {
    id: "automation",
    index: "02",
    title: "AI Automation",
    question: ["Where should a machine", "stop and ask?"],
    description:
      "Automation is easy to start and hard to trust. This walkthrough follows an imagined enquiry from trigger to reply, then shows what changes when the human checkpoint is removed.",
    tech: ["React", "TypeScript"],
    status: "Sketch",
    year: 2026,
  },
  {
    id: "image-to-interface",
    index: "03",
    title: "Image → Interface",
    question: ["How much of a sketch", "can a machine read?"],
    description:
      "A drawing carries more structure than it appears to. Move through four passes over a drawn wireframe, from raw marks to labelled regions to the markup a pipeline could emit. The passes are scripted.",
    tech: ["React", "TypeScript", "SVG"],
    status: "Sketch",
    year: 2026,
  },
  {
    id: "creative-coding",
    index: "04",
    title: "Creative Coding",
    question: ["A few rules,", "visible behaviour."],
    description:
      "A grid of lines, each turning to face a point. Move through the field, switch the rule, and watch one idea produce three different textures. Plain canvas, no libraries, and it stops drawing when nothing moves.",
    tech: ["Canvas 2D", "TypeScript"],
    status: "Sketch",
    year: 2026,
  },
];