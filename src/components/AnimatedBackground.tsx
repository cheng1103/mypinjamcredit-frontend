'use client';

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #e0f2fe 45%, #bfdbfe 100%)',
          backgroundSize: '200% 200%',
          animation: 'gradient-shift 15s ease infinite'
        }}
      />

      {/* Floating geometric shapes */}
      <div className="absolute left-[10%] top-[20%] h-64 w-64 rounded-full bg-gradient-to-br from-blue-300/20 to-sky-200/20 blur-3xl" style={{ animation: 'float 20s ease-in-out infinite' }} />
      <div className="absolute right-[15%] top-[60%] h-80 w-80 rounded-full bg-gradient-to-br from-sky-300/20 to-blue-200/20 blur-3xl" style={{ animation: 'float 25s ease-in-out infinite 5s' }} />
      <div className="absolute left-[60%] top-[10%] h-72 w-72 rounded-full bg-gradient-to-br from-blue-200/20 to-sky-300/20 blur-3xl" style={{ animation: 'float 30s ease-in-out infinite 10s' }} />

      {/* Subtle grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgb(59, 130, 246) 1px, transparent 1px),
            linear-gradient(to bottom, rgb(59, 130, 246) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />
    </div>
  );
}
