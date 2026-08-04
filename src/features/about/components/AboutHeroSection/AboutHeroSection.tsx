const AboutHeroSection = () => {
  return (
    <section className="relative h-screen overflow-hidden">
      {/* BACKGROUND */}
      {/* <div className="absolute inset-0">
        <motion.img
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 8,
            ease: 'easeOut',
          }}
          src="/about-hero-background.jpg"
          alt="Our Story"
          className="h-full w-full object-cover"
        />
      </div> */}

      {/* OVERLAYS */}
      {/* <div className="absolute inset-0 bg-black/55" />
      <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/60" /> */}

      {/* TOP LOGO */}
      {/* <motion.div
        initial={{
          opacity: 0,
          y: -20,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.8,
        }}
        className="absolute left-1/2 top-8 z-20 -translate-x-1/2 md:top-12"
      >
        <img src="logo-white.png" alt="H.Rishabraj" className="h-18 w-auto" />
      </motion.div> */}
      {/* <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div className="text-center">
          <Reveal>
            <h1 className="font-heading text-4xl leading-none text-black md:text-6xl lg:text-[5rem]">
              Our Story
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <p className="mt-8 max-w-5xl text-center font-light tracking-[0.18em] text-black/90 text-xl lg:text-2xl text-montserrat">
              Building the future, honoring the past.
            </p>
          </Reveal>
        </div>
      </div> */}

      {/* VIGNETTE */}
      <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,0.35)]" />
    </section>
  );
};

export default AboutHeroSection;
