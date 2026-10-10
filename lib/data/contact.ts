export type ChoiceId = "idea" | "problem" | "business" | "unknown";

export type Choice = {
  readonly id: ChoiceId;
  /** Short label. Also sent as the "topic" in the webhook payload. */
  readonly label: string;
  /** Label for the message field once this choice is picked. */
  readonly prompt: string;
  readonly placeholder: string;
};

export const contact = {
  label: "Contact",
  /** One entry per deliberate line break; the last line is italic. */
  statement: ["What are you", "trying to make?"],
  lead: "Tell me a bit about it. A rough answer is fine.",
  legend: "What is it? (optional)",
  defaultPrompt: "Your message",
  defaultPlaceholder: "What are you working on?",
  footnote: "All three fields are required. Your details are only used to reply.",
} as const;

/** Add new choices at the end. */
export const choices: readonly Choice[] = [
  { id: "idea", label: "An idea", prompt: "What's the idea?", placeholder: "What should it do, and who is it for?" },
  { id: "problem", label: "A problem", prompt: "What's going wrong?", placeholder: "What happens now, and what should happen instead?" },
  { id: "business", label: "A business", prompt: "What does the business do?", placeholder: "What would you like to be easier?" },
  { id: "unknown", label: "Not sure yet", prompt: "What's on your mind?", placeholder: "Anything at all. Working out the question is part of the job." },
];

export function isChoiceId(value: string): value is ChoiceId {
  return choices.some((choice) => choice.id === value);
}

export function getChoice(id: string): Choice | undefined {
  return choices.find((choice) => choice.id === id);
}
