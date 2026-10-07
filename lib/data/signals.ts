export type SignalEntry = {
  readonly id: string;
  /** The setup: a plain observation. */
  readonly lead: string;
  /** The turn: set large in the serif, one entry per deliberate line break. The last line is italic. */
  readonly lines: readonly string[];
};

/** Original editorial observations. Add new signals at the end; ids are never reused. */
export const signals: readonly SignalEntry[] = [
  {
    id: "001",
    lead: "Most websites don't need more features.",
    lines: ["They need fewer,", "better decisions."],
  },
  {
    id: "002",
    lead: "AI makes production cheaper.",
    lines: ["It doesn't automatically", "make thinking better."],
  },
  {
    id: "003",
    lead: "A prototype asks a question.",
    lines: ["A product has to", "survive the answer."],
  },
  {
    id: "004",
    lead: "Most people will never meet the model.",
    lines: ["They meet", "the interface."],
  },
];

/** Fails loudly at build time if a page references a signal that does not exist. */
export function getSignal(id: string): SignalEntry {
  const found = signals.find((signal) => signal.id === id);
  if (!found) throw new Error(`Unknown signal: ${id}`);
  return found;
}