import { motion, type Variants } from 'framer-motion';

import SectionContainer from '@/shared/components/Container/SectionContainer';
import Reveal from '@/shared/components/Reveal/Reveal';
import { useProjectDetailsContext } from '@/features/project-details/context/ProjectDetailsContext';

const PROJECT_DETAILS = [
  {
    label: 'Year of Completion',
    value: '2024',
  },
  {
    label: 'Architecture',
    value: 'Modernist Fusion',
  },
  {
    label: 'Total Acreage',
    value: '2.5 Acres',
  },
  {
    label: 'Ownership',
    value: 'Freehold',
  },
];

const detailsContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const detailItem: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function ProjectOverviewSection() {
  const { data } = useProjectDetailsContext();
  return (
    <SectionContainer>
      <section id="overview">
        <div className="grid gap-16 lg:grid-cols-[1.6fr_0.9fr] lg:gap-24">
          {/* Left Content */}
          <div>
            <Reveal>
              <div className="mb-10 flex items-center gap-5">
                <motion.span
                  initial={{ width: 0 }}
                  whileInView={{ width: 40 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.7,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="h-px bg-primary"
                />

                <h2 className="text-cormorant-garamond text-2xl font-medium uppercase tracking-wide text-secondary lg:text-4xl">
                  {data?.ProjectName}
                </h2>
              </div>
            </Reveal>

            <div className="max-w-2xl space-y-8 text-sm leading-6 text-[#44474B] text-montserrat">
              <Reveal delay={0.1}>
                <motion.p
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  Founded on the principles of precision and tranquility,
                  Ceremont is more than just a dwelling; it is a curated
                  experience for those who seek architectural integrity. Every
                  square foot has been designed to maximize light, air, and the
                  quiet joy of domestic life.
                </motion.p>
              </Reveal>

              <Reveal delay={0.2}>
                <motion.p
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7 }}
                >
                  Nestled in the emerging skyline of Borivali East, this project
                  stands as a testament to modern luxury. From the grand
                  entrance lobby to the private balconies, we've blended
                  heritage values with future-proof engineering to create a
                  legacy for 250+ families.
                </motion.p>
              </Reveal>
            </div>
          </div>

          {/* Right Details */}
          <Reveal delay={0.25}>
            <div className="border-l border-primary/15 pl-8 lg:pl-12">
              <motion.div
                variants={detailsContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="space-y-10"
              >
                {PROJECT_DETAILS.map((item) => (
                  <motion.div
                    key={item.label}
                    variants={detailItem}
                    whileHover={{
                      x: 6,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="group cursor-default"
                  >
                    <motion.p
                      className="text-montserrat mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary"
                      // whileHover={{
                      //   letterSpacing: '0.28em',
                      // }}
                      // transition={{
                      //   duration: 0.25,
                      // }}
                    >
                      {item.label}
                    </motion.p>

                    <motion.h3
                      className="text-cormorant-garamond text-xl font-medium leading-none text-secondary lg:text-3xl"
                      whileHover={{
                        color: '#B68D40',
                      }}
                      transition={{
                        duration: 0.25,
                      }}
                    >
                      {item.value}
                    </motion.h3>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </Reveal>
        </div>
      </section>
    </SectionContainer>
  );
}
