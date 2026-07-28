import Link from 'next/link';
import { lessons } from '@/content/lessons';
import s from './Pricing.module.css';

/**
 * Movement 6 — pricing summary.
 *
 * On the home page this is a summary of the four things the club sells, not
 * the full pricing detail. Every card links to its full description on the
 * /lessons page. The four items and prices are canonical: they are what the
 * live shop at cityofthunder.com/s/shop displays.
 */
export default function Pricing() {
  return (
    <section id="programs" className="band band--paper" data-reveal aria-labelledby="pricing-heading">
      <span className="band__rule" aria-hidden="true" />
      <span className="band__index" aria-hidden="true">05 · What it costs</span>
      <div className="container">
        <div className={s.head}>
          <div>
            <span className="eyebrow">What it costs</span>
            <h2 id="pricing-heading" className={`${s.title} t-display-l`}>
              Four things, and one phone number.
            </h2>
          </div>
          <p className={`${s.lead} t-body-l`}>
            The club sells lessons and memberships, not gear. Everything the
            shop offers is on this page, and everything is bookable by phone or
            text if a card form isn&rsquo;t the way you want to book.
          </p>
        </div>

        <div className={s.cards}>
          {lessons.map((l, i) => (
            <Link key={l.id} href={`/lessons#${l.slug}`} className={`card ${s.card}`}>
              <span className={`${s.num} t-utility-sm tnum`}>
                {String(i + 1).padStart(2, '0')} · {l.eyebrow}
              </span>
              <h3 className={`${s.name} t-display-s`}>{l.name}</h3>
              <p className={`${s.blurb} t-body-s`}>{l.summary}</p>
              <div className={s.foot}>
                <span className={`${s.price} tnum`}>{l.priceLabel}</span>
                <span className={s.arrow} aria-hidden="true">→</span>
              </div>
            </Link>
          ))}
        </div>

        <div className={s.cta}>
          <Link href="/lessons" className="btn btn--primary">
            See what&rsquo;s on offer
          </Link>
          <Link href="/book" className="btn btn--secondary">
            Book an intro class
          </Link>
        </div>
      </div>
    </section>
  );
}
