export type LedgerItem = { readonly text: string };
export type Ledger = { readonly label: string; readonly items: readonly LedgerItem[] };

export type About = {
  readonly label: string;
  /** One entry per deliberate line break; the last line is italic. */
  readonly statement: readonly string[];
  readonly lead: string;
  readonly body: readonly string[];
  readonly ledger: { readonly real: Ledger; readonly notYet: Ledger };
};

/**
 * First person, present tense, and only what is true today. Nothing here may
 * imply a professional history, clients, results or credentials that do not
 * exist. Role and location come from site.ts.
 */
export const about: About = {
  label: "About",
  statement: ["I like taking things apart", "to see how they work."],
  lead: "I'm an AI engineer and creative technologist based in India, just starting out on my own.",
  body: [
    "I'm most interested in the gap between a model and the person using it: what to show, what to hide, and when to ask a human.",
    "I'm still learning, and I'd rather say so than pretend. What I can offer now is care. I take small problems seriously and tell you plainly what works.",
  ],
  ledger: {
    real: {
      label: "Real today",
      items: [
        { text: "This site, designed and built by me." },
        { text: "Four small experiments you can try." },
        { text: "A way of working I'll hold myself to." },
      ],
    },
    notYet: {
      label: "Not yet",
      items: [{ text: "Client projects." }, { text: "Case studies." }, { text: "Testimonials." }],
    },
  },
};
