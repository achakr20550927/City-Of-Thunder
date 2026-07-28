/** Coaching staff. PRD §3.5. */

export type Coach = {
  id: string;
  name: string;
  weapon: string;
  role: 'head' | 'coach' | 'advisor';
  bio?: string;
  /** Manifest ID from PRD §9.5. Portraits come from the half-day shoot. */
  portrait?: string;
};

export const coaches: Coach[] = [
  {
    id: 'ribaudo',
    name: 'David Ribaudo',
    weapon: 'Épée',
    role: 'head',
    bio: 'Head coach and founder. Division chairman for USA Fencing. Fenced for the US Army from 1986 to 1997 and was a fencing scholarship athlete at Oklahoma City University.',
    portrait: 'COACH-01',
  },
  { id: 'james', name: 'Lonnie James', weapon: 'Épée', role: 'coach', portrait: 'COACH-02' },
  { id: 'brinsfield', name: 'Jaxon Brinsfield', weapon: 'Épée', role: 'coach', portrait: 'COACH-03' },
  { id: 'johnstone', name: 'Matt Johnstone', weapon: 'Sabre', role: 'coach', portrait: 'COACH-04' },
  {
    id: 'kelsey',
    name: 'Seth Kelsey',
    weapon: 'Épée',
    role: 'advisor',
    bio: 'Program advisor. US Olympian and World Champion, US Men’s Épée Team.',
    portrait: 'COACH-05',
  },
  {
    id: 'vie',
    name: 'Natalie Vie',
    weapon: 'Épée',
    role: 'advisor',
    bio: 'Program advisor. US Olympian and World Champion, US Women’s Épée Team.',
    portrait: 'COACH-06',
  },
];

/**
 * Quotes from Coach Ribaudo, published in Oklahoma Today (Brooke Carman,
 * March 2026). PRD §3.9.
 *
 * GATE: get written sign-off from the club before publishing these, and credit
 * the publication. Only `physicalChess` is used on the site today.
 */
export const ribaudoQuotes = {
  physicalChess:
    'It’s physical chess. People are moving and guessing in real time. It’s boxing without the concussions.',
  anyoneCanStart: 'Anyone can start. Anyone can pick up a blade and have a good time.',
  attribution: 'David Ribaudo, in Oklahoma Today, March 2026',
} as const;

export const programs = [
  'Épée',
  'Foil',
  'Sabre',
  'Lightsaber',
  'Private lessons',
  'Group classes',
  'Open fencing',
  'In-house tournaments',
  'Camps and clinics',
  'Youth tournaments',
] as const;
