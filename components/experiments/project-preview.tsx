import type { ExperimentSlug } from "@/lib/data/experiments";

/*
 * Small static drawings for the work index. Each one is made from the same
 * shapes as its experiment (the real layouts, the real wireframe, the real
 * line field), so they are honest previews rather than invented screenshots.
 * Server-rendered, decorative: the link text carries the meaning.
 */

const OUTLINE = { fill: "none", stroke: "currentColor", vectorEffect: "non-scaling-stroke" } as const;

function GenerativeUi() {
  const cells: readonly (readonly [number, number])[] = [
    [10, 10],
    [59, 10],
    [108, 10],
    [10, 54],
    [59, 54],
    [108, 54],
  ];
  return (
    <>
      {cells.map(([x, y], index) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={42} height={38} fill="currentColor" fillOpacity={index === 2 ? 1 : 0.28} />
      ))}
      {/* The "read" layout, outlined over the grid */}
      <rect
        x="40"
        y="6"
        width="80"
        height="88"
        fill="none"
        className="stroke-signal"
        strokeDasharray="3 2"
        vectorEffect="non-scaling-stroke"
      />
    </>
  );
}

function RoughToRefined() {
  return (
    <>
      <defs>
        <clipPath id="preview-rough-side">
          <rect x="0" y="0" width="80" height="100" />
        </clipPath>
        <clipPath id="preview-refined-side">
          <rect x="80" y="0" width="80" height="100" />
        </clipPath>
      </defs>

      {/* Left half: the sketch, slightly crooked and dashed */}
      <g clipPath="url(#preview-rough-side)">
        <g transform="rotate(-2 80 50)" strokeDasharray="2.4 1.6" strokeLinecap="round">
          <path d="M9 7 L152 6 L151 14.5 L9 14 Z" {...OUTLINE} />
          <path d="M9 21 L72 19.5 L71.5 70.5 L8 69.5 Z M9 21 L71.5 70.5 M72 19.5 L8 69.5" {...OUTLINE} />
          <path d="M80 24 C86 19 90 29 96 22 S110 27 118 23 S134 26 142 22" {...OUTLINE} />
          <path d="M80 36 C95 34 110 38 126 35 M80 42 C94 40 112 44 128 41" {...OUTLINE} />
          <path d="M80 58 L112 57 L113 70 L80.5 70.5 Z" {...OUTLINE} />
        </g>
      </g>

      {/* Right half: the same layout, set and aligned */}
      <g clipPath="url(#preview-refined-side)">
        <rect x="8" y="6" width="144" height="8" fill="currentColor" fillOpacity={0.9} />
        <rect x="8" y="20" width="64" height="50" fill="currentColor" fillOpacity={0.3} />
        <rect x="80" y="20" width="60" height="8" fill="currentColor" />
        <rect x="80" y="34" width="72" height="3" fill="currentColor" fillOpacity={0.5} />
        <rect x="80" y="40" width="72" height="3" fill="currentColor" fillOpacity={0.5} />
        <rect x="80" y="46" width="50" height="3" fill="currentColor" fillOpacity={0.5} />
        <rect x="80" y="58" width="32" height="12" className="fill-signal" />
      </g>

      <path d="M80 4 V96" {...OUTLINE} strokeOpacity={0.4} />
    </>
  );
}

const REGIONS: readonly (readonly [number, number, number, number])[] = [
  [8, 6, 144, 8],
  [8, 20, 64, 50],
  [80, 20, 72, 8],
  [80, 34, 72, 16],
  [80, 58, 32, 12],
  [8, 80, 144, 8],
];

function ImageToInterface() {
  return (
    <>
      {REGIONS.map(([x, y, w, h]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width={w} height={h} {...OUTLINE} strokeOpacity={0.6} />
      ))}
      <path d="M8 20 L72 70 M72 20 L8 70" {...OUTLINE} strokeOpacity={0.3} />
      {REGIONS.map(([x, y, w, h]) => (
        <rect
          key={`region-${x}-${y}`}
          x={x - 1.5}
          y={y - 1.5}
          width={w + 3}
          height={h + 3}
          fill="none"
          className="stroke-signal"
          strokeDasharray="4 3"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </>
  );
}

function CreativeCoding() {
  const cols = 16;
  const rows = 10;
  const quiet: string[] = [];
  const lit: string[] = [];

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const cx = (col + 0.5) * (160 / cols);
      const cy = (row + 0.5) * (100 / rows);
      const angle = Math.atan2(50 - cy, 80 - cx);
      const dx = Math.cos(angle) * 3;
      const dy = Math.sin(angle) * 3;
      const segment = `M${(cx - dx).toFixed(2)} ${(cy - dy).toFixed(2)} L${(cx + dx).toFixed(2)} ${(cy + dy).toFixed(2)}`;
      (Math.hypot(80 - cx, 50 - cy) < 24 ? lit : quiet).push(segment);
    }
  }

  return (
    <>
      <path d={quiet.join(" ")} {...OUTLINE} strokeWidth={1.5} strokeLinecap="round" strokeOpacity={0.6} />
      <path d={lit.join(" ")} fill="none" className="stroke-signal" strokeWidth={1.5} strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      <circle cx="80" cy="50" r="1.6" className="fill-signal" />
    </>
  );
}

export function ProjectPreview({ slug }: { slug: ExperimentSlug }) {
  return (
    <div className="aspect-[16/10] w-full overflow-hidden bg-ink text-paper">
      <svg
        viewBox="0 0 160 100"
        aria-hidden="true"
        focusable="false"
        className="size-full transition-transform duration-(--duration-slow) ease-(--ease-out-quint) group-hover/project:scale-[1.03]"
      >
        {slug === "generative-ui" ? <GenerativeUi /> : null}
        {slug === "rough-to-refined" ? <RoughToRefined /> : null}
        {slug === "image-to-interface" ? <ImageToInterface /> : null}
        {slug === "creative-coding" ? <CreativeCoding /> : null}
      </svg>
    </div>
  );
}
