import { motion, type Variants } from 'framer-motion';

import Reveal from '@/shared/components/Reveal/Reveal';
import CountUp from '@/shared/components/CountUp/CountUp';

const STATS = [
  {
    value: 15,
    suffix: '+',
    label: 'YEARS OF EXCELLENCE',
  },
  {
    value: 75,
    suffix: '',
    label: 'LANDMARK PROJECTS',
  },
  {
    value: 5000,
    suffix: '+',
    label: 'HAPPY FAMILIES',
  },
  {
    value: 70,
    suffix: 'L+',
    label: 'Sq.ft. In Planning & Progress',
  },
];

const statsContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const statCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function LegacySection() {
  return (
    <section className="py-16 lg:py-24">
      <div className="mx-auto w-full lg:px-20 px-10">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Left Content */}
          <Reveal>
            <div>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 56 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mb-6 h-1 bg-primary"
              />
              <h2 className="font-heading text-3xl font-bold leading-tight text-secondary md:text-5xl">
                The <span className="text-primary">H.Rishabraj</span> Legacy
              </h2>
              <p className="text-montserrat mt-12 max-w-2xl text-base font-medium leading-8 text-secondary/85 text-justify">
                Every landmark begins with a vision. Ours has always been to
                create homes that outlive trends and become part of the city's
                story. Guided by integrity, meticulous planning, and a
                relentless pursuit of excellence, H.Rishabraj continues to
                create spaces where families build memories and legacies find a
                lasting address.
              </p>
            </div>
          </Reveal>

          {/* Right Content */}
          <Reveal delay={0.15}>
            <div className="flex flex-col justify-between">
              <p className="text-montserrat max-w-xs self-start text-sm font-medium leading-6 text-secondary lg:self-end mt-10">
                Designed for Today, Remembered Forever.
              </p>
              <motion.div
                variants={statsContainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                className="mt-12 grid grid-cols-2 gap-4"
              >
                {STATS.map((item) => (
                  <motion.div
                    key={item.label}
                    variants={statCardVariants}
                    whileHover={{
                      x: 4,
                    }}
                    transition={{
                      duration: 0.2,
                    }}
                    className="border-l border-[#D9D9D9] p-4 pl-10 transition-colors hover:border-primary"
                  >
                    <div className="flex items-center gap-2">
                      <CountUp
                        className="font-heading text-3xl text-primary"
                        end={item.value!}
                        suffix={item.suffix}
                      />
                      {/* {index === 3 && (
                        <motion.svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          className="h-10 w-10 text-primary"
                          animate={{
                            y: [0, -4, 0],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        >
                          <path d="M12 21s7-6.5 7-12a7 7 0 1 0-14 0c0 5.5 7 12 7 12Z" />
                          <circle cx="12" cy="9" r="2.5" />
                        </motion.svg>
                      )} */}
                    </div>
                    <p className="text-montserrat mt-2 text-[11px] font-medium tracking-[0.22em] text-secondary/80">
                      {item.label}
                    </p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
