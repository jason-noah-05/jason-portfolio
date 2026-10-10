import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mx-auto w-full max-w-(--page-max) px-(--gutter) pb-8">
      <div className="type-meta flex flex-wrap items-baseline justify-between gap-4 border-t border-dust pt-6 text-ink-muted">
        <p>
          {site.name}, {site.year}
        </p>
        <a href="#main" className="text-link inline-flex min-h-11 items-center">
          Back to top
        </a>
      </div>
    </footer>
  );
}
