"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

type Step = 0 | 1 | 2 | 3;

const STAGES = [
  { label: "Rough", note: "Start with a sketch. Nothing lines up, and that's fine. The point is to get the idea down." },
  { label: "Structure", note: "Give it a grid. Decide what goes where and how much space sits between things." },
  { label: "Refine", note: "Set the type, line things up and cut anything that isn't doing a job." },
  { label: "Final", note: "Add colour and the finished image. Same page, same layout, now ready to use." },
] as const;

const toStep = (value: number): Step => (value <= 0 ? 0 : value === 1 ? 1 : value === 2 ? 2 : 3);

const clamp = (value: number, min: number, max: number) => Math.min(Math.max(value, min), max);
const smooth = (t: number) => t * t * (3 - 2 * t);

/** Where a stage starts and stops resting. Each stage holds for a beat before the next transition begins. */
const progressFromScroll = (raw: number) => {
  const whole = Math.floor(raw);
  const eased = smooth(clamp((raw - whole - 0.25) / 0.5, 0, 1));
  return whole + eased;
};

const MEDIA = "(min-width: 48rem) and (min-height: 600px) and (prefers-reduced-motion: no-preference)";

const SKETCH = {
  fill: "none",
  strokeWidth: 1,
  strokeDasharray: "2.4 1.4",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  vectorEffect: "non-scaling-stroke",
} as const;

const LINE = { fill: "none", strokeWidth: 1, vectorEffect: "non-scaling-stroke" } as const;

/*
 * One made-up page, drawn four ways in the same coordinates: a sketch, a
 * structured wireframe, set type, and the finished version. CSS (motion.css)
 * crossfades the layers from a single number, --p, which runs 0 to 3. Pass
 * `progress` for a fixed stage; leave it out and the scene inherits --p from
 * its parent (the scrolling version).
 */
export function Scene({ progress }: { progress?: number }) {
  const style = progress === undefined ? undefined : ({ "--p": progress } as CSSProperties);

  return (
    <svg
      viewBox="0 0 160 100"
      role="img"
      aria-label="A made-up web page for a coffee roaster, shown as it moves from a rough sketch to a finished design"
      className="rr-scene block h-auto w-full"
      style={style}
    >
      <rect x="0" y="0" width="160" height="100" className="fill-paper" />

      {/* 0. Rough: crooked, dashed, unresolved */}
      <g className="rr-rough stroke-ink">
        <path d="M5 4.5 L155 3.8 L155.6 96.2 L4.4 95.5 Z" {...SKETCH} strokeOpacity={0.35} />
        <path d="M8 7 L152 6 L151 14.5 L9 14 Z" {...SKETCH} />
        <path d="M10 10.5 C12 8 14 12.5 16 9 S20 11.5 24 9" {...SKETCH} />
        <path d="M9 21 L72 19.5 L71.5 70.5 L8 69.5 Z M9 21 L71.5 70.5 M72 19.5 L8 69.5" {...SKETCH} />
        <path d="M80 25 C84 19 88 29 93 22 S101 27 106 22 S116 27 122 23 S134 26 140 22" {...SKETCH} />
        <path
          d="M80 36 C95 34 110 38 126 35 S146 37 152 36 M80 42 C94 40 112 44 128 41 S142 43 150 42 M80 48 C92 47 104 49 118 48"
          {...SKETCH}
        />
        <path d="M80 58 L112 57 L113 70 L80.5 70.5 Z" {...SKETCH} />
        <path d="M9 81 L151 80 L152 88 L8 88.5 Z" {...SKETCH} />
      </g>

      {/* 1. Structure: boxes, a grid, named parts and the space between them */}
      <g className="rr-structure">
        <path d="M8 4 V96 M80 4 V96 M152 4 V96" className="stroke-ink" strokeOpacity={0.18} {...LINE} />
        <g className="stroke-ink">
          <rect x="8" y="6" width="144" height="8" fill="none" {...LINE} />
          <rect x="8" y="20" width="64" height="50" className="fill-ink" fillOpacity={0.06} strokeWidth={1} vectorEffect="non-scaling-stroke" />
          <rect x="80" y="20" width="72" height="8" fill="none" {...LINE} />
          <rect x="80" y="34" width="72" height="16" fill="none" {...LINE} />
          <rect x="80" y="58" width="32" height="12" fill="none" {...LINE} />
          <rect x="8" y="80" width="144" height="8" fill="none" {...LINE} />
        </g>
        <g className="font-mono fill-ink" fontSize="2.5" fillOpacity={0.65}>
          <text x="9.5" y="11.4">NAV</text>
          <text x="9.5" y="25">IMAGE</text>
          <text x="81.5" y="25.4">HEADING</text>
          <text x="81.5" y="38.4">TEXT</text>
          <text x="81.5" y="63.4">BUTTON</text>
          <text x="9.5" y="85.4">FOOTER</text>
        </g>
        {/* Spacing marks: the gaps are decisions too */}
        <path
          d="M72 45 H80 M72 43.2 V46.8 M80 43.2 V46.8 M116 28 V34 M114.2 28 H117.8 M114.2 34 H117.8"
          className="stroke-signal"
          {...LINE}
        />
      </g>

      {/* 2. Refine: real type, aligned, still one colour */}
      <g className="rr-refine fill-ink">
        <text x="10" y="11.8" className="font-display" fontSize="4.4">Lantern</text>
        <g className="font-sans" fontSize="2.6">
          <text x="112" y="11.4">Menu</text>
          <text x="127" y="11.4">Visit</text>
          <text x="140" y="11.4">Contact</text>
        </g>
        <path d="M8 16.5 H152" className="stroke-ink" strokeOpacity={0.5} {...LINE} strokeWidth={0.5} />
        <rect x="8" y="22" width="64" height="48" fillOpacity={0.12} />
        <text x="80" y="31" className="font-display" fontSize="8.4">Coffee, roasted</text>
        <text x="80" y="39.8" className="font-display" fontSize="8.4">slowly.</text>
        <g className="font-sans" fontSize="2.9" fillOpacity={0.75}>
          <text x="80" y="48.5">Small batches, roasted twice a week.</text>
          <text x="80" y="53">Order online or collect in store.</text>
        </g>
        <rect x="80" y="58" width="34" height="10" fill="none" className="stroke-ink" {...LINE} />
        <text x="97" y="64.2" textAnchor="middle" className="font-sans" fontSize="2.9">Order now</text>
        <path d="M8 80 H152" className="stroke-ink" strokeOpacity={0.5} {...LINE} strokeWidth={0.5} />
        <text x="8" y="86" className="font-mono" fontSize="2.3" fillOpacity={0.7}>Open daily, 8 to 4</text>
      </g>

      {/* 3. Final: colour and the finished image, laid over the refined layer */}
      <g className="rr-final">
        <rect x="8" y="22" width="64" height="48" className="fill-ink" />
        <circle cx="50" cy="42" r="11" className="fill-signal" />
        <path d="M16 57 H64 M16 62 H50" className="stroke-paper" strokeOpacity={0.5} {...LINE} />
        <rect x="80" y="58" width="34" height="10" className="fill-signal" />
        <text x="97" y="64.2" textAnchor="middle" className="font-sans fill-ink" fontSize="2.9">Order now</text>
      </g>
    </svg>
  );
}

/*
 * Experiment 02. On tablets and up, with motion allowed, the scene is pinned
 * and your scroll position drives it. Everywhere else (phones, reduced motion,
 * short windows, no JavaScript) the same four stages appear as a plain list
 * and nothing is pinned or animated. Which one shows is decided in CSS
 * (motion.css); the script only runs while the pinned version is on screen.
 * It writes --p straight to the DOM, so scrolling causes no React re-renders;
 * React state changes only when the active stage changes.
 */
export function RoughToRefined() {
  const track = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<Step>(0);

  useEffect(() => {
    const trackEl = track.current;
    const stageEl = stage.current;
    if (!trackEl || !stageEl) return;

    const query = window.matchMedia(MEDIA);
    let frame = 0;
    let listening = false;
    let visible = false;
    let current: Step = 0;

    const measure = () => {
      frame = 0;
      const stickTop = parseFloat(getComputedStyle(stageEl).top) || 0;
      const runway = trackEl.offsetHeight - stageEl.offsetHeight;
      if (runway <= 0) return;

      const raw = clamp((stickTop - trackEl.getBoundingClientRect().top) / runway, 0, 1) * 3;
      const p = progressFromScroll(raw);
      stageEl.style.setProperty("--p", p.toFixed(3));

      const next = toStep(Math.round(p));
      if (next !== current) {
        current = next;
        setActive(next);
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    const attach = () => {
      if (listening) return;
      listening = true;
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      onScroll();
    };

    const detach = () => {
      if (!listening) return;
      listening = false;
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };

    const sync = () => (visible && query.matches ? attach() : detach());

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry) return;
      visible = entry.isIntersecting;
      sync();
    });
    observer.observe(trackEl);
    query.addEventListener("change", sync);

    return () => {
      observer.disconnect();
      query.removeEventListener("change", sync);
      detach();
      cancelAnimationFrame(frame);
    };
  }, []);

  const stageInfo = STAGES[active];

  return (
    <>
      {/* Without script the pinned version has nothing to drive it, so fall back to the list. */}
      <noscript>
        <style>{".rr-scroll{display:none !important}.rr-steps{display:grid !important}"}</style>
      </noscript>

      <div ref={track} className="rr-scroll">
        <div ref={stage} className="rr-stage">
          <div className="grid items-center gap-x-6 gap-y-8 md:grid-cols-12">
            <div className="md:col-span-4">
              <ol>
                {STAGES.map((item, index) => (
                  <li
                    key={item.label}
                    aria-current={index === active ? "step" : undefined}
                    className={`type-editorial transition-colors duration-(--duration-base) ${
                      index === active ? "text-paper" : "text-(--tone-secondary)"
                    }`}
                  >
                    {item.label}
                  </li>
                ))}
              </ol>
              <p key={active} className="swap-in text-lead mt-8 max-w-xs">
                {stageInfo.note}
              </p>
            </div>

            <div className="md:col-span-8">
              <div className="rr-frame ml-auto">
                <Scene />
                <span className="rr-bar mt-4" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <ol className="rr-steps">
        {STAGES.map((item, index) => (
          <li key={item.label} className="grid gap-4">
            <Scene progress={index} />
            <div>
              <p className="type-meta text-(--tone-secondary)">
                {String(index + 1).padStart(2, "0")}, {item.label}
              </p>
              <p className="text-lead mt-2 max-w-xl">{item.note}</p>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
