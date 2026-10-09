"use client";

import { useId, useState } from "react";
import { LabPanel } from "./lab-panel";

type Pass = 0 | 1 | 2 | 3;

const isPass = (value: number): value is Pass => value === 0 || value === 1 || value === 2 || value === 3;

type PassInfo = {
  readonly label: string;
  readonly note: string;
};

const passes: Record<Pass, PassInfo> = {
  0: { label: "Marks", note: "Input: marks on a canvas. No meaning yet." },
  1: { label: "Regions", note: "Six regions found. Boundaries, but no names." },
  2: { label: "Components", note: "Each region named by its role: nav, image, heading, text, button, footer." },
  3: {
    label: "Markup",
    note: "Semantic markup for those roles. This pass is scripted; a real pipeline would still need a person to check it.",
  },
};

const passOrder: readonly Pass[] = [0, 1, 2, 3];

type Region = {
  readonly name: string;
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
};

const regions: readonly Region[] = [
  { name: "Nav", x: 8, y: 6, w: 144, h: 8 },
  { name: "Image", x: 8, y: 20, w: 64, h: 50 },
  { name: "Heading", x: 80, y: 20, w: 72, h: 8 },
  { name: "Text", x: 80, y: 34, w: 72, h: 16 },
  { name: "Button", x: 80, y: 58, w: 32, h: 12 },
  { name: "Footer", x: 8, y: 80, w: 144, h: 8 },
];

const PAD = 1.5;

const markup = [
  "<nav>…</nav>",
  "<main>",
  '  <img alt="…" />',
  "  <h1>…</h1>",
  "  <p>…</p>",
  '  <a href="#">…</a>',
  "</main>",
  "<footer>…</footer>",
].join("\n");

/*
 * Study 03. The drawing never changes; each pass adds a layer on top of it.
 * Overlay visibility is opacity only.
 */
export function ImageToInterface() {
  const [pass, setPass] = useState<Pass>(0);
  const sliderId = useId();
  const info = passes[pass];

  return (
    <LabPanel label="Reading a sketch">
      <div className="grid gap-6 md:grid-cols-[3fr_2fr]">
        <svg
          viewBox="0 0 160 100"
          role="img"
          aria-label="A drawn wireframe of a web page: navigation bar, image, heading, text, button and footer"
          className="h-auto w-full text-paper"
        >
          {/* The drawing */}
          <g stroke="currentColor" strokeWidth={1} vectorEffect="non-scaling-stroke">
            <rect x="8" y="6" width="144" height="8" fill="none" vectorEffect="non-scaling-stroke" />
            <rect x="10" y="8" width="10" height="4" fill="currentColor" stroke="none" />
            <rect x="8" y="20" width="64" height="50" fill="none" vectorEffect="non-scaling-stroke" />
            <path
              d="M8 20 L72 70 M72 20 L8 70"
              fill="none"
              strokeOpacity={0.4}
              vectorEffect="non-scaling-stroke"
            />
            <rect x="80" y="20" width="60" height="8" fill="currentColor" fillOpacity={0.85} stroke="none" />
            <rect x="80" y="34" width="72" height="3" fill="currentColor" fillOpacity={0.3} stroke="none" />
            <rect x="80" y="40" width="72" height="3" fill="currentColor" fillOpacity={0.3} stroke="none" />
            <rect x="80" y="46" width="50" height="3" fill="currentColor" fillOpacity={0.3} stroke="none" />
            <rect x="80" y="58" width="32" height="12" fill="currentColor" stroke="none" />
            <rect
              x="8"
              y="80"
              width="144"
              height="8"
              fill="none"
              strokeOpacity={0.5}
              vectorEffect="non-scaling-stroke"
            />
          </g>

          {/* Detected regions and labels */}
          <g
            className="text-signal transition-opacity duration-(--duration-base) ease-(--ease-out-quint)"
            style={{ opacity: pass >= 1 ? 1 : 0 }}
            aria-hidden="true"
          >
            {regions.map((region, index) => (
              <g key={region.name}>
                <rect
                  x={region.x - PAD}
                  y={region.y - PAD}
                  width={region.w + PAD * 2}
                  height={region.h + PAD * 2}
                  fill="none"
                  stroke="currentColor"
                  strokeDasharray="4 3"
                  vectorEffect="non-scaling-stroke"
                />
                <text
                  x={region.x - PAD}
                  y={region.y - PAD - 1.5}
                  fill="currentColor"
                  style={{ fontFamily: "var(--font-mono)", fontSize: 3.4, textTransform: "uppercase" }}
                >
                  {pass === 1 ? String(index + 1).padStart(2, "0") : region.name}
                </text>
              </g>
            ))}
          </g>
        </svg>

        <div className="flex flex-col gap-4">
          <p aria-live="polite" className="text-small text-(--tone-secondary)">
            {info.note}
          </p>
          {pass === 3 ? (
            <pre
              role="region"
              aria-label="Scripted example markup"
              tabIndex={0}
              className="overflow-x-auto border border-(--rule-color) p-4 font-mono text-small"
            >
              <code>{markup}</code>
            </pre>
          ) : null}
        </div>
      </div>

      <div className="mt-6">
        <div className="type-meta flex items-baseline justify-between text-(--tone-secondary)">
          <label htmlFor={sliderId}>Pass</label>
          <span aria-hidden="true">
            {pass} / 3 · {info.label}
          </span>
        </div>
        <input
          id={sliderId}
          type="range"
          min={0}
          max={3}
          step={1}
          value={pass}
          aria-valuetext={info.label}
          onChange={(event) => {
            const value = Number(event.target.value);
            if (isPass(value)) setPass(value);
          }}
          className="mt-2 h-11 w-full accent-signal"
        />
        <ol aria-hidden="true" className="type-meta flex justify-between text-(--tone-secondary)">
          {passOrder.map((id) => (
            <li key={id} className={id === pass ? "text-paper" : undefined}>
              {passes[id].label}
            </li>
          ))}
        </ol>
      </div>

      <p className="mt-6 text-small text-(--tone-secondary)">
        Scripted passes over a drawn wireframe. No image is being analysed.
      </p>
    </LabPanel>
  );
}