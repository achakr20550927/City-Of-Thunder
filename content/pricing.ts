/**
 * Pricing, reproduced from the club's own published pricing. PRD §3.4.
 *
 * Every figure carries a `source`. 'clubSite' came from the club's own copy.
 * 'oklahomaToday' came from the March 2026 Oklahoma Today feature and has NOT
 * been confirmed by the club — see PRD §14 Q1.
 */

export type PriceSource = 'clubSite' | 'oklahomaToday';

export type MonthlyProgram = {
  id: string;
  program: string;
  designedFor: string;
  meets: string;
  rates: { label: string; amount: string }[];
  source: PriceSource;
};

export const monthlyPrograms: MonthlyProgram[] = [
  {
    id: 'youth',
    program: 'Youth classes',
    designedFor: 'Kids ages 5–8 and 9–12',
    meets: 'Weekdays 5 & 6 PM · Saturdays noon',
    rates: [
      { label: '1 class per week', amount: '$120' },
      { label: '2 classes per week', amount: '$200' },
    ],
    source: 'clubSite',
  },
  {
    id: 'teen-adult',
    program: 'Teen and adult classes',
    designedFor:
      'Beginner and intermediate fencers, working adults and fencing parents, ages 13 and up',
    meets: 'Weekdays 5 & 6 PM · Saturdays 2 PM',
    rates: [
      { label: '1 class per week', amount: '$120' },
      { label: '2 classes per week', amount: '$200' },
    ],
    source: 'clubSite',
  },
  {
    id: 'intermediate',
    program: 'Intermediate and advanced',
    designedFor: 'Intermediate and advanced fencers ages 9–11',
    meets: 'Weekdays, by placement',
    rates: [{ label: '1 class per week', amount: '$150' }],
    source: 'clubSite',
  },
  {
    id: 'open-fencing',
    program: 'Open fencing only',
    designedFor:
      'Recreational and competitive adult and veteran fencers attending open fencing sessions only',
    meets: 'Weeknights 7 PM · Saturdays 1 & 3–5 PM',
    rates: [{ label: 'Unlimited open fencing', amount: 'Call' }],
    source: 'clubSite',
  },
];

export const annualMembership = {
  name: 'Full Membership',
  amount: '$1,000',
  period: 'per year',
  summary: 'Covers all membership fees for the entire year.',
  savings: 'Works out at $560 less than paying monthly across the same twelve months.',
  includes: [
    'Unlimited classes — attend as often as you like all year long',
    'Unlimited open fencing — attend any open fencing session',
    'Free club tournaments — compete in all in-house events at no extra charge',
    'Access to all equipment for recreational fencing',
    'Discounts on camps and clinics',
    '20% off additional family members',
    'Thunder club affiliation and patch',
    'Club T-shirt',
    'Monthly reviews from your coaches on progress',
    'Free assistance and coaching at Oklahoma City area local tournaments',
    'Monthly newsletter',
  ],
  caveat: 'Competitive fencers must have their own equipment.',
  source: 'clubSite' as PriceSource,
};

export const registrationFee = {
  individual: '$150',
  family: '$250',
  /**
   * Same information as the club's site, set in plain body copy rather than
   * bold with asterisks. PRD §3.4 copy note.
   */
  policy:
    'The registration fee is charged again each time a membership is stopped and then renewed. The club does not use contracts, and this is how it discourages pausing memberships.',
  source: 'clubSite' as PriceSource,
};

export const usaFencing = {
  headline: 'from $34 per year',
  explanation:
    'All members must hold a current USA Fencing membership. The base membership covers you in case of injury and allows you to enter individual tournaments.',
  link: 'https://www.usafencing.org/membership',
  source: 'clubSite' as PriceSource,
};

export const introOfferings = [
  {
    id: 'intro-course',
    name: 'Beginner course',
    amount: '$100',
    detail: 'One month, meets every Saturday. All equipment provided.',
    source: 'oklahomaToday' as PriceSource,
  },
  {
    id: 'private-lesson',
    name: 'Private lessons',
    amount: '$30–$50',
    detail: 'Weekdays 11 AM to 5 PM, by arrangement with a coach.',
    source: 'oklahomaToday' as PriceSource,
  },
];

export const sourceNote =
  'Figures marked with a dagger came from the March 2026 Oklahoma Today feature rather than the club’s own published pricing. Call the club to confirm before booking.';
