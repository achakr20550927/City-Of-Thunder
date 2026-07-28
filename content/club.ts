/**
 * Club identity, location and contact.
 * Source: PRD §3.1, §3.2. Verified against the club's own site and Google listing.
 */

export const club = {
  name: 'City of Thunder Fencing Club',
  shortName: 'City of Thunder',
  alsoKnownAs: ['Oklahoma City Fencers Club', 'Team Thunder'],
  googleListingName: 'Oklahoma City Fencing Club',
  established: 1932,
  organizationFormed: 2016,
  founder: 'David Ribaudo',

  address: {
    street: '2501 W Memorial Rd, Ste 112',
    locality: 'Oklahoma City',
    region: 'OK',
    postalCode: '73134',
    inside: 'Quail Springs Mall',
    full: '2501 W Memorial Rd, Ste 112, Oklahoma City, OK 73134',
  },

  geo: { lat: 35.612934, lng: -97.559021 },
  googlePlaceId: 'ChIJ41-Y4r8dsocRB4ZCgDAqEkM',

  phone: '(405) 474-7030',
  phoneHref: 'tel:+14054747030',
  smsHref: 'sms:+14054747030',
  email: 'cityofthunderfencing@gmail.com',

  social: {
    instagram: 'https://www.instagram.com/thunderfencing/',
    facebook: 'https://www.facebook.com/thunderfencing',
  },

  mapsUrl:
    'https://www.google.com/maps/place/?q=place_id:ChIJ41-Y4r8dsocRB4ZCgDAqEkM',
  mapEmbedUrl:
    'https://www.google.com/maps?q=2501+W+Memorial+Rd+Ste+112,+Oklahoma+City,+OK+73134&output=embed',
} as const;

/**
 * Building hours from the Google Business listing — these differ from the class
 * schedule and are the source of truth for the "Open now" indicator only.
 * PRD §3.3. Index 0 = Sunday, matching Date#getDay().
 */
export const buildingHours: ReadonlyArray<{ open: number; close: number } | null> = [
  { open: 12 * 60, close: 18 * 60 }, // Sun 12:00–18:00
  { open: 11 * 60, close: 21 * 60 }, // Mon
  { open: 11 * 60, close: 21 * 60 }, // Tue
  { open: 11 * 60, close: 21 * 60 }, // Wed
  { open: 11 * 60, close: 21 * 60 }, // Thu
  { open: 11 * 60, close: 21 * 60 }, // Fri
  { open: 11 * 60, close: 21 * 60 }, // Sat
];

/** The club's credentials, stated once and reused. PRD §1.2. */
export const credentials = [
  'Founded 1932 — one of the oldest continuously operating fencing clubs in the country',
  'Ranked in the top 30 of roughly 500 US fencing clubs',
  'Regional headquarters for USA Fencing',
  'Head coach David Ribaudo is division chairman for USA Fencing',
  'Olympic program advisors Seth Kelsey and Natalie Vie',
  'Flags from 23 nations on the walls, marking where the club has competed',
] as const;
