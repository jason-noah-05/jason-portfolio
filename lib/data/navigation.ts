export type NavItem = {
  readonly label: string;
  readonly href: string;
};

/** Anchors resolve once the matching sections exist (Parts 3 to 8). */
export const navigation: readonly NavItem[] = [
  { label: "Work", href: "#work" },
  { label: "Lab", href: "#lab" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];
