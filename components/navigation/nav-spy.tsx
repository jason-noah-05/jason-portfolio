"use client";

import { useEffect } from "react";
import { navigation } from "@/lib/data/navigation";

/*
 * Marks the desktop nav link for the section in the middle of the viewport
 * with aria-current="location" (globals.css draws the underline from it).
 * One IntersectionObserver watching a thin band across the viewport centre;
 * no scroll listener. Sections with no nav link (and the hero) clear the mark.
 */
export function NavSpy() {
  useEffect(() => {
    const links = new Map<string, HTMLAnchorElement>();
    for (const item of navigation) {
      const link = document.querySelector<HTMLAnchorElement>(
        `nav[aria-label="Primary"] a[href="${item.href}"]`,
      );
      if (link) links.set(item.href.slice(1), link);
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
  }, []);

  return null;
}