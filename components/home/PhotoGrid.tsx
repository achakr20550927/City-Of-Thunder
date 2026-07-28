import Image from 'next/image';
import s from './PhotoGrid.module.css';

/**
 * Photo grid — real club photography from the @thunderfencing Instagram.
 * A varied grid, tight gutters, no lightbox, no captions in the grid itself.
 * Interleaved fact tiles carry credentials the current site communicates
 * nowhere.
 *
 * The closing "come and find us" band lives in its own component so the trial
 * sign-up can sit between them without splitting a section fragment.
 */
type Tile =
  | { kind: 'photo'; src: string; alt: string; w: number; h: number }
  | { kind: 'fact'; figure: string; label: string };

const tiles: Tile[] = [
  { kind: 'photo', src: '/club/CLUB-03-girls.webp', alt: 'Team Thunder members on the medal podium', w: 864, h: 1080 },
  { kind: 'fact', figure: '23', label: 'Flags on the wall, for twenty-three countries the club has competed in' },
  { kind: 'photo', src: '/club/CLUB-06-irene.webp', alt: 'Club member with a medal after a regional', w: 960, h: 1200 },
  { kind: 'photo', src: '/club/CLUB-07-leah.webp', alt: 'Podium at the Regional Championship', w: 1440, h: 960 },
  { kind: 'fact', figure: 'Top 30', label: 'Of roughly five hundred fencing clubs in the United States' },
  { kind: 'photo', src: '/club/CLUB-05-king.webp', alt: 'Club member with a medal', w: 1200, h: 1200 },
  { kind: 'photo', src: '/club/CLUB-02-cadets.webp', alt: 'Coach Ribaudo with Team Thunder cadets after a competition', w: 1400, h: 1400 },
  { kind: 'fact', figure: '1932', label: 'One of the oldest continuously operating fencing clubs in the country' },
  { kind: 'photo', src: '/club/CLUB-08-dallas.webp', alt: 'Team Thunder at the Dallas RYC', w: 1440, h: 960 },
];

export default function PhotoGrid() {
  return (
    <section id="the-club" className="band" data-reveal aria-labelledby="club-heading">
      <span className="band__rule" aria-hidden="true" />
      <span className="band__index" aria-hidden="true">07 · The club</span>
      <div className="container">
        <div className={s.head}>
          <span className="eyebrow">The club</span>
          <h2 id="club-heading" className={`${s.title} t-display-l`}>
            Ninety-four years of showing up.
          </h2>
        </div>

        <div className={s.grid} data-settle>
          {tiles.map((tile, i) =>
            tile.kind === 'photo' ? (
              <figure key={i} className={`settle-item ${s.tile}`}>
                <Image
                  src={tile.src}
                  alt={tile.alt}
                  width={tile.w}
                  height={tile.h}
                  sizes="(min-width: 1024px) 33vw, 100vw"
                />
              </figure>
            ) : (
              <div key={i} className={`settle-item ${s.tile} ${s.fact}`}>
                <span className={`${s.factFigure} t-display-l tnum`}>{tile.figure}</span>
                <span className={`${s.factLabel} t-body-s`}>{tile.label}</span>
              </div>
            )
          )}
        </div>
        <p className={`${s.credit} t-utility-sm`}>Photographs from @thunderfencing on Instagram</p>
      </div>
    </section>
  );
}
