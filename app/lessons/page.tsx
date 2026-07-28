import type { Metadata } from 'next';
import Link from 'next/link';
import { lessons } from '@/content/lessons';
import { club } from '@/content/club';
import SectionHead from '@/components/SectionHead';
import s from '@/components/lessons/Lessons.module.css';

export const metadata: Metadata = {
  title: 'Lessons and memberships',
  description:
    'The four things City of Thunder Fencing Club offers online: the $100 beginner course, private lessons, annual membership, and tournament coaching.',
  alternates: { canonical: '/lessons' },
};

const teamPhoto = { src: '/club/CLUB-01-team.webp', w: 1440, h: 960 };

export default function LessonsPage() {
  return (
    <div className={s.page}>
      <div className="container">
        <SectionHead
          eyebrow="What we sell"
          title="Lessons, memberships and tournament coaching."
          lead={`Everything the club offers online is on this page. Four things, and one phone number that gets a real coach on the line if a card form isn't the way you want to book.`}
        />

        {/* ── the four lessons, one per row, each a real block of copy ── */}
        <div className={s.list}>
          {lessons.map((l, i) => (
            <article key={l.id} id={l.slug} className={s.lesson} data-reveal>
              <div className={s.lessonNum}>
                <span className={`${s.numFig} tnum`}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={`${s.numEye} t-utility-sm`}>{l.eyebrow}</span>
              </div>

              <div className={s.lessonBody}>
                <div className={s.lessonHeadRow}>
                  <h2 className={`${s.lessonName} t-display-l`}>{l.name}</h2>
                  <div className={s.lessonPrice}>
                    <span className={`${s.priceFig} t-display-m tnum`}>
                      {l.priceLabel}
                    </span>
                    <span
                      className={`pill ${l.inStock ? 'pill--open' : 'pill--closed'}`}
                    >
                      <span className="pill__dot" aria-hidden="true" />
                      {l.inStock ? 'Available' : 'Out of stock online'}
                    </span>
                  </div>
                </div>

                <p className={`${s.lessonLead} t-body-l`}>{l.headline}</p>
                <p className={`${s.lessonDetail} t-body`}>{l.detail}</p>

                <ul className={s.lessonPoints}>
                  {l.highlights.map((h) => (
                    <li key={h}>
                      <span className={s.dot} aria-hidden="true" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className={s.lessonActions}>
                  {l.cta === 'book' && (
                    <Link href={`/book?service=intro-13plus`} className="btn btn--primary">
                      Book this class
                    </Link>
                  )}
                  {l.cta === 'membership' && (
                    <a href={club.phoneHref} className="btn btn--primary">
                      Join · {club.phone}
                    </a>
                  )}
                  {l.cta === 'call' && (
                    <a href={club.phoneHref} className="btn btn--primary">
                      Call to arrange · {club.phone}
                    </a>
                  )}
                  <Link href={`#reserve-${l.slug}`} className="btn btn--secondary">
                    Reserve online
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ── one reserve form, keyed off the target lesson via #anchor ── */}
        <section id="reserve" className={s.reserve} aria-labelledby="reserve-heading">
          <div className={s.reserveInner}>
            <div>
              <span className="eyebrow">Reserve online</span>
              <h2 id="reserve-heading" className={`${s.reserveHead} t-display-m`}>
                Send the club a request.
              </h2>
              <p className={`${s.reserveBody} t-body`}>
                For the beginner course, book a specific date on the{' '}
                <Link className="link-brass" href="/book">
                  booking page
                </Link>
                . For anything else, this form goes straight to the front desk.
                They answer both.
              </p>
              <img
                className={s.reservePhoto}
                src={teamPhoto.src}
                alt="Team Thunder at a regional tournament"
                width={teamPhoto.w}
                height={teamPhoto.h}
                loading="lazy"
              />
            </div>

            <div>
              {/* Default reserve target is the full membership — the highest-
                  intent thing on this page. Others link into the specific
                  #reserve-{slug} anchor via the CTA. */}
              <ReserveTarget />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

/* Lets the URL hash `#reserve-{slug}` pre-select a lesson without extra state.
   Server-rendered default; the client hydration reads the hash if present. */
function ReserveTarget() {
  return (
    <>
      {lessons.map((l) => (
        <div key={l.id} id={`reserve-${l.slug}`}>
          {/* We render one form per lesson, statically. The `:target` selector
              in CSS hides the others so exactly one is shown at a time. */}
          <ReserveBlock lesson={l} />
        </div>
      ))}
    </>
  );
}

import ReserveLesson from '@/components/lessons/ReserveLesson';

function ReserveBlock({ lesson }: { lesson: typeof lessons[number] }) {
  return (
    <div className={s.reserveBlock}>
      <span className={`${s.reserveTag} t-utility-sm`}>Reserving</span>
      <p className={`${s.reserveName} t-display-s`}>{lesson.name}</p>
      <p className={`${s.reservePrice} t-body`}>
        <span className="tnum">{lesson.priceLabel}</span>{' '}
        <span className={s.reserveMuted}>· {lesson.summary}</span>
      </p>
      <ReserveLesson lesson={lesson} />
    </div>
  );
}
