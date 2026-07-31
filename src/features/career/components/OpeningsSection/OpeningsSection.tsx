import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Container from '@/shared/components/Container/Container';
import Reveal from '@/shared/components/Reveal/Reveal';

// import type { Category } from '@/features/career/types/career.type';
import { ROUTES } from '@/app/router/routePaths';
import { useFetchLatestJobOpenings } from '@/features/career/hooks/useFetchLatestJobOpenings';
import type { JobOpening } from '@/features/jobsearch/api/jobsearch.response';

const OpeningsSection = () => {
  // const [activeTab, setActiveTab] = useState<Category>('All');
  const [activeOpening, setActiveOpening] = useState<number | null>(null);
  // fetching job openings
  const { data: jobOpenings, loading } = useFetchLatestJobOpenings({
    pageNumber: 1,
    pageSize: 3,
  });
  const navigate = useNavigate();
  // const filteredOpenings = useMemo(() => {
  //   if (activeTab === 'All') return jobOpenings;

  //   return jobOpenings?.Data?.filter(
  //     (opening) => opening.category === activeTab
  //   );
  // }, [activeTab, jobOpenings]);

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
            {/* TABS */}
            {/* <div className="flex flex-wrap items-center gap-6 md:gap-10">
                {TABS.map((tab) => {
                  const isActive = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className=" relative pb-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-[#071739]/70 transition-colors duration-300 hover:text-text"
                    >
                      <span className={isActive ? 'text-text' : ''}>{tab}</span>
                      <span
                        className={` absolute bottom-0 left-0 h-px bg-[#071739] transition-all duration-300
                          ${isActive ? 'w-full' : 'w-0'}
                        `}
                      />
                    </button>
                  );
                })}
              </div> */}
          </div>
          <div className="mt-14">
            <AnimatePresence mode="wait">
              <motion.div
                // key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.4,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {' '}
                {loading ? (
                  <p>Loading</p>
                ) : (
                  jobOpenings &&
                  jobOpenings.Data &&
                  jobOpenings.Data.length &&
                  jobOpenings.Data.map((opening) => {
                    const isOpen = activeOpening === opening.JobOpeningMasterId;

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
                          className="group w-full py-8 text-left"
                        >
                          <div className=" flex flex-col gap-6 lg:grid lg:grid-cols-[1.5fr_0.7fr_0.7fr_auto] lg:items-center">
                            <div>
                              <motion.h3
                                variants={{
                                  hover: {
                                    x: 10,
                                  },
                                }}
                                transition={{
                                  duration: 0.35,
                                }}
                                className="text-montserrat text-xl leading-none text-white md:text-2xl uppercase"
                              >
                                {opening.JobRoleName}
                              </motion.h3>
                            </div>
                            <div>
                              <p className=" text-[11px] font-semibold uppercase tracking-[0.25em] text-white/70">
                                {opening.DepartmentName}
                              </p>
                            </div>
                            <div>
                              <p className=" text-[11px] font-semibold uppercase tracking-[0.25em] text-white/70">
                                {opening.WorkLocation}
                              </p>
                            </div>
                            <motion.div
                              animate={{
                                rotate: isOpen ? 90 : 0,
                              }}
                              transition={{
                                duration: 0.3,
                              }}
                              className=" flex h-12 w-12 items-center justify-center rounded-full border border-black/10 transition-colors duration-300 group-hover:border-[#071739]"
                            >
                              <ArrowRight size={18} className="text-white" />
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
                                <p className=" text-sm leading-relaxed text-white/50 md:text-base">
                                  {opening.JobDescription}
                                </p>
                                <button
                                  className=" mt-6 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.15em] text-primary transition-transform duration-300 hover:translate-x-1"
                                  onClick={(e) => {
                                    handleNavigation(e, opening);
                                  }}
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
