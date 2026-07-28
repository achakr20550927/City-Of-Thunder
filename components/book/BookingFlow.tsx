'use client';

import { useEffect, useId, useMemo, useState } from 'react';
import { services, unavailable, likelyBusy, timezoneLabel } from '@/content/booking';
import { club } from '@/content/club';
import s from './Book.module.css';
import f from '../Form.module.css';

/**
 * The booking flow. PRD §6.3.
 *
 * Four steps: what, when, who, confirm. Phase 1 captures the request and a
 * human confirms — the confirmation copy says so plainly rather than implying
 * a seat is locked.
 */
export default function BookingFlow() {
  const id = useId();
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [slot, setSlot] = useState<{ date: string; time: string } | null>(null);
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmed, setConfirmed] = useState<{ service: string; when: string } | null>(null);

  /* Dates are computed after mount. Rendering them during SSR would key the
     calendar to the server's timezone and mismatch on hydration. */
  const [today, setToday] = useState<Date | null>(null);
  useEffect(() => setToday(new Date()), []);

  const service = services.find((sv) => sv.id === serviceId) ?? null;

  const week = useMemo(() => {
    if (!today || !service) return [];
    const days: { date: Date; iso: string; slots: { time: string; open: boolean }[] }[] = [];
    for (let i = 1; i <= 14; i++) {
      const d = new Date(today);
      d.setDate(d.getDate() + i);
      if (!service.days.includes(d.getDay())) continue;
      const iso = toISODate(d);
      days.push({
        date: d,
        iso,
        slots: service.times.map((time) => ({
          time,
          open:
            !unavailable.has(`${service.id}|${iso}|${time}`) &&
            !likelyBusy.has(`${service.id}|${time}`),
        })),
      });
      if (days.length >= 6) break;
    }
    return days;
  }, [today, service]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!service || !slot) return;
    setState('sending');
    setErrors({});

    const data = new FormData(e.currentTarget);
    const startAt = `${slot.date}T${slot.time}:00`;

    const res = await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        kind: 'booking',
        serviceVariationId: service.id,
        startAt,
        durationMinutes: service.durationMinutes,
        name: data.get('name'),
        email: data.get('email'),
        phone: data.get('phone'),
        participantAge: data.get('age'),
        experience: data.get('experience'),
      }),
    }).catch(() => null);

    if (!res?.ok) {
      const payload = await res?.json().catch(() => null);
      setErrors(
        payload?.errors ?? {
          form: `That did not send. Call the club on ${club.phone} — they book people over the phone all day.`,
        }
      );
      setState('idle');
      return;
    }

    setConfirmed({ service: service.name, when: `${longDate(slot.date)} at ${fmtTime(slot.time)}` });
    setState('done');
  }

  if (state === 'done' && confirmed) {
    return (
      <div className={`card ${f.confirm}`} role="status">
        <span className="eyebrow">Requested</span>
        <p className={`${f.confirmTitle} t-display-s`}>
          {confirmed.service} — {confirmed.when}.
        </p>
        <p className={`${f.confirmBody} t-body`}>
          The club will call or text to confirm. Nothing is charged and nothing
          is final until they do.
        </p>
        <hr className="hairline" />
        <dl className={s.confirmDetails}>
          <div>
            <dt>Where</dt>
            <dd>
              {club.address.street}, {club.address.locality}
              <br />
              Inside {club.address.inside}
              <br />
              <a className="link-brass" href={club.mapsUrl} target="_blank" rel="noopener noreferrer">
                Open in Maps <span aria-hidden="true">↗</span>
              </a>
            </dd>
          </div>
          <div>
            <dt>What to bring</dt>
            <dd>
              Athletic shoes, comfortable workout clothes and a water bottle.
              Everything else is provided.
            </dd>
          </div>
          <div>
            <dt>Need to change it</dt>
            <dd>
              <a className="link-brass" href={club.phoneHref}>
                {club.phone}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    );
  }

  return (
    <form className={s.flow} onSubmit={onSubmit} noValidate>
      {/* ------------------------------------------------ 1 · what */}
      <fieldset className={s.step}>
        <legend className={s.stepLegend}>
          <span className={`${s.stepNum} t-utility-sm`}>01</span>
          <span className={`${s.stepTitle} t-display-m`}>What are you booking?</span>
        </legend>

        <div className={s.services}>
          {services.map((sv) => (
            <label
              key={sv.id}
              className={`card ${s.service} ${serviceId === sv.id ? s.serviceOn : ''}`}
            >
              <input
                type="radio"
                name="service"
                value={sv.id}
                checked={serviceId === sv.id}
                onChange={() => {
                  setServiceId(sv.id);
                  setSlot(null);
                }}
                className={s.srInput}
              />
              <span className={`${s.serviceName} t-display-s`}>{sv.name}</span>
              <span className={`${s.serviceWho} t-body-s`}>{sv.who}</span>
              <span className={s.serviceFoot}>
                <span className={`${s.servicePrice} tnum`}>{sv.price}</span>
                <span className={`${s.serviceDays} t-utility-sm`}>{sv.daysLabel}</span>
              </span>
              {sv.priceNote && <span className={`${s.serviceNote} t-body-s`}>{sv.priceNote}</span>}
            </label>
          ))}
        </div>
      </fieldset>

      {/* ------------------------------------------------ 2 · when */}
      <fieldset className={s.step} disabled={!service}>
        <legend className={s.stepLegend}>
          <span className={`${s.stepNum} t-utility-sm`}>02</span>
          <span className={`${s.stepTitle} t-display-m`}>When?</span>
        </legend>

        {!service ? (
          <p className={`${s.hint} t-body`}>Choose what you’re booking first.</p>
        ) : !today ? (
          <p className={`${s.hint} t-body`}>Loading dates…</p>
        ) : (
          <>
            <p className={`${s.tz} t-utility-sm`}>All times {timezoneLabel}</p>
            <div className={s.week}>
              {week.map((day) => (
                <div key={day.iso} className={s.day}>
                  <span className={`${s.dayName} t-utility-sm`}>{weekday(day.date)}</span>
                  <span className={`${s.dayDate} t-utility-sm tnum`}>{shortDate(day.date)}</span>
                  <div className={s.slots}>
                    {day.slots.map((sl) => {
                      const on = slot?.date === day.iso && slot?.time === sl.time;
                      return (
                        <label
                          key={sl.time}
                          className={`${s.slot} ${on ? s.slotOn : ''} ${
                            sl.open ? '' : s.slotOff
                          }`}
                        >
                          <input
                            type="radio"
                            name="slot"
                            className={s.srInput}
                            disabled={!sl.open}
                            checked={on}
                            onChange={() => setSlot({ date: day.iso, time: sl.time })}
                          />
                          <span className="tnum">{fmtTime(sl.time)}</span>
                          {!sl.open && <span className={s.slotOffLabel}>Full</span>}
                        </label>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            {errors.startAt && (
              <p className="field-error" role="alert">
                {errors.startAt}
              </p>
            )}
          </>
        )}
      </fieldset>

      {/* ------------------------------------------------ 3 · who */}
      <fieldset className={s.step} disabled={!slot}>
        <legend className={s.stepLegend}>
          <span className={`${s.stepNum} t-utility-sm`}>03</span>
          <span className={`${s.stepTitle} t-display-m`}>Who’s coming?</span>
        </legend>

        <div className={s.who}>
          <div className={f.row}>
            <Field id={`${id}-name`} name="name" label="Name" error={errors.name} required />
            <Field
              id={`${id}-email`}
              name="email"
              type="email"
              label="Email"
              error={errors.email}
              required
            />
          </div>
          <div className={f.row}>
            <Field
              id={`${id}-phone`}
              name="phone"
              type="tel"
              label="Phone"
              error={errors.phone}
              required
            />
            <Field
              id={`${id}-age`}
              name="age"
              type="number"
              label="Age of the person fencing"
              error={errors.age}
            />
          </div>
          <div className={f.field}>
            <label className="field-label" htmlFor={`${id}-exp`}>
              Have you fenced before?
            </label>
            <select className="input" id={`${id}-exp`} name="experience" defaultValue="never">
              <option value="never">No, never</option>
              <option value="tried">Tried it once or twice</option>
              <option value="lapsed">Fenced before, coming back to it</option>
              <option value="current">Currently fencing at another club</option>
            </select>
          </div>
        </div>
      </fieldset>

      {/* ------------------------------------------------ 4 · confirm */}
      <div className={s.step}>
        <span className={s.stepLegend}>
          <span className={`${s.stepNum} t-utility-sm`}>04</span>
          <span className={`${s.stepTitle} t-display-m`}>Confirm</span>
        </span>

        <div className={`card ${s.summary}`}>
          <dl className={s.summaryList}>
            <div>
              <dt>Booking</dt>
              <dd>{service?.name ?? <span className={s.pending}>Not chosen yet</span>}</dd>
            </div>
            <div>
              <dt>When</dt>
              <dd>
                {slot ? (
                  `${longDate(slot.date)}, ${fmtTime(slot.time)}`
                ) : (
                  <span className={s.pending}>Not chosen yet</span>
                )}
              </dd>
            </div>
            <div>
              <dt>Cost</dt>
              <dd className="tnum">
                {service?.price ?? <span className={s.pending}>—</span>}
              </dd>
            </div>
          </dl>

          {errors.form && (
            <p className={f.formError} role="alert">
              {errors.form}
            </p>
          )}

          <div className={f.actions}>
            <button
              type="submit"
              className="btn btn--primary"
              disabled={!service || !slot || state === 'sending'}
            >
              {state === 'sending' ? 'Sending…' : 'Request this class'}
            </button>
            <a href={club.phoneHref} className="btn btn--secondary">
              Or call {club.phone}
            </a>
          </div>

          <p className={`${s.smallprint} t-body-s`}>
            This sends a request, not a payment. The club calls or texts to
            confirm, usually the same day.
          </p>
        </div>
      </div>
    </form>
  );
}

/* ------------------------------------------------------------------ bits */

function Field({
  id,
  name,
  label,
  type = 'text',
  error,
  required,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  error?: string;
  required?: boolean;
}) {
  return (
    <div className={f.field}>
      <label className="field-label" htmlFor={id}>
        {label}
        {required && <span className="sr-only"> (required)</span>}
      </label>
      <input
        className="input"
        id={id}
        name={name}
        type={type}
        required={required}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <span className="field-error" id={`${id}-error`} role="alert" aria-live="polite">
        {error}
      </span>
    </div>
  );
}

function toISODate(d: Date) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(
    d.getDate()
  ).padStart(2, '0')}`;
}

function weekday(d: Date) {
  return d.toLocaleDateString('en-US', { weekday: 'short' });
}

function shortDate(d: Date) {
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function longDate(iso: string) {
  const [y, m, day] = iso.split('-').map(Number);
  return new Date(y, m - 1, day).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

function fmtTime(t: string) {
  const [h, m] = t.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m === 0 ? `${h12} ${suffix}` : `${h12}:${String(m).padStart(2, '0')} ${suffix}`;
}
