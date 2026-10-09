export type ProcessStage = {
  readonly index: string;
  readonly name: string;
  /** The question that stage is trying to answer. */
  readonly question: string;
  readonly description: string;
};

/** Describes how the work is intended to run. Never a claim about past projects. */
export const howIWork = {
  label: "How I Work",
  statement: "How I intend to work: five stages, usually in this order, often revisited.",
  status: "A loop, not a line",
  disclosure:
    "The stages rarely run in a straight line. Refining sends me back to building, and building sends me back to understanding. This describes how I intend to work, not a record of projects delivered.",
} as const;

export const stages: readonly ProcessStage[] = [
  {
    index: "01",
    name: "Understand",
    question: "What is the problem underneath the request?",
    description:
      "Before anything is built, I want to know what the problem is, who it belongs to and what a good result would look like.",
  },
  {
    index: "02",
    name: "Explore",
    question: "What could work, and what rules it out?",
    description:
      "Research the options, the constraints and the ways it could go wrong. A small throwaway prototype beats a long argument.",
  },
  {
    index: "03",
    name: "Build",
    question: "What is the simplest version that is actually right?",
    description:
      "Design and engineering happen together, so the interface and the system behind it shape each other.",
  },
  {
    index: "04",
    name: "Refine",
    question: "What can be taken away?",
    description: "Test it, remove what isn't earning its place, and polish what is left.",
  },
  {
    index: "05",
    name: "Ship",
    question: "Is it finished enough to be useful?",
    description:
      "Put it in front of the people it was made for, and be honest about what it does and doesn't do.",
  },
];