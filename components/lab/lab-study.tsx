import { Fragment } from "react";
import type { CSSProperties, ReactNode } from "react";
import type { LabStudyEntry } from "@/lib/data/lab";

const stagger = (index: number) => ({ "--i": index }) as CSSProperties;

/*
 * One study: identity and title on the left, the question set large in serif
 * on the right, then the description beside the interactive. A single
 * [data-reveal] container per study; nothing inside it is a reveal container.
 */
export function LabStudy({ study, children }: { study: LabStudyEntry; children: ReactNode }) {
  const last = study.question.length - 1;

  return (
    <li data-reveal="group" className="relative pb-20 pt-8 md:pb-28">
      <span
        className="reveal-rule absolute inset-x-0 top-0 h-px bg-(--rule-color)"
        aria-hidden="true"
      />

      <div className="grid gap-x-6 gap-y-8 lg:grid-cols-12">
        <div className="reveal-fade flex flex-col gap-4 lg:col-span-4" style={stagger(1)}>
          <p className="type-meta flex items-center gap-3 text-(--tone-secondary)">
            <span aria-hidden="true">{study.index}</span>
            <span aria-hidden="true" className="text-signal">
              ●
            </span>
            <span>
              {study.status} · {study.year}
            </span>
          </p>
          <h3 className="text-lead uppercase tracking-wide">{study.title}</h3>
        </div>

        <p className="type-editorial lg:col-span-8">
          {study.question.map((line, index) => (
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

        <div className="reveal-fade lg:col-span-4" style={stagger(3)}>
          <p className="max-w-prose text-(--tone-secondary)">{study.description}</p>
          <dl className="type-meta mt-8 text-(--tone-secondary)">
            <dt>Built with</dt>
            <dd className="mt-2 text-paper">{study.tech.join(" / ")}</dd>
          </dl>
        </div>

        <div className="reveal-fade lg:col-span-8" style={stagger(4)}>
          {children}
        </div>
      </div>
    </li>
  );
}