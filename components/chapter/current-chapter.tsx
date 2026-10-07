import type { CSSProperties } from "react";
import { SectionMarker } from "@/components/ui/section-marker";
import { chapter } from "@/lib/data/chapter";
import { site } from "@/lib/site";

const stagger = (index: number, delay = 0) =>
  ({ "--i": index, "--reveal-delay": `${delay}s` }) as CSSProperties;

export function CurrentChapter() {
  return (
    <section
      id="current-chapter"
      aria-labelledby="chapter-title"
      data-surface="ink"
      className="bg-ink text-paper"
    >
      <div className="mx-auto w-full max-w-(--page-max) px-(--gutter) py-(--section-space)">
        <SectionMarker index="02" label={chapter.label} id="chapter-title" meta={String(site.year)} />

        <div className="mt-16 grid md:mt-24 lg:grid-cols-12">
          <p data-reveal="group" className="text-lead lg:col-span-6 lg:col-start-7">
            <span className="reveal-fade block">{chapter.statement}</span>
          </p>
        </div>

        <ul className="mt-20 md:mt-28">
          {chapter.items.map((item, index) => (
            <li key={item.word} data-reveal="group" className="relative pb-8 pt-6 md:pb-10 md:pt-8">
              <span
                className="reveal-rule absolute inset-x-0 top-0 h-px bg-(--rule-color)"
                aria-hidden="true"
              />

              <div className="grid grid-cols-[auto_1fr] items-baseline">
                <span
                  className="reveal-fade type-meta col-start-1 row-start-1 text-(--tone-secondary)"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>

                <span className="line type-chapter col-span-2 row-start-2 mt-4">
                  <span className="reveal-line" style={stagger(index, 0.1)}>
                    {item.word}
                  </span>
                </span>

                <span className="reveal-fade text-small col-span-2 row-start-3 mt-3 text-(--tone-secondary) md:col-span-1 md:col-start-2 md:row-start-1 md:mt-0 md:max-w-xs md:justify-self-end md:text-right">
                  {item.note}
                </span>
              </div>
            </li>
          ))}
        </ul>

        <div data-reveal="group" className="relative grid gap-8 pt-8 lg:grid-cols-12">
          <span
            className="reveal-rule absolute inset-x-0 top-0 h-px bg-(--rule-color)"
            aria-hidden="true"
          />

          <dl className="reveal-fade type-meta text-(--tone-secondary) lg:col-span-4">
            <dt>Status</dt>
            <dd className="mt-2 text-paper">
              <span aria-hidden="true" className="text-signal">
                ●
              </span>{" "}
              {chapter.status}
            </dd>
          </dl>

          <p
            className="reveal-fade text-small max-w-prose text-(--tone-secondary) lg:col-span-5 lg:col-start-7"
            style={stagger(1)}
          >
            {chapter.disclosure}
          </p>
        </div>
      </div>
    </section>
  );
}