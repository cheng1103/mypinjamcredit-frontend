'use client';

import { useState } from 'react';
import { MapSkeleton } from './Skeleton';

export function GoogleMap() {
  const [isLoading, setIsLoading] = useState(true);
  // Wisma YNH Kiara 163, Mont Kiara
  // Level M, M-01a, Wisma YNH, Kiara 163, 8, Jalan Kiara, Mont Kiara, 50480 Kuala Lumpur
  const mapUrl = `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3983.7634!2d101.6491!3d3.1692!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31cc4911d25ac0c5%3A0x7b2b8b8c8d8e8f90!2sWisma%20YNH%2C%20Kiara%20163%2C%208%2C%20Jalan%20Kiara%2C%20Mont%20Kiara%2C%2050480%20Kuala%20Lumpur!5e0!3m2!1sen!2smy!4v1234567890`;

  return (
    <div className="h-full w-full overflow-hidden rounded-2xl border border-blue-100 shadow-sm">
      {isLoading && (
        <div className="absolute inset-0 z-10">
          <MapSkeleton />
        </div>
      )}
      <iframe
        src={mapUrl}
        width="100%"
        height="100%"
        style={{ border: 0, minHeight: '300px' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="MyPinjam Credit - Wisma YNH Kiara 163 Office"
        onLoad={() => setIsLoading(false)}
        className={`transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
      />
    </div>
  );
}
