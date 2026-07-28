/**
 * Five brass stars. A partial fifth star is clipped, never swapped for a
 * different glyph. PRD §5.9.
 */
export default function Stars({
  rating = 5,
  size = 12,
  label,
}: {
  rating?: number;
  size?: number;
  label?: string;
}) {
  const full = Math.floor(rating);
  const partial = rating - full;

  return (
    <span
      className="stars"
      role="img"
      aria-label={label ?? `${rating} out of 5 stars`}
      style={{ height: size }}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = i < full ? 1 : i === full ? partial : 0;
        return <Star key={i} size={size} fill={fill} />;
      })}
    </span>
  );
}

function Star({ size, fill }: { size: number; fill: number }) {
  if (fill >= 1) return <Glyph size={size} solid />;
  if (fill <= 0) return <Glyph size={size} />;

  return (
    <span className="star--partial" style={{ width: size, height: size }} aria-hidden="true">
      <Glyph size={size} />
      <span className="star__fill" style={{ width: `${fill * 100}%` }}>
        <Glyph size={size} solid />
      </span>
    </span>
  );
}

function Glyph({ size, solid }: { size: number; solid?: boolean }) {
  return (
    <svg
      className="star"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M8 1.2l2.05 4.3 4.65.63-3.4 3.24.85 4.63L8 11.79 3.85 14l.85-4.63L1.3 6.13l4.65-.63z"
        fill={solid ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth={solid ? 0 : 1.1}
        strokeLinejoin="round"
        opacity={solid ? 1 : 0.35}
      />
    </svg>
  );
}
