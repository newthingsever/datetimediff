import { ImageResponse } from 'next/og';

export const alt = 'Date Time Calculator — Free Online Date & Time Calculators';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #1e1b4b 100%)',
          color: '#ffffff',
          fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}
      >
        {/* Top Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: 'linear-gradient(135deg, #2563eb, #4f46e5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              boxShadow: '0 8px 24px rgba(37, 99, 235, 0.4)',
            }}
          >
            📅
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: '32px', fontWeight: 900, letterSpacing: '-0.02em' }}>
              Date Time Calculator<span style={{ color: '#38bdf8' }}>.</span>
            </span>
            <span style={{ fontSize: '16px', color: '#94a3b8', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
              Fast • Free • 100% Private
            </span>
          </div>
        </div>

        {/* Center Headline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', margin: '20px 0' }}>
          <h1
            style={{
              fontSize: '56px',
              fontWeight: 900,
              lineHeight: 1.15,
              letterSpacing: '-0.03em',
              margin: 0,
              background: 'linear-gradient(to right, #ffffff, #cbd5e1, #93c5fd)',
              backgroundClip: 'text',
              color: 'transparent',
            }}
          >
            How Many Years, Months & Days Between Two Dates
          </h1>
          <p style={{ fontSize: '24px', color: '#94a3b8', margin: 0, lineHeight: 1.4 }}>
            Instant client-side calculation with leap-year precision, working days, and time differences.
          </p>
        </div>

        {/* Feature Badges */}
        <div style={{ display: 'flex', gap: '16px' }}>
          {['Leap-Year Accurate', 'Zero Server Tracking', 'Overnight Time Difference', '100% Free'].map((pill) => (
            <div
              key={pill}
              style={{
                padding: '10px 20px',
                borderRadius: '999px',
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                fontSize: '16px',
                fontWeight: 600,
                color: '#e2e8f0',
              }}
            >
              {pill}
            </div>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
