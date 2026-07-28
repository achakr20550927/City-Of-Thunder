import Image from 'next/image';
import { beginnerCourse } from '@/content/schedule';
import s from './ClassSection.module.css';

/**
 * Movement 4 — what a class looks like. PRD §6.1.
 *
 * Three prose blocks below a single wide photograph of the club competing.
 * Not icon cards with three-word captions — §5.1 prohibits those outright.
 */
const blocks = [
  {
    title: 'No experience.',
    body: 'Most people who walk in have never held a blade. That’s the normal starting point, not the exception — the Saturday course is built around it.',
  },
  {
    title: 'No equipment.',
    body: 'Mask, jacket, glove, blade — all provided. Bring athletic shoes, comfortable workout clothes and a water bottle. That’s the entire list.',
  },
  {
    title: 'Everyone on the floor.',
    body: 'Children train alongside adults. Families are welcome to sit and watch practice, and most do.',
  },
];

export default function ClassSection() {
  return (
    <section id="a-class" className="band" data-reveal aria-labelledby="class-heading">
      <span className="band__rule" aria-hidden="true" />
      <span className="band__index" aria-hidden="true">03 · A class</span>
      <div className="container">
        <div className={s.head}>
          <span className="eyebrow">What a class looks like</span>
          <h2 id="class-heading" className={`${s.headTitle} t-display-l`}>
            Turn up on a Saturday and find out whether you like it.
          </h2>
        </div>

        <figure className={s.photo}>
          <Image
            src="/club/CLUB-08-dallas.webp"
            alt="Team Thunder at a competition day, coaches and teammates on the strip"
            width={1440}
            height={960}
            sizes="(min-width: 1024px) 1100px, 100vw"
            priority={false}
          />
        </figure>

        <div className={s.blocks}>
          {blocks.map((b) => (
            <div key={b.title} className={s.block}>
              <h3 className={`${s.blockTitle} t-display-s`}>{b.title}</h3>
              <p className={`${s.blockBody} t-body`}>{b.body}</p>
            </div>
          ))}
        </div>

        <p className={`${s.note} t-body-s`}>{beginnerCourse.structure}</p>
      </div>
    </section>
  );
}
