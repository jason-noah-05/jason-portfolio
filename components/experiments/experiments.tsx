import type { CSSProperties } from "react";
import { SectionMarker } from "@/components/ui/section-marker";
import { experiments } from "@/lib/data/experiments";
import { site } from "@/lib/site";
import { ExperimentRow } from "./experiment-row";

const stagger = (index: number) => ({ "--i": index }) as CSSProperties;

/*
 * Section 03. Anchor id "work" is what the navigation's Work link targets.
 * No top padding: the Signal above supplies the space before the marker.
 */
export function Experiments() {
  return (
    <section
      id="work"
      aria-labelledby="experiments-title"
      className="mx-auto w-full max-w-(--page-max) px-(--gutter) pb-(--section-space)"
    >
      <SectionMarker index="03" label="Experiments" id="experiments-title" meta={String(site.year)} />

      <div className="mt-16 grid gap-8 md:mt-24 lg:grid-cols-12">
        <div data-reveal="group" className="lg:col-span-6 lg:col-start-7">
          <p className="reveal-fade text-lead">
            Things I&apos;m building to explore the intersection of AI, code and digital design.
          </p>
          <p className="reveal-fade text-small mt-6 max-w-prose text-ink-muted" style={stagger(1)}>
            Every entry below is a placeholder. They describe questions I want to explore, not finished
            work. Each one is replaced by a real experiment, with its real outcome, when it ships.
          </p>
        </div>
      </div>

      <ul className="mt-20 border-b border-dust md:mt-28">
        {experiments.map((experiment) => (
          <ExperimentRow key={experiment.id} experiment={experiment} />
        ))}
      </ul>
    </section>
  );
}