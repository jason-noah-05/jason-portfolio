export type ChapterItem = {
  readonly word: string;
  readonly note: string;
};

export type Chapter = {
  readonly label: string;
  readonly statement: string;
  readonly status: string;
  readonly disclosure: string;
  readonly items: readonly ChapterItem[];
};

/**
 * Current chapter copy. Statements of intent only: nothing here may imply a
 * professional history, clients, results or credentials that do not exist.
 */
export const chapter: Chapter = {
  label: "Current chapter",
  statement: "Currently building an independent practice around AI, software and digital experiences.",
  status: "Independent practice, in progress",
  disclosure:
    "I'm early in this, and the site says so. Work appears here when it's real; until then it's labelled as a placeholder.",
  items: [
    {
      word: "Building",
      note: "Software, interfaces and AI systems, made to be used.",
    },
    {
      word: "Learning",
      note: "Closing the gap between what I understand and what I want to make.",
    },
    {
      word: "Experimenting",
      note: "Small prototypes where AI meets interface design.",
    },
    {
      word: "Shipping",
      note: "Finishing things and putting them in front of people.",
    },
  ],
};