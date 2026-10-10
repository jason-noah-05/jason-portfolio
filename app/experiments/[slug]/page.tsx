import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ExperimentDemo } from "@/components/experiments/experiment-demo";
import { RevealObserver } from "@/components/ui/reveal-observer";
import { experiments, getExperiment, relatedExperiments } from "@/lib/data/experiments";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

const at = (seconds: number) => ({ "--enter-delay": `${seconds}s` }) as CSSProperties;
const stagger = (index: number) => ({ "--i": index }) as CSSProperties;

/* Only the four known experiments exist; anything else is a 404. */
export const dynamicParams = false;

export function generateStaticParams() {
  return experiments.map((experiment) => ({ slug: experiment.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const experiment = getExperiment(slug);
  if (!experiment) return {};

  return {
    title: experiment.title,
    description: experiment.summary,
    ...(site.url ? { alternates: { canonical: `/experiments/${experiment.slug}` } } : {}),
    openGraph: {
      type: "article",
      siteName: site.name,
      title: `${experiment.title} — ${site.name}`,
      description: experiment.summary,
      locale: "en_IN",
    },
    twitter: { card: "summary", title: `${experiment.title} — ${site.name}`, description: experiment.summary },
  };
}

/*
 * One experiment, its own URL. Order matters: a short title and one line, then
 * the thing itself on the ink band, then the explanation for anyone who wants
 * it. The header uses the page-load entrance (CSS); the explanation blocks
 * use scroll reveals. No [data-reveal] container is nested in another.
 */
export default async function ExperimentPage({ params }: Props) {
  const { slug } = await params;
  const experiment = getExperiment(slug);
  if (!experiment) notFound();

  const related = relatedExperiments(experiment.slug);
  const pinned = experiment.slug === "rough-to-refined";

  return (
    <main id="main" tabIndex={-1} className="focus:outline-none">
      <header className="mx-auto w-full max-w-(--page-max) px-(--gutter) pb-16 pt-[calc(var(--nav-height)+var(--gutter)*2)] md:pb-24">
        <p className="enter" style={at(0.1)}>
          <Link href="/#work" className="text-link type-meta inline-flex min-h-11 items-center gap-3 text-ink-muted">
            <span aria-hidden="true">←</span>
            All experiments
          </Link>
        </p>

        <div className="mt-10 grid gap-x-6 gap-y-10 md:mt-16 lg:grid-cols-12">
          <h1 className="type-editorial lg:col-span-7">
            <span className="line">
              <span className="line__inner" style={at(0.2)}>
                {experiment.title}
              </span>
            </span>
          </h1>

          <div className="enter flex flex-col gap-8 lg:col-span-4 lg:col-start-9" style={at(0.35)}>
            <p className="text-lead">{experiment.intro}</p>
            <dl className="type-meta grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-ink-muted">
              <dt>Made with</dt>
              <dd className="text-ink">{experiment.tech.join(", ")}</dd>
              <dt>Status</dt>
              <dd className="text-ink">{experiment.status}</dd>
            </dl>
          </div>
        </div>
      </header>

      <section aria-label="Demonstration" data-surface="ink" className="bg-ink text-paper">
        <div
          className={`mx-auto w-full max-w-(--page-max) px-(--gutter) ${
            pinned ? "pb-8 pt-8 md:pb-16" : "py-16 md:py-24"
          }`}
        >
          <ExperimentDemo slug={experiment.slug} />
        </div>
      </section>

      <section className="mx-auto w-full max-w-(--page-max) px-(--gutter) pt-(--section-space)">
        <div data-reveal="group" className="relative grid gap-x-6 gap-y-6 pt-8 lg:grid-cols-12">
          <span className="reveal-rule absolute inset-x-0 top-0 h-px bg-(--rule-color)" aria-hidden="true" />
          <h2 className="reveal-fade type-meta text-(--tone-secondary) lg:col-span-3">Why I made it</h2>
          <p className="reveal-fade text-lead max-w-2xl lg:col-span-6 lg:col-start-5" style={stagger(1)}>
            {experiment.idea}
          </p>
        </div>

        <div data-reveal="group" className="relative mt-20 grid gap-x-6 gap-y-6 pt-8 md:mt-28 lg:grid-cols-12">
          <span className="reveal-rule absolute inset-x-0 top-0 h-px bg-(--rule-color)" aria-hidden="true" />
          <h2 className="reveal-fade type-meta text-(--tone-secondary) lg:col-span-3">How it works</h2>
          <ul className="reveal-fade lg:col-span-6 lg:col-start-5" style={stagger(1)}>
            {experiment.how.map((line) => (
              <li key={line} className="text-small max-w-prose border-t border-dust py-4 first:border-t-0 first:pt-0">
                {line}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {related.length > 0 ? (
        <section aria-labelledby="more-title" className="mx-auto w-full max-w-(--page-max) px-(--gutter) py-(--section-space)">
          <div data-reveal="group" className="relative grid gap-x-6 gap-y-10 pt-8 lg:grid-cols-12">
            <span className="reveal-rule absolute inset-x-0 top-0 h-px bg-(--rule-color)" aria-hidden="true" />
            <h2 id="more-title" className="reveal-fade type-meta text-(--tone-secondary) lg:col-span-3">
              More experiments
            </h2>
            <ul className="grid gap-10 md:grid-cols-2 lg:col-span-9 lg:col-start-4">
              {related.map((item, index) => (
                <li key={item.slug} className="reveal-fade group/related relative" style={stagger(index + 1)}>
                  <p className="project-title">
                    <Link href={`/experiments/${item.slug}`} className="after:absolute after:inset-0">
                      {item.title}
                    </Link>
                  </p>
                  <p className="text-small mt-3 max-w-prose text-(--tone-secondary)">{item.summary}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <RevealObserver />
    </main>
  );
}
