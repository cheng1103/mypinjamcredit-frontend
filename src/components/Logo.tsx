import Image from 'next/image';

export function Logo({ size = 48, className = '' }: { size?: number; className?: string }) {
  // 如果有自定义logo图片，显示图片；否则显示默认样式
  // 将你的logo文件放在 /frontend/public/logo.png 或 /frontend/public/logo.svg
  const hasCustomLogo = true; // Logo已上传

  if (hasCustomLogo) {
    return (
      <div
        className={`flex items-center justify-center overflow-hidden rounded-full bg-white shadow-md ${className}`}
        style={{
          width: size,
          height: size,
          padding: '4px'
        }}
      >
        <Image
          src="/logo.png"
          alt="MyPinjam Credit Logo"
          width={size - 8}
          height={size - 8}
          className="object-contain rounded-full"
          priority
        />
      </div>
    );
  }

  // 默认logo样式
  return (
    <div
      className={`flex items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg ${className}`}
      style={{ width: size, height: size }}
    >
      <span className="text-white font-bold" style={{ fontSize: size * 0.4 }}>
        MP
      </span>
    </div>
  );
}
