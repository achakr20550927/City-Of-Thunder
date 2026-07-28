import Link from 'next/link';
import { club } from '@/content/club';
import { scheduleCondensed } from '@/content/schedule';
import { aggregate } from '@/content/reviews';
import Stars from './Stars';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.cols}>
          <div>
            <h2 className={styles.head}>Where we are</h2>
            <address className={styles.body}>
              {club.address.street}
              <br />
              {club.address.locality}, {club.address.region} {club.address.postalCode}
              <br />
              <span className={styles.muted}>Inside {club.address.inside}</span>
            </address>
            <a
              className="link-brass"
              href={club.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Open in Maps
              <span aria-hidden="true">↗</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>

          <div>
            <h2 className={styles.head}>The week</h2>
            <ul className={styles.week}>
              {scheduleCondensed.map((row) => (
                <li key={row.days}>
                  <span className={styles.weekDay}>{row.days}</span>
                  <span className={styles.weekDetail}>{row.detail}</span>
                </li>
              ))}
            </ul>
            <Link className="link-brass" href="/book">
              Book an intro class
            </Link>
          </div>

          <div>
            <h2 className={styles.head}>Get in touch</h2>
            <ul className={styles.contact}>
              <li>
                <a href={club.phoneHref} className={styles.mono}>
                  {club.phone}
                </a>
                <span className={styles.muted}> — call</span>
              </li>
              <li>
                <a href={club.smsHref} className={styles.mono}>
                  {club.phone}
                </a>
                <span className={styles.muted}> — text</span>
              </li>
              <li>
                <a href={`mailto:${club.email}`} className={styles.email}>
                  {club.email}
                </a>
              </li>
              <li className={styles.socialRow}>
                <a href={club.social.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram ↗
                </a>
                <a href={club.social.facebook} target="_blank" rel="noopener noreferrer">
                  Facebook ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="hairline" />

        <div className={styles.base}>
          <p className={styles.baseLine}>
            Oklahoma City Fencers Club — established 1932.
            <br />
            <span className={styles.muted}>Regional headquarters for USA Fencing.</span>
          </p>

          <a
            className={styles.rating}
            href={aggregate.listingUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Stars rating={aggregate.rating} size={13} />
            <span className={styles.ratingText}>
              <span className="tnum">{aggregate.rating}</span> from{' '}
              <span className="tnum">{aggregate.count}</span> reviews on {aggregate.source}
              <span aria-hidden="true"> ↗</span>
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
