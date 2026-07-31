import { motion } from 'framer-motion';

import Reveal from '@/shared/components/Reveal/Reveal';

const LifeStyleHeroSection = () => {
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
        <source src="/videos/lifestyle-bg.mp4" type="video/mp4" />
      </video>
      {/* <img
        src="/lifestyle-hero.jpg"
        alt="Project Background"
        className="absolute inset-0 h-full w-full object-cover"
      /> */}
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
              className="text-center font-heading text-3xl font-black tracking-wider text-white md:text-5xl lg:text-[3rem] lg:leading-normal lg:mt-80 mt-96"
            >
              Live Beyond the Address
            </motion.h1>
          </Reveal>
        </div>
        {/* Bottom Content */}
        <div className="pb-40 lg:pb-40">
          <Reveal>
            <p className="text-montserrat mx-auto mb-10 max-w-4xl text-center leading-relaxed text-white text-lg">
              Where timeless architecture meets meaningful experiences.
              <br /> Designed to elevate every moment of everyday living.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default LifeStyleHeroSection;
