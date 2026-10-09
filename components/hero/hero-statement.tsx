"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { heroStatements } from "@/lib/data/hero";

const COUNT = heroStatements.length;

/** Progress margin a boundary must be crossed by before the statement changes. Stops flicker on the line. */
const HYSTERESIS = 0.02;

/** Below this viewport height the pinned hero would not fit, so the effect stays off. */
const MIN_HEIGHT = 560;

const stagger = (index: number) => ({ "--i": index }) as CSSProperties;

/* Matches the original hero entrance: .50s then .65s. */
const enterDelay = (line: number) =>
  ({ "--enter-delay": `${(0.5 + line * 0.15).toFixed(2)}s` }) as CSSProperties;

/*
 * Hero statements, stacked in one grid cell. Scrolling through the pinned hero
 * steps from one statement to the next; each one rises out of a clipped line
 * and the previous one leaves upwards.
 *
 * Everything is opt-in. The server renders statement 0 only. This component
 * extends the hero (data-scrub="on" on the track) when motion is allowed and
 * the stage fits the viewport, and reverts if that stops being true.
 *
 * Cost: one IntersectionObserver for the track, and a passive scroll listener
 * that exists only while the track is on screen, throttled to one read per
 * frame. React re-renders only when the statement actually changes.
 */
export function HeroStatement() {
  const root = useRef<HTMLParagraphElement>(null);
  const [shown, setShown] = useState({ active: 0, previous: 0 });

  useEffect(() => {
    const track = root.current?.closest<HTMLElement>("[data-hero-track]");
    const stage = track?.querySelector<HTMLElement>("[data-hero-stage]");
    if (!track || !stage) return;

    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    let watcher: IntersectionObserver | null = null;
    let current = 0;
    let scrollFrame = 0;

    const commit = (next: number) => {
      if (next === current) return;
      const previous = current;
      current = next;
      setShown({ active: next, previous });
    };

    /** Statement for the current scroll position, with hysteresis around each boundary. */
    const choose = () => {
      const runway = track.offsetHeight - stage.offsetHeight;
      if (runway <= 0) return current;
      const progress = Math.min(Math.max(-track.getBoundingClientRect().top / runway, 0), 1);

      let next = current;
      while (next < COUNT - 1 && progress >= (next + 1) / COUNT + HYSTERESIS) next++;
      while (next > 0 && progress < next / COUNT - HYSTERESIS) next--;
      return next;
    };

    const onScroll = () => {
      if (scrollFrame) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        commit(choose());
      });
    };

    const enable = () => {
      track.dataset.scrub = "on";
      watcher = new IntersectionObserver(([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          window.addEventListener("scroll", onScroll, { passive: true });
          onScroll();
        } else {
          window.removeEventListener("scroll", onScroll);
          // Left above: rest on the last statement. Left below: back to the first.
          commit(entry.boundingClientRect.top < 0 ? COUNT - 1 : 0);
        }
      });
      watcher.observe(track);
    };

    const disable = (reset: boolean) => {
      watcher?.disconnect();
      watcher = null;
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(scrollFrame);
      scrollFrame = 0;
      delete track.dataset.scrub;
      if (reset) commit(0);
    };

    const fits = () =>
      !calm.matches && window.innerHeight >= MIN_HEIGHT && stage.offsetHeight <= window.innerHeight + 1;

    const evaluate = () => {
      const on = track.dataset.scrub === "on";
      const ok = fits();
      if (ok && !on) enable();
      else if (!ok && on) disable(true);
    };

    // Synchronous first pass, so the hero has its final height before the
    // reveal observer measures anything below it.
    evaluate();

    const resize = new ResizeObserver(evaluate);
    resize.observe(stage);
    calm.addEventListener("change", evaluate);

    return () => {
      resize.disconnect();
      calm.removeEventListener("change", evaluate);
      disable(false);
    };
  }, []);

  return (
    <p ref={root} className="type-editorial grid lg:col-span-7 lg:col-start-6">
      {heroStatements.map((lines, statement) => {
        const phase =
          statement < shown.active ? "before" : statement > shown.active ? "after" : "active";
        // Only the statement leaving and the one arriving animate. Skipped ones move silently.
        const animate = statement === shown.active || statement === shown.previous;

        return (
          <span
            key={lines.join(" ")}
            className="hero-phrase col-start-1 row-start-1"
            data-phase={phase}
            data-motion={animate ? "animate" : "none"}
            aria-hidden={phase !== "active"}
          >
            {lines.map((text, line) => {
              const last = line === lines.length - 1;
              const content = last ? <span className="italic">{text}</span> : text;

              return (
                <span key={text} className="line">
                  <span className="swap" style={stagger(line)}>
                    {statement === 0 ? (
                      <span className="line__inner" style={enterDelay(line)}>
                        {content}
                      </span>
                    ) : (
                      <span className="block">{content}</span>
                    )}
                  </span>
                </span>
              );
            })}
          </span>
        );
      })}
    </p>
  );
}