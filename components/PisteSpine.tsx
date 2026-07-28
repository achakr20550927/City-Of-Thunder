'use client';

import { useEffect, useRef, useState } from 'react';
import s from './PisteSpine.module.css';

/**
 * S-03 · The piste spine. PRD §5.5.
 *
 * A competition strip is 14 metres and carries a fixed set of markings: two
 * rear limits, two warning lines, two on-guard lines and a centre line. The
 * ticks below sit at those real proportions, so the progress indicator is also
 * a scale diagram of the surface the sport is played on. A fencer will notice;
 * nobody else has to.
 *
 * Desktop only. On mobile it collapses to a 2px brass line at the top of the
 * viewport.
 */

/** Distance along a 14m strip → fraction. */
const STRIP = {
  rearLimit: 0 / 14,
  warning: 2 / 14,
  onGuard: 5 / 14,
  centre: 7 / 14,
  onGuardFar: 9 / 14,
  warningFar: 12 / 14,
  rearLimitFar: 14 / 14,
};

export const spineSections = [
  { id: 'the-room', label: 'Inside the club', at: STRIP.rearLimit },
  { id: 'the-coach', label: 'The coach', at: STRIP.warning },
  { id: 'a-class', label: 'A class', at: STRIP.onGuard },
  { id: 'members', label: 'Members', at: STRIP.centre },
  { id: 'programs', label: 'Programs', at: STRIP.onGuardFar },
  { id: 'the-week', label: 'The week', at: STRIP.warningFar },
  { id: 'the-club', label: 'The club', at: STRIP.rearLimitFar },
];

export default function PisteSpine() {
  const fill = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState<string | null>(null);

  /* Which section owns the viewport right now. */
  useEffect(() => {
    const els = spineSections
      .map((sec) => document.getElementById(sec.id))
      .filter((el): el is HTMLElement => !!el);
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  /* The rule draws downward with document scroll. scrub 0.5 gives it a slight
     lag, so it feels weighted rather than glued to the scrollbar. */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(min-width: 1024px)').matches) return;

    const el = fill.current;
    if (!el) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      let gsap, ScrollTrigger;
      try {
        [{ gsap }, { ScrollTrigger }] = await Promise.all([
          import('gsap'),
          import('gsap/ScrollTrigger'),
        ]);
      } catch {
        return;
      }
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.fromTo(
          el,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: document.documentElement,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 0.5,
            },
          }
        );
      });
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  const activeIndex = spineSections.findIndex((sec) => sec.id === active);

  return (
    <div className={s.spine} aria-hidden="true">
      <div className={s.track}>
        <span ref={fill} className={s.fill} />
        {spineSections.map((sec, i) => {
          const state =
            activeIndex === -1 ? 'ahead' : i < activeIndex ? 'past' : i === activeIndex ? 'now' : 'ahead';
          return (
            <span
              key={sec.id}
              className={s.tick}
              data-state={state}
              /* Centre line is the long tick, as it is on a real strip. */
              data-centre={sec.at === STRIP.centre ? '' : undefined}
              style={{ top: `${sec.at * 100}%` }}
            >
              <span className={s.mark} />
              <span className={s.label}>{sec.label}</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}

/** Mobile fallback: a 2px brass progress line at the top of the viewport. */
export function SpineMobile() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setPct(h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div className={s.mobileBar} aria-hidden="true">
      <span style={{ transform: `scaleX(${pct})` }} />
    </div>
  );
}
