import { motion } from 'framer-motion';

import Reveal from '@/shared/components/Reveal/Reveal';

const MediaHeroSection = () => {
  return (
    <section className="relative flex min-h-screen items-end overflow-hidden bg-black">
      {/* Background */}
      <img
        src="/media-hero.jpg"
        alt="Project Background"
        className="absolute inset-0 h-full w-full object-cover"
      />
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
              className="text-center font-heading text-3xl font-black tracking-wider text-white md:text-5xl lg:text-[3rem] lg:leading-normal lg:mt-80 mt-96"
            >
              Stories That Shape
              <br />
              Our Legacy
            </motion.h1>
          </Reveal>
        </div>
        {/* Bottom Content */}
        <div className="pb-40 lg:pb-40">
          <Reveal>
            <p className="text-montserrat mx-auto mb-10 max-w-4xl text-center leading-relaxed text-white text-lg">
              Explore the latest insights, architectural innovations, and
              corporate milestones that define the future of premium urban
              living at H.Rishabraj.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default MediaHeroSection;
