"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { NavItem } from "@/lib/data/navigation";
import { site } from "@/lib/site";

export function MobileMenu({ items }: { items: readonly NavItem[] }) {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;

    const html = document.documentElement;
    const previousOverflow = html.style.overflow;
    html.style.overflow = "hidden";

    // The overlay covers the page, so the page behind it must not be reachable
    // by keyboard or screen reader either. The header (with the toggle button)
    // sits outside <main>, so the menu stays operable.
    const main = document.getElementById("main");
    main?.setAttribute("inert", "");

    panel.current?.querySelector<HTMLElement>("a[href]")?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        button.current?.focus();
        return;
      }
      if (event.key !== "Tab") return;

      const links = Array.from(panel.current?.querySelectorAll<HTMLElement>("a[href]") ?? []);
      const list = [button.current, ...links].filter((node): node is HTMLElement => node !== null);
      const first = list[0];
      const last = list[list.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const desktop = window.matchMedia("(min-width: 48rem)");
    const onBreakpoint = () => {
      if (desktop.matches) setOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onBreakpoint);

    return () => {
      html.style.overflow = previousOverflow;
      main?.removeAttribute("inert");
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onBreakpoint);
    };
  }, [open]);

  return (
    <>
      <button
        ref={button}
        type="button"
        className="menu-button md:hidden"
        data-open={open}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? "Close" : "Menu"}
      </button>

      <div
        id="mobile-menu"
        ref={panel}
        className="menu-overlay md:hidden"
        data-open={open}
        data-surface="ink"
        inert={!open}
      >
        <nav aria-label="Mobile">
          <ul>
            {items.map((item, index) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="menu-link"
                  onClick={close}
                  style={{ "--i": index } as CSSProperties}
                >
                  <span className="type-meta menu-link__index" aria-hidden="true">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <p className="type-meta text-dust">
          {site.role} · {site.location} · {site.year}
        </p>
      </div>
    </>
  );
}