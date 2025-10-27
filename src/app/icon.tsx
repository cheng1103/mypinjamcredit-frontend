import { ImageResponse } from 'next/og';

export const size = {
  width: 32,
  height: 32
};

export const contentType = 'image/png';

export default async function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'white',
          borderRadius: '50%'
        }}
      >
        <div
          style={{
            width: '90%',
            height: '90%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
            color: 'white',
            fontSize: 16,
            fontWeight: 'bold',
            borderRadius: '50%'
          }}
        >
          MP
        </div>
      </div>
    ),
    {
      ...size
    }
  );
}
