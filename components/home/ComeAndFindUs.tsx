import Link from 'next/link';
import { club } from '@/content/club';
import s from './PhotoGrid.module.css';

/**
 * Closing band — address, map and the last CTAs. Extracted out of PhotoGrid so
 * the trial sign-up can sit between the photo grid and this address block.
 */
export default function ComeAndFindUs() {
  return (
    <section id="come-and-find-us" className="band band--paper" data-reveal>
      <span className="band__rule" aria-hidden="true" />
      <span className="band__index" aria-hidden="true">10 · Come and find us</span>
      <div className="container">
        <div className={s.closeGrid}>
          <div>
            <span className="eyebrow">Come and find us</span>
            <p className={`${s.closeTitle} t-display-l`}>
              Suite 112, inside Quail Springs Mall.
            </p>
            <address className={`${s.address} t-body-l`}>
              {club.address.street}
              <br />
              {club.address.locality}, {club.address.region} {club.address.postalCode}
            </address>
            <p className={`${s.finding} t-body-s`}>
              The mall is 1.1 million square feet and Suite 112 is genuinely
              hard to find the first time. Park on the north side near the
              Memorial Road entrance and come in on the lower level &mdash; we
              are on the left, past the centre court.
            </p>
            <div className={s.closeActions}>
              <Link href="/book" className="btn btn--primary">
                Book an intro class
              </Link>
              <a href={club.phoneHref} className="btn btn--secondary">
                Call {club.phone}
              </a>
            </div>
          </div>

          <div className={s.mapWrap}>
            <iframe
              className={s.map}
              title="Map showing City of Thunder Fencing Club at 2501 W Memorial Rd, Suite 112"
              src={club.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <a
              className={`link-brass ${s.mapLink}`}
              href={club.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              Directions in Google Maps
              <span aria-hidden="true"> &#8599;</span>
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
