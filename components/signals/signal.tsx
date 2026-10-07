import { Fragment } from "react";
import type { CSSProperties } from "react";
import type { SignalEntry } from "@/lib/data/signals";

const stagger = (index: number) => ({ "--i": index }) as CSSProperties;

/*
 * One recurring editorial observation: a quiet setup in sans, then the turn in
 * large serif with the final line in italic (the same pairing as the hero).
 * Used as an interlude between sections; paper surface.
 */
export function Signal({ signal }: { signal: SignalEntry }) {
  const last = signal.lines.length - 1;

  return (
    <figure
      data-reveal="group"
      className="mx-auto w-full max-w-(--page-max) px-(--gutter) py-(--section-space)"
    >
      <figcaption className="reveal-fade type-meta flex items-center gap-3 text-ink-muted">
        <span aria-hidden="true" className="text-signal">
          ●
        </span>
        Signal {signal.id}
      </figcaption>

      <div className="mt-10 grid gap-8 md:mt-14 lg:grid-cols-12 lg:gap-x-6">
        <p className="reveal-fade text-lead text-ink-muted lg:col-span-3" style={stagger(1)}>
          {signal.lead}
        </p>

        <p className="type-editorial lg:col-span-8 lg:col-start-5">
          {signal.lines.map((line, index) => (
            <Fragment key={line}>
              <span className="line">
                <span
                  className={index === last ? "reveal-line italic" : "reveal-line"}
                  style={stagger(index + 2)}
                >
                  {line}
                </span>
              </span>{" "}
            </Fragment>
          ))}
        </p>
      </div>
    </figure>
  );
}