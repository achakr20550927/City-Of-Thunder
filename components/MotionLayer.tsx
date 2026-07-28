'use client';

import { useEffect } from 'react';

/**
 * The shared scroll layer. One IntersectionObserver drives every S-01 reveal,
 * every quote wipe, every cascade, every settle and every blade rule on the
 * page. JS adds a class; CSS does the animating. PRD §5.10.
 *
 * Reveals unobserve on first fire — they never replay on scroll-up, which is
 * the single most common way scroll animation starts feeling cheap.
 */
export default function MotionLayer() {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const targets =
      '[data-reveal],[data-quote-wipe],[data-cascade],[data-settle],[data-blade]';

    if (reduced) {
      // Reduced motion: everything is simply present. Add the class so any
      // final-state styling still applies, and never observe anything.
      document
        .querySelectorAll(targets)
        .forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          e.target.classList.add('is-visible');
          io.unobserve(e.target);
        }
      },
      { threshold: 0.2, rootMargin: '0px 0px -8% 0px' }
    );

    const observe = () =>
      document.querySelectorAll(targets).forEach((el) => {
        if (!el.classList.contains('is-visible')) io.observe(el);
      });

    observe();

    // Client-side navigation swaps the tree under us; re-scan on route change.
    const mo = new MutationObserver(observe);
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
