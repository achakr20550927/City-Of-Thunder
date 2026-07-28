'use client';

import { useEffect, useRef, useState } from 'react';
import { aggregate, reviews, type Review } from '@/content/reviews';
import Stars from './Stars';
import s from './ReviewWall.module.css';

/**
 * Movement 5 — the review wall. PRD §5.9 / §10.5.
 *
 * Two counter-drifting rows of hardcoded review cards. Opposite directions
 * read as texture; the same direction reads as a broken carousel.
 *
 * Data is a static import — no API, no key, no quota, no third-party script.
 */

/** Repeat the five real reviews to fill a row. Never invent reviews to pad. */
function fill(from: number, copies = 2): Review[] {
  const rotated = [...reviews.slice(from), ...reviews.slice(0, from)];
  return Array.from({ length: copies }, () => rotated).flat();
}

export default function ReviewWall() {
  const [paused, setPaused] = useState(false);
  const section = useRef<HTMLElement>(null);

  /* Pause when the tab is backgrounded — an animation nobody can see is pure
     battery cost. Also pause when the wall scrolls out of view. */
  useEffect(() => {
    const onVisibility = () => {
      section.current?.toggleAttribute('data-hidden', document.hidden);
    };
    document.addEventListener('visibilitychange', onVisibility);

    const el = section.current;
    let io: IntersectionObserver | undefined;
    if (el) {
      io = new IntersectionObserver(
        ([e]) => el.toggleAttribute('data-offscreen', !e.isIntersecting),
        { threshold: 0 }
      );
      io.observe(el);
    }

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      io?.disconnect();
    };
  }, []);

  const rowOne = fill(0);
  const rowTwo = fill(2); // offset start so the rows never show the same card side by side

  return (
    <section
      ref={section}
      id="members"
      className={s.wall}
      aria-labelledby="members-heading"
      data-paused={paused ? 'true' : undefined}
    >
      <div className="container">
        <div className={s.head} data-reveal>
          <div>
            <span className="eyebrow">What members say</span>
            <h2 id="members-heading" className={`${s.heading} t-display-l`}>
              Seventeen people have written about this club.
            </h2>
          </div>

          <div className={s.stats}>
            <div className={`card ${s.stat}`}>
              <span className={`${s.statFigure} t-display-m tnum`}>{aggregate.rating}</span>
              <Stars
                rating={aggregate.rating}
                size={14}
                label={`${aggregate.rating} out of 5 stars`}
              />
              <span className={`${s.statLabel} t-utility-sm`}>Rating</span>
            </div>

            <div className={`card ${s.stat}`}>
              <span className={`${s.statFigure} t-display-m tnum`}>{aggregate.count}</span>
              <span className={`${s.statLabel} t-utility-sm`}>
                Reviews on {aggregate.source}
              </span>
            </div>

            {/* No Google logo. The four-colour mark is the loudest thing that
                could land on this page; the word set in our own type does the
                same job silently. */}
            <a
              className={`link-brass ${s.readLink}`}
              href={aggregate.listingUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Read them on {aggregate.source}
              <span aria-hidden="true">↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>

      <div className={s.rows}>
        <Row cards={rowOne} />
        <Row cards={rowTwo} reverse />
      </div>

      <div className="container">
        <div className={s.controls}>
          <button
            type="button"
            className={`btn btn--secondary btn--sm ${s.pause}`}
            onClick={() => setPaused((v) => !v)}
            aria-pressed={paused}
          >
            {paused ? <PlayIcon /> : <PauseIcon />}
            {paused ? 'Resume' : 'Pause'}
            <span className="sr-only"> the scrolling reviews</span>
          </button>
        </div>
      </div>
    </section>
  );
}

function Row({ cards, reverse }: { cards: Review[]; reverse?: boolean }) {
  return (
    <div className={s.row}>
      <div className={`${s.track} ${reverse ? s.trackReverse : ''}`}>
        {/* The set is rendered twice; translating -50% loops seamlessly. */}
        {cards.map((r, i) => (
          <Card key={`a-${i}`} review={r} />
        ))}
        <div className={s.dupe} aria-hidden="true">
          {cards.map((r, i) => (
            <Card key={`b-${i}`} review={r} />
          ))}
        </div>
      </div>
    </div>
  );
}

function Card({ review }: { review: Review }) {
  return (
    /* Cards do not link anywhere and are not focusable. The one link is the
       header link to the listing. */
    <figure className={`card ${s.card}`}>
      <div className={s.cardHead}>
        <span className={s.avatar} aria-hidden="true">
          {review.initials}
        </span>
        <span className={s.name}>{review.name}</span>
        <Stars rating={review.stars} size={12} label={`${review.stars} stars`} />
      </div>
      <blockquote className={s.quote}>{review.quote}</blockquote>
    </figure>
  );
}

function PauseIcon() {
  return (
    <svg width="9" height="11" viewBox="0 0 9 11" aria-hidden="true" focusable="false">
      <rect x="0" y="0" width="3" height="11" fill="currentColor" />
      <rect x="6" y="0" width="3" height="11" fill="currentColor" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="9" height="11" viewBox="0 0 9 11" aria-hidden="true" focusable="false">
      <path d="M0 0l9 5.5L0 11z" fill="currentColor" />
    </svg>
  );
}
