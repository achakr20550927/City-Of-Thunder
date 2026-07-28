/**
 * The class schedule as published on the club's own site. PRD §3.3.
 * This is programming, not building hours — see `buildingHours` in club.ts
 * for the "Open now" indicator.
 */

export type ScheduleEntry = {
  time: string;
  label: string;
  /** Optional supporting line, set below the label in steel. */
  note?: string;
};

export type ScheduleBlock = {
  id: string;
  days: string;
  entries: ScheduleEntry[];
};

export const schedule: ScheduleBlock[] = [
  {
    id: 'weekdays',
    days: 'Monday – Friday',
    entries: [
      { time: '11:00 AM', label: 'Private lessons', note: 'Through 5:00 PM, by arrangement' },
      { time: '5:00 PM', label: 'Group classes' },
      { time: '6:00 PM', label: 'Group classes' },
      { time: '7:00 PM', label: 'Open fencing' },
    ],
  },
  {
    id: 'saturday',
    days: 'Saturday',
    entries: [
      { time: '12:00 PM', label: 'Beginners, 12 and under', note: 'One-month course, starts the first Saturday of the month' },
      { time: '1:00 PM', label: 'Recreational and open fencing, 12 and under' },
      { time: '2:00 PM', label: 'Beginners, 13 and up through adult', note: 'One-month course, starts the first Saturday of the month' },
      { time: '3:00 PM', label: 'Recreational and open fencing', note: 'Through 5:00 PM' },
      { time: '6:00 PM', label: 'Lightsaber', note: 'Through 8:00 PM' },
    ],
  },
  {
    id: 'sunday',
    days: 'Sunday',
    entries: [{ time: '1:00 PM', label: 'Sabre class' }],
  },
];

/** Condensed form for the footer column. */
export const scheduleCondensed = [
  { days: 'Mon – Fri', detail: 'Lessons 11–5 · Classes 5 & 6 · Open fencing 7' },
  { days: 'Saturday', detail: 'Beginners 12 & 2 · Open 1 & 3–5 · Lightsaber 6–8' },
  { days: 'Sunday', detail: 'Sabre class 1' },
] as const;

export const beginnerCourse = {
  structure:
    'The beginner course runs one month and meets every Saturday. Kids 12 and under at noon, 13 and up at 2 PM. A new course starts the first Saturday of each month.',
  provided:
    'All equipment is provided. Bring athletic shoes, comfortable workout clothes and a water bottle.',
} as const;
