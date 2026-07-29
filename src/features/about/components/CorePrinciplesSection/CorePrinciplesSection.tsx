import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import Reveal from '@/shared/components/Reveal/Reveal';
import SectionContainer from '@/shared/components/Container/SectionContainer';

const CorePrinciplesSection = () => {
  const [activePanel, setActivePanel] = useState<'vision' | 'mission' | null>(
    null
  );
  return (
    <SectionContainer
      heading="Core principle"
      footerHeading="See Further. Build better"
    >
      <motion.div
        className="mt-12 overflow-hidden rounded-4xl"
        animate={{
          gridTemplateColumns:
            activePanel === 'vision'
              ? '80% 20%'
              : activePanel === 'mission'
                ? '20% 80%'
                : '50% 50%',
        }}
        transition={{
          duration: 0.9,
          ease: [0.16, 1, 0.3, 1],
        }}
        style={{
          display: 'grid',
        }}
      >
        {/* VISION */}
        <Reveal>
          <div
            onMouseEnter={() => setActivePanel('vision')}
            onMouseLeave={() => setActivePanel(null)}
            className="group relative h-175 overflow-hidden"
          >
            <img
              loading="lazy"
              src="/vision.png"
              alt="Vision"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />
            <motion.div
              animate={{
                y: activePanel === 'vision' ? -500 : 0,
                // scale: activePanel === 'vision' ? 0.8 : 1,
                scale: 1,
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute bottom-14 left-10"
            >
              <h3 className="font-heading md:text-4xl text-2xl uppercase text-white">
                Vision
              </h3>
            </motion.div>
            <AnimatePresence>
              {activePanel === 'vision' && (
                <motion.div
                  initial={{
                    opacity: 0,
                    x: -40,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: -40,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute bottom-14 left-10 max-w-[90%]"
                >
                  <div className="max-w-6xl">
                    <h2 className="inline-block border-b border-white/20 pb-6 font-heading text-xl leading-none text-white md:text-2xl lg:text-4xl">
                      Building a Better Mumbai, One Landmark at a Time
                    </h2>

                    <p className="mt-8 max-w-6xl font-sans text-sm leading-[1.75] text-white/90 md:text-lg md:leading-[1.6]">
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
            onMouseEnter={() => setActivePanel('mission')}
            onMouseLeave={() => setActivePanel(null)}
            className="group relative h-175 overflow-hidden"
          >
            <img
              loading="lazy"
              src="/mission.png"
              alt="Mission"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

            <motion.div
              animate={{
                y: activePanel === 'mission' ? -500 : 0,
                // scale: activePanel === 'mission' ? 0.8 : 1,
                scale: 1,
              }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="absolute bottom-14 right-10 origin-top-right"
            >
              <h3 className="font-heading md:text-4xl text-2xl uppercase text-white">
                Mission
              </h3>
            </motion.div>
            <AnimatePresence>
              {activePanel === 'mission' && (
                <motion.div
                  initial={{
                    opacity: 0,
                    x: 40,
                  }}
                  animate={{
                    opacity: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    x: 40,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: 0.2,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="absolute bottom-14 right-10 max-w-[90%]"
                >
                  <div className="w-full text-right">
                    <h2 className="inline-block font-heading border-b border-white/20 pb-6 text-xl leading-none text-white md:text-2xl lg:text-4xl">
                      Driven by Commitment. Built on Trust.
                    </h2>
                    <p className="mt-8 text-sm leading-[1.75] text-white/90 md:text-lg md:leading-[1.6]">
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
