"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE = "a[href], button, summary, [role='button'], [data-cursor]";
const FOLLOW = 0.22;

/*
 * Desktop-only cursor foundation. Active for a fine, hovering mouse with
 * motion allowed. Add data-cursor-label="Explore" to any element to show a
 * label beside the dot (used by later parts).
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
    let seen = false;

    const paint = () => {
      el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
    };

    const tick = () => {
      x += (targetX - x) * FOLLOW;
      y += (targetY - y) * FOLLOW;
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
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onOver = (event: PointerEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>(INTERACTIVE) : null;
      el.dataset.state = target ? "interactive" : "idle";
      text.textContent = target?.dataset.cursorLabel ?? "";
    };

    const onLeave = () => {
      el.dataset.visible = "false";
    };

    document.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });
    html.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      html.removeEventListener("pointerleave", onLeave);
      html.classList.remove("has-cursor");
    };
  }, []);

  return (
    <div ref={root} className="cursor" data-state="idle" data-visible="false" aria-hidden="true">
      <span className="cursor__dot" />
      <span ref={label} className="cursor__label type-meta" />
    </div>
  );
}