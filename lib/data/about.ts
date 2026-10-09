export type LedgerItem = {
  readonly text: string;
};

/**
 * First-person, present tense, and only what is true today. Nothing here may
 * imply a professional history, clients, results or credentials that do not
 * exist. Personal facts are never invented: role and location come from site.ts.
 */
export const about = {
  label: "About",
  /** One entry per deliberate line break; the last line is italic. */
  statement: ["I like understanding", "how things work.", "Then making them", "work differently."],
  lead: "I'm an AI engineer and creative technologist, early in building an independent practice from India.",
  body: [
    "What pulls me in is the space between a model and the person using it. Most of the interesting problems there aren't about the model at all. They're about what to show, what to hide, and when to ask a human.",
    "I'm still learning, and I'd rather say so than dress it up. What I can offer right now is care: I take small problems seriously, build them properly, and say plainly what works and what doesn't.",
  ],
  stage: "Independent, early",
  ledger: {
    real: {
      label: "Real today",
      items: [
        { text: "This site, designed, written and built by me." },
        { text: "Four small studies in the AI Lab, each labelled as a sketch." },
        { text: "A way of working I intend to hold myself to." },
      ],
    },
    notYet: {
      label: "Not yet",
      items: [
        { text: "Client projects." },
        { text: "Case studies and results." },
        { text: "Testimonials." },
        { text: "Shipped experiments. Those entries are placeholders." },
      ],
    },
  },
  status: "Early, and saying so",
  disclosure:
    "This page is written in the first person on purpose and says only what is true today. It will grow as the work does.",
} as const satisfies {
  label: string;
  statement: readonly string[];
  lead: string;
  body: readonly string[];
  stage: string;
  ledger: Record<"real" | "notYet", { label: string; items: readonly LedgerItem[] }>;
  status: string;
  disclosure: string;
};