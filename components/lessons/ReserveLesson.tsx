'use client';

import { useId, useState } from 'react';
import { club } from '@/content/club';
import type { Lesson } from '@/content/lessons';
import s from './Lessons.module.css';
import f from '../Form.module.css';

export default function ReserveLesson({ lesson }: { lesson: Lesson }) {
  const id = useId();
  const [state, setState] = useState<'idle' | 'sending' | 'done'>('idle');
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('sending');
    setErrors({});
    const data = new FormData(e.currentTarget);
    const res = await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        kind: 'reservation',
        productId: lesson.id,
        productName: lesson.name,
        name: data.get('name'),
        email: data.get('email'),
        phone: data.get('phone'),
        notes: data.get('notes'),
      }),
    }).catch(() => null);
    if (!res?.ok) {
      const payload = await res?.json().catch(() => null);
      setErrors(
        payload?.errors ?? {
          form: `That did not send. Call ${club.phone} — the club takes bookings over the phone all day.`,
        }
      );
      setState('idle');
      return;
    }
    setState('done');
  }

  if (state === 'done') {
    return (
      <div className={`card ${f.confirm}`} role="status">
        <span className="eyebrow">Requested</span>
        <p className={`${f.confirmTitle} t-display-s`}>
          {lesson.name} — the club will confirm shortly.
        </p>
        <p className={`${f.confirmBody} t-body`}>
          A coach or the front desk will call or text within a day. Nothing is
          charged until you speak to them.
        </p>
        <p className={`${f.confirmBody} t-body`}>
          Questions before then —{' '}
          <a href={club.phoneHref} className="link-brass">{club.phone}</a>.
        </p>
      </div>
    );
  }

  return (
    <form className={f.form} onSubmit={onSubmit} noValidate>
      <p className={`${s.reserveIntro} t-body-s`}>
        Sends a request to the club. No payment now — someone confirms by phone
        or text, usually the same day.
      </p>
      {errors.form && (
        <p className={f.formError} role="alert">
          {errors.form}
        </p>
      )}
      <div className={f.row}>
        <Field id={`${id}-name`} name="name" label="Your name" error={errors.name} required />
        <Field id={`${id}-email`} name="email" type="email" label="Email" error={errors.email} required />
      </div>
      <Field id={`${id}-phone`} name="phone" type="tel" label="Phone" error={errors.phone} required />
      <div className={f.field}>
        <label className="field-label" htmlFor={`${id}-notes`}>Anything the coach should know (optional)</label>
        <textarea className="input" id={`${id}-notes`} name="notes" rows={3} placeholder="Age of the fencer, past experience, preferred dates" />
      </div>
      <div className={f.actions}>
        <button type="submit" className="btn btn--primary" disabled={state === 'sending'}>
          {state === 'sending' ? 'Sending…' : `Reserve · ${lesson.priceLabel}`}
        </button>
        <a href={club.phoneHref} className="btn btn--secondary">
          Call {club.phone}
        </a>
      </div>
    </form>
  );
}

function Field({ id, name, label, type = 'text', error, required }: { id: string; name: string; label: string; type?: string; error?: string; required?: boolean }) {
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
