import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

import type { CountUpProps } from '@/shared/components/CountUp/CountUp.types';

const easeOutCubic = (t: number) => {
  return 1 - Math.pow(1 - t, 3);
};

const CountUp = ({
  end,
  duration = 2500,
  suffix = '',
  prefix = '',
  className = '',
  toLocalString = true,
}: CountUpProps) => {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, {
    once: true,
    margin: '-100px',
  });

  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let startTime: number | null = null;
    let frameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;

      const progress = Math.min((timestamp - startTime) / duration, 1);

      const eased = easeOutCubic(progress);

      setCount(Math.floor(eased * end));

      if (progress < 1) {
        frameId = requestAnimationFrame(animate);
      } else {
        setCount(end);
      }
    };

    frameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(frameId);
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {toLocalString ? count.toLocaleString() : count}
      {suffix}
    </span>
  );
};

export default CountUp;
