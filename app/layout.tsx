import type { Metadata, Viewport } from 'next';
import { Archivo, Newsreader, Roboto_Mono } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import MotionLayer from '@/components/MotionLayer';
import { club } from '@/content/club';

/* Self-hosted and subset at build time by next/font — never hot-linked. */
/* Variable — the `wdth` axis is what §5.3 uses to widen display type. */
const archivo = Archivo({
  subsets: ['latin'],
  axes: ['wdth'],
  display: 'swap',
  variable: '--font-archivo',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-newsreader',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  weight: ['500'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://cityofthunder.com'),
  title: {
    default: 'City of Thunder Fencing Club — Fencing Lessons in Oklahoma City',
    template: '%s — City of Thunder Fencing Club',
  },
  description:
    'Fencing lessons for kids and adults in Oklahoma City, inside Quail Springs Mall. No experience needed, all equipment provided. Beginner courses start the first Saturday of every month.',
  keywords: [
    'fencing oklahoma city',
    'fencing lessons okc',
    'fencing classes for kids oklahoma',
    'fencing near me edmond',
    'lightsaber class oklahoma city',
  ],
  alternates: { canonical: '/' },
  openGraph: {
    title: 'City of Thunder Fencing Club — Fencing Lessons in Oklahoma City',
    description:
      'Founded 1932. Regional headquarters for USA Fencing. Beginner courses start the first Saturday of every month — no experience, no equipment needed.',
    url: 'https://cityofthunder.com',
    siteName: 'City of Thunder Fencing Club',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'City of Thunder Fencing Club',
    description:
      'Fencing lessons in Oklahoma City since 1932. No experience needed, all equipment provided.',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  /* Carried over from the existing site unchanged. asset-harvest §1.2. */
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

/**
 * SportsActivityLocation. AggregateRating is deliberately omitted — with a
 * hardcoded review file the markup would drift out of date, which is exactly
 * what earns a manual action. Google surfaces the rating from the Business
 * Profile anyway. PRD §10.4.
 */
const schema = {
  '@context': 'https://schema.org',
  '@type': 'SportsActivityLocation',
  '@id': 'https://cityofthunder.com/#club',
  name: club.name,
  alternateName: club.alsoKnownAs,
  description:
    'Fencing club in Oklahoma City offering épée, foil, sabre and lightsaber classes for children and adults. Founded 1932. Regional headquarters for USA Fencing.',
  url: 'https://cityofthunder.com',
  telephone: '+1-405-474-7030',
  email: club.email,
  foundingDate: '1932',
  priceRange: '$$',
  address: {
    '@type': 'PostalAddress',
    streetAddress: club.address.street,
    addressLocality: club.address.locality,
    addressRegion: club.address.region,
    postalCode: club.address.postalCode,
    addressCountry: 'US',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: club.geo.lat,
    longitude: club.geo.lng,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '11:00',
      closes: '21:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: 'Sunday',
      opens: '12:00',
      closes: '18:00',
    },
  ],
  sameAs: [club.social.instagram, club.social.facebook],
  sport: 'Fencing',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${newsreader.variable} ${robotoMono.variable}`}
    >
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MotionLayer />
      </body>
    </html>
  );
}
