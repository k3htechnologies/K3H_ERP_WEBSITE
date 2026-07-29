import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
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

const TimedExperiencesSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);

  const firstCardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!firstCardRef.current) return;

    const updateWidth = () => {
      setCardWidth(firstCardRef.current?.offsetWidth ?? 0);
    };

    updateWidth();

    const observer = new ResizeObserver(updateWidth);
    observer.observe(firstCardRef.current);

    window.addEventListener('resize', updateWidth);

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  const [visibleCards, setVisibleCards] = useState(3);

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth >= 1280) {
        setVisibleCards(3);
      } else if (window.innerWidth >= 640) {
        setVisibleCards(2);
      } else {
        setVisibleCards(1);
      }
    };

    updateVisibleCards();

    window.addEventListener('resize', updateVisibleCards);

    return () => window.removeEventListener('resize', updateVisibleCards);
  }, []);

  const maxIndex = Math.max(EXPERIENCES.length - visibleCards, 0);

  const next = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prev = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
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
              disabled={currentIndex === EXPERIENCES.length - 1}
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
            animate={{
              x: -(cardWidth + GAP) * currentIndex,
            }}
            transition={{
              type: 'spring',
              stiffness: 120,
              damping: 24,
              mass: 0.8,
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x < -20) {
                next();
              } else if (info.offset.x > 20) {
                prev();
              }
            }}
            className="flex gap-7"
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
                  {/* Overlay */}
                  <motion.div
                    variants={timedExpoverlayVariants}
                    className="absolute inset-0 z-10 bg-linear-to-t from-black/80 via-black/10 to-transparent"
                  />
                  {/* Glass Card */}
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
