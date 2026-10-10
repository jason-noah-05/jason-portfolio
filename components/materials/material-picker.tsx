"use client";

import { useId, useState } from "react";
import { materials, materialsSection } from "@/lib/data/materials";
import type { MaterialId } from "@/lib/data/materials";

/*
 * Pick a tool, read why. A native radio group, so arrow keys, touch and screen
 * readers all work without extra code. Every name and its purpose are visible
 * without choosing anything; choosing only adds the reason and what is true of
 * this site's code. Written for the ink surface.
 */
export function MaterialPicker() {
  const [selected, setSelected] = useState<MaterialId>("python");
  const group = useId();
  const active = materials.find((material) => material.id === selected) ?? materials[0];
  if (!active) return null;

  return (
    <div className="grid gap-x-6 gap-y-12 lg:grid-cols-12">
      <fieldset className="lg:col-span-7">
        <legend className="type-meta mb-6 text-(--tone-secondary)">{materialsSection.legend}</legend>
        <ul className="border-b border-(--rule-color)">
          {materials.map((material) => {
            const checked = material.id === active.id;

            return (
              <li key={material.id}>
                <label className="group/option relative flex cursor-pointer items-baseline gap-4 border-t border-(--rule-color) py-3 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-paper">
                  <input
                    type="radio"
                    name={group}
                    value={material.id}
                    checked={checked}
                    onChange={() => setSelected(material.id)}
                    className="sr-only"
                  />
                  <span
                    aria-hidden="true"
                    className={`w-4 shrink-0 text-signal transition-opacity duration-(--duration-fast) ${
                      checked ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    ●
                  </span>
                  <span
                    className={`type-editorial transition-colors duration-(--duration-fast) ${
                      checked ? "text-paper" : "text-(--tone-secondary) group-hover/option:text-paper"
                    }`}
                  >
                    {material.name}
                  </span>
                  <span className="type-meta ml-auto hidden text-(--tone-secondary) md:inline">{material.purpose}</span>
                </label>
              </li>
            );
          })}
        </ul>
      </fieldset>

      <div className="lg:col-span-4 lg:col-start-9" aria-live="polite">
        <div key={active.id} className="swap-in">
          <p className="type-meta text-(--tone-secondary) md:hidden">{active.purpose}</p>
          <p className="text-lead mt-3 md:mt-0">{active.reason}</p>
          <dl className="mt-10 border-t border-(--rule-color) pt-4">
            <dt className="type-meta text-(--tone-secondary)">{materialsSection.siteLabel}</dt>
            <dd className="text-small mt-2">{active.onSite}</dd>
          </dl>
        </div>
      </div>
    </div>
  );
}
