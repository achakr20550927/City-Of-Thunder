'use client';

import { useEffect, useState } from 'react';
import { getOpenState } from '@/lib/hours';
import { club } from '@/content/club';
import s from './TheWeek.module.css';

/**
 * The live open/closed indicator, computed against America/Chicago from the
 * Google listing's building hours. PRD §6.1.
 *
 * Rendered on the server first so it is correct before hydration, then kept
 * fresh on a one-minute tick. Colour is never the only signal — the words
 * "Open now" and "Closed" carry the meaning on their own.
 */
export default function OpenNow({
  initial,
}: {
  initial: ReturnType<typeof getOpenState>;
}) {
  const [state, setState] = useState(initial);

  useEffect(() => {
    const tick = () => setState(getOpenState());
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className={s.openNow}>
      <span className={`pill ${state.isOpen ? 'pill--open' : 'pill--closed'}`}>
        <span className="pill__dot" aria-hidden="true" />
        {state.isOpen ? 'Open now' : 'Closed'}
      </span>
      <span className={`${s.openDetail} t-utility-sm`}>{state.detail}</span>
      <a href={club.phoneHref} className={`${s.openPhone} t-utility-sm`}>
        {club.phone}
      </a>
    </div>
  );
}
