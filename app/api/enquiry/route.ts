import { NextResponse } from 'next/server';

/**
 * Phase 1 backend: capture the request, confirm by human. PRD §6.3.
 *
 * ── NOT WIRED TO ANYTHING YET ─────────────────────────────────────────────
 * This validates and logs. Before launch, add the two sends below:
 *   1. Email the club (Resend / Postmark / SendGrid — any of them, one call).
 *   2. Append a row to a Google Sheet so there is a record the club can sort.
 * Both need credentials from the club, which is Phase 0 work.
 *
 * The `booking` shape deliberately mirrors Square's `Booking` and
 * `AppointmentSegment` so the Phase 2 swap to the Appointments API is a
 * backend-only change — no form work, no data migration.
 */

type Payload = {
  kind: 'booking' | 'reservation';
  name: string;
  email: string;
  phone: string;
  /* booking */
  serviceVariationId?: string;
  startAt?: string;
  participantAge?: string;
  experience?: string;
  /* reservation */
  productId?: string;
  productName?: string;
  size?: string;
  notes?: string;
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'Could not read that request.' }, { status: 400 });
  }

  const errors: Record<string, string> = {};
  if (!body.name?.trim()) errors.name = 'Add a name so we know who to expect.';
  if (!EMAIL.test(body.email ?? '')) errors.email = 'That email address does not look right.';
  if (!body.phone?.trim()) errors.phone = 'Add a phone number — the club confirms by call or text.';

  if (body.kind === 'booking') {
    if (!body.serviceVariationId) errors.service = 'Choose what you are booking.';
    if (!body.startAt) errors.startAt = 'Choose a time.';
  }
  if (body.kind === 'reservation' && !body.productId) {
    errors.productId = 'Something went wrong identifying that item. Please call the club.';
  }

  if (Object.keys(errors).length) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  const record = {
    ...body,
    receivedAt: new Date().toISOString(),
    source: 'cityofthunder.com',
  };

  // TODO(phase-0): send to the club's inbox and append to the sheet.
  console.log('[enquiry]', JSON.stringify(record));

  return NextResponse.json({ ok: true });
}
