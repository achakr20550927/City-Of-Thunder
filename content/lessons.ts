/**
 * Lessons and memberships — the four things the club actually sells.
 * Copied exactly from the live shop at cityofthunder.com/s/shop.
 *
 * ── THIS IS WHAT REPLACES THE OLD GEAR CATALOGUE ──────────────────────────
 * They do not sell gear online. They sell lessons, memberships and tournament
 * coaching. The four items below are the entire catalogue as of 2026-07-26.
 */

export type Lesson = {
  id: string;
  slug: string;
  name: string;
  priceLabel: string;
  price: number;
  priceMax?: number;
  inStock: boolean;
  eyebrow: string;
  headline: string;
  summary: string;
  detail: string;
  highlights: string[];
  cta: 'book' | 'call' | 'membership';
};

export const lessons: Lesson[] = [
  {
    id: 'beginners',
    slug: 'beginners-fencing-class',
    name: 'Beginners fencing class',
    priceLabel: '$100',
    price: 100,
    inStock: true,
    eyebrow: 'Start here',
    headline: 'The one-month course that starts the first Saturday of every month.',
    summary:
      'One month of Saturday classes. All equipment provided. Kids at noon, teens and adults at 2 PM.',
    detail:
      'This is the door in. You walk in with athletic shoes and a water bottle and you leave a month later knowing how to hold a blade, how to move, and whether this is your sport. Every piece of equipment is provided; you buy nothing on the way in. Coach Ribaudo teaches most of the sessions himself.',
    highlights: [
      'Meets four Saturdays in a row',
      '12 & under at 12 PM · 13 & up at 2 PM',
      'All gear provided — mask, jacket, glove, blade',
      'No experience assumed, none needed',
    ],
    cta: 'book',
  },
  {
    id: 'private',
    slug: 'private-lesson',
    name: 'Private lesson',
    priceLabel: '$30 – $1,000',
    price: 30,
    priceMax: 1000,
    inStock: false,
    eyebrow: 'Coach one-on-one',
    headline: 'One coach, one strip, one hour on you.',
    summary:
      'One-to-one lessons with a club coach, by arrangement. Weekday afternoons and evenings.',
    detail:
      'Private lessons are the fastest way to improve, and every club fencer relies on them. Rates vary by the coach and the length of the lesson. Larger packages cover a whole season of weekly one-on-ones. Currently marked out of stock in the online catalogue — call the club to arrange one directly.',
    highlights: [
      'Weekday afternoons and evenings',
      'By arrangement with a specific coach',
      'Book directly with the club',
    ],
    cta: 'call',
  },
  {
    id: 'full',
    slug: 'full-membership',
    name: 'Full Membership',
    priceLabel: '$1,000',
    price: 1000,
    inStock: true,
    eyebrow: 'A year of everything',
    headline: 'Unlimited classes and open fencing, all year.',
    summary:
      'Annual membership. Every class, every open fencing session, every in-house tournament.',
    detail:
      'The best value the club offers. One payment covers all class fees, all open fencing, every in-house tournament, and coaching support at local tournaments. Members get 20% off additional family members, a club T-shirt, the Thunder patch, monthly coach reviews and the newsletter. Competitive fencers still need their own gear.',
    highlights: [
      'Unlimited classes · unlimited open fencing',
      'All in-house tournaments included',
      '20% off additional family members',
      'Saves $560 versus twelve monthly payments',
    ],
    cta: 'membership',
  },
  {
    id: 'tournament',
    slug: 'tournament-coaches-fee',
    name: 'Tournament Coaches Fee (Daily)',
    priceLabel: '$375',
    price: 375,
    inStock: true,
    eyebrow: 'Coaching, on the road',
    headline: 'A coach on the strip with you at a tournament.',
    summary:
      'One day of tournament coaching — travel, warm-up, between-bout support, the whole day.',
    detail:
      'When members compete at regionals, NACs and national events they take a coach with them. This is the daily rate for that coaching: strip-side warm-ups, bout preparation, in-touch coaching between actions, and the honest post-mortem afterwards. Book ahead — coaching slots at travel events fill early.',
    highlights: [
      'One competition day',
      'Strip-side coaching between bouts',
      'Warm-up and bout preparation included',
      'Book with the club well in advance',
    ],
    cta: 'call',
  },
];
