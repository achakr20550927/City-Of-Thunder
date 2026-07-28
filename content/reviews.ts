/**
 * Reviews are static content, not an API call and not an embedded widget.
 * PRD §3.8 / §10.5.
 *
 * MAINTENANCE CONTRACT: every six months, open the Google listing, check the
 * rating and count, update this file, bump `lastVerified`. Five minutes.
 * If the club runs a review push and the count jumps, update sooner.
 */

export const aggregate = {
  rating: 4.9,
  count: 17,
  source: 'Google',
  listingUrl:
    'https://www.google.com/maps/place/?q=place_id:ChIJ41-Y4r8dsocRB4ZCgDAqEkM',
  lastVerified: '2026-07-25',
} as const;

export type Review = {
  id: string;
  /** Reviewer display name, read off the public Google listing. */
  name: string;
  /** Fallback avatar — no reviewer photos without the Places API. */
  initials: string;
  stars: 5;
  quote: string;
  theme: 'value' | 'coaching' | 'allLevels' | 'proShop' | 'welcome';
};

/**
 * NAMES ARE PLACEHOLDERS PENDING PHASE 0 CAPTURE.
 * Open the listing above, read the five reviewer display names off it, and
 * replace `name` and `initials` below. A testimonial without a real name is
 * worth noticeably less than one with it.
 *
 * Quotes are trimmed to card length and lightly corrected for spelling and
 * grammar — normal testimonial practice. Substance is unchanged.
 */
export const reviews: Review[] = [
  {
    id: 'r1',
    name: 'Google reviewer',
    initials: 'GR',
    stars: 5,
    theme: 'value',
    quote:
      'Fencing is such a fun and competitive sport for all of the kids in my very large family. The dues are very reasonable compared to other after-school sports programs.',
  },
  {
    id: 'r2',
    name: 'Google reviewer',
    initials: 'GR',
    stars: 5,
    theme: 'allLevels',
    quote:
      'This is THE best place for adults and kids. No matter your skill level, you will learn and have fun. My daughter looks forward to going every week.',
  },
  {
    id: 'r3',
    name: 'Google reviewer',
    initials: 'GR',
    stars: 5,
    theme: 'proShop',
    quote:
      'Incredibly friendly and helpful staff, and a pro shop that always has exactly what I need. Coaches can help veteran fencers and rookies alike to up their game.',
  },
  {
    id: 'r4',
    name: 'Google reviewer',
    initials: 'GR',
    stars: 5,
    theme: 'coaching',
    quote:
      'We go here every week! The coach there is super nice and helps fix things for free! There is no better fencing place out there!',
  },
  {
    id: 'r5',
    name: 'Google reviewer',
    initials: 'GR',
    stars: 5,
    theme: 'welcome',
    quote:
      'The person who dealt with me the whole time — David — was very very friendly. Anyone who wants to learn fencing, or even just have a peek at it, should visit.',
  },
];
