export type SignalEntry = {
  readonly id: string;
  /** The setup: a plain observation. */
  readonly lead: string;
  /** The turn, set large in the serif. One entry per line break; the last line is italic. */
  readonly lines: readonly string[];
};

export const signals: readonly SignalEntry[] = [
  {
    id: "001",
    lead: "Most websites don't need more features.",
    lines: ["They need fewer,", "better decisions."],
  },
];

/** Fails loudly at build time if a page references a signal that does not exist. */
export function getSignal(id: string): SignalEntry {
  const found = signals.find((signal) => signal.id === id);
  if (!found) throw new Error(`Unknown signal: ${id}`);
  return found;
}
