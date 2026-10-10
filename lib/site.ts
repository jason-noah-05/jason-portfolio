/**
 * Single source of truth for public identity and site-level metadata.
 * Public identity is "Jason Noah" everywhere. Nothing here may be invented:
 * only add facts that are real. Contact links appear only when their
 * environment variable is set.
 */

const clean = (value: string | undefined) => {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
};

const httpsOnly = (value: string | undefined) => {
  const url = clean(value);
  return url && /^https:\/\//.test(url) ? url : undefined;
};

const rawUrl = clean(process.env.NEXT_PUBLIC_SITE_URL);

export const site = {
  name: "Jason Noah",
  role: "AI Engineer / Creative Technologist",
  location: "India",
  year: 2026,
  title: "Jason Noah — AI Engineer & Creative Technologist",
  description:
    "Jason Noah is an AI engineer and creative technologist working independently from India. Software, interfaces and small experiments.",
  /** Undefined until the production domain is confirmed. */
  url: rawUrl ? rawUrl.replace(/\/+$/, "") : undefined,
  /** Each is undefined until set in the environment. */
  contact: {
    email: clean(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
    github: httpsOnly(process.env.NEXT_PUBLIC_GITHUB_URL),
    linkedin: httpsOnly(process.env.NEXT_PUBLIC_LINKEDIN_URL),
  },
} as const;
