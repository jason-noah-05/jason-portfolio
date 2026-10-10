export type NavItem = {
  readonly label: string;
  readonly href: string;
};

/** Hrefs start with "/" so they also work from the 404 page. Each id matches a section id on the home page. */
export const navigation: readonly NavItem[] = [
  { label: "Chapter", href: "/#current-chapter" },
  { label: "Lab", href: "/#lab" },
  { label: "Materials", href: "/#materials" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];