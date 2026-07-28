/**
 * Section band. A defined start (1px brass rule that draws in), a defined
 * surface (chalk or paper), and a consistent index label. Home sections used
 * to sit on undifferentiated whitespace; wrapping each in <Band> gives every
 * one a real boundary without shouting.
 */
export default function Band({
  id,
  index,
  paper = false,
  tight = false,
  className = '',
  children,
}: {
  id?: string;
  /** Zero-padded ordinal shown top-left of the band, e.g. "02". */
  index?: string;
  /** Paper surface instead of chalk — used to alternate sections. */
  paper?: boolean;
  /** Slightly shorter block padding. */
  tight?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className={`band ${paper ? 'band--paper' : ''} ${tight ? 'band--tight' : ''} ${className}`}
      data-reveal
    >
      <span className="band__rule" aria-hidden="true" />
      {index && (
        <span className="band__index" aria-hidden="true">
          {index}
        </span>
      )}
      <div className="container">{children}</div>
    </section>
  );
}
