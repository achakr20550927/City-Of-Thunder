import type { Metadata } from 'next';
import { club } from '@/content/club';
import { schedule } from '@/content/schedule';
import BookingFlow from '@/components/book/BookingFlow';
import SectionHead from '@/components/SectionHead';
import s from '@/components/book/BookPage.module.css';

export const metadata: Metadata = {
  title: 'Book a class',
  description:
    'Book an intro fencing class, a private lesson or an open fencing drop-in at City of Thunder Fencing Club, inside Quail Springs Mall in Oklahoma City.',
  alternates: { canonical: '/book' },
};

export default function BookPage() {
  return (
    <div className={s.page}>
      <div className="container">
        <SectionHead
          eyebrow="Book"
          title="Nobody starts knowing how to do this."
          lead="Pick a class, pick a time, tell us who’s coming. All equipment is provided — bring athletic shoes and a water bottle."
        />

        <BookingFlow />

        {/* ------------------------------------------------ finding us */}
        <section className={s.find} aria-labelledby="find-heading">
          <h2 id="find-heading" className={`${s.findHead} t-display-m`}>
            Finding Suite 112
          </h2>

          <div className={s.findGrid}>
            <div data-reveal>
              <p className={`${s.findBody} t-body`}>
                Quail Springs Mall is 1.1 million square feet, and the first time
                anyone comes here they walk past us. Park on the north side by
                the West Memorial Road entrance. Come in on the lower level and
                turn left — we’re past the centre court, with the storefront
                windows onto the concourse.
              </p>
              <address className={`${s.findAddress} t-body-l`}>
                {club.address.street}
                <br />
                {club.address.locality}, {club.address.region} {club.address.postalCode}
              </address>
              <div className={s.findActions}>
                <a
                  className="btn btn--secondary"
                  href={club.mapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Directions
                  <span aria-hidden="true">↗</span>
                </a>
                <a className="btn btn--secondary" href={club.phoneHref}>
                  Call {club.phone}
                </a>
              </div>
            </div>

            <div data-reveal>
              <iframe
                className={s.map}
                title="Map showing City of Thunder Fencing Club inside Quail Springs Mall"
                src={club.mapEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>

        {/* ------------------------------------------------ full schedule */}
        <section className={s.week} aria-labelledby="week-heading">
          <h2 id="week-heading" className={`${s.findHead} t-display-m`}>
            The full week
          </h2>
          <div className={s.weekGrid}>
            {schedule.map((block) => (
              <div key={block.id}>
                <h3 className={`${s.weekDay} t-display-s`}>{block.days}</h3>
                <div data-cascade>
                  {block.entries.map((e) => (
                    <div key={e.time + e.label} className="sched-row">
                      <span className="sched-row__time">{e.time}</span>
                      <span className={s.weekLabel}>{e.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
