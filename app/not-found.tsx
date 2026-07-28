import Link from 'next/link';
import { club } from '@/content/club';

export default function NotFound() {
  return (
    <div className="container" style={{ paddingTop: 'calc(var(--header-h) + 120px)', paddingBottom: 160 }}>
      <span className="eyebrow">Not found</span>
      <h1 className="t-display-l" style={{ marginTop: 20, maxWidth: '18ch' }}>
        That page isn’t here — but the club is.
      </h1>
      <p className="t-body-l" style={{ marginTop: 20, color: 'var(--steel)', maxWidth: '46ch' }}>
        Try the schedule, the shop, or just call. Someone usually picks up.
      </p>
      <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
        <Link href="/" className="btn btn--primary">
          Back to home
        </Link>
        <a href={club.phoneHref} className="btn btn--secondary">
          Call {club.phone}
        </a>
      </div>
    </div>
  );
}
