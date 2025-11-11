import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  quality?: number;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

/**
 * Optimized Image component that automatically:
 * - Converts images to WebP format
 * - Implements lazy loading by default
 * - Provides responsive images with srcset
 * - Shows loading placeholder
 * - Handles image errors gracefully
 */
export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  fill = false,
  sizes,
  quality = 85,
  objectFit = 'cover',
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Fallback image for errors
  const fallbackSrc = '/placeholder-image.svg';

  if (hasError) {
    return (
      <div
        className={`flex items-center justify-center bg-slate-100 ${className}`}
        style={{ width, height }}
      >
        <svg
          className="h-12 w-12 text-slate-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>
    );
  }

  const imageProps = {
    src,
    alt,
    className: `${className} ${isLoading ? 'blur-sm' : 'blur-0'} transition-all duration-300`,
    onLoad: () => setIsLoading(false),
    onError: () => setHasError(true),
    quality,
    priority,
    sizes: sizes || '100vw',
  };

  if (fill) {
    return (
      <div className="relative" style={{ width, height }}>
        <Image
          {...imageProps}
          fill
          style={{ objectFit }}
        />
        {isLoading && (
          <div className="absolute inset-0 animate-pulse bg-slate-200" />
        )}
      </div>
    );
  }

  return (
    <div className="relative inline-block">
      <Image
        {...imageProps}
        width={width || 800}
        height={height || 600}
        style={{ objectFit }}
      />
      {isLoading && (
        <div
          className="absolute inset-0 animate-pulse bg-slate-200"
          style={{ width, height }}
        />
      )}
    </div>
  );
}

/**
 * Avatar component with automatic fallback
 */
export function Avatar({
  src,
  alt,
  size = 40,
  className = '',
}: {
  src?: string;
  alt: string;
  size?: number;
  className?: string;
}) {
  const [hasError, setHasError] = useState(false);

  if (!src || hasError) {
    // Show initials as fallback
    const initials = alt
      .split(' ')
      .map(word => word.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);

    return (
      <div
        className={`flex items-center justify-center rounded-full bg-slate-700 text-white font-semibold ${className}`}
        style={{ width: size, height: size, fontSize: size / 2.5 }}
      >
        {initials}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      className={`rounded-full ${className}`}
      onError={() => setHasError(true)}
    />
  );
}

/**
 * Blog post image with aspect ratio maintenance
 */
export function BlogImage({
  src,
  alt,
  caption,
  className = '',
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
}) {
  return (
    <figure className={`my-8 ${className}`}>
      <OptimizedImage
        src={src}
        alt={alt}
        width={1200}
        height={675}
        className="w-full rounded-lg shadow-lg"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
      />
      {caption && (
        <figcaption className="mt-2 text-center text-sm text-slate-600">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/**
 * Logo component with optimized loading
 */
export function LogoImage({
  className = '',
  priority = true,
}: {
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src="/logo.png"
      alt="Money Line Solutions Logo"
      width={180}
      height={60}
      className={className}
      priority={priority}
      quality={90}
    />
  );
}
