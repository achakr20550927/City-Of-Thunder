import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'City of Thunder Fencing Club — fencing lessons in Oklahoma City';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

/**
 * Purpose-built share image in the site's own palette. No club photography is
 * used — §8.6 keeps generated/composed imagery to type and marks only, never a
 * depiction of the club — so this is a typographic card, which also stays sharp
 * at any scale a social platform crops to.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#F4F4F1',
          padding: '72px 80px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 44,
              height: 44,
              background: '#000',
              borderRadius: 4,
              display: 'flex',
            }}
          />
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 26, fontWeight: 700, color: '#1B2231', letterSpacing: -0.5 }}>
              City of Thunder
            </span>
            <span style={{ fontSize: 13, color: '#767C85', letterSpacing: 3 }}>
              FENCING CLUB
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <span style={{ fontSize: 13, color: '#A67C34', letterSpacing: 3 }}>
            OKLAHOMA CITY · EST. 1932
          </span>
          <span
            style={{
              fontSize: 66,
              fontWeight: 700,
              color: '#1B2231',
              lineHeight: 1.05,
              letterSpacing: -2,
              maxWidth: 900,
            }}
          >
            Everything you need is in the bag.
          </span>
          <span style={{ fontSize: 26, color: '#767C85', maxWidth: 760 }}>
            Fencing lessons for kids and adults. No experience, no equipment —
            beginner courses start the first Saturday of every month.
          </span>
        </div>

        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <div style={{ width: 32, height: 2, background: '#A67C34' }} />
          <span style={{ fontSize: 18, color: '#1B2231', letterSpacing: 1 }}>
            Inside Quail Springs Mall · (405) 474-7030
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
