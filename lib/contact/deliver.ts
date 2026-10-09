import { getChoice } from "@/lib/data/contact";
import type { ContactValues } from "./schema";

export type DeliveryResult = "sent" | "unconfigured" | "failed";

/*
 * Delivery adapter. Sends the message to an optional webhook so no paid or
 * third-party service is baked in. Set CONTACT_WEBHOOK_URL (server-only, never
 * NEXT_PUBLIC) to turn delivery on.
 *
 * With no webhook set:
 *   development -> the message is logged to the server console and treated as sent
 *   production  -> "unconfigured", which the form reports honestly
 */
export async function deliver(values: ContactValues): Promise<DeliveryResult> {
  const choice = getChoice(values.choice);
  const payload = {
    receivedAt: new Date().toISOString(),
    topic: choice?.label ?? "Not chosen",
    name: values.name,
    email: values.email,
    message: values.message,
  };

  const url = process.env.CONTACT_WEBHOOK_URL?.trim();

  if (!url) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[contact] No CONTACT_WEBHOOK_URL set. Development only, message not sent:", payload);
      return "sent";
    }
    return "unconfigured";
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    return response.ok ? "sent" : "failed";
  } catch {
    return "failed";
  }
}