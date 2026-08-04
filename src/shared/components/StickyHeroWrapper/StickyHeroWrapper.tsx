// shared/components/StickyHero/StickyHeroWrapper.tsx
import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion';

interface StickyHeroWrapperProps {
  children?: React.ReactNode;
  videoSrc?: string;
  scrollMultiplier?: number;
  resetScrollOnMount?: boolean;
}

const StickyHeroWrapper = ({
  children,
  videoSrc,
  scrollMultiplier = 2.5,
  resetScrollOnMount = true,
}: StickyHeroWrapperProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const spacerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const [heroHeight, setHeroHeight] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);

  const hasVideo = Boolean(videoSrc);

  useLayoutEffect(() => {
    if (resetScrollOnMount) {
      window.scrollTo(0, 0);
    }
  }, [resetScrollOnMount]);

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

  const spacerHeight = hasVideo ? heroHeight * scrollMultiplier : heroHeight;

  const { scrollYProgress } = useScroll({
    target: spacerRef,
    offset: ['start start', 'end start'],
  });

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

  const syncVideoToProgress = (duration: number) => {
    const video = videoRef.current;
    if (!video || !duration) return;
    const targetTime = scrubProgress.get() * duration;
    video.currentTime = targetTime;
  };

  // Robust duration detection: handles BOTH the cold-load case (event fires
  // normally) AND the cached-navigation case (metadata already available
  // by the time this effect runs, so the event may never fire).
  useEffect(() => {
    if (!hasVideo) return;
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      setVideoDuration(video.duration);
      syncVideoToProgress(video.duration);
    };

    // Already loaded (likely cached from a previous visit to this route)
    if (video.readyState >= 1 && video.duration) {
      handleLoadedMetadata();
    } else {
      video.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasVideo, videoSrc]);

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
