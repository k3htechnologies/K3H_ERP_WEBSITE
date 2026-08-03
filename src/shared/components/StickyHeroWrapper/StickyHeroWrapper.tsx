// shared/components/StickyHero/StickyHeroWrapper.tsx
import React, { useLayoutEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion';

interface StickyHeroWrapperProps {
  children?: React.ReactNode;
  videoSrc?: string; // optional — enables scroll-scrubbed video mode
  scrollMultiplier?: number; // only relevant when videoSrc is provided
}

const StickyHeroWrapper = ({
  children,
  videoSrc,
  scrollMultiplier = 2.5,
}: StickyHeroWrapperProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [heroHeight, setHeroHeight] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);

  const hasVideo = Boolean(videoSrc);

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

  // Video mode gets extra scroll distance to scrub through; plain mode just
  // needs one viewport-height of spacer, same as the original behavior.
  const spacerHeight = hasVideo ? heroHeight * scrollMultiplier : heroHeight;

  const { scrollYProgress } = useScroll({
    target: spacerRef,
    offset: ['start start', 'end start'],
  });

  // In video mode, reserve the last 15% of scroll for the dim/scale hand-off.
  // In plain mode, the whole spacer IS the hand-off (matches original component).
  const scrubProgress = useTransform(scrollYProgress, [0, 0.85], [0, 1], {
    clamp: true,
  });
  const handoffProgress = hasVideo
    ? useTransform(scrollYProgress, [0.85, 1], [0, 1], { clamp: true })
    : scrollYProgress;

  const scale = useTransform(handoffProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(handoffProgress, [0, 1], [1, 0.4]);
  const brightness = useTransform(handoffProgress, [0, 1], [1, 0.6]);
  const filter = useTransform(brightness, (b) => `brightness(${b})`);

  useMotionValueEvent(scrubProgress, 'change', (progress) => {
    if (!hasVideo) return;
    const video = videoRef.current;
    if (!video || !videoDuration) return;

    const targetTime = progress * videoDuration;
    if (Math.abs(video.currentTime - targetTime) > 0.03) {
      video.currentTime = targetTime;
    }
  });

  return (
    <>
      <div
        ref={heroRef}
        className="fixed inset-x-0 top-0 z-0 h-screen w-full overflow-hidden"
      >
        <motion.div
          style={{ scale, opacity, filter }}
          className="relative h-full w-full"
        >
          {hasVideo && (
            <video
              ref={videoRef}
              src={videoSrc}
              muted
              playsInline
              preload="auto"
              className="h-full w-full object-cover"
              onLoadedMetadata={(e) =>
                setVideoDuration(e.currentTarget.duration)
              }
            />
          )}
          {children && (
            <div
              className={
                hasVideo ? 'absolute inset-0 z-10' : 'relative h-full w-full'
              }
            >
              {children}
            </div>
          )}
        </motion.div>
      </div>

      <div
        ref={spacerRef}
        style={{ height: spacerHeight }}
        aria-hidden="true"
      />
    </>
  );
};

export default StickyHeroWrapper;
