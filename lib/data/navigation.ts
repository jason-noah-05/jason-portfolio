export type NavItem = {
  readonly label: string;
  readonly href: string;
};

/** Hrefs start with "/" so they also work from the experiment pages. */
export const navigation: readonly NavItem[] = [
  { label: "Work", href: "/#work" },
  { label: "Materials", href: "/#materials" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];
