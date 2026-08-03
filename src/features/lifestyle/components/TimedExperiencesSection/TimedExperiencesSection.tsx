import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, animate } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import Reveal from '@/shared/components/Reveal/Reveal';
import SectionContainer from '@/shared/components/Container/SectionContainer';
import {
  EXPERIENCES,
  GAP,
  timedExpglassVariants,
  timedExpimageVariants,
  timedExpoverlayVariants,
} from '@/features/lifestyle/constants/lifestyle.constants';

const SPRING = { type: 'spring', stiffness: 300, damping: 34, mass: 0.6 } as const;

const TimedExperiencesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  const firstCardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const isDragging = useRef(false);

  useEffect(() => {
    if (!firstCardRef.current) return;
    const updateWidth = () => setCardWidth(firstCardRef.current?.offsetWidth ?? 0);
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(firstCardRef.current);
    window.addEventListener('resize', updateWidth);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth >= 1280) setVisibleCards(3);
      else if (window.innerWidth >= 640) setVisibleCards(2);
      else setVisibleCards(1);
    };
    updateVisibleCards();
    window.addEventListener('resize', updateVisibleCards);
    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  const maxIndex = Math.max(EXPERIENCES.length - visibleCards, 0);
  const step = cardWidth + GAP;

  // Sync the motion value to the active index — but never fight an in-progress drag.
  useEffect(() => {
    if (isDragging.current) return;
    const controls = animate(x, -step * currentIndex, SPRING);
    return () => controls.stop();
  }, [currentIndex, step]);

  const goTo = (index: number) => setCurrentIndex(Math.min(Math.max(index, 0), maxIndex));
  const next = () => goTo(currentIndex + 1);
  const prev = () => goTo(currentIndex - 1);

  const handleDragEnd = (
    _: unknown,
    info: { offset: { x: number }; velocity: { x: number } },
  ) => {
    isDragging.current = false;
    if (!step) return;

    // Add velocity so a quick flick can carry past one card, like a real carousel.
    const projected = info.offset.x + info.velocity.x * 0.2;
    const indexDelta = Math.round(-projected / step);
    goTo(currentIndex + indexDelta);
  };

  return (
    <SectionContainer
      heading={
        <>
          Timed <span className="text-primary">Experiences</span>
        </>
      }
      sideDescription={
        <div className="flex flex-col items-end gap-6">
          <span className="uppercase text-[#00658C]">EVERYDAY LUXURY</span>
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              disabled={currentIndex === 0}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#2C2C2C]/30 transition-all hover:bg-white disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ArrowLeft size={20} strokeWidth={1.8} />
            </button>
            <button
              onClick={next}
              disabled={currentIndex === maxIndex}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-[#2C2C2C]/30 transition-all hover:bg-white disabled:cursor-not-allowed disabled:opacity-35"
            >
              <ArrowRight size={20} strokeWidth={1.8} />
            </button>
          </div>
        </div>
      }
    >
      <Reveal>
        <div className="mt-14 overflow-hidden">
          <motion.div
            style={{ x }}
            drag="x"
            dragConstraints={{ left: -step * maxIndex, right: 0 }}
            dragElastic={0.08}
            dragMomentum={false}
            onDragStart={() => {
              isDragging.current = true;
            }}
            onDragEnd={handleDragEnd}
            className="flex cursor-grab gap-7 active:cursor-grabbing"
          >
            {EXPERIENCES.map((item, index) => (
              <div
                key={item.id}
                ref={index === 0 ? firstCardRef : undefined}
                className="shrink-0 basis-full sm:basis-[48%] lg:basis-[31.8%]"
                draggable={false}
              >
                <motion.div
                  initial="rest"
                  animate="rest"
                  whileHover="hover"
                  className="group relative overflow-hidden rounded-[34px]"
                >
                  <motion.img
                    variants={timedExpimageVariants}
                    src={item.image}
                    alt={item.title}
                    draggable={false}
                    className="h-85 w-full object-cover md:h-107.5 xl:h-125"
                  />
                  <motion.div
                    variants={timedExpoverlayVariants}
                    className="absolute inset-0 z-10 bg-linear-to-t from-black/80 via-black/10 to-transparent"
                  />
                  <motion.div
                    variants={timedExpglassVariants}
                    className="absolute bottom-5 left-5 right-5 z-20 rounded-3xl p-5 text-white"
                    style={{
                      background: 'rgba(255,255,255,0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    <h3 className="text-sm font-semibold text-primary text-cormorant-garamond">
                      {item.time}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-white/80 text-montserrat">
                      {item.title}
                    </p>
                    <p className="text-sx leading-6 text-white/50 text-montserrat">
                      {item.description}
                    </p>
                  </motion.div>
                </motion.div>
              </div>
            ))}
          </motion.div>
        </div>
      </Reveal>
    </SectionContainer>
  );
};

export default TimedExperiencesSection;