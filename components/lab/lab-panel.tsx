import type { ReactNode } from "react";

/*
 * Shared frame and button for the lab studies. No hooks and no "use client":
 * it renders on the server or inside a client island, whichever imports it.
 * Written for the ink surface (the lab section sets data-surface="ink").
 */

export function LabPanel({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="border border-(--rule-color)">
      <div className="type-meta flex items-baseline justify-between gap-4 border-b border-(--rule-color) px-4 py-3 text-(--tone-secondary)">
        <span>{label}</span>
        <span>Interactive</span>
      </div>
      <div className="p-4 md:p-6">{children}</div>
    </div>
  );
}

type LabButtonProps = {
  children: ReactNode;
  onClick: () => void;
  /** Set for toggles and single-choice groups; omit for plain action buttons. */
  pressed?: boolean;
  disabled?: boolean;
  /** Constant accessible name for toggles whose visible text changes. */
  label?: string;
};

export function LabButton({ children, onClick, pressed, disabled, label }: LabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-pressed={pressed}
      aria-label={label}
      className={`type-meta inline-flex min-h-11 items-center border px-4 transition-colors duration-(--duration-fast) disabled:opacity-40 ${
        pressed ? "border-paper bg-paper text-ink" : "border-(--rule-color) text-paper hover:border-paper"
      }`}
    >
      {children}
    </button>
  );
}