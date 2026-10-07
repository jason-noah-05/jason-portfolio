/**
 * Single source of truth for public identity and site-level metadata.
 * Public identity is "Jason Noah" everywhere. Nothing here may be invented:
 * only add facts that are real.
 */

const rawUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

export const site = {
  name: "Jason Noah",
  role: "AI Engineer / Creative Technologist",
  location: "India",
  year: 2026,
  title: "Jason Noah — AI Engineer & Creative Technologist",
  description:
    "Independent AI engineer and creative technologist building software, interfaces and experiments where AI meets digital design.",
  /** Undefined until the production domain is confirmed. */
  url: rawUrl ? rawUrl.replace(/\/+$/, "") : undefined,
} as const;