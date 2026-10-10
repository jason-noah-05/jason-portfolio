"use client";

import { useId, useState } from "react";
import { LabButton, LabPanel } from "./lab-panel";

type IntentId = "read" | "scan" | "decide";
type Tone = "solid" | "tint" | "off";

type Slot = {
  readonly x: number;
  readonly y: number;
  readonly w: number;
  readonly h: number;
  readonly tone: Tone;
};

type Intent = {
  readonly label: string;
  /** Name of the resulting layout. */
  readonly layout: string;
  readonly rule: string;
  /** Always six slots, so every layout can morph into every other. */
  readonly slots: readonly Slot[];
};

const slot = (x: number, y: number, w: number, h: number, tone: Tone): Slot => ({ x, y, w, h, tone });

const OPACITY: Record<Tone, number> = { solid: 1, tint: 0.28, off: 0 };

/* Three hand-authored compositions on a 160 x 100 canvas. */
const intents: Record<IntentId, Intent> = {
  read: {
    label: "Read something slowly",
    layout: "One column",
    rule: "A long, narrow measure with nothing competing for attention.",
    slots: [
      slot(46, 12, 68, 10, "solid"),
      slot(46, 30, 68, 3, "tint"),
      slot(46, 37, 68, 3, "tint"),
      slot(46, 44, 68, 3, "tint"),
      slot(46, 51, 52, 3, "tint"),
      slot(46, 64, 30, 3, "tint"),
    ],
  },
  scan: {
    label: "Compare many things",
    layout: "Even grid",
    rule: "Equal weight for everything, with one item marked out.",
    slots: [
      slot(10, 10, 42, 38, "tint"),
      slot(59, 10, 42, 38, "tint"),
      slot(108, 10, 42, 38, "solid"),
      slot(10, 54, 42, 38, "tint"),
      slot(59, 54, 42, 38, "tint"),
      slot(108, 54, 42, 38, "tint"),
    ],
  },
  decide: {
    label: "Make one decision",
    layout: "One question, one action",
    rule: "A single statement and a single main button. Everything else steps back.",
    slots: [
      slot(20, 20, 120, 18, "solid"),
      slot(20, 46, 76, 4, "tint"),
      slot(20, 54, 52, 4, "tint"),
      slot(20, 72, 36, 12, "solid"),
      slot(64, 72, 36, 12, "tint"),
      slot(80, 90, 20, 4, "off"),
    ],
  },
};

const order: readonly IntentId[] = ["read", "scan", "decide"];

/*
 * Experiment 01. Each slot is a unit rect moved and scaled with a CSS
 * transform, so the morph runs on transform and opacity only. Reduced motion
 * is handled by the global rule in globals.css, which collapses the
 * transition. Controls sit beside the result on wider screens and above it on
 * phones; the buttons are full width so they are easy to hit by touch.
 */
export function GenerativeUi() {
  const [active, setActive] = useState<IntentId>("read");
  const labelId = useId();
  const intent = intents[active];

  return (
    <LabPanel label="Layout from intent">
      <div className="grid gap-8 md:grid-cols-[2fr_3fr] md:gap-10">
        <div>
          <p id={labelId} className="type-meta text-(--tone-secondary)">
            What does the visitor want to do?
          </p>
          <div role="group" aria-labelledby={labelId} className="mt-4 flex flex-col gap-2">
            {order.map((id) => (
              <LabButton key={id} pressed={id === active} onClick={() => setActive(id)}>
                {intents[id].label}
              </LabButton>
            ))}
          </div>

          <p aria-live="polite" className="text-small mt-6 text-(--tone-secondary)">
            <span className="type-meta mr-3 text-paper">{intent.layout}</span>
            {intent.rule}
          </p>
        </div>

        <svg
          viewBox="0 0 160 100"
          role="img"
          aria-label={`Wireframe of the layout for: ${intent.label}`}
          className="h-auto w-full text-paper"
        >
          <rect
            x="0.5"
            y="0.5"
            width="159"
            height="99"
            fill="none"
            stroke="currentColor"
            strokeOpacity={0.35}
            vectorEffect="non-scaling-stroke"
          />
          {intent.slots.map((item, index) => (
            <rect
              // Slots are a fixed set; stable identity is what lets them morph.
              key={index}
              width={1}
              height={1}
              fill="currentColor"
              className="transition-[transform,opacity] duration-(--duration-slow) ease-(--ease-out-quint)"
              style={{
                transform: `translate(${item.x}px, ${item.y}px) scale(${item.w}, ${item.h})`,
                opacity: OPACITY[item.tone],
                transitionDelay: `${index * 40}ms`,
              }}
            />
          ))}
        </svg>
      </div>

      <p className="text-small mt-6 text-(--tone-secondary)">
        The three layouts are drawn by hand. Nothing is generated yet; this shows the idea of choosing a layout from
        intent.
      </p>
    </LabPanel>
  );
}
