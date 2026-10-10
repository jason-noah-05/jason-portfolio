export type ProcessStage = {
  readonly index: string;
  readonly name: string;
  readonly description: string;
};

/** Describes how the work is intended to run. Never a claim about past projects. */
export const howIWork = {
  label: "How I work",
  statement: "Five steps, in roughly this order. I go back and forth more than a list makes it look.",
  note: "This is how I plan to work, not a record of past projects.",
} as const;

export const stages: readonly ProcessStage[] = [
  { index: "01", name: "Understand", description: "Work out what the problem actually is and who has it." },
  { index: "02", name: "Explore", description: "Try a few options. A quick throwaway prototype beats a long discussion." },
  { index: "03", name: "Build", description: "Design and code together, so each one shapes the other." },
  { index: "04", name: "Refine", description: "Test it, cut what isn't needed and polish what's left." },
  { index: "05", name: "Ship", description: "Put it in front of the people it's for, and say plainly what it does and doesn't do." },
];
