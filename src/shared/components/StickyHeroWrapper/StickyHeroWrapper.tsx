import React, { useLayoutEffect, useRef, useState } from 'react';

interface StickyHeroWrapperProps {
  children: React.ReactNode;
}

const StickyHeroWrapper = ({ children }: StickyHeroWrapperProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
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

  return (
    <>
      {/* Pinned behind everything, out of normal flow */}
      <div ref={heroRef} className="fixed inset-x-0 top-0 z-0 w-full">
        {children}
      </div>

      {/* Preserves scroll height so layout below isn't disturbed */}
      <div style={{ height: heroHeight }} aria-hidden="true" />
    </>
  );
};

export default StickyHeroWrapper;
