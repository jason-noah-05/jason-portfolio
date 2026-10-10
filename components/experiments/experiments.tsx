import Link from "next/link";
import type { CSSProperties } from "react";
import { SectionMarker } from "@/components/ui/section-marker";
import { experiments, work } from "@/lib/data/experiments";
import { site } from "@/lib/site";
import { ProjectPreview } from "./project-preview";

const stagger = (index: number) => ({ "--i": index }) as CSSProperties;

/*
 * Work index. Anchor id "work" is what the navigation's Work link targets. No
 * top padding: the Signal above supplies the space before the marker.
 *
 * Each project is its own [data-reveal] container (never nested): the picture
 * wipes in, then the text fades. Even-numbered projects sit offset to the
 * right and lower, so the grid reads as a composition and not a table.
 * Each title is the link; its ::after stretches the link over the whole item.
 */
export function Experiments() {
  return (
    <section
      id="work"
      aria-labelledby="experiments-title"
      className="mx-auto w-full max-w-(--page-max) px-(--gutter) pb-(--section-space)"
    >
      <SectionMarker label={work.label} id="experiments-title" meta={String(site.year)} />

      <div data-reveal="group" className="mt-16 grid gap-8 md:mt-24 lg:grid-cols-12">
        <p className="reveal-fade text-lead lg:col-span-6 lg:col-start-7">{work.intro}</p>
      </div>

      <ul className="mt-20 grid gap-x-6 gap-y-16 md:mt-28 lg:grid-cols-12">
        {experiments.map((experiment, index) => (
          <li
            key={experiment.slug}
            data-reveal="group"
            className={`group/project relative ${
              index % 2 === 0 ? "lg:col-span-6" : "lg:col-span-5 lg:col-start-8 lg:mt-24"
            }`}
          >
            <div className="reveal-clip">
              <ProjectPreview slug={experiment.slug} />
            </div>

            <div className="reveal-fade mt-6 flex items-start justify-between gap-6" style={stagger(1)}>
              <div>
                <h3 className="project-title">
                  <Link
                    href={`/experiments/${experiment.slug}`}
                    className="after:absolute after:inset-0"
                    data-cursor-label="Open"
                  >
                    {experiment.title}
                  </Link>
                </h3>
                <p className="text-small mt-3 max-w-prose text-(--tone-secondary)">{experiment.summary}</p>
              </div>

              <p className="type-meta shrink-0 text-(--tone-secondary)">
                {experiment.kind}
                <span aria-hidden="true" className="mt-2 flex items-center gap-2 text-ink">
                  Open
                  <span className="transition-transform duration-(--duration-base) ease-(--ease-out-quint) group-hover/project:translate-x-1">
                    ↗
                  </span>
                </span>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
