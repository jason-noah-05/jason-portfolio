import type { CSSProperties } from "react";
import { SectionMarker } from "@/components/ui/section-marker";
import { howIWork, stages } from "@/lib/data/process";
import { site } from "@/lib/site";

const stagger = (index: number) => ({ "--i": index }) as CSSProperties;

/* Vertical centre of the first line of meta text in a row: pt-8 (2rem) + half a 0.75rem / 1.4 line,
   minus half the 0.5rem node. The node and the rail both start here. */
const RAIL_TOP = "top-[2.275rem]";
/* Centres a 1px rail on the 0.5rem node. */
const RAIL_LEFT = "left-[calc(0.25rem-0.5px)]";

/*
 * Section 06. A vertical rail runs through the five stages. Each row is one
 * [data-reveal] container; the rail segment and node animate from the
 * container's data-state (hidden below the fold, shown on entry) through
 * Tailwind group-data variants, so no extra observer or scroll listener is
 * needed. Transform only. Visible by default, and with reduced motion the
 * global rule collapses the transitions.
 */
export function HowIWork() {
  const last = stages.length - 1;

  return (
    <section id="process" aria-labelledby="process-title" data-surface="ink" className="bg-ink text-paper">
      <div className="mx-auto w-full max-w-(--page-max) px-(--gutter) py-(--section-space)">
        <SectionMarker index="06" label={howIWork.label} id="process-title" meta={String(site.year)} />

        <div className="mt-16 grid md:mt-24 lg:grid-cols-12">
          <p data-reveal="group" className="text-lead lg:col-span-6 lg:col-start-7">
            <span className="reveal-fade block">{howIWork.statement}</span>
          </p>
        </div>

        <ol className="mt-20 md:mt-28">
          {stages.map((stage, index) => (
            <li
              key={stage.name}
              data-reveal="group"
              className="group/stage relative pb-12 pl-8 pt-8 md:pb-20 md:pl-14"
            >
              {index !== last ? (
                <>
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-0 w-px bg-(--rule-color) ${RAIL_TOP} ${RAIL_LEFT}`}
                  />
                  <span
                    aria-hidden="true"
                    className={`absolute bottom-0 w-px origin-top bg-dust transition-transform delay-150 duration-(--duration-reveal) ease-(--ease-in-out-quart) group-data-[state=hidden]/stage:scale-y-0 ${RAIL_TOP} ${RAIL_LEFT}`}
                  />
                </>
              ) : null}
              <span
                aria-hidden="true"
                className={`absolute left-0 size-2 bg-signal transition-transform duration-(--duration-slow) ease-(--ease-out-quint) group-data-[state=hidden]/stage:scale-0 ${RAIL_TOP}`}
              />

              <div className="grid gap-x-6 gap-y-6 lg:grid-cols-12">
                <p className="reveal-fade type-meta text-(--tone-secondary) lg:col-span-1" aria-hidden="true">
                  {stage.index}
                </p>

                <div className="lg:col-span-7">
                  <h3 className="type-editorial">
                    <span className="line">
                      <span className="reveal-line" style={stagger(1)}>
                        {stage.name}
                      </span>
                    </span>
                  </h3>
                  <p className="reveal-fade text-lead mt-6 max-w-xl" style={stagger(2)}>
                    {stage.question}
                  </p>
                </div>

                <p
                  className="reveal-fade text-small max-w-prose text-(--tone-secondary) lg:col-span-4"
                  style={stagger(3)}
                >
                  {stage.description}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <div data-reveal="group" className="relative mt-8 grid gap-8 pt-8 lg:grid-cols-12">
          <span
            className="reveal-rule absolute inset-x-0 top-0 h-px bg-(--rule-color)"
            aria-hidden="true"
          />

          <dl className="reveal-fade type-meta text-(--tone-secondary) lg:col-span-4">
            <dt>Note</dt>
            <dd className="mt-2 text-paper">
              <span aria-hidden="true" className="text-signal">
                ●
              </span>{" "}
              {howIWork.status}
            </dd>
          </dl>

          <p
            className="reveal-fade text-small max-w-prose text-(--tone-secondary) lg:col-span-5 lg:col-start-7"
            style={stagger(1)}
          >
            {howIWork.disclosure}
          </p>
        </div>
      </div>
    </section>
  );
}