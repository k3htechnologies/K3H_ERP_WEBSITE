import { useMemo, useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import Reveal from '@/shared/components/Reveal/Reveal';
import { useFetchFeaturedProjects } from '@/features/home/hooks/useFetchFeaturedProjects';
import type { FeaturedProject } from '@/features/home/api/home.response';

export default function FeaturedProjects() {
  // const navigate = useNavigate();

  const { data, loading } = useFetchFeaturedProjects();

  const projects = useMemo(() => {
    return (
      data?.map((project: FeaturedProject) => ({
        id: String(project.ProjectId),
        name: project.ProjectName.trim(),
        location: project.ProjectLocation.trim(),
        configuration: project.Configuration?.trim(),
        possession: project.RERAPossessionDate
          ? `POSSESSION ${new Date(project.RERAPossessionDate).getFullYear()}`
          : null,
        description: project.Description,
        image: project.ProjectPhotoURL,
        googleLocation: project.GoogleLocation,
      })) ?? []
    );
  }, [data]);

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    setActiveIndex(0);
  }, [projects]);

  if (loading) {
    return <section className="relative h-212.5 animate-pulse bg-[#34495A]" />;
  }

  if (!projects.length) {
    return null;
  }

  const activeProject = projects[activeIndex];

  // const handleExplore = () => {
  //   navigate(`/project/${activeProject.name}`, {
  //     state: {
  //       projectId: activeProject.id,
  //     },
  //   });
  // };

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.img
            key={activeProject.id}
            src={activeProject.image}
            alt={activeProject.name}
            className="absolute inset-0 h-full w-full object-cover"
            initial={{
              y: '100%',
              scale: 1.05,
            }}
            animate={{
              y: '0%',
              scale: 1,
            }}
            exit={{
              y: '-100%',
              scale: 1,
            }}
            transition={{
              duration: 0.9,
              ease: [0.77, 0, 0.175, 1],
            }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-[#34495A]/55" />

        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(52,73,90,.15) 0%, rgba(52,73,90,.55) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full px-8 py-16 lg:px-20 lg:py-24">
        <Reveal>
          <div className="flex items-start justify-between">
            <div>
              <div className="mb-6 h-1 w-14 bg-primary" />

              <h2 className="font-heading text-3xl font-bold text-white md:text-5xl">
                Featured Projects
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="mt-20 grid gap-20 lg:grid-cols-[1fr_400px] lg:px-16">
          <Reveal>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                initial={{
                  opacity: 0,
                  y: 30,
                  filter: 'blur(6px)',
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: 'blur(0px)',
                }}
                exit={{
                  opacity: 0,
                  y: -30,
                  filter: 'blur(6px)',
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex min-h-130 max-w-sm flex-col justify-center"
              >
                <div className="flex items-center gap-4">
                  <span className="flex items-center text-sm tracking-[0.3em] text-white/50">
                    <span className="relative inline-flex h-5 w-6 overflow-hidden">
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={activeIndex}
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: -20, opacity: 0 }}
                          transition={{
                            duration: 0.35,
                            ease: 'easeOut',
                          }}
                          className="absolute inset-0"
                        >
                          {String(activeIndex + 1).padStart(2, '0')}
                        </motion.span>
                      </AnimatePresence>
                    </span>

                    <span>/ {String(projects.length).padStart(2, '0')}</span>
                  </span>

                  <div className="h-px w-12 bg-primary" />

                  <AnimatePresence mode="wait">
                    <motion.span
                      key={activeProject.location}
                      initial={{ opacity: 0, x: -15 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 15 }}
                      transition={{ duration: 0.35 }}
                      className="text-xs font-semibold tracking-[0.28em] text-primary"
                    >
                      {activeProject.location}
                    </motion.span>
                  </AnimatePresence>
                </div>
                <h3 className="mt-8 font-heading text-4xl font-bold text-white">
                  {activeProject.name}
                </h3>
                {(activeProject.configuration || activeProject.possession) && (
                  <div className="mt-8 flex flex-wrap items-center gap-5 text-xs tracking-[0.18em] text-white/60">
                    {activeProject.configuration && (
                      <span>{activeProject.configuration}</span>
                    )}

                    {activeProject.configuration &&
                      activeProject.possession && <span>•</span>}

                    {activeProject.possession && (
                      <span>{activeProject.possession}</span>
                    )}
                  </div>
                )}
                {activeProject.description && (
                  <p className="mt-8 max-w-xl text-sm leading-7 text-white/80 text-montserrat">
                    {activeProject.description}
                  </p>
                )}
                {/* <div className="mt-12">
                  <button
                    onClick={handleExplore}
                    className="inline-flex h-14 items-center border border-white/20 bg-white/5 px-10 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:border-primary hover:bg-primary"
                  >
                    Explore Project */}
                {/* {activeProject.name} */}
                {/* </button>
                </div> */}
              </motion.div>
            </AnimatePresence>
          </Reveal>
          <Reveal delay={0.15}>
            <div className="flex h-full items-center justify-end">
              <div className="space-y-8">
                {projects.map((project, index) => {
                  const active = index === activeIndex;
                  return (
                    <button
                      key={project.id}
                      onClick={() => setActiveIndex(index)}
                      className="group flex w-full items-center justify-end gap-5 text-right"
                    >
                      <div className="relative pr-5">
                        {active ? (
                          <motion.div
                            layoutId="project-active-border"
                            className="absolute right-0 top-0 h-full w-0.5 bg-[#C9A96E]"
                            transition={{
                              type: 'spring',
                              stiffness: 350,
                              damping: 28,
                            }}
                          />
                        ) : (
                          <div className="absolute right-0 top-0 h-full w-px bg-white/20 transition-colors duration-300 group-hover:bg-white/50" />
                        )}

                        <motion.div
                          layout
                          transition={{
                            type: 'spring',
                            stiffness: 300,
                            damping: 28,
                          }}
                          className={`transition-colors duration-300 text-montserrat ${
                            active
                              ? 'text-lg font-semibold tracking-wide text-[#F8F4EE]'
                              : 'text-sm font-medium uppercase tracking-[0.28em] text-white/40 group-hover:text-white/70'
                          }`}
                        >
                          {String(index + 1).padStart(2, '0')} {project.name}
                        </motion.div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
