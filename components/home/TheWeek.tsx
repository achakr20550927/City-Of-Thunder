import { schedule, beginnerCourse } from '@/content/schedule';
import { getOpenState } from '@/lib/hours';
import SectionHead from '../SectionHead';
import OpenNow from './OpenNow';
import s from './TheWeek.module.css';

/**
 * Movement 7 — the week. PRD §6.1.
 *
 * S-08 cascade: each row's hairline draws left to right 80ms ahead of its
 * text, top to bottom, 40ms apart. The whole cascade finishes under 700ms —
 * it should make the table feel constructed, not make anyone wait for it.
 *
 * The live open/closed pill is the single highest-value element on the site
 * for someone standing outside the storefront with a phone.
 */
export default function TheWeek() {
  const initial = getOpenState();

  return (
    <section id="the-week" className="band" data-reveal aria-labelledby="week-heading">
      <span className="band__rule" aria-hidden="true" />
      <span className="band__index" aria-hidden="true">06 · The week</span>
      <div className="container">
        <div className={s.top}>
          <div className={s.headRow}>
            <SectionHead
              eyebrow="The week"
              title="When we’re on the floor."
              id="week-heading"
            />
            <OpenNow initial={initial} />
          </div>
        </div>

        <div className={s.blocks}>
          {schedule.map((block) => (
            <div key={block.id} className={s.block}>
              <h3 className={`${s.day} t-display-s`}>{block.days}</h3>
              <div data-cascade>
                {block.entries.map((e) => (
                  <div key={e.time + e.label} className="sched-row">
                    <span className="sched-row__time">{e.time}</span>
                    <span className={s.label}>
                      {e.label}
                      {e.note && <span className={s.note}>{e.note}</span>}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p className={`${s.footnote} t-body-s`}>{beginnerCourse.provided}</p>
      </div>
    </section>
  );
}
