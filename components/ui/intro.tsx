"use client";

import { useEffect, useState } from "react";

/*
 * Wordmark curtain, styled in motion.css. The animation is pure CSS and runs
 * once per full page load; client-side navigation never remounts this, so it
 * does not replay. After the animation this removes itself, and clears the
 * data-intro flag on <html> that delays the hero entrance. No fake progress,
 * no waiting on network: content is already in the page underneath.
 */
const CLEAR_AFTER_MS = 3400;

export function Intro() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      document.documentElement.removeAttribute("data-intro");
      setDone(true);
    }, CLEAR_AFTER_MS);
    return () => window.clearTimeout(timer);
  }, []);

  if (done) return null;

  return (
    <div className="intro" aria-hidden="true">
      <span className="line">
        <span className="intro__mark">Jason Noah</span>
      </span>
      <span className="intro__bar" />
    </div>
  );
}
