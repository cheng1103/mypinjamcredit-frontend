'use client';

export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Animated gradient background - more visible */}
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #e0f2fe 30%, #bfdbfe 60%, #93c5fd 100%)',
          backgroundSize: '400% 400%',
          animation: 'gradient-shift 20s ease infinite'
        }}
      />

      {/* Floating geometric shapes - only on desktop for performance */}
      <div className="hidden md:block absolute left-[10%] top-[20%] h-64 w-64 rounded-full bg-gradient-to-br from-blue-400/30 to-sky-300/30 blur-3xl" style={{ animation: 'float 20s ease-in-out infinite' }} />
      <div className="hidden md:block absolute right-[15%] top-[60%] h-80 w-80 rounded-full bg-gradient-to-br from-sky-400/30 to-blue-300/30 blur-3xl" style={{ animation: 'float 25s ease-in-out infinite 5s' }} />
      <div className="hidden md:block absolute left-[60%] top-[10%] h-72 w-72 rounded-full bg-gradient-to-br from-blue-300/30 to-sky-400/30 blur-3xl" style={{ animation: 'float 30s ease-in-out infinite 10s' }} />
    </div>
  );
}
