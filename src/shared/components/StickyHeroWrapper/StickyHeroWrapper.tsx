import React, { useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface StickyHeroWrapperProps {
  children: React.ReactNode;
}

const StickyHeroWrapper = ({ children }: StickyHeroWrapperProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const [heroHeight, setHeroHeight] = useState(0);

  useLayoutEffect(() => {
    if (!heroRef.current) return;

    const updateHeight = () =>
      setHeroHeight(heroRef.current?.offsetHeight ?? 0);
    updateHeight();

    const observer = new ResizeObserver(updateHeight);
    observer.observe(heroRef.current);
    window.addEventListener('resize', updateHeight);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateHeight);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: spacerRef,
    offset: ['start start', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.4]);
  const brightness = useTransform(scrollYProgress, [0, 1], [1, 0.6]);
  const filter = useTransform(brightness, (b) => `brightness(${b})`);

  return (
    <>
      {/* Pinned behind everything, out of normal flow */}
      <div
        ref={heroRef}
        className="fixed inset-x-0 top-0 z-0 w-full overflow-hidden"
      >
        <motion.div
          style={{
            scale,
            // opacity, filter
          }}
          className="h-full w-full"
        >
          {children}
        </motion.div>
      </div>

      {/* Preserves scroll height + drives the scroll-progress tracking above */}
      <div ref={spacerRef} style={{ height: heroHeight }} aria-hidden="true" />
    </>
  );
};

export default StickyHeroWrapper;
