import type { CSSProperties, ReactNode } from "react";
import { site } from "@/lib/site";

/*
 * Entrance choreography (seconds), matching the brief:
 * meta .10 · name .20 · role .35 · statement .50 / .65 · instruction .80
 * Pure CSS: transform + opacity only, works with JavaScript disabled.
 */
const at = (seconds: number) => ({ "--enter-delay": `${seconds}s` }) as CSSProperties;

function Line({ delay, children }: { delay: number; children: ReactNode }) {
  return (
    <span className="line">
      <span className="line__inner" style={at(delay)}>
        {children}
      </span>
    </span>
  );
}

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="mx-auto flex min-h-svh w-full max-w-(--page-max) flex-col justify-between gap-16 px-(--gutter) pb-(--gutter) pt-[calc(var(--nav-height)+var(--gutter))]"
    >
      <div className="enter flex flex-col justify-between gap-2 type-meta text-ink-muted sm:flex-row" style={at(0.1)}>
        <p>{site.role}</p>
        <p>
          {site.location} · {site.year}
        </p>
      </div>

      <div className="flex flex-col gap-10 md:gap-14">
        <h1 id="hero-title" className="type-display uppercase">
          <Line delay={0.2}>
            <span className="block md:inline">Jason</span> <span className="block md:inline">Noah</span>
          </Line>
        </h1>

        <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
          <p className="text-lead uppercase tracking-wide lg:col-span-4">
            <Line delay={0.35}>
              <span aria-hidden="true" className="text-signal">
                ●
              </span>{" "}
              AI Engineer
            </Line>
          </p>

          <p className="type-editorial lg:col-span-7 lg:col-start-6">
            <Line delay={0.5}>Building digital</Line>
            <Line delay={0.65}>
              <span className="italic">experiences.</span>
            </Line>
          </p>
        </div>
      </div>

      <a
        href="#current-chapter"
        className="enter type-meta inline-flex min-h-11 w-fit items-center gap-3 text-ink-muted"
        style={at(0.8)}
      >
        Scroll to investigate <span aria-hidden="true">↓</span>
      </a>
    </section>
  );
}