import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'framer-motion';

interface Props {
  children?: React.ReactNode;
  videoSrc?: string;
  mobileVideoSrc?: string;
  posterSrc?: string;
  scrollMultiplier?: number;
  mobileScrollMultiplier?: number;
  resetScrollOnMount?: boolean;
}

const StickyHeroWrapper = ({
  children,
  videoSrc,
  mobileVideoSrc,
  posterSrc,
  scrollMultiplier = 2.5,
  mobileScrollMultiplier = 3.5,
  resetScrollOnMount = true,
}: Props) => {
  const spacerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const targetTimeRef = useRef(0);
  const seekingRef = useRef(false);

  const [duration, setDuration] = useState(0);
  const [isMobile] = useState(
    () => typeof window !== 'undefined' &&
      window.matchMedia('(max-width: 768px), (pointer: coarse)').matches
  );

  const src = isMobile && mobileVideoSrc ? mobileVideoSrc : videoSrc;
  const hasVideo = Boolean(src);
  const multiplier = isMobile ? mobileScrollMultiplier : scrollMultiplier;

  useLayoutEffect(() => {
    if (resetScrollOnMount) window.scrollTo(0, 0);
  }, [resetScrollOnMount]);

  // Use svh so the height doesn't change when the mobile address bar moves.
  // Spacer is in CSS units, so no ResizeObserver / state needed.
  const spacerHeight = hasVideo ? `${multiplier * 100}svh` : '100svh';

  const { scrollYProgress } = useScroll({
    target: spacerRef,
    offset: ['start start', 'end start'],
  });

  // Always call hooks unconditionally
  const scrubProgress = useTransform(scrollYProgress, [0, 0.85], [0, 1], { clamp: true });
  const videoHandoff = useTransform(scrollYProgress, [0.85, 1], [0, 1], { clamp: true });
  const handoff = hasVideo ? videoHandoff : scrollYProgress;

  const scale = useTransform(handoff, [0, 1], [1, 0.92]);
  const opacity = useTransform(handoff, [0, 1], [1, 0.4]);
  // Cheap dimming: overlay opacity instead of filter: brightness()
  const dim = useTransform(handoff, [0, 1], [0, 0.4]);

  // "Latest target wins" seeking: never queue seeks while one is in flight
  const requestSeek = () => {
    const v = videoRef.current;
    if (!v || seekingRef.current || !duration) return;
    if (Math.abs(v.currentTime - targetTimeRef.current) < 1 / 30) return;
    seekingRef.current = true;
    v.currentTime = targetTimeRef.current;
  };

  useEffect(() => {
    const v = videoRef.current;
    if (!v || !hasVideo) return;

    const onMeta = () => {
      setDuration(v.duration);
      // "Unlock" frame rendering on iOS / data-saver: play briefly, then pause
      v.play().then(() => v.pause()).catch(() => { });
    };
    const onSeeked = () => {
      seekingRef.current = false;
      requestSeek(); // catch up to the latest target
    };

    if (v.readyState >= 1 && v.duration) onMeta();
    else v.addEventListener('loadedmetadata', onMeta);
    v.addEventListener('seeked', onSeeked);

    // Some mobile browsers only start loading after a gesture
    const kick = () => v.load();
    window.addEventListener('touchstart', kick, { once: true, passive: true });

    return () => {
      v.removeEventListener('loadedmetadata', onMeta);
      v.removeEventListener('seeked', onSeeked);
      window.removeEventListener('touchstart', kick);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasVideo, src, duration]);

  useMotionValueEvent(scrubProgress, 'change', (p) => {
    targetTimeRef.current = p * duration;
    requestSeek();
  });

  return (
    <>
      <div className="fixed inset-x-0 top-0 z-0 h-svh w-full overflow-hidden bg-black">
        <motion.div
          style={{ scale, opacity, willChange: 'transform, opacity' }}
          className="relative h-full w-full"
        >
          {hasVideo && (
            <video
              ref={videoRef}
              src={src}
              poster={posterSrc}
              muted
              playsInline
              preload="auto"
              disablePictureInPicture
              className="h-full w-full object-cover"
            />
          )}
          <motion.div
            style={{ opacity: dim }}
            className="pointer-events-none absolute inset-0 z-5 bg-black"
          />
          {children && (
            <div className={hasVideo ? 'absolute inset-0 z-10' : 'relative h-full w-full'}>
              {children}
            </div>
          )}
        </motion.div>
      </div>
      <div ref={spacerRef} style={{ height: spacerHeight }} aria-hidden="true" />
    </>
  );
};

export default StickyHeroWrapper;