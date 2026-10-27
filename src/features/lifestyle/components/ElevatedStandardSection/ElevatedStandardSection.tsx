import { motion } from 'framer-motion';

import SectionContainer from '@/shared/components/Container/SectionContainer';
import Reveal from '@/shared/components/Reveal/Reveal';
import {
  ELEVATED_STANDARD_EASE,
  elevatedStandardCardVariants,
  elevatedStandardContainerVariants,
  FEATURES,
} from '@/features/lifestyle/constants/lifestyle.constants';

const ElevatedStandardSection = () => {
  return (
    <SectionContainer
      bgClassName="bg-background-dark"
      heading={
        <>
          <span className="text-white">Elevated</span>{' '}
          <span className="text-primary">Standard</span>
        </>
      }
      sideDescription={
        <span className="uppercase text-white/80">
          THE PILLARS OF EXCELLENCE
        </span>
      }
    >
      <Reveal>
        <motion.div
          variants={elevatedStandardContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-12 grid gap-5 grid-cols-2 xl:grid-cols-3"
        >
          {FEATURES.map((item) => (
            <motion.div
              key={item.id}
              variants={elevatedStandardCardVariants}
              whileHover={{
                y: -8,
                scale: 1.02,
                transition: {
                  duration: 0.35,
                  ease: ELEVATED_STANDARD_EASE,
                },
              }}
              className="group relative overflow-hidden rounded-2xl border border-white/15 bg-white/3 p-5 md:p-8 backdrop-blur-sm"
              style={{
                background:
                  'linear-gradient(317.86deg, rgba(255, 255, 255, 0.35) -38%, rgba(255, 255, 255, 0) 45.29%, rgba(255, 255, 255, 0.1225) 100%)',
              }}
            >
              {/* Gradient Glow */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.08),transparent_60%)] opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Hover Border */}
              <div className="absolute inset-0 rounded-2xl border border-transparent transition-colors duration-500 group-hover:border-primary/40" />

              <div className="relative z-10">
                <span className="font-heading text-3xl md:text-5xl text-white">
                  {item.id}
                </span>

                <h3 className="mt-5 text-cormorant-garamond font-bold text-xl md:text-3xl text-primary">
                  {item.title}
                </h3>

                <p className="mt-4 max-w-60 text-montserrat text-sm md:leading-7 text-white/65">
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </Reveal>
    </SectionContainer>
  );
};

export default ElevatedStandardSection;
