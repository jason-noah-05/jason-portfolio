"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = "a[href], button, summary, label:has(input[type='radio']), [role='button'], [data-cursor]";
/* Elements that keep the native cursor (text I-beam, range thumb). The dot hides over them. */
const NATIVE = "input, textarea, select";
const FOLLOW = 0.22;
/* FOLLOW is the share of the gap closed per 60 Hz frame; easing is scaled by real elapsed time. */
const FRAME = 1000 / 60;

/*
 * Desktop-only cursor. Active for a fine, hovering mouse with motion allowed.
 * States (data-state): idle, interactive (dot grows), native (dot hidden over
 * form fields). data-pressed shrinks the dot while a button is held.
 * Add data-cursor-label="Explore" to any element to show a label beside the dot.
 */
export function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = root.current;
    const text = label.current;
    if (!el || !text) return;

    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || calm.matches) return;

    const html = document.documentElement;
    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let frame = 0;
    let last = 0;
    let seen = false;

    const paint = () => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const tick = (now: number) => {
      const elapsed = Math.min(Math.max(now - last, 0), 64);
      last = now;
      const ease = 1 - Math.pow(1 - FOLLOW, elapsed / FRAME);
      x += (targetX - x) * ease;
      y += (targetY - y) * ease;
      paint();
      if (Math.abs(targetX - x) > 0.1 || Math.abs(targetY - y) > 0.1) {
        frame = requestAnimationFrame(tick);
      } else {
        x = targetX;
        y = targetY;
        paint();
        frame = 0;
      }
    };

    const start = () => {
      if (frame) return;
      last = performance.now();
      frame = requestAnimationFrame(tick);
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      targetX = event.clientX;
      targetY = event.clientY;
      if (!seen) {
        seen = true;
        x = targetX;
        y = targetY;
        paint();
        html.classList.add("has-cursor");
      }
      el.dataset.visible = "true";
      start();
    };

    const onOver = (event: PointerEvent) => {
      const source = event.target instanceof Element ? event.target : null;
      const native = source?.closest(NATIVE) ?? null;
      const target = native ? null : (source?.closest<HTMLElement>(INTERACTIVE) ?? null);

      el.dataset.state = native ? "native" : target ? "interactive" : "idle";
      text.textContent = target?.dataset.cursorLabel ?? "";
    };

    const onDown = (event: PointerEvent) => {
      if (event.pointerType === "mouse") el.dataset.pressed = "true";
    };

    const onUp = () => {
      el.dataset.pressed = "false";
    };

    const onLeave = () => {
      el.dataset.visible = "false";
      el.dataset.pressed = "false";
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    document.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerup", onUp, { passive: true });
    document.addEventListener("pointercancel", onUp, { passive: true });
    html.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerup", onUp);
      document.removeEventListener("pointercancel", onUp);
      html.removeEventListener("pointerleave", onLeave);
      html.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div
      ref={root}
      className="cursor"
      data-state="idle"
      data-visible="false"
      data-pressed="false"
      aria-hidden="true"
    >
      <span className="cursor__dot" />
      <span ref={label} className="cursor__label type-meta" />
    </div>
  );
}