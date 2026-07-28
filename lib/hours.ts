import { buildingHours } from '@/content/club';

/**
 * Computes open/closed against America/Chicago from the Google listing's
 * building hours — not the class schedule. PRD §3.3.
 *
 * Read the club's local time out of Intl rather than the visitor's clock, so a
 * visitor in another timezone still sees the truth about the building.
 */
export function getOpenState(now: Date = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Chicago',
    weekday: 'short',
    hour: 'numeric',
    minute: 'numeric',
    hour12: false,
  }).formatToParts(now);

  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? '';
  const dayIndex = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(get('weekday'));
  // Intl can render midnight as "24" in hour12:false; normalise it.
  const hour = Number(get('hour')) % 24;
  const minutes = hour * 60 + Number(get('minute'));

  const today = buildingHours[dayIndex];
  const isOpen = !!today && minutes >= today.open && minutes < today.close;

  let detail: string;
  if (isOpen) {
    detail = `Closes ${fmt(today!.close)}`;
  } else {
    // Walk forward to the next day that has hours.
    for (let i = 0; i < 8; i++) {
      const d = (dayIndex + i) % 7;
      const h = buildingHours[d];
      if (!h) continue;
      if (i === 0 && minutes < h.open) {
        detail = `Opens ${fmt(h.open)}`;
        return { isOpen, detail, dayIndex };
      }
      if (i > 0) {
        const dayName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][d];
        detail = i === 1 ? `Opens tomorrow ${fmt(h.open)}` : `Opens ${dayName} ${fmt(h.open)}`;
        return { isOpen, detail, dayIndex };
      }
    }
    detail = 'See the schedule';
  }

  return { isOpen, detail, dayIndex };
}

function fmt(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const suffix = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${h12} ${suffix}` : `${h12}:${String(m).padStart(2, '0')} ${suffix}`;
}
