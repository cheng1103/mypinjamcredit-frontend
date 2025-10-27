import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'MyPinjam Credit - Trusted Loan Advisor in Malaysia';
export const size = {
  width: 1200,
  height: 630
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #e0f2fe 30%, #bfdbfe 60%, #93c5fd 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
          fontFamily: 'system-ui, sans-serif'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}
        >
          <h1
            style={{
              fontSize: '72px',
              fontWeight: 'bold',
              color: '#1e40af',
              marginBottom: '20px',
              lineHeight: 1.2
            }}
          >
            MyPinjam Credit
          </h1>
          <p
            style={{
              fontSize: '36px',
              fontWeight: 600,
              color: '#475569',
              marginBottom: '40px'
            }}
          >
            Howard Loan Advisor
          </p>
          <p
            style={{
              fontSize: '28px',
              color: '#64748b',
              maxWidth: '900px',
              lineHeight: 1.4
            }}
          >
            Your Trusted Partner for Personal and Business Loans in Malaysia
          </p>
          <div
            style={{
              display: 'flex',
              marginTop: '60px',
              gap: '60px'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#1e40af' }}>5000+</div>
              <div style={{ fontSize: '20px', color: '#64748b' }}>Customers</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#1e40af' }}>RM 100M+</div>
              <div style={{ fontSize: '20px', color: '#64748b' }}>Funded</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: '48px', fontWeight: 'bold', color: '#1e40af' }}>4.9/5</div>
              <div style={{ fontSize: '20px', color: '#64748b' }}>Rating</div>
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}
