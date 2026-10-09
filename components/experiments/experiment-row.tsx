"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import { statusLabels } from "@/lib/data/experiments";
import type { Experiment } from "@/lib/data/experiments";

/*
 * One experiment. Closed: the title. Open: the title gives way to the parts it
 * is made of ("deconstruction"), each part rising in a beat after the last.
 * Opens on hover (hover-capable devices only, Tailwind wraps hover in a media
 * query) and via the Deconstruct button, which is the route for touch and
 * keyboard. Both states occupy the same grid cell, so nothing shifts when the
 * row changes.
 *
 * The list only toggles visibility; each layer owns its own opacity and
 * transform so the stagger delay applies on the way in and not on the way out.
 *
 * The reveal-fade class from globals.css sits on the wrapper only: it owns an
 * opacity transition, so it must not share an element with the title or layers.
 */

const MOTION =
  "transition-[opacity,transform,visibility] duration-(--duration-base) ease-(--ease-out-quint)";

const TITLE_OPEN =
  "group-data-[open=true]/row:-translate-y-3 group-data-[open=true]/row:opacity-0 group-hover/row:-translate-y-3 group-hover/row:opacity-0";

const LAYERS =
  "type-editorial invisible col-start-1 row-start-1 flex flex-wrap content-start gap-x-4 uppercase transition-[visibility] duration-(--duration-base)";

const LAYERS_OPEN = "group-data-[open=true]/row:visible group-hover/row:visible";

const LAYER =
  "translate-y-3 opacity-0 transition-[opacity,transform] duration-(--duration-base) ease-(--ease-out-quint) after:ml-4 after:text-signal-text after:content-['+'] last:after:content-none";

const LAYER_OPEN =
  "group-data-[open=true]/row:translate-y-0 group-data-[open=true]/row:opacity-100 group-data-[open=true]/row:delay-[calc(var(--i)_*_60ms_+_80ms)] group-hover/row:translate-y-0 group-hover/row:opacity-100 group-hover/row:delay-[calc(var(--i)_*_60ms_+_80ms)]";

export function ExperimentRow({ experiment }: { experiment: Experiment }) {
  const [open, setOpen] = useState(false);
  const layersId = `experiment-${experiment.id}-layers`;
  const hollow = experiment.status === "placeholder";

  return (
    <li data-reveal="group" data-open={open} className="group/row relative">
      <span
        className="reveal-rule absolute inset-x-0 top-0 h-px bg-(--rule-color)"
        aria-hidden="true"
      />

      <div className="grid gap-x-6 gap-y-8 pb-10 pt-6 md:pb-14 md:pt-8 lg:grid-cols-12">
        <p className="reveal-fade type-meta text-(--tone-secondary) lg:col-span-1">
          <span className="sr-only">Experiment </span>
          {experiment.id}
        </p>

        <div className="reveal-fade lg:col-span-7">
          <div className="grid">
            <h3 className={`type-editorial col-start-1 row-start-1 ${MOTION} ${TITLE_OPEN}`}>
              {experiment.title}
            </h3>

            <ul id={layersId} className={`${LAYERS} ${LAYERS_OPEN}`}>
              {experiment.layers.map((layer, index) => (
                <li
                  key={layer}
                  className={`${LAYER} ${LAYER_OPEN}`}
                  style={{ "--i": index } as CSSProperties}
                >
                  {layer}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="reveal-fade flex flex-col gap-8 lg:col-span-4" style={{ "--i": 1 } as CSSProperties}>
          <p className="text-small max-w-prose text-(--tone-secondary)">{experiment.description}</p>

          <dl className="type-meta grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-(--tone-secondary)">
            <dt>Stack</dt>
            <dd className="text-ink">{experiment.stack.join(" / ")}</dd>
            <dt>Year</dt>
            <dd className="text-ink">{experiment.year}</dd>
            <dt>Status</dt>
            <dd className="text-ink">
              <span aria-hidden="true" className={hollow ? "text-(--tone-secondary)" : "text-signal"}>
                {hollow ? "○" : "●"}
              </span>{" "}
              {statusLabels[experiment.status]}
            </dd>
          </dl>

          <button
            type="button"
            className="type-meta inline-flex min-h-11 w-fit items-center gap-3 text-ink"
            aria-expanded={open}
            aria-controls={layersId}
            data-cursor-label="Deconstruct"
            onClick={() => setOpen((value) => !value)}
          >
            <span>
              Deconstruct<span className="sr-only"> {experiment.title}</span>
            </span>
            <span aria-hidden="true">{open ? "−" : "+"}</span>
          </button>
        </div>
      </div>
    </li>
  );
}