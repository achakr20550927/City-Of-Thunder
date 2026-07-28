'use client';

import { useId, useState } from 'react';
import { club } from '@/content/club';
import s from './TrialSignUp.module.css';
import f from '../Form.module.css';

/**
 * "Book a beginner trial class" — the conversion-focused band, just before the
 * photo grid and close. Everything above this section is credibility work; this
 * section exists to close.
 *
 * The form posts to the same /api/enquiry route as /book. It captures the same
 * fields, plus a `source` of 'home-trial' so the club can see how many
 * bookings came off the home page vs the dedicated flow.
 */

const AGES = [
  { value: 'u12', label: 'Under 12' },
  { value: 'teen', label: '13 – 17' },
  { value: 'adult', label: '18 or older' },
  { value: 'multiple', label: 'A whole family' },
];

export default function TrialSignUp() {
  const id = useId();
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('sending');
    setErrors({});

    const data = new FormData(e.currentTarget);
    const age = String(data.get('age') ?? 'adult');
    /* The intro course splits into two Saturday sessions: noon for kids,
       2 PM for teens and adults. Route the booking to the right one. */
    const serviceVariationId = age === 'u12' ? 'intro-u12' : 'intro-13plus';
    const startAt = data.get('date')?.toString() || null;

    const res = await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        kind: 'booking',
        source: 'home-trial',
        serviceVariationId,
        startAt,
        name: data.get('name'),
        email: data.get('email'),
        phone: data.get('phone'),
        participantAge: data.get('age'),
      }),
    }).catch(() => null);

    if (!res?.ok) {
      const payload = await res?.json().catch(() => null);
      setErrors(
        payload?.errors ?? {
          form: `That didn’t send. Call the club on ${club.phone} — they book people over the phone all day.`,
        }
      );
      setState('idle');
      return;
    }
    setState('done');
  }

  return (
    <section
      id="trial"
      className="band band--paper"
      data-reveal
      aria-labelledby="trial-heading"
    >
      <span className="band__rule" aria-hidden="true" />
      <span className="band__index" aria-hidden="true">
        09 · Beginner trial class
      </span>

      <div className="container">
        <div className={s.grid}>
          <div className={s.left}>
            <span className="eyebrow">Come and try it</span>
            <h2 id="trial-heading" className={`${s.title} t-display-l`}>
              Your first Saturday is on us.
            </h2>
            <p className={`${s.lead} t-body-l`}>
              Show up to the beginner class this Saturday and try it. Kids at
              noon, teens and adults at 2 PM. Bring athletic shoes and a water
              bottle. We provide the mask, jacket, glove and blade.
            </p>

            <ul className={s.assurances}>
              <li>
                <span className={`${s.tick} tnum`} aria-hidden="true">
                  ✓
                </span>
                <span>No experience, no equipment, no commitment.</span>
              </li>
              <li>
                <span className={`${s.tick} tnum`} aria-hidden="true">
                  ✓
                </span>
                <span>Coach Ribaudo teaches most of the intro sessions.</span>
              </li>
              <li>
                <span className={`${s.tick} tnum`} aria-hidden="true">
                  ✓
                </span>
                <span>The club will call or text to confirm your slot.</span>
              </li>
            </ul>
          </div>

          {state === 'done' ? (
            <div className={`card ${s.confirm}`} role="status">
              <span className="eyebrow">You&rsquo;re on the list</span>
              <p className={`${s.confirmTitle} t-display-s`}>
                See you on the strip.
              </p>
              <p className={`${s.confirmBody} t-body`}>
                Someone from the club will call or text to confirm the exact
                Saturday and answer any questions. Nothing is charged and
                nothing is final until they do.
              </p>
              <p className={`${s.confirmBody} t-body-s`}>
                Questions in the meantime? Call{' '}
                <a href={club.phoneHref} className="link-brass">
                  {club.phone}
                </a>
                .
              </p>
            </div>
          ) : (
            <form className={`card ${s.form}`} onSubmit={onSubmit} noValidate>
              <h3 className={`${s.formTitle} t-display-s`}>
                Sign up for a trial class
              </h3>

              {errors.form && (
                <p className={f.formError} role="alert">
                  {errors.form}
                </p>
              )}

              <div className={f.row}>
                <Field
                  id={`${id}-name`}
                  name="name"
                  label="Your name"
                  error={errors.name}
                  required
                />
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
                  label="Phone or text"
                  error={errors.phone}
                  required
                />
                <div className={f.field}>
                  <label className="field-label" htmlFor={`${id}-age`}>
                    Who&rsquo;s fencing
                  </label>
                  <select
                    className="input"
                    id={`${id}-age`}
                    name="age"
                    defaultValue="adult"
                  >
                    {AGES.map((a) => (
                      <option key={a.value} value={a.value}>
                        {a.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={f.actions}>
                <button
                  type="submit"
                  className="btn btn--primary"
                  disabled={state === 'sending'}
                >
                  {state === 'sending' ? 'Sending…' : 'Sign up'}
                </button>
                <a href={club.phoneHref} className="btn btn--secondary">
                  Or call {club.phone}
                </a>
              </div>

              <p className={`${s.smallprint} t-body-s`}>
                This sends a request, not a payment. The club calls or texts to
                confirm your slot, usually the same day.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}

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
      <span
        className="field-error"
        id={`${id}-error`}
        role="alert"
        aria-live="polite"
      >
        {error}
      </span>
    </div>
  );
}
