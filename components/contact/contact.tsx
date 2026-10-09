import { Fragment } from "react";
import type { CSSProperties } from "react";
import { SectionMarker } from "@/components/ui/section-marker";
import { contact } from "@/lib/data/contact";
import { site } from "@/lib/site";
import { ContactForm } from "./contact-form";

const stagger = (index: number) => ({ "--i": index }) as CSSProperties;

/*
 * Section 08. Ink surface, following the paper About section. Anchor id
 * "contact" is what the navigation's Contact link targets. The form is a
 * single client island; everything around it renders on the server.
 */
export function Contact() {
  const last = contact.statement.length - 1;

  return (
    <section id="contact" aria-labelledby="contact-title" data-surface="ink" className="bg-ink text-paper">
      <div className="mx-auto w-full max-w-(--page-max) px-(--gutter) py-(--section-space)">
        <SectionMarker index="08" label={contact.label} id="contact-title" meta={String(site.year)} />

        <div data-reveal="group" className="mt-16 grid gap-10 md:mt-24 lg:grid-cols-12">
          <p className="type-editorial lg:col-span-8">
            {contact.statement.map((line, index) => (
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

          <p className="reveal-fade text-lead lg:col-span-4 lg:col-start-9" style={stagger(2)}>
            {contact.lead}
          </p>
        </div>

        <div className="mt-20 md:mt-28">
          <ContactForm />
        </div>

        <div data-reveal="group" className="relative mt-20 grid gap-8 pt-8 lg:grid-cols-12">
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
              {contact.status}
            </dd>
          </dl>

          <p
            className="reveal-fade text-small max-w-prose text-(--tone-secondary) lg:col-span-5 lg:col-start-7"
            style={stagger(1)}
          >
            {contact.disclosure}
          </p>
        </div>
      </div>
    </section>
  );
}   