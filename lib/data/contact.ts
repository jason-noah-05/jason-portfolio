export type ChoiceId = "idea" | "problem" | "business" | "unknown";

export type Choice = {
  readonly id: ChoiceId;
  readonly index: string;
  readonly label: string;
  /** Label for the message field once this choice is picked. */
  readonly prompt: string;
  readonly placeholder: string;
  /** One quiet line shown under the choices once this choice is picked. */
  readonly reply: string;
};

export const contact = {
  label: "Contact",
  /** One entry per deliberate line break; the last line is italic. */
  statement: ["What are you", "trying to make?"],
  lead: "Pick whichever is closest, then say a little more. A rough answer is fine.",
  legend: "Closest description (optional)",
  noChoice: "Choose one, or skip straight to the message.",
  defaultPrompt: "Your message",
  defaultPlaceholder: "Say as much or as little as you like.",
  status: "Short and direct",
  disclosure:
    "Your name, email and message are used to reply to you, and for nothing else. There is no newsletter and no mailing list.",
} as const;

/** Add new choices at the end. */
export const choices: readonly Choice[] = [
  {
    id: "idea",
    index: "01",
    label: "I have an idea",
    prompt: "What's the idea?",
    placeholder: "What should it do, and who is it for?",
    reply: "Ideas are cheapest to change early. A rough sketch in words is plenty.",
  },
  {
    id: "problem",
    index: "02",
    label: "I have a problem",
    prompt: "What's going wrong?",
    placeholder: "What happens now, and what should happen instead?",
    reply: "Describe the problem before the solution. The solution can change.",
  },
  {
    id: "business",
    index: "03",
    label: "I have a business",
    prompt: "What does the business do?",
    placeholder: "What does it do, and what would you like to be easier?",
    reply: "Start with the part of the work that feels slowest or most repetitive.",
  },
  {
    id: "unknown",
    index: "04",
    label: "I don't know yet",
    prompt: "What's on your mind?",
    placeholder: "Anything at all. Working out the question is part of the job.",
    reply: "That's a fine place to start. Say what's on your mind.",
  },
];

export function isChoiceId(value: string): value is ChoiceId {
  return choices.some((choice) => choice.id === value);
}

export function getChoice(id: string): Choice | undefined {
  return choices.find((choice) => choice.id === id);
}