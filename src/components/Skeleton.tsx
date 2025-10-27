export function Skeleton({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 bg-[length:200%_100%] ${className}`}
      style={{
        animation: 'shimmer 2s infinite linear'
      }}
    />
  );
}

export function MapSkeleton() {
  return (
    <div className="h-full w-full bg-slate-100 animate-pulse">
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-slate-300" />
          <div className="h-4 w-32 rounded bg-slate-300 mx-auto" />
        </div>
      </div>
    </div>
  );
}

export function ImageSkeleton({ className = '' }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-slate-200 ${className}`}>
      <div className="flex h-full items-center justify-center">
        <svg
          className="h-10 w-10 text-slate-300"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
            clipRule="evenodd"
          />
        </svg>
      </div>
    </div>
  );
}
