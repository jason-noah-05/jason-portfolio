import { Fragment } from "react";
import type { CSSProperties } from "react";
import { AutomationFlow } from "@/components/lab/automation-flow";
import { FieldSketch } from "@/components/lab/field-sketch";
import { GenerativeUi } from "@/components/lab/generative-ui";
import { ImageToInterface } from "@/components/lab/image-to-interface";
import { LabStudy } from "@/components/lab/lab-study";
import { SectionMarker } from "@/components/ui/section-marker";
import { lab, studies } from "@/lib/data/lab";
import type { LabStudyId } from "@/lib/data/lab";
import { site } from "@/lib/site";

const stagger = (index: number) => ({ "--i": index }) as CSSProperties;

function Demo({ id }: { id: LabStudyId }) {
  switch (id) {
    case "generative-ui":
      return <GenerativeUi />;
    case "automation":
      return <AutomationFlow />;
    case "image-to-interface":
      return <ImageToInterface />;
    case "creative-coding":
      return <FieldSketch />;
  }
}

export function AiLab() {
  const last = lab.intro.length - 1;

  return (
    <section id="lab" aria-labelledby="lab-title" data-surface="ink" className="bg-ink text-paper">
      <div className="mx-auto w-full max-w-(--page-max) px-(--gutter) py-(--section-space)">
        <SectionMarker index="04" label={lab.label} id="lab-title" meta={String(site.year)} />

        <div data-reveal="group" className="mt-16 grid md:mt-24 lg:grid-cols-12">
          <p className="type-editorial lg:col-span-10 lg:col-start-3">
            {lab.intro.map((line, index) => (
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

        <ol className="mt-20 md:mt-28">
          {studies.map((study) => (
            <LabStudy key={study.id} study={study}>
              <Demo id={study.id} />
            </LabStudy>
          ))}
        </ol>

        <div data-reveal="group" className="relative grid gap-8 pt-8 lg:grid-cols-12">
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
              {lab.status}
            </dd>
          </dl>

          <p
            className="reveal-fade text-small max-w-prose text-(--tone-secondary) lg:col-span-5 lg:col-start-7"
            style={stagger(1)}
          >
            {lab.disclosure}
          </p>
        </div>
      </div>
    </section>
  );
}