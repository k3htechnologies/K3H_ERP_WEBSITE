import { motion } from 'framer-motion';
import Reveal from '@/shared/components/Reveal/Reveal';

interface Stat {
  value: string;
  label: string;
}

const STATS: Stat[] = [
  {
    value: '75+',
    label: 'PROJECTS',
  },
  {
    value: '7M+',
    label: 'SQ.FT DELIVERED',
  },
  {
    value: '15',
    label: 'ONGOING',
  },
  {
    value: '2009',
    label: 'SINCE',
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export default function ProjectHero() {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-black">
      {/* Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="/videos/projects-bg.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-b from-black/70 via-black/30 to-black/60" />

      {/* Extra vignette */}
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-20 mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 sm:px-8">
        <div className="flex flex-1 items-center justify-center">
          <Reveal>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-center font-heading text-3xl font-black tracking-wider text-white md:text-5xl lg:text-[3rem] lg:leading-normal mt-36 lg:mt-52"
            >
              Building The Future,
              <br />
              Landmark by Landmark
            </motion.h1>
          </Reveal>
        </div>

        <div className="pb-10 md:pb-12 lg:pb-16">
          <Reveal>
            <p className="text-montserrat mx-auto mb-14 max-w-4xl text-center leading-relaxed text-white text-sm md:text-lg">
              Our portfolio reflects over two decades of creating homes and
              communities
              <br /> that redefine urban living.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.4 }}
              className="grid w-full max-w-5xl grid-cols-2 gap-4 lg:grid-cols-4 mx-auto"
            >
              {STATS.map((item) => (
                <motion.div
                  key={item.label}
                  variants={itemVariants}
                  whileHover={{ y: -6, scale: 1.03 }}
                  className="group rounded-2xl border border-white/10 bg-white/10 px-4 md:px-6 py-5 md:py-7 backdrop-blur-xl transition-colors hover:border-white/20 hover:bg-white/15 text-center"
                >
                  <h3 className="text-xl text-white md:text-4xl text-montserrat font-bold">
                    {item.value}
                  </h3>

                  <p className="mt-2 text-xs font-medium uppercase tracking-[0.25em] text-white/75 text-montserrat">
                    {item.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
