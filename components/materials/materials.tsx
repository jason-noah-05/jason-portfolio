import type { CSSProperties } from "react";
import { SectionMarker } from "@/components/ui/section-marker";
import { materials, materialsSection } from "@/lib/data/materials";
import { site } from "@/lib/site";

const stagger = (index: number) => ({ "--i": index }) as CSSProperties;

/*
 * Section 05. Deliberately a grid, not another list: the sections around it are
 * all rows. Each cell is its own [data-reveal] container (never nested). The
 * section follows the ink AI Lab, so it carries its own top padding.
 */
export function Materials() {
  return (
    <section
      id="materials"
      aria-labelledby="materials-title"
      className="mx-auto w-full max-w-(--page-max) px-(--gutter) py-(--section-space)"
    >
      <SectionMarker index="05" label={materialsSection.label} id="materials-title" meta={String(site.year)} />

      <div className="mt-16 grid gap-8 md:mt-24 lg:grid-cols-12">
        <div data-reveal="group" className="lg:col-span-6 lg:col-start-7">
          <p className="reveal-fade text-lead">{materialsSection.statement}</p>
          <p className="reveal-fade text-small mt-6 max-w-prose text-ink-muted" style={stagger(1)}>
            {materialsSection.disclosure}
          </p>
        </div>
      </div>

      <ul className="mt-20 grid md:mt-28 md:grid-cols-2 md:gap-x-6 lg:grid-cols-3">
        {materials.map((material) => (
          <li key={material.index} data-reveal="group" className="relative pb-14 pt-6 md:pb-20 md:pt-8">
            <span
              className="reveal-rule absolute inset-x-0 top-0 h-px bg-(--rule-color)"
              aria-hidden="true"
            />

            <p className="reveal-fade type-meta text-(--tone-secondary)" aria-hidden="true">
              {material.index}
            </p>

            <h3 className="type-editorial mt-10 md:mt-14">
              <span className="line">
                <span className="reveal-line" style={stagger(1)}>
                  {material.name}
                </span>
              </span>
            </h3>

            <p className="reveal-fade text-lead mt-4" style={stagger(2)}>
              {material.purpose}
            </p>

            <p className="reveal-fade text-small mt-6 max-w-prose text-(--tone-secondary)" style={stagger(3)}>
              {material.reason}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}