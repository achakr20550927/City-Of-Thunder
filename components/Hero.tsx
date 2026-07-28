'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import s from './Hero.module.css';

/**
 * Movement 1 — the hero. PRD §6.1.
 *
 * Scroll-driven via a preloaded FRAME SEQUENCE, not `<video>`. Seeking a
 * compressed video every scroll tick is expensive: the decoder has to walk
 * back to the nearest keyframe and re-decode forward, which is why the video
 * approach felt "breaky" while scrolling.
 *
 * The frame sequence is 61 WebPs (~715 KB total), preloaded up front and
 * painted to a canvas keyed off pin progress. Every scroll pixel maps to a
 * frame index; drawing is O(1) — just an image blit. No video seek, no
 * flicker, no wait for keyframes. This is the same trick Apple uses on
 * marketing pages, and it's the only technique that scrubs perfectly.
 *
 * Payload is smaller than the video file it replaces. Fallback: while frames
 * load, the poster is painted to the canvas; if the whole component fails,
 * the copy still renders as a good static hero — hard requirement in §6.1.
 */

const FRAME_COUNT = 61;
const FRAME_URL = (i: number) => `/frames/f${String(i).padStart(3, '0')}.webp`;
const POSTER_URL = FRAME_URL(0);

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const pin = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);

  const framesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(-1);
  const [ready, setReady] = useState(false);

  /* --------------------------------------------------- frame preloading */

  useEffect(() => {
    let cancelled = false;
    const imgs: HTMLImageElement[] = [];

    /* Poster first, so we can paint a first frame before the whole set loads */
    const poster = new Image();
    poster.decoding = 'async';
    poster.src = POSTER_URL;
    poster.onload = () => {
      if (cancelled) return;
      imgs[0] = poster;
      framesRef.current = imgs;
      draw(0);
    };

    /* Load the rest in parallel */
    const loaders = Array.from({ length: FRAME_COUNT }, (_, i) => {
      if (i === 0) return Promise.resolve(poster);
      const img = new Image();
      img.decoding = 'async';
      img.src = FRAME_URL(i);
      return new Promise<HTMLImageElement>((resolve) => {
        img.onload = () => resolve(img);
        img.onerror = () => resolve(img);
      });
    });

    Promise.all(loaders).then((all) => {
      if (cancelled) return;
      for (let i = 0; i < all.length; i++) imgs[i] = all[i];
      framesRef.current = imgs;
      setReady(true);
      draw(0);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  /* --------------------------------------------------------- canvas fit */

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = c.getBoundingClientRect();
      c.width = Math.round(rect.width * dpr);
      c.height = Math.round(rect.height * dpr);
      if (currentFrameRef.current >= 0) {
        drawFrame(currentFrameRef.current);
      } else {
        draw(0);
      }
    };

    resize();
    window.addEventListener('resize', resize);
    const ro = new ResizeObserver(resize);
    ro.observe(c);
    return () => {
      window.removeEventListener('resize', resize);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* --------------------------------------------------------- draw utils */

  const drawFrame = (idx: number) => {
    const c = canvas.current;
    const frames = framesRef.current;
    if (!c || !frames.length) return;
    const img = frames[Math.min(frames.length - 1, Math.max(0, idx))];
    if (!img || !img.complete || img.naturalWidth === 0) return;

    const ctx = c.getContext('2d');
    if (!ctx) return;

    const cw = c.width;
    const ch = c.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;

    /* `contain` — the whole frame is always visible, no crop. Everything
       outside the drawn image stays transparent (clearRect) so mix-blend
       multiply reveals pin's chalk directly with no rectangle boundary. */
    const scale = Math.min(cw / iw, ch / ih);
    const dw = iw * scale;
    const dh = ih * scale;
    const dx = (cw - dw) / 2;
    const dy = (ch - dh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, dx, dy, dw, dh);
    currentFrameRef.current = idx;
  };

  const draw = (progress: number) => {
    const frames = framesRef.current;
    if (!frames.length) return;
    const idx = Math.min(
      frames.length - 1,
      Math.max(0, Math.round(progress * (frames.length - 1)))
    );
    if (idx === currentFrameRef.current) return;
    drawFrame(idx);
  };

  /* -------------------------------------------------- scroll wiring up */

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const el = root.current;
    const pinEl = pin.current;
    if (!el || !pinEl) return;

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
      if (cancelled || !el.isConnected) return;

      gsap.registerPlugin(ScrollTrigger);
      el.dataset.js = 'on';

      ctx = gsap.context(() => {
        const q = gsap.utils.selector(el);
        gsap.set(q('[data-copy="second"] > *, [data-copy="cta"] > *'), { opacity: 0 });

        /* rAF-throttled scrub — the smoothing lag that makes the scrub feel
           fluid rather than glued. Paired with a long pin range so a wheel
           notch nudges the animation without lurching. */
        const progressState = { p: 0 };
        let rafId = 0;

        const tick = () => {
          rafId = 0;
          draw(progressState.p);
        };

        const tl = gsap.timeline({
          defaults: { ease: 'power2.out' },
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            /* 600% pin range = each frame gets ~10% of a viewport of scroll
               on desktop. Every wheel notch nudges the animation, nothing
               ever skips ahead by more than one frame. */
            end: () => `+=${window.innerWidth < 768 ? 400 : 600}%`,
            pin: pinEl,
            scrub: 1.4,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              progressState.p = self.progress;
              if (!rafId) rafId = requestAnimationFrame(tick);
            },
            onEnter: () => draw(0),
            onEnterBack: () => draw(0),
          },
        });

        /* 0.20 · first headline leaves as the zipper opens */
        tl.to(
          q('[data-copy="first"]'),
          { opacity: 0, y: -32, duration: 0.14, ease: 'power1.in' },
          0.2
        );
        tl.to(q('[data-hint]'), { opacity: 0, duration: 0.06 }, 0.05);

        /* 0.42 · second headline arrives mid-burst */
        tl.to(
          q('[data-copy="second"] > *'),
          { opacity: 1, duration: 0.14, ease: 'power2.out' },
          0.42
        );

        /* 0.62 · CTA arrives once the arrangement is legible */
        tl.fromTo(
          q('[data-copy="cta"] > *'),
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.1, stagger: 0.04, ease: 'power2.out' },
          0.62
        );
      }, el);

      ScrollTrigger.refresh();
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
      if (el) delete el.dataset.js;
    };
  }, []);

  return (
    <section ref={root} className={s.hero} data-hero>
      <div ref={pin} className={s.pin}>
        <canvas
          ref={canvas}
          className={s.canvas}
          aria-hidden="true"
        />

        <div className={s.scrim} aria-hidden="true" />

        <div className={s.copy}>
          <div className={s.first} data-copy="first">
            <span className={`${s.eyebrow} t-utility`}>
              Oklahoma City Fencers Club · Est. 1932
            </span>
            <h1 className={`${s.title} t-display-xl`}>
              Learn Olympic fencing in just four weeks.
            </h1>
          </div>

          <div className={s.closing}>
            <div className={s.second} data-copy="second">
              <p className={`${s.secondLine} t-display-l`}>
                Everything you need is in the bag.
              </p>
            </div>

            <div className={s.cta} data-copy="cta">
              <p className={`${s.thirdLine} t-body-l`}>
                Beginner classes for kids, teens and adults. No experience
                needed. All equipment provided.
              </p>
              <div className={s.buttons}>
                <Link href="/book" className="btn btn--primary">
                  Sign up
                </Link>
                <a href="#about-fencing" className="btn btn--secondary">
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>

        <p className={s.scrollHint} data-hint aria-hidden="true">
          <span className="t-utility-sm">Scroll</span>
          <span className={s.scrollRule} />
        </p>
      </div>
    </section>
  );
}
