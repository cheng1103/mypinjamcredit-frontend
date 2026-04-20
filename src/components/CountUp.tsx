'use client';

import { useEffect, useRef, useState } from 'react';

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function CountUp({ end, duration = 2000, suffix = '', prefix = '', className = '' }: CountUpProps) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(true);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 检测性能：如果是低性能设备或启用了节能模式，直接显示最终值
    if (typeof window !== 'undefined') {
      const nav = navigator as unknown as {
        hardwareConcurrency?: number;
        deviceMemory?: number;
        userAgent?: string;
      };

      const isLowPerformance =
        // 检测CPU核心数
        (nav.hardwareConcurrency !== undefined && nav.hardwareConcurrency <= 2) ||
        // 检测设备内存（如果可用）
        (nav.deviceMemory !== undefined && nav.deviceMemory <= 2) ||
        // 检测是否是移动设备
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(nav.userAgent || navigator.userAgent);

      if (isLowPerformance) {
        setShouldAnimate(false);
        setCount(end);
        return;
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    const el = ref.current;
    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, [isVisible, end]);

  useEffect(() => {
    if (!isVisible || !shouldAnimate) return;

  let startTime: number | null = null;
  let animationFrame: number | null = null;

    const animate = (timestamp: number) => {
  if (startTime === null) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // 简化的easing函数
      const easeOut = 1 - Math.pow(1 - percentage, 2);
      setCount(Math.floor(end * easeOut));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame !== null) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [isVisible, end, duration, shouldAnimate]);

  return (
    <div ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </div>
  );
}
