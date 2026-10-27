import { useState } from 'react';
import type { MouseEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Reveal from '@/shared/components/Reveal/Reveal';
import SectionContainer from '@/shared/components/Container/SectionContainer';
import { useIsMobile } from '@/shared/hooks/useIsMobile';

type Panel = 'vision' | 'mission' | null;

const ease = [0.22, 1, 0.36, 1] as const;

const CorePrinciplesSection = () => {
  const [activePanel, setActivePanel] = useState<Panel>(null);
  const isMobile = useIsMobile();

  const [first, second] =
    activePanel === 'vision'
      ? ['80%', '20%']
      : activePanel === 'mission'
        ? ['20%', '80%']
        : ['50%', '50%'];

  const gridAnimate = isMobile
    ? { gridTemplateRows: `${first} ${second}`, gridTemplateColumns: '100%' }
    : { gridTemplateColumns: `${first} ${second}`, gridTemplateRows: '100%' };

  const handlePointerEnter =
    (panel: Panel) => (e: React.PointerEvent<HTMLDivElement>) => {
      if (e.pointerType === 'mouse') setActivePanel(panel);
    };

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === 'mouse') setActivePanel(null);
  };

  const handleClick = (panel: Panel) => (e: MouseEvent<HTMLDivElement>) => {
    const pointerType = (e.nativeEvent as PointerEvent).pointerType;
    setActivePanel((prev) =>
      prev === panel && pointerType !== 'mouse' ? null : panel
    );
  };

  return (
    <SectionContainer
      heading="Core principle"
      footerHeading="See Further. Build better"
    >
      <motion.div
        className="mt-12 h-160 overflow-hidden rounded-4xl md:h-175"
        initial={false}
        animate={gridAnimate}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{ display: 'grid' }}
      >
        {/* VISION */}
        <Reveal>
          <div
            onPointerEnter={handlePointerEnter('vision')}
            onPointerLeave={handlePointerLeave}
            onClick={handleClick('vision')}
            className="group relative h-full w-full cursor-pointer overflow-hidden"
          >
            <img
              loading="lazy"
              src="/vision.png"
              alt="Vision"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

            <motion.div
              animate={
                isMobile
                  ? { opacity: activePanel === 'vision' ? 0 : 1, y: 0 }
                  : { opacity: 1, y: activePanel === 'vision' ? -500 : 0 }
              }
              transition={{ duration: 0.8, ease }}
              className="pointer-events-none absolute bottom-6 left-5 md:bottom-14 md:left-10"
            >
              <h3 className="font-heading text-2xl uppercase text-white md:text-4xl">
                Vision
              </h3>
            </motion.div>

            <AnimatePresence>
              {activePanel === 'vision' && (
                <motion.div
                  initial={{ opacity: 0, x: isMobile ? 0 : -40, y: isMobile ? 20 : 0 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: isMobile ? 0 : -40, y: isMobile ? 20 : 0 }}
                  transition={{ duration: 0.5, delay: 0.2, ease }}
                  className="absolute bottom-6 left-5 right-5 md:bottom-14 md:left-10 md:right-auto md:max-w-[90%]"
                >
                  <div className="max-w-6xl">
                    <h2 className="inline-block border-b border-white/20 pb-4 font-heading text-xl leading-tight text-white md:pb-6 md:text-2xl md:leading-none lg:text-4xl">
                      Building a Better Mumbai, One Landmark at a Time
                    </h2>

                    <p className="mt-4 max-w-6xl font-sans text-sm leading-[1.75] text-white/90 md:mt-8 md:text-lg md:leading-[1.6]">
                      Our vision is to shape the future of Mumbai through
                      thoughtful redevelopment and responsible growth. We aspire
                      to create developments that stand the test of time, enrich
                      communities, and redefine urban living through quality,
                      trust, and innovation. Every project we undertake reflects
                      our commitment to building lasting value for generations
                      to come.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>

        {/* MISSION */}
        <Reveal delay={0.1}>
          <div
            onPointerEnter={handlePointerEnter('mission')}
            onPointerLeave={handlePointerLeave}
            onClick={handleClick('mission')}
            className="group relative h-full w-full cursor-pointer overflow-hidden"
          >
            <img
              loading="lazy"
              src="/mission.png"
              alt="Mission"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

            <motion.div
              animate={
                isMobile
                  ? { opacity: activePanel === 'mission' ? 0 : 1, y: 0 }
                  : { opacity: 1, y: activePanel === 'mission' ? -500 : 0 }
              }
              transition={{ duration: 0.8, ease }}
              className="pointer-events-none absolute bottom-6 left-5 origin-top-right md:bottom-14 md:left-auto md:right-10"
            >
              <h3 className="font-heading text-2xl uppercase text-white md:text-4xl">
                Mission
              </h3>
            </motion.div>

            <AnimatePresence>
              {activePanel === 'mission' && (
                <motion.div
                  initial={{ opacity: 0, x: isMobile ? 0 : 40, y: isMobile ? 20 : 0 }}
                  animate={{ opacity: 1, x: 0, y: 0 }}
                  exit={{ opacity: 0, x: isMobile ? 0 : 40, y: isMobile ? 20 : 0 }}
                  transition={{ duration: 0.5, delay: 0.2, ease }}
                  className="absolute bottom-6 left-5 right-5 md:bottom-14 md:left-auto md:right-10 md:max-w-[90%]"
                >
                  <div className="w-full text-left md:text-right">
                    <h2 className="inline-block border-b border-white/20 pb-4 font-heading text-xl leading-tight text-white md:pb-6 md:text-2xl md:leading-none lg:text-4xl">
                      Driven by Commitment. Built on Trust.
                    </h2>
                    <p className="mt-4 text-sm leading-[1.75] text-white/90 md:mt-8 md:text-lg md:leading-[1.6]">
                      Our mission is to deliver thoughtfully planned
                      developments that combine quality construction, timely
                      execution, and uncompromising integrity. Guided by strong
                      values and a customer-first approach, we strive to create
                      homes and spaces that enhance everyday living while
                      contributing to the city's evolving skyline and future.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </motion.div>
    </SectionContainer>
  );
};

export default CorePrinciplesSection;