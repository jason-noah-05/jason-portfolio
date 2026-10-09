"use client";

import { useState } from "react";
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
    rule: "One column. A long measure. Nothing competing for attention.",
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
    rule: "A grid of equal weight, with one figure marked out.",
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
    rule: "One statement and one primary action. Everything else steps back.",
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
 * Study 01. Each slot is a unit rect moved and scaled with a CSS transform, so
 * the morph runs on transform and opacity only. Reduced motion is handled by
 * the global rule in globals.css, which collapses the transition.
 */
export function GenerativeUi() {
  const [active, setActive] = useState<IntentId>("read");
  const intent = intents[active];

  return (
    <LabPanel label="Layout from intent">
      <div role="group" aria-label="Choose an intent" className="flex flex-wrap gap-2">
        {order.map((id) => (
          <LabButton key={id} pressed={id === active} onClick={() => setActive(id)}>
            {intents[id].label}
          </LabButton>
        ))}
      </div>

      <svg
        viewBox="0 0 160 100"
        role="img"
        aria-label={`Wireframe of the layout for: ${intent.label}`}
        className="mt-6 h-auto w-full text-paper"
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

      <p aria-live="polite" className="mt-6 text-small text-(--tone-secondary)">
        <span className="type-meta mr-3 text-paper">Rule</span>
        {intent.rule}
      </p>
      <p className="mt-3 text-small text-(--tone-secondary)">
        Three hand-authored layouts. Nothing is generated here; the sketch shows the idea of choosing a layout from
        intent.
      </p>
    </LabPanel>
  );
}