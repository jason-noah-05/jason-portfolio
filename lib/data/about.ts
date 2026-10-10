export type About = {
  readonly label: string;
  /** One entry per deliberate line break; the last line is italic. */
  readonly statement: readonly string[];
  readonly lead: string;
  readonly body: readonly string[];
};

/** First person, present tense, only what is true today. Role and location come from site.ts. */
export const about: About = {
  label: "About",
  statement: ["I like taking things apart", "to see how they work."],
  lead: "I'm an AI engineer and creative technologist based in India, working independently.",
  body: [
    "I'm most interested in the gap between a model and the person using it: what to show, what to hide, and when to ask a human.",
    "What I offer is care. I take small problems seriously and say plainly what works and what doesn't.",
  ],
};