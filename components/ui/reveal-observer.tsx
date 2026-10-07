"use client";

import { useEffect } from "react";

/*
 * Scroll reveals, one observer for the whole page. Server-rendered markup is
 * visible by default; this component only hides elements that start below the
 * fold, then reveals them as they enter. Nothing is hidden when JavaScript is
 * off, when IntersectionObserver is missing, or when reduced motion is set.
 *
 * Elements opt in with data-reveal. The effect classes (reveal-line,
 * reveal-rule, reveal-fade) live in globals.css.
 *
 * FOLD and ROOT_MARGIN describe the same line: 12% up from the viewport bottom.
 */
const FOLD = 0.88;
const ROOT_MARGIN = "0px 0px -12% 0px";

export function RevealObserver() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const foldLine = window.innerHeight * FOLD;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting || !(entry.target instanceof HTMLElement)) continue;
          entry.target.dataset.state = "shown";
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: ROOT_MARGIN },
    );

    for (const target of targets) {
      // Already in view, or scrolled past (e.g. restored scroll position): leave visible.
      if (target.getBoundingClientRect().top < foldLine) continue;
      target.dataset.state = "hidden";
      observer.observe(target);
    }

    return () => {
      observer.disconnect();
      for (const target of targets) delete target.dataset.state;
    };
  }, []);

  return null;
}