/**
 * Bookable services and static availability. PRD §6.3.
 *
 * PHASE 1: availability is the recurring class schedule, hard-coded here, with
 * a hand-maintained list of slots the club knows are full. Nothing here talks
 * to a calendar.
 *
 * PHASE 2: Square Appointments supplies real availability. The shapes below
 * deliberately mirror Square's `Booking` / `AppointmentSegment` — a service
 * variation id, a duration in minutes and an ISO start — so that swap is a
 * backend change with no form or data-model work.
 */

export type Service = {
  /** Maps to a Square `serviceVariationId` in phase 2. */
  id: string;
  name: string;
  price: string;
  priceNote?: string;
  durationMinutes: number;
  who: string;
  /** 0 = Sunday, matching Date#getDay(). */
  days: number[];
  /** Start times, 24h, in the club's local time. */
  times: string[];
  daysLabel: string;
};

export const services: Service[] = [
  {
    id: 'intro-u12',
    name: 'Intro class, 12 and under',
    price: '$100',
    priceNote: 'One-month course, meets every Saturday',
    durationMinutes: 60,
    who: 'Children aged 5 to 12 with no experience. All equipment provided.',
    days: [6],
    times: ['12:00'],
    daysLabel: 'Saturdays at noon',
  },
  {
    id: 'intro-13plus',
    name: 'Intro class, 13 and up',
    price: '$100',
    priceNote: 'One-month course, meets every Saturday',
    durationMinutes: 60,
    who: 'Teenagers and adults with no experience. All equipment provided.',
    days: [6],
    times: ['14:00'],
    daysLabel: 'Saturdays at 2 PM',
  },
  {
    id: 'private',
    name: 'Private lesson',
    price: '$30–$50',
    priceNote: 'Depending on the coach and the length',
    durationMinutes: 45,
    who: 'One-to-one with a coach, at any level. Book ahead.',
    days: [1, 2, 3, 4, 5],
    times: ['11:00', '12:00', '13:00', '14:00', '15:00', '16:00'],
    daysLabel: 'Weekdays, 11 AM to 5 PM',
  },
  {
    id: 'open-fencing',
    name: 'Open fencing drop-in',
    price: 'Call',
    priceNote: 'Included with membership',
    durationMinutes: 120,
    who: 'Recreational and competitive fencers. Bring your own kit or use the club’s.',
    days: [1, 2, 3, 4, 5, 6],
    times: ['19:00'],
    daysLabel: 'Weeknights at 7 PM, Saturdays 1 and 3 PM',
  },
];

/**
 * Slots the club knows are full, as `serviceId|YYYY-MM-DD|HH:mm`.
 * These render disabled rather than hidden — a full 2 PM Saturday tells a
 * visitor the class is worth turning up for. Keep this list short and current.
 */
export const unavailable = new Set<string>([]);

/**
 * Private lessons are booked around the coaches' actual afternoons, so the
 * midday hours go first. Marking the pattern here keeps the calendar honest
 * without pretending to real availability the club has not given us.
 */
export const likelyBusy = new Set(['private|15:00', 'private|16:00']);

export const timezoneLabel = 'Central time (America/Chicago)';
