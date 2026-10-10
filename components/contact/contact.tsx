import { Fragment } from "react";
import type { CSSProperties } from "react";
import { SectionMarker } from "@/components/ui/section-marker";
import { contact } from "@/lib/data/contact";
import { site } from "@/lib/site";
import { ContactForm } from "./contact-form";

const stagger = (index: number) => ({ "--i": index }) as CSSProperties;

type ContactLink = { readonly label: string; readonly href: string; readonly external: boolean };

/* Only links that have been configured are shown. Nothing is invented. */
function contactLinks(): ContactLink[] {
  const links: ContactLink[] = [];
  if (site.contact.email) links.push({ label: "Email", href: `mailto:${site.contact.email}`, external: false });
  if (site.contact.github) links.push({ label: "GitHub", href: site.contact.github, external: true });
  if (site.contact.linkedin) links.push({ label: "LinkedIn", href: site.contact.linkedin, external: true });
  return links;
}

/*
 * Paper surface, following the ink About section. Anchor id "contact" is what
 * the navigation's Contact link targets. The form is a single client island;
 * everything around it renders on the server.
 */
export function Contact() {
  const last = contact.statement.length - 1;
  const links = contactLinks();

  return (
    <section
      id="contact"
      aria-labelledby="contact-title"
      className="mx-auto w-full max-w-(--page-max) px-(--gutter) py-(--section-space)"
    >
      <SectionMarker label={contact.label} id="contact-title" meta={String(site.year)} />

      <div data-reveal="group" className="mt-16 grid gap-10 md:mt-24 lg:grid-cols-12">
        <p className="type-editorial lg:col-span-8">
          {contact.statement.map((line, index) => (
            <Fragment key={line}>
              <span className="line">
                <span className={index === last ? "reveal-line italic" : "reveal-line"} style={stagger(index)}>
                  {line}
                </span>
              </span>{" "}
            </Fragment>
          ))}
        </p>

        <div className="flex flex-col gap-6 lg:col-span-3 lg:col-start-10">
          <p className="reveal-fade text-lead" style={stagger(2)}>
            {contact.lead}
          </p>
          {links.length > 0 ? (
            <ul className="reveal-fade type-meta" style={stagger(3)}>
              {links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-link inline-flex min-h-11 items-center"
                    {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>

      <div className="mt-16 md:mt-24">
        <ContactForm />
      </div>
    </section>
  );
}
