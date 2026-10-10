"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/data/navigation";

/*
 * Marks the desktop nav link for the section in the middle of the viewport
 * with aria-current="location" (globals.css draws the underline from it).
 * One IntersectionObserver watching a thin band across the viewport centre;
 * no scroll listener. It re-runs when the route changes, because the page's
 * <main> is replaced on navigation. Pages with no matching sections (the
 * experiment pages) simply show no mark.
 */
export function NavSpy() {
  const pathname = usePathname();

  useEffect(() => {
    const links = new Map<string, HTMLAnchorElement>();
    for (const item of navigation) {
      const id = item.href.split("#")[1];
      const link = document.querySelector<HTMLAnchorElement>(`nav[aria-label="Primary"] a[href="${item.href}"]`);
      if (link && id) links.set(id, link);
    }

    const blocks = Array.from(document.querySelectorAll<HTMLElement>("main > *"));
    if (links.size === 0 || blocks.length === 0) return;

    let current: HTMLAnchorElement | undefined;
    const mark = (next: HTMLAnchorElement | undefined) => {
      if (next === current) return;
      current?.removeAttribute("aria-current");
      next?.setAttribute("aria-current", "location");
      current = next;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) mark(links.get(entry.target.id));
        }
      },
      { rootMargin: "-50% 0px -49% 0px" },
    );

    for (const block of blocks) observer.observe(block);

    return () => {
      observer.disconnect();
      mark(undefined);
    };
  }, [pathname]);

  return null;
}
