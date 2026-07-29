import React, { useEffect, useMemo, useRef, useState } from 'react';

import {
  BACKGROUND_TRANSITION_DISTANCE,
  HERO_BACKGROUND_IMAGES,
  HERO_CURSOR_IMAGES,
  SCALE_SCROLL_DISTANCE,
  TRAIL_LIFETIME,
  TRAIL_SPAWN_DELAY,
} from '@/shared/constants';
import type { TrailImage } from '@/features/home/types/home.type';

const HeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollY, setScrollY] = useState(0);
  const [trailImages, setTrailImages] = useState<TrailImage[]>([]);
  const imageIndexRef = useRef(0);
  const lastSpawnRef = useRef(0);
  const animationFrameRef = useRef<number | null>(null);

  // SCROLL
  useEffect(() => {
    const handleScroll = () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };
    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // POINTER TRAIL
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handlePointerMove = (e: PointerEvent) => {
      const now = performance.now();
      if (now - lastSpawnRef.current < TRAIL_SPAWN_DELAY) {
        return;
      }
      lastSpawnRef.current = now;
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = now;
      const newImage: TrailImage = {
        id,
        x,
        y,
        src: HERO_CURSOR_IMAGES[imageIndexRef.current],
      };
      imageIndexRef.current =
        (imageIndexRef.current + 1) % HERO_CURSOR_IMAGES.length;
      setTrailImages((prev) => {
        const updated = [...prev, newImage];
        return updated.slice(-12);
      });
      window.setTimeout(() => {
        setTrailImages((prev) => prev.filter((img) => img.id !== id));
      }, TRAIL_LIFETIME);
    };

    container.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    });

    return () => {
      container.removeEventListener('pointermove', handlePointerMove);
    };
  }, []);

  // SCALE ANIMATION
  const scale = useMemo(() => {
    const progress = Math.min(scrollY / SCALE_SCROLL_DISTANCE, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    return 1 - eased * 0.3;
  }, [scrollY]);

  // BACKGROUND TRANSITIONS
  const { currentBg, nextBg, currentTranslate, nextTranslate } = useMemo(() => {
    const transitionScroll = Math.max(scrollY - SCALE_SCROLL_DISTANCE, 0);
    const rawSection = transitionScroll / BACKGROUND_TRANSITION_DISTANCE;
    const activeSection = Math.min(
      Math.floor(rawSection),
      HERO_BACKGROUND_IMAGES.length - 2
    );
    const localProgress = rawSection - activeSection;
    const progress = Math.max(0, Math.min(localProgress, 1));
    const eased =
      progress < 0.5
        ? 8 * Math.pow(progress, 4)
        : 1 - Math.pow(-2 * progress + 2, 4) / 2;

    return {
      currentBg: HERO_BACKGROUND_IMAGES[activeSection],
      nextBg: HERO_BACKGROUND_IMAGES[activeSection + 1],
      currentTranslate: transitionScroll <= 0 ? 0 : -eased * 100,
      nextTranslate: transitionScroll <= 0 ? 100 : 100 - eased * 100,
    };
  }, [scrollY]);

  // LOGO ANIMATION
  const { logoY, logoOpacity } = useMemo(() => {
    //  starts after scaling finishes
    const start = SCALE_SCROLL_DISTANCE;
    const distance = 2800;
    const progress = Math.min(Math.max((scrollY - start) / distance, 0), 1);
    const eased = 1 - Math.pow(1 - progress, 2);
    const y = eased * 120;
    const scale = 0.8 + eased * 0.35;
    const opacity =
      progress < 0.08
        ? progress / 0.08
        : progress > 0.85
          ? (1 - progress) / 0.15
          : 1;

    return {
      logoY: y,
      logoOpacity: opacity,
      logoScale: scale,
    };
  }, [scrollY]);

  return (
    <section>
      <div className="relative h-[500vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* MOVING LOGO */}
          <div className="pointer-events-none absolute inset-0 z-5 overflow-hidden">
            <img
              src="logo-black.png"
              alt="Logo"
              draggable={false}
              className="absolute left-1/2 top-1/2 will-change-transform"
              style={{
                height: '5rem',
                width: '9rem',
                opacity: logoOpacity,
                transform: `
                  translate3d(
                    -50%,
                    -${logoY}vh,
                    0
                  )
                `,
                filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.35))',
              }}
            />
          </div>
          {/* MARQUEE */}
          <div className="absolute inset-0 z-0 flex items-center overflow-hidden">
            <div className="hero-marquee">
              {/* TRACK 1 */}
              <div className="hero-marquee-track">
                {Array.from({ length: 12 }).map((_, index) => (
                  <span
                    key={`track-1-${index}`}
                    className="hero-marquee-item tracking-tighter text-montserrat text-7xl"
                  >
                    THE FUTURE OF REDEVELOPMENT IS HERE
                  </span>
                ))}
              </div>
              {/* TRACK 2 */}
              <div className="hero-marquee-track">
                {Array.from({ length: 12 }).map((_, index) => (
                  <span
                    key={`track-2-${index}`}
                    className="hero-marquee-item tracking-tighter text-montserrat"
                  >
                    THE FUTURE OF REDEVELOPMENT IS HERE
                  </span>
                ))}
              </div>
            </div>
          </div>
          {/* MAIN CONTAINER */}
          <div
            ref={containerRef}
            className=" relative z-10 h-screen w-screen overflow-hidden origin-center shadow-2xl will-change-transform
            "
            style={{
              transform: `scale(${scale})`,
            }}
          >
            {/* CURRENT BACKGROUND */}
            <div
              className="absolute inset-0 bg-cover bg-center will-change-transform"
              style={{
                backgroundImage: `url(${currentBg})`,
                transform: `
                  translate3d(
                    0,
                    ${currentTranslate}%,
                    0
                  )
                `,
              }}
            />
            {/* NEXT BACKGROUND */}
            {nextBg && (
              <div
                className="absolute inset-0 bg-cover bg-center will-change-transform"
                style={{
                  backgroundImage: `url(${nextBg})`,
                  transform: `
                    translate3d(
                      0,
                      ${nextTranslate}%,
                      0
                    )
                  `,
                }}
              />
            )}
            {/* OVERLAY */}
            <div className="absolute inset-0 z-1 bg-black/50" />
            {/* POINTER TRAIL */}
            {trailImages.map((img) => (
              <img
                key={img.id}
                src={img.src}
                alt=""
                draggable={false}
                className="animate-trail pointer-events-none absolute z-2 object-cover"
                style={{
                  left: img.x - 120,
                  top: img.y - 120,
                  width: '300px',
                  height: '300px',
                }}
              />
            ))}
            {/* HERO CONTENT */}
            <div className="absolute inset-0 z-20 flex items-center justify-center overflow-hidden">
              <div className="w-full px-4 md:px-10">
                <h1 className=" hero-heading w-full select-none text-center font-black uppercase leading-none tracking-[0.08em] text-white">
                  HRISHABRAJ
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
