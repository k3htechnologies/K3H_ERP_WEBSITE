import { motion } from 'framer-motion';

import Reveal from '@/shared/components/Reveal/Reveal';
import SectionContainer from '@/shared/components/Container/SectionContainer';
import {
  GREEN_IMPACT_EASE,
  greenImpactContainerVariants,
  greenImpactImageVariants,
  greenImpactItemVariants,
  INITIATIVES,
  STATS,
} from '@/features/lifestyle/constants/lifestyle.constants';

const GreenImpactSection = () => {
  return (
    <SectionContainer
      heading={
        <>
          Green <span className="text-primary">Impact</span>
        </>
      }
      sideDescription={
        <span className="uppercase text-[#00658C]">RESPONSIBLE LIVING</span>
      }
    >
      <div className="mt-14 grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
        {/* Left Image */}
        <Reveal>
          <motion.div
            variants={greenImpactImageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            whileHover={{
              scale: 1.015,
            }}
            transition={{
              duration: 0.35,
              ease: GREEN_IMPACT_EASE,
            }}
            className="overflow-hidden rounded-4xl"
          >
            <img
              src="/green-impact.jpeg"
              alt="Green Impact"
              className="h-105 w-full object-cover md:h-130 xl:h-140"
            />
          </motion.div>
        </Reveal>

        {/* Right Content */}
        <Reveal>
          <motion.div
            variants={greenImpactContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            className="flex h-full flex-col"
          >
            <div className="space-y-6">
              {INITIATIVES.map((item) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.title}
                    variants={greenImpactItemVariants}
                    whileHover={{
                      y: -6,
                      scale: 1.015,
                      transition: {
                        duration: 0.3,
                        ease: GREEN_IMPACT_EASE,
                      },
                    }}
                    className="group flex items-center gap-5 rounded-[26px] bg-white px-7 py-6 shadow-[0_18px_40px_rgba(0,0,0,0.04)]"
                  >
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#EAF3F8] text-[#00658C] transition-all duration-300 group-hover:bg-[#00658C] group-hover:text-white">
                      <Icon size={26} strokeWidth={1.8} />
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-[#2A2A2A] text-montserrat">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-7 text-[#666] text-montserrat">
                        {item.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Statistics */}
            <motion.div
              variants={greenImpactContainerVariants}
              className="mt-12 grid grid-cols-2 gap-8"
            >
              {STATS.map((item) => (
                <motion.div
                  key={item.label}
                  variants={greenImpactItemVariants}
                  whileHover={{
                    y: -4,
                  }}
                >
                  <h4 className="text-cormorant-garamond text-5xl text-[#00658C] md:text-6xl">
                    {item.value}
                  </h4>

                  <p className="mt-2 text-xs uppercase tracking-[0.25em] text-[#777] text-montserrat">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Reveal>
      </div>
    </SectionContainer>
  );
};

export default GreenImpactSection;
