import { motion } from 'framer-motion';

import Reveal from '@/shared/components/Reveal/Reveal';
import SectionContainer from '@/shared/components/Container/SectionContainer';
import {
  COMMUNITY_FEATURES,
  FAMILY_EASE,
  familycontainerVariants,
  familyimageVariants,
  familyitemVariants,
} from '@/features/lifestyle/constants/lifestyle.constants';

const OneFamilySection = () => {
  return (
    <SectionContainer
      bgClassName="bg-background-dark"
      heading={
        <>
          <span className="text-white">One</span>{' '}
          <span className="text-primary">Family</span>
        </>
      }
      sideDescription={
        <span className="uppercase text-white/80">Community Ecosystem</span>
      }
    >
      <div className="mt-10 grid gap-12 lg:grid-cols-[1fr_1.05fr] lg:items-center">
        {/* Left */}
        <Reveal>
          <motion.div
            variants={familycontainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h3
              variants={familyitemVariants}
              className="max-w-md text-cormorant-garamond text-4xl leading-tight text-white md:text-5xl"
            >
              Where Neighbours
              <br />
              Become Family
            </motion.h3>

            <motion.p
              variants={familyitemVariants}
              className="mt-8 max-w-lg text-montserrat leading-8 text-white/70"
            >
              Thoughtfully designed spaces that bring people together, creating
              a community where meaningful connections grow naturally and every
              generation feels at home.
            </motion.p>

            <motion.div
              variants={familycontainerVariants}
              className="mt-10 grid gap-4 sm:grid-cols-2"
            >
              {COMMUNITY_FEATURES.map((item) => (
                <motion.div
                  key={item.title}
                  variants={familyitemVariants}
                  whileHover={{
                    y: -6,
                    transition: {
                      duration: 0.3,
                      ease: FAMILY_EASE,
                    },
                  }}
                  className="rounded-2xl border border-white/10 bg-white/4 p-6 backdrop-blur-sm"
                >
                  <h4 className="text-cormorant-garamond text-lg text-white">
                    {item.title}
                  </h4>

                  <p className="mt-3 text-sm leading-7 text-white/65">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </Reveal>

        {/* Right */}
        <Reveal>
          <motion.div
            variants={familyimageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            whileHover={{
              scale: 1.015,
            }}
            transition={{
              duration: 0.35,
              ease: FAMILY_EASE,
            }}
            className="relative"
          >
            <div className="overflow-hidden rounded-4xl">
              <img
                src="/one-family.jpeg"
                alt="Community Lifestyle"
                className="h-105 w-full object-cover md:h-137.5 xl:h-170"
              />
            </div>

            {/* Floating Statistics Card */}
            <motion.div
              initial={{
                opacity: 0,
                y: 20,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{ once: true }}
              transition={{
                delay: 0.35,
                duration: 0.7,
                ease: FAMILY_EASE,
              }}
              whileHover={{
                y: -4,
              }}
              className="absolute -bottom-5 md:-left-15 rounded-2xl px-7 py-6"
              style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <p className="font-serif text-4xl text-white">450+</p>

              <p className="mt-2 text-xs uppercase tracking-widest text-white/70">
                Community Experiences Curated Every Year
              </p>
            </motion.div>
          </motion.div>
        </Reveal>
      </div>
    </SectionContainer>
  );
};

export default OneFamilySection;
