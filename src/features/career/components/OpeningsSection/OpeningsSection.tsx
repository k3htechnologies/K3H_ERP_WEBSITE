import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Container from '@/shared/components/Container/Container';
import Reveal from '@/shared/components/Reveal/Reveal';

import { ROUTES } from '@/app/router/routePaths';
import { useFetchLatestJobOpenings } from '@/features/career/hooks/useFetchLatestJobOpenings';
import type { JobOpening } from '@/features/jobsearch/api/jobsearch.response';

const OpeningsSection = () => {
  const [activeOpening, setActiveOpening] = useState<number | null>(null);

  const { data: jobOpenings, loading } = useFetchLatestJobOpenings({
    pageNumber: 1,
    pageSize: 3,
  });

  const navigate = useNavigate();

  const openings = jobOpenings?.Data ?? [];
  const hasOpenings = openings.length > 0;

  const handleNavigation = (
    e: React.MouseEvent<HTMLButtonElement>,
    opening: JobOpening
  ) => {
    e.preventDefault();

    navigate(`/${ROUTES.APPLICATION_FORM}`, {
      state: {
        JobOpeningMasterId: opening.JobOpeningMasterId,
        JobRoleName: opening.JobRoleName,
      },
    });
  };

  return (
    <Container className="bg-background-dark">
      <Reveal>
        <div className="rounded-4xl bg-transparent p-6 md:p-10 lg:p-14">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="font-heading text-2xl uppercase leading-none text-white md:text-3xl">
              Current Openings
            </h2>

            {hasOpenings && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  navigate(`/${ROUTES.JOB_SEARCH}`);
                }}
                className="inline-flex items-center gap-2 self-start text-sm font-semibold uppercase tracking-[0.18em] text-white transition-transform duration-300 hover:translate-x-1"
              >
                Explore More Jobs
                <ArrowRight size={16} />
              </button>
            )}
          </div>

          <div className="mt-14">
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {loading ? (
                  <p className="py-12 text-center text-sm uppercase tracking-[0.2em] text-white/50">
                    Loading openings...
                  </p>
                ) : !hasOpenings ? (
                  <div className="flex min-h-45 items-center justify-center border-t border-white/10">
                    <p className="text-center text-sm uppercase tracking-[0.2em] text-white/50 md:text-base">
                      No openings available at the moment.
                    </p>
                  </div>
                ) : (
                  openings.map((opening) => {
                    const isOpen =
                      activeOpening === opening.JobOpeningMasterId;

                    return (
                      <motion.div
                        key={opening.JobOpeningMasterId}
                        layout
                        initial={false}
                        className="border-t border-black/10"
                      >
                        <motion.button
                          layout
                          whileHover="hover"
                          onClick={() =>
                            setActiveOpening((prev) =>
                              prev === opening.JobOpeningMasterId
                                ? null
                                : opening.JobOpeningMasterId
                            )
                          }
                          className="group w-full py-6 text-left lg:py-8"
                        >
                          <div className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 lg:grid-cols-[1.5fr_0.7fr_0.7fr_auto] lg:gap-6">
                            <motion.h3
                              variants={{ hover: { x: 10 } }}
                              transition={{ duration: 0.35 }}
                              className="text-montserrat text-lg uppercase leading-tight text-white md:text-2xl lg:leading-none"
                            >
                              {opening.JobRoleName}
                            </motion.h3>
                            <div className="col-start-1 row-start-2 flex flex-wrap items-center gap-x-3 gap-y-1 lg:contents">
                              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70 md:text-[11px] lg:tracking-[0.25em]">
                                {opening.DepartmentName}
                              </p>
                              <span className="h-1 w-1 rounded-full bg-white/30 lg:hidden" />
                              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/70 md:text-[11px] lg:tracking-[0.25em]">
                                {opening.WorkLocation}
                              </p>
                            </div>
                            <motion.div
                              animate={{ rotate: isOpen ? 90 : 0 }}
                              transition={{ duration: 0.3 }}
                              className="col-start-2 row-span-2 row-start-1 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 transition-colors duration-300 group-hover:border-[#071739] lg:col-start-auto lg:row-span-1 lg:row-start-auto lg:h-12 lg:w-12 lg:border-black/10"
                            >
                              <ArrowRight size={16} className="text-white" />
                            </motion.div>
                          </div>
                        </motion.button>

                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{
                                height: 0,
                                opacity: 0,
                              }}
                              animate={{
                                height: 'auto',
                                opacity: 1,
                              }}
                              exit={{
                                height: 0,
                                opacity: 0,
                              }}
                              transition={{
                                duration: 0.45,
                                ease: [0.22, 1, 0.36, 1],
                              }}
                              className="overflow-hidden"
                            >
                              <div className="pb-8 lg:max-w-[55%]">
                                <p className="text-sm leading-relaxed text-white/50 md:text-base">
                                  {opening.JobDescription}
                                </p>

                                <button
                                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-primary transition-transform duration-300 hover:translate-x-1"
                                  onClick={(e) =>
                                    handleNavigation(e, opening)
                                  }
                                >
                                  Apply Now
                                  <ArrowRight size={16} />
                                </button>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </Container>
  );
};

export default OpeningsSection;