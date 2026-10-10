import { Fragment } from "react";
import type { CSSProperties } from "react";
import { SectionMarker } from "@/components/ui/section-marker";
import { materialsSection } from "@/lib/data/materials";
import { site } from "@/lib/site";
import { MaterialPicker } from "./material-picker";

const stagger = (index: number) => ({ "--i": index }) as CSSProperties;

/*
 * Ink surface, following the paper Work section. The statement is the only
 * line-reveal here; the picker below is interactive and has its own small
 * transition when the choice changes.
 */
export function Materials() {
  const last = materialsSection.lines.length - 1;

  return (
    <section id="materials" aria-labelledby="materials-title" data-surface="ink" className="bg-ink text-paper">
      <div className="mx-auto w-full max-w-(--page-max) px-(--gutter) py-(--section-space)">
        <SectionMarker label={materialsSection.label} id="materials-title" meta={String(site.year)} />

        <div data-reveal="group" className="mt-16 grid gap-8 md:mt-24 lg:grid-cols-12">
          <p className="type-editorial lg:col-span-8">
            {materialsSection.lines.map((line, index) => (
              <Fragment key={line}>
                <span className="line">
                  <span className={index === last ? "reveal-line italic" : "reveal-line"} style={stagger(index)}>
                    {line}
                  </span>
                </span>{" "}
              </Fragment>
            ))}
          </p>
          <p className="reveal-fade text-small max-w-prose text-(--tone-secondary) lg:col-span-3 lg:col-start-10" style={stagger(2)}>
            {materialsSection.note}
          </p>
        </div>

        <div className="mt-20 md:mt-28">
          <MaterialPicker />
        </div>
      </div>
    </section>
  );
}
