import s from './SectionHead.module.css';

/**
 * S-12 · Blade rule. A 1px brass hairline draws left to right across the
 * container as each major section enters, then holds. The same gesture as the
 * piste spine and the quote wipe, at three different scales — that repetition
 * is what makes the motion read as one system rather than a pile of effects.
 */
export function BladeRule() {
  return <span className="blade-rule" data-blade />;
}

export default function SectionHead({
  eyebrow,
  title,
  lead,
  align = 'left',
  id,
}: {
  eyebrow: string;
  title?: string;
  lead?: string;
  align?: 'left' | 'wide';
  id?: string;
}) {
  return (
    <header className={`${s.head} ${align === 'wide' ? s.wide : ''}`} data-reveal>
      <span className="eyebrow">{eyebrow}</span>
      {title && (
        <h2 id={id} className={`${s.title} t-display-l`}>
          {title}
        </h2>
      )}
      {lead && <p className={`${s.lead} t-body-l prose-col`}>{lead}</p>}
    </header>
  );
}
