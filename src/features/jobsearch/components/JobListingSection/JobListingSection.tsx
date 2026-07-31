import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import JobCard from '@/shared/components/JobCard/JobCard';
import JobCardSkeleton from '@/shared/components/JobCard/JobCardSkeleton';
import Reveal from '@/shared/components/Reveal/Reveal';
import { ROUTES } from '@/app/router/routePaths';
import { useJobSearchContext } from '@/features/jobsearch/context/JobSearchContextProvider';

const JobListingSection = () => {
  const navigate = useNavigate();

  const { loading, loadingMore, error, data } = useJobSearchContext();

  if (loading && data?.length === 0) {
    return (
      <div className="mt-8 grid auto-rows-fr gap-6 lg:grid-cols-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <JobCardSkeleton key={index} index={index} />
        ))}
      </div>
    );
  }

  if (error && data?.length === 0) {
    return (
      <Reveal>
        <div className="flex h-72 flex-col items-center justify-center text-center">
          <h3 className="text-2xl font-semibold text-white">
            Unable to load jobs
          </h3>

          <p className="mt-3 max-w-md text-white/60">
            Something went wrong while fetching the latest opportunities.
          </p>
        </div>
      </Reveal>
    );
  }

  if (!loading && data?.length === 0) {
    return (
      <Reveal>
        <div className="flex h-60 items-center justify-center">
          <p className="text-white/60">No jobs found matching your search.</p>
        </div>
      </Reveal>
    );
  }

  return (
    <motion.div layout className="mt-8 grid auto-rows-fr gap-6 lg:grid-cols-2">
      <AnimatePresence mode="popLayout">
        {data?.map((job, index) => (
          <motion.div
            key={job.JobOpeningMasterId}
            layout
            className="w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{
              delay: index * 0.06,
            }}
          >
            <JobCard
              job={job}
              index={index}
              onApply={(job) => {
                navigate(`/${ROUTES.APPLICATION_FORM}`, {
                  state: {
                    position: job.JobOpeningMasterId,
                  },
                });
              }}
            />
          </motion.div>
        ))}

        {loadingMore &&
          Array.from({ length: 2 }).map((_, index) => (
            <motion.div key={`loading-${index}`} layout className="flex w-full">
              <JobCardSkeleton index={index} />
            </motion.div>
          ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default JobListingSection;
