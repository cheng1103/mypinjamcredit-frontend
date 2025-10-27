'use client';

import { useEffect, useRef, useState } from 'react';

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export function FadeInSection({ children, className = '', delay = 0 }: FadeInSectionProps) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 检测是否为移动设备 - 如果是，直接显示不做动画
    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setVisible(true);
          }, delay);
        }
      });
    });

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [delay]);

  return (
    <div
      ref={domRef}
      className={`md:transition-all md:duration-700 ${
        isVisible
          ? 'md:translate-y-0 opacity-100'
          : 'md:translate-y-10 md:opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  );
}
