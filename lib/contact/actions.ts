"use server";

import { deliver } from "./deliver";
import { readValues, validate } from "./schema";
import type { ContactState } from "./schema";

const UNCONFIGURED = "Sending isn't set up on this site yet. Please try again later.";
const FAILED = "The message didn't go through. Your text is still here, so please try again.";

export async function submitContact(_previous: ContactState, formData: FormData): Promise<ContactState> {
  // Honeypot: real visitors never see or fill this field. Pretend success, send nothing.
  const trap = formData.get("website");
  if (typeof trap === "string" && trap !== "") return { status: "success" };

  const values = readValues(formData);
  const errors = validate(values);
  if (Object.keys(errors).length > 0) return { status: "error", values, errors };

  const result = await deliver(values);
  if (result === "sent") return { status: "success" };

  return {
    status: "error",
    values,
    errors: {},
    formError: result === "unconfigured" ? UNCONFIGURED : FAILED,
  };
}