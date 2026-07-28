/**
 * Wordmark. The supplied Thor logo carries strong navy/light-blue tones that
 * would fight the chalk/ink/brass palette in §5.2. This version keeps the
 * spirit of that mark — the lightning bolt gesture, the club's name, the
 * "Oklahoma City" byline — but expresses them in the site's own typography and
 * colour so the header stays quiet and reads on any background.
 */
export default function Wordmark({
  compact = false,
  onDark = false,
}: {
  /** Shrinks slightly to fit inline in the header once scrolled. */
  compact?: boolean;
  /** Inverts to chalk for use over ink surfaces (rarely). */
  onDark?: boolean;
}) {
  const stroke = onDark ? 'var(--chalk)' : 'var(--brand-black)';
  const brass = 'var(--brass)';

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 12,
        lineHeight: 1,
        color: onDark ? 'var(--chalk)' : 'var(--brand-black)',
      }}
    >
      <svg
        width={compact ? 26 : 30}
        height={compact ? 30 : 34}
        viewBox="0 0 30 34"
        fill="none"
        aria-hidden="true"
        focusable="false"
      >
        {/* A crossed blade + bolt — the club-mark reduced to two strokes */}
        <path
          d="M4 3l16 20M20 8v-4M20 8l4-3"
          stroke={stroke}
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <path
          d="M22 4l-5 8h4l-5 10 8-11h-4z"
          fill={brass}
        />
      </svg>
      <span style={{ display: 'inline-flex', flexDirection: 'column', gap: 4 }}>
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontWeight: 600,
            fontSize: compact ? 15 : 17,
            letterSpacing: '-0.022em',
            fontVariationSettings: '"wdth" 118',
          }}
        >
          City of Thunder
        </span>
        <span
          style={{
            fontFamily: 'var(--font-utility)',
            fontWeight: 500,
            fontSize: compact ? 8.5 : 9,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'var(--steel)',
          }}
        >
          Fencing · Oklahoma City · 1932
        </span>
      </span>
    </span>
  );
}
