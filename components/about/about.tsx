import { Fragment } from "react";
import type { CSSProperties } from "react";
import { SectionMarker } from "@/components/ui/section-marker";
import { about } from "@/lib/data/about";
import { site } from "@/lib/site";

const stagger = (index: number) => ({ "--i": index }) as CSSProperties;

/*
 * Section 07. Paper surface, following the ink How I Work section, so it
 * carries its own top padding. Anchor id "about" is what the navigation's
 * About link targets.
 *
 * Four separate [data-reveal] containers (statement, body, ledger, note);
 * none is nested inside another. Everything is visible without JavaScript.
 *
 * The "Real today / Not yet" ledger is the transparency device: it reuses the
 * filled / hollow marker convention from Experiments (hollow = not yet real).
 */
export function About() {
  const last = about.statement.length - 1;
  const columns = [about.ledger.real, about.ledger.notYet] as const;

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      className="mx-auto w-full max-w-(--page-max) px-(--gutter) py-(--section-space)"
    >
      <SectionMarker index="07" label={about.label} id="about-title" meta={String(site.year)} />

      {/* Statement */}
      <div data-reveal="group" className="mt-16 grid md:mt-24 lg:grid-cols-12">
        <p className="type-editorial lg:col-span-10">
          {about.statement.map((line, index) => (
            <Fragment key={line}>
              <span className="line">
                <span
                  className={index === last ? "reveal-line italic" : "reveal-line"}
                  style={stagger(index)}
                >
                  {line}
                </span>
              </span>{" "}
            </Fragment>
          ))}
        </p>
      </div>

      {/* Position and honest paragraphs */}
      <div data-reveal="group" className="relative mt-20 grid gap-x-6 gap-y-10 pt-8 md:mt-28 lg:grid-cols-12">
        <span
          className="reveal-rule absolute inset-x-0 top-0 h-px bg-(--rule-color)"
          aria-hidden="true"
        />

        <dl className="reveal-fade type-meta grid grid-cols-[auto_1fr] content-start gap-x-6 gap-y-2 text-(--tone-secondary) lg:col-span-4">
          <dt>Role</dt>
          <dd className="text-ink">{site.role}</dd>
          <dt>Based</dt>
          <dd className="text-ink">{site.location}</dd>
          <dt>Stage</dt>
          <dd className="text-ink">{about.stage}</dd>
        </dl>

        <div className="lg:col-span-6 lg:col-start-7">
          <p className="reveal-fade text-lead" style={stagger(1)}>
            {about.lead}
          </p>
          {about.body.map((paragraph, index) => (
            <p
              key={paragraph}
              className="reveal-fade mt-6 max-w-prose text-(--tone-secondary)"
              style={stagger(index + 2)}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Ledger: what is real, and what is not yet */}
      <div data-reveal="group" className="relative mt-20 grid gap-x-6 gap-y-12 pt-8 md:mt-28 lg:grid-cols-12">
        <span
          className="reveal-rule absolute inset-x-0 top-0 h-px bg-(--rule-color)"
          aria-hidden="true"
        />

        {columns.map((column, columnIndex) => {
          const real = columnIndex === 0;

          return (
            <div
              key={column.label}
              className={`reveal-fade lg:col-span-5 ${real ? "lg:col-start-1" : "lg:col-start-7"}`}
              style={stagger(columnIndex)}
            >
              <h3 className="type-meta text-(--tone-secondary)">{column.label}</h3>
              <ul className="mt-6">
                {column.items.map((item) => (
                  <li key={item.text} className="flex gap-4 border-t border-dust py-4 text-small">
                    <span
                      aria-hidden="true"
                      className={real ? "text-signal" : "text-(--tone-secondary)"}
                    >
                      {real ? "●" : "○"}
                    </span>
                    <span>
                      <span className="sr-only">{real ? "Real: " : "Not yet: "}</span>
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      {/* Note, matching the closing pattern of the other sections */}
      <div data-reveal="group" className="relative mt-16 grid gap-8 pt-8 lg:grid-cols-12">
        <span
          className="reveal-rule absolute inset-x-0 top-0 h-px bg-(--rule-color)"
          aria-hidden="true"
        />

        <dl className="reveal-fade type-meta text-(--tone-secondary) lg:col-span-4">
          <dt>Note</dt>
          <dd className="mt-2 text-ink">
            <span aria-hidden="true" className="text-signal">
              ●
            </span>{" "}
            {about.status}
          </dd>
        </dl>

        <p
          className="reveal-fade text-small max-w-prose text-(--tone-secondary) lg:col-span-5 lg:col-start-7"
          style={stagger(1)}
        >
          {about.disclosure}
        </p>
      </div>
    </section>
  );
}