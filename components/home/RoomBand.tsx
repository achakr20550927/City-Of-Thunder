import Image from 'next/image';
import s from './RoomBand.module.css';

/**
 * Movement 2 — inside the club. PRD §6.1.
 *
 * Real member photography replaces the placeholder studio clip. Three tiles
 * built around a lead statement. Aspects varied so the mosaic reads as one
 * plate rather than three cards.
 */
const tiles = [
  { src: '/club/CLUB-01-team.webp', alt: 'Team Thunder at a regional tournament', w: 1440, h: 960 },
  { src: '/club/CLUB-04-tharan.webp', alt: 'Club member Tharan competing in Dallas', w: 960, h: 1200 },
  { src: '/club/CLUB-05-king.webp', alt: 'A club member with a medal at the strip', w: 1200, h: 1200 },
];

export default function RoomBand() {
  return (
    <section id="the-room" className="band band--paper" data-reveal aria-labelledby="room-heading">
      <span className="band__rule" aria-hidden="true" />
      <span className="band__index" aria-hidden="true">01 · Inside the club</span>
      <div className="container">
        <div className={s.head}>
          <span className="eyebrow">Inside the club</span>
          <p id="room-heading" className={`${s.statement} t-display-m`}>
            Twenty-three flags on the wall for twenty-three countries we&rsquo;ve
            competed in. A club that has been in Oklahoma City since 1932. And a
            Saturday beginner class where nobody has held a blade before.
          </p>
        </div>

        <div className={s.grid}>
          {tiles.map((t, i) => (
            <figure key={t.src} className={`${s.tile} ${s['tile' + i]}`}>
              <Image
                src={t.src}
                alt={t.alt}
                width={t.w}
                height={t.h}
                sizes="(min-width: 1024px) 33vw, 100vw"
                priority={i === 0}
              />
            </figure>
          ))}
        </div>

        <p className={`${s.caption} t-utility-sm`}>
          Photographs from the club&rsquo;s own Instagram, @thunderfencing.
        </p>
      </div>
    </section>
  );
}
