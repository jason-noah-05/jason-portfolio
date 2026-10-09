"use client";

import { useEffect, useRef, useState } from "react";
import { LabButton, LabPanel } from "./lab-panel";

type ModeId = "radial" | "orbit" | "spiral";

type Mode = {
  readonly label: string;
  readonly note: string;
  /** Angle added to the direction towards the target. Lines are symmetric, so a half-turn changes nothing. */
  readonly turn: number;
};

const modes: Record<ModeId, Mode> = {
  radial: { label: "Radial", note: "Every line lines up with the target, like spokes around a hub.", turn: 0 },
  orbit: {
    label: "Orbit",
    note: "Every line sits at right angles to the target, so the field circles it.",
    turn: Math.PI / 2,
  },
  spiral: {
    label: "Spiral",
    note: "Every line sits an eighth-turn off the target, so the field winds around it.",
    turn: Math.PI / 4,
  },
};

const order: readonly ModeId[] = ["radial", "orbit", "spiral"];

/* Sketch constants */
const CELL = 28; // target cell size in CSS px
const LINE = 0.6; // line length as a share of the cell
const EASE = 0.16; // share of the remaining angle covered each frame
const SETTLE = 0.002; // radians; below this a line snaps to its angle
const HOT_REACH = 3; // cells around the target drawn in signal

/*
 * Study 04. A canvas of short lines that each turn towards (or around) a
 * target. The loop runs only while some line is still turning, so an idle
 * sketch costs nothing. Under reduced motion lines snap with no easing.
 * The target follows the pointer, or the arrow keys when the field has focus.
 */
export function FieldSketch() {
  const [mode, setMode] = useState<ModeId>("radial");
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const turn = useRef(modes.radial.turn);
  const request = useRef<() => void>(() => {});

  useEffect(() => {
    const box = host.current;
    const surface = canvas.current;
    if (!box || !surface) return;
    const ctx = surface.getContext("2d");
    if (!ctx) return;

    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const styles = getComputedStyle(box);
    const quietColor = styles.getPropertyValue("--color-dust").trim() || "#b8b5aa";
    const hotColor = styles.getPropertyValue("--color-signal").trim() || "#ff4d2e";

    let width = 0;
    let height = 0;
    let cols = 1;
    let rows = 1;
    let angles: number[] = [];
    let targetX = 0;
    let targetY = 0;
    let placed = false;
    let frame = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const cellW = width / cols;
      const cellH = height / rows;
      const half = (Math.min(cellW, cellH) * LINE) / 2;
      const reach = Math.min(cellW, cellH) * HOT_REACH;
      const quiet = new Path2D();
      const lit = new Path2D();

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const cx = (col + 0.5) * cellW;
          const cy = (row + 0.5) * cellH;
          const angle = angles[row * cols + col] ?? 0;
          const dx = Math.cos(angle) * half;
          const dy = Math.sin(angle) * half;
          const path = Math.hypot(targetX - cx, targetY - cy) < reach ? lit : quiet;
          path.moveTo(cx - dx, cy - dy);
          path.lineTo(cx + dx, cy + dy);
        }
      }

      ctx.lineWidth = 1.5;
      ctx.lineCap = "round";
      ctx.strokeStyle = quietColor;
      ctx.stroke(quiet);
      ctx.strokeStyle = hotColor;
      ctx.stroke(lit);

      ctx.fillStyle = hotColor;
      ctx.beginPath();
      ctx.arc(targetX, targetY, 3, 0, Math.PI * 2);
      ctx.fill();
    };

    /** Moves every line towards its wanted angle. Returns true while any line is still turning. */
    const step = (ease: boolean) => {
      const cellW = width / cols;
      const cellH = height / rows;
      let moving = false;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const index = row * cols + col;
          const want =
            Math.atan2(targetY - (row + 0.5) * cellH, targetX - (col + 0.5) * cellW) + turn.current;
          const current = angles[index] ?? want;
          const gap = want - current;
          // Lines are symmetric, so the shortest turn is never more than a quarter-turn.
          const diff = gap - Math.PI * Math.round(gap / Math.PI);

          if (ease && Math.abs(diff) > SETTLE) {
            angles[index] = current + diff * EASE;
            moving = true;
          } else {
            angles[index] = current + diff;
          }
        }
      }

      draw();
      return moving;
    };

    const run = () => {
      frame = 0;
      if (step(!calm.matches)) frame = requestAnimationFrame(run);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(run);
    };

    const layout = () => {
      const rect = box.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      width = rect.width;
      height = rect.height;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      surface.width = Math.round(width * ratio);
      surface.height = Math.round(height * ratio);
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      cols = Math.max(1, Math.round(width / CELL));
      rows = Math.max(1, Math.round(height / CELL));
      angles = new Array<number>(cols * rows).fill(0);

      if (placed) {
        targetX = Math.min(targetX, width);
        targetY = Math.min(targetY, height);
      } else {
        targetX = width / 2;
        targetY = height / 2;
        placed = true;
      }

      step(false);
    };

    const aim = (event: PointerEvent) => {
      const rect = box.getBoundingClientRect();
      targetX = Math.min(Math.max(event.clientX - rect.left, 0), width);
      targetY = Math.min(Math.max(event.clientY - rect.top, 0), height);
      schedule();
    };

    const onKeyDown = (event: KeyboardEvent) => {
      const stride = Math.min(width / cols, height / rows);
      switch (event.key) {
        case "ArrowLeft":
          targetX = Math.max(0, targetX - stride);
          break;
        case "ArrowRight":
          targetX = Math.min(width, targetX + stride);
          break;
        case "ArrowUp":
          targetY = Math.max(0, targetY - stride);
          break;
        case "ArrowDown":
          targetY = Math.min(height, targetY + stride);
          break;
        default:
          return;
      }
      event.preventDefault();
      schedule();
    };

    layout();
    const observer = new ResizeObserver(layout);
    observer.observe(box);
    box.addEventListener("pointermove", aim, { passive: true });
    box.addEventListener("pointerdown", aim, { passive: true });
    box.addEventListener("keydown", onKeyDown);
    request.current = schedule;

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      box.removeEventListener("pointermove", aim);
      box.removeEventListener("pointerdown", aim);
      box.removeEventListener("keydown", onKeyDown);
      request.current = () => {};
    };
  }, []);

  useEffect(() => {
    turn.current = modes[mode].turn;
    request.current();
  }, [mode]);

  return (
    <LabPanel label="Line field">
      <div role="group" aria-label="Choose a rule" className="flex flex-wrap gap-2">
        {order.map((id) => (
          <LabButton key={id} pressed={id === mode} onClick={() => setMode(id)}>
            {modes[id].label}
          </LabButton>
        ))}
      </div>

      <div
        ref={host}
        role="group"
        aria-label="Line field. Move the pointer across it, or focus it and use the arrow keys, to move the target."
        tabIndex={0}
        className="relative mt-6 aspect-[4/3] w-full touch-pan-y overflow-hidden border border-(--rule-color) md:aspect-[16/9]"
      >
        <canvas ref={canvas} aria-hidden="true" className="absolute inset-0 h-full w-full" />
      </div>

      <p aria-live="polite" className="mt-6 text-small text-(--tone-secondary)">
        <span className="type-meta mr-3 text-paper">Rule</span>
        {modes[mode].note}
      </p>
      <p className="mt-3 text-small text-(--tone-secondary)">
        Move across the field, or focus it and use the arrow keys. It redraws only while a line is still turning.
      </p>
    </LabPanel>
  );
}