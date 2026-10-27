import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

import Reveal from '@/shared/components/Reveal/Reveal';
import FilterDropdown from '@/shared/components/FilterDropdown/FilterDropdown';
import { useJobSearchContext } from '@/features/jobsearch/context/JobSearchContextProvider';
import { filterVariants } from '@/features/jobsearch/constants/jobsearch.constants';

const JobSearchFilterSection = () => {
  const { filters, experience, departments, setFilter } = useJobSearchContext();
  return (
    <Reveal>
      <motion.div
        variants={filterVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="rounded-2xl bg-[#FFFFFF14] p-4"
        style={{
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(24px)',
        }}
      >
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-5 top-1/2 -translate-y-1/2 text-white/40"
            />
            <input
              type="text"
              placeholder="Search by role"
              className="h-12 w-full rounded-xl bg-white/5 pl-12 pr-4 text-sm text-white placeholder:text-white/45 outline-none transition-all duration-300 focus:border-[#3FA9F5] focus:ring-2 focus:ring-[#3FA9F5]/20"
              style={{
                border: '1px solid rgba(194, 198, 214, 0.65)',
              }}
              value={filters.search}
              onChange={(e) => setFilter('search', e.target.value)}
            />
          </div>
          <div className="hidden h-10 w-px bg-white/10 lg:block" />
          <div className="flex flex-wrap gap-3">
            <FilterDropdown
              selectedOption={filters.department}
              options={departments}
              onChange={(option) => setFilter('department', option)}
            />
            <FilterDropdown
              selectedOption={filters.experience}
              options={experience}
              onChange={(option) => setFilter('experience', option)}
            />
            {/* <FilterDropdown
              value={filters.location}
              options={locations}
              onChange={(value) => setFilter('location', value)}
            /> */}
          </div>
        </div>
      </motion.div>
    </Reveal>
  );
};

export default JobSearchFilterSection;
