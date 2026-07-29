import { motion } from 'framer-motion';

import Reveal from '@/shared/components/Reveal/Reveal';
import { useJobSearchContext } from '@/features/jobsearch/context/JobSearchContextProvider';

const JobFooterSection = () => {
  const { loadMore, totalRecords, hasMore, data } = useJobSearchContext();
  const visibleJobs = data?.length ? data.length : 0;

  const progress = totalRecords === 0 ? 0 : (visibleJobs / totalRecords) * 100;

  return (
    <Reveal>
      <section className="p-8 bg-[#FBF9F8]">
        <div className="flex flex-col items-center">
          {/* Text */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
            className="text-center text-xs font-medium text-[#424754]"
          >
            Showing {visibleJobs} of {totalRecords} opportunities
          </motion.p>

          {/* Progress */}
          <div className="mt-4 h-0.75 w-40 overflow-hidden rounded-full bg-[#E5E5E5]">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{
                duration: 0.6,
                ease: 'easeOut',
              }}
              className="h-full rounded-full bg-[#1D63D8]"
            />
          </div>
          {hasMore && (
            <motion.button
              whileHover={{
                scale: 1.04,
                y: -2,
              }}
              whileTap={{
                scale: 0.97,
              }}
              onClick={loadMore}
              className="mt-7 flex h-11 min-w-31 items-center justify-center rounded-full bg-[#1E1E1E] px-8 text-sm font-medium text-white shadow-[0_8px_20px_rgba(0,0,0,0.18)] transition-colors duration-300 hover:bg-black"
            >
              Load More
            </motion.button>
          )}
        </div>
      </section>
    </Reveal>
  );
};

export default JobFooterSection;
