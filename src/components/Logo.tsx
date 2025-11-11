import Image from 'next/image';

export function Logo({
  size = 48,
  className = '',
  priority = false,
  variant = 'photo' // 'photo' 显示照片, 'icon' 显示图标样式
}: {
  size?: number;
  className?: string;
  priority?: boolean;
  variant?: 'photo' | 'icon';
}) {
  // 使用照片作为Logo
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-slate-100 to-slate-200 shadow-lg ring-2 ring-blue-500 ring-offset-2 ${className}`}
      style={{
        width: size,
        height: size
      }}
    >
      <Image
        src="/logo.png"
        alt="MyPinjam Credit - Professional Loan Advisory"
        width={size}
        height={size}
        className="object-cover rounded-full"
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        quality={95}
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
      />
      {/* 悬停效果 */}
      <div className="absolute inset-0 rounded-full bg-blue-600 opacity-0 transition-opacity duration-300 hover:opacity-10" />
    </div>
  );
}
