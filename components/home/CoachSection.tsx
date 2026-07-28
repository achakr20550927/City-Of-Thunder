import Image from 'next/image';
import { ribaudoQuotes, coaches } from '@/content/coaches';
import s from './CoachSection.module.css';

/**
 * Movement 3 — Coach Ribaudo. PRD §6.1.
 *
 * S-05 · Sticky portrait, scrolling story. The left column pins while the
 * story scrolls past on the right, and unpins when the section's bottom
 * reaches its own. Implemented with `position: sticky` rather than GSAP —
 * cheaper, and it unpins correctly for free.
 *
 * This is the section's one signature moment, so nothing else here animates
 * beyond S-01 and the quote wipe on the pull quote.
 *
 * MEDIA: the left column is a typographic plate because COACH-01 does not
 * exist yet. When the §9.4 shoot delivers a 4:5 environmental portrait, swap
 * the plate for the image — the sticky column needs no other change.
 */
export default function CoachSection() {
  const head = coaches.find((c) => c.id === 'ribaudo')!;
  const advisors = coaches.filter((c) => c.role === 'advisor');
  const staff = coaches.filter((c) => c.role === 'coach');

  return (
    <section id="the-coach" className="band" data-reveal aria-labelledby="coach-heading">
      <span className="band__rule" aria-hidden="true" />
      <span className="band__index" aria-hidden="true">02 · The coach</span>
      <div className="container">
        <div className={s.grid}>
          <div className={s.sticky}>
            <figure className={s.portraitStack}>
              <Image
                className={s.portrait}
                src="/club/CLUB-02-cadets.webp"
                alt="Coach Ribaudo with members after a regional tournament"
                width={1400}
                height={1400}
                sizes="(min-width: 1024px) 380px, 100vw"
              />
              <figcaption className={`${s.plate} card`}>
                <span className={`${s.plateEyebrow} t-utility-sm`}>Head coach · Founder</span>
                <p className={`${s.plateName} t-display-m`}>{head.name}</p>
                <hr className="hairline" />
                <dl className={s.record}>
                  <div>
                    <dt>Weapon</dt>
                    <dd>Épée</dd>
                  </div>
                  <div>
                    <dt>USA Fencing</dt>
                    <dd>Division chairman</dd>
                  </div>
                  <div>
                    <dt>US Army team</dt>
                    <dd className="tnum">1986–1997</dd>
                  </div>
                  <div>
                    <dt>Collegiate</dt>
                    <dd>Oklahoma City University</dd>
                  </div>
                </dl>
              </figcaption>
            </figure>
          </div>

          <div className={s.story}>
            <div data-reveal>
              <span className="eyebrow">The coach</span>
              <h2 id="coach-heading" className={`${s.title} t-display-l`}>
                He came to fencing because a roommate dragged him to a practice.
              </h2>
            </div>

            <div className={s.prose} data-reveal>
              <p>
                David Ribaudo was a tennis player at Oklahoma City University. A
                roommate talked him into turning up at a fencing practice, and he
                never really left. The sport gave him a scholarship, then eleven
                years on the US Army team from 1986 to 1997, and eventually a
                seat as division chairman for USA Fencing.
              </p>
              <p>
                By the middle of the last decade there were two fencing clubs in
                Oklahoma City and neither of them was healthy. In 2016 he made
                the call to merge them rather than watch the sport quietly
                disappear from the state. That merged club is this one, and its
                lineage runs back to 1932.
              </p>
              <p>
                What he actually spends his days doing is teaching beginners.
                Weekday afternoons are private lessons; Saturdays are the
                one-month course where people who have never held a blade turn
                up and find out whether they like it. Reviewers on the club’s
                Google listing mention him by name more than anything else about
                the place.
              </p>
            </div>

            <figure className={`pullquote ${s.quote}`} data-quote-wipe>
              <p>“{ribaudoQuotes.physicalChess}”</p>
              <cite>{ribaudoQuotes.attribution}</cite>
            </figure>

            <div className={s.staff} data-reveal>
              <h3 className={`${s.staffHead} t-utility`}>Coaching staff</h3>
              <ul className={s.staffList}>
                {staff.map((c) => (
                  <li key={c.id}>
                    <span className={s.staffName}>{c.name}</span>
                    <span className={s.staffWeapon}>{c.weapon}</span>
                  </li>
                ))}
              </ul>

              <h3 className={`${s.staffHead} t-utility`}>Olympic program advisors</h3>
              <ul className={s.staffList}>
                {advisors.map((c) => (
                  <li key={c.id}>
                    <span className={s.staffName}>{c.name}</span>
                    <span className={s.staffWeapon}>
                      US Olympian · World Champion
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
