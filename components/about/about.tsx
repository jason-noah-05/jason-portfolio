import { Fragment } from "react";
import type { CSSProperties } from "react";
import { SectionMarker } from "@/components/ui/section-marker";
import { about } from "@/lib/data/about";
import { site } from "@/lib/site";

const stagger = (index: number) => ({ "--i": index }) as CSSProperties;

/*
 * Ink surface, following the paper process section. Anchor id "about" is what
 * the navigation's About link targets. Three separate [data-reveal]
 * containers (statement, body, ledger); none is nested inside another.
 *
 * The "Real today / Not yet" ledger is the honesty device: filled marker =
 * real, hollow = not yet.
 */
export function About() {
  const last = about.statement.length - 1;
  const columns = [about.ledger.real, about.ledger.notYet];

  return (
    <section id="about" aria-labelledby="about-title" data-surface="ink" className="bg-ink text-paper">
      <div className="mx-auto w-full max-w-(--page-max) px-(--gutter) py-(--section-space)">
        <SectionMarker label={about.label} id="about-title" meta={String(site.year)} />

        <div data-reveal="group" className="mt-16 grid md:mt-24 lg:grid-cols-12">
          <p className="type-editorial lg:col-span-10">
            {about.statement.map((line, index) => (
              <Fragment key={line}>
                <span className="line">
                  <span className={index === last ? "reveal-line italic" : "reveal-line"} style={stagger(index)}>
                    {line}
                  </span>
                </span>{" "}
              </Fragment>
            ))}
          </p>
        </div>

        <div data-reveal="group" className="relative mt-20 grid gap-x-6 gap-y-10 pt-8 md:mt-28 lg:grid-cols-12">
          <span className="reveal-rule absolute inset-x-0 top-0 h-px bg-(--rule-color)" aria-hidden="true" />

          <dl className="reveal-fade type-meta grid grid-cols-[auto_1fr] content-start gap-x-6 gap-y-2 text-(--tone-secondary) lg:col-span-4">
            <dt>Role</dt>
            <dd className="text-paper">{site.role}</dd>
            <dt>Based</dt>
            <dd className="text-paper">{site.location}</dd>
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

        <div data-reveal="group" className="relative mt-20 grid gap-x-6 gap-y-12 pt-8 md:mt-28 lg:grid-cols-12">
          <span className="reveal-rule absolute inset-x-0 top-0 h-px bg-(--rule-color)" aria-hidden="true" />

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
                    <li key={item.text} className="flex gap-4 border-t border-(--rule-color) py-4 text-small">
                      <span aria-hidden="true" className={real ? "text-signal" : "text-(--tone-secondary)"}>
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
      </div>
    </section>
  );
}
