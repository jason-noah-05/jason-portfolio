type SectionMarkerProps = {
  /** Two-digit section index, e.g. "02". Decorative, hidden from assistive tech. */
  index: string;
  label: string;
  /** Id for the heading, so the parent section can use aria-labelledby. */
  id: string;
  /** Optional right-aligned metadata, e.g. a year. */
  meta?: string;
};

/*
 * Opens every section the same way: a hairline draws across, then the index and
 * label appear. Colours come from --rule-color and --tone-secondary, which
 * switch automatically on [data-surface="ink"].
 */
export function SectionMarker({ index, label, id, meta }: SectionMarkerProps) {
  return (
    <header data-reveal="group">
      <span className="reveal-rule block h-px bg-(--rule-color)" aria-hidden="true" />
      <div className="reveal-fade type-meta flex items-baseline justify-between gap-4 pt-4 text-(--tone-secondary)">
        <div className="flex items-baseline gap-4">
          <span aria-hidden="true">{index}</span>
          <h2 id={id}>{label}</h2>
        </div>
        {meta ? <span>{meta}</span> : null}
      </div>
    </header>
  );
}