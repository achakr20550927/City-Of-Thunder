'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { club } from '@/content/club';
import Wordmark from './Wordmark';
import styles from './Header.module.css';

const tabs = [
  { href: '/', label: 'Home' },
  { href: '/lessons', label: 'Lessons' },
  { href: '/book', label: 'Book' },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  /* On home the header starts transparent over the hero and solidifies when
     the hero unpins. Everywhere else it is solid from load. S-10. */
  const [solid, setSolid] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setSolid(true);
      return;
    }
    setSolid(window.scrollY > window.innerHeight * 1.6);
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 1.6);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  return (
    <header className={`${styles.header} ${solid ? styles.solid : ''}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.wordmark} aria-label={`${club.name}, home`}>
          <Wordmark compact={solid} />
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {tabs.map((t) => {
            const active = t.href === '/' ? pathname === '/' : pathname.startsWith(t.href);
            return (
              <Link
                key={t.href}
                href={t.href}
                className={`${styles.tab} ${active ? styles.tabActive : ''}`}
                aria-current={active ? 'page' : undefined}
              >
                {t.label}
              </Link>
            );
          })}
          <a
            href={club.social.facebook}
            className={styles.tab}
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
            <svg
              className={styles.ext}
              width="9"
              height="9"
              viewBox="0 0 10 10"
              aria-hidden="true"
              focusable="false"
            >
              <path
                d="M3 1h6v6M9 1L1.5 8.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
            <span className="sr-only">(opens in a new tab)</span>
          </a>
        </nav>

        <div className={styles.actions}>
          <a href={club.phoneHref} className={styles.phone}>
            {club.phone}
          </a>
          <Link href="/book" className="btn btn--primary btn--sm">
            Book a class
          </Link>
        </div>

        <MobileMenu pathname={pathname} />
      </div>
    </header>
  );
}

function MobileMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <button
        className={styles.burger}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((v) => !v)}
      >
        <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        <span className={`${styles.burgerBar} ${open ? styles.burgerBarA : ''}`} />
        <span className={`${styles.burgerBar} ${open ? styles.burgerBarB : ''}`} />
      </button>

      <div id="mobile-nav" className={`${styles.sheet} ${open ? styles.sheetOpen : ''}`} hidden={!open}>
        <nav aria-label="Mobile">
          {tabs.map((t) => (
            <Link key={t.href} href={t.href} className={styles.sheetLink}>
              {t.label}
            </Link>
          ))}
          <a
            href={club.social.facebook}
            className={styles.sheetLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook ↗
          </a>
        </nav>
        <hr className="hairline" />
        <a href={club.phoneHref} className={styles.sheetPhone}>
          {club.phone}
        </a>
        <p className={styles.sheetAddress}>
          {club.address.street}
          <br />
          Inside {club.address.inside}
        </p>
      </div>
    </>
  );
}
