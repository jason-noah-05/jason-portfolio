export type ChapterItem = {
  readonly word: string;
  readonly note: string;
};

export type Chapter = {
  readonly label: string;
  readonly statement: string;
  readonly status: string;
  readonly items: readonly ChapterItem[];
};

/** Current chapter copy. Statements of intent only. */
export const chapter: Chapter = {
  label: "Current chapter",
  statement: "Currently building an independent practice around AI, software and digital experiences.",
  status: "Independent practice, in progress",
  items: [
    { word: "Building", note: "Software, interfaces and AI systems, made to be used." },
    { word: "Learning", note: "Closing the gap between what I understand and what I want to make." },
    { word: "Experimenting", note: "Small prototypes where AI meets interface design." },
    { word: "Shipping", note: "Finishing things and putting them in front of people." },
  ],
};