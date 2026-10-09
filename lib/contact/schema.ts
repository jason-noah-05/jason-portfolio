import { isChoiceId } from "@/lib/data/contact";
import type { ChoiceId } from "@/lib/data/contact";

/** Shared by the server action and the form, so limits and messages never drift apart. */
export const LIMITS = {
  name: 100,
  email: 254,
  messageMin: 10,
  messageMax: 2000,
} as const;

export type FieldName = "name" | "email" | "message";
export type FieldErrors = Partial<Record<FieldName, string>>;

export type ContactValues = {
  choice: ChoiceId | "";
  name: string;
  email: string;
  message: string;
};

export type ContactState =
  | { status: "idle"; values: ContactValues }
  | { status: "error"; values: ContactValues; errors: FieldErrors; formError?: string }
  | { status: "success" };

export const emptyValues: ContactValues = { choice: "", name: "", email: "", message: "" };

export const initialContactState: ContactState = { status: "idle", values: emptyValues };

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(formData: FormData, key: string): string {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

export function readValues(formData: FormData): ContactValues {
  const choice = text(formData, "choice");
  return {
    choice: isChoiceId(choice) ? choice : "",
    name: text(formData, "name").trim(),
    email: text(formData, "email").trim(),
    // Textareas submit CRLF; normalise so length limits count characters, not line endings.
    message: text(formData, "message").replace(/\r\n/g, "\n").trim(),
  };
}

export function validate(values: ContactValues): FieldErrors {
  const errors: FieldErrors = {};

  if (values.name.length === 0) {
    errors.name = "Please tell me your name.";
  } else if (values.name.length > LIMITS.name) {
    errors.name = `Please keep your name under ${LIMITS.name} characters.`;
  }

  if (values.email.length === 0) {
    errors.email = "Please add an email address so I can reply.";
  } else if (values.email.length > LIMITS.email || !EMAIL.test(values.email)) {
    errors.email = "That doesn't look like an email address. Check for a missing @ or dot.";
  }

  if (values.message.length === 0) {
    errors.message = "Please write a few words.";
  } else if (values.message.length < LIMITS.messageMin) {
    errors.message = `A little more, please: at least ${LIMITS.messageMin} characters.`;
  } else if (values.message.length > LIMITS.messageMax) {
    errors.message = `Please keep it under ${LIMITS.messageMax} characters.`;
  }

  return errors;
}