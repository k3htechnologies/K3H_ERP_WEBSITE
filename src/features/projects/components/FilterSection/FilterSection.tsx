import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

import Reveal from '@/shared/components/Reveal/Reveal';
import { useProjectsContext } from '@/features/projects/context/ProjectsContextProvider';

const STATUS_FILTERS = [
  {
    label: 'All',
    value: 'ALL',
  },
  {
    label: 'Ongoing',
    value: 'ONGOING',
  },
  {
    label: 'Completed',
    value: 'COMPLETED',
  },
  {
    label: 'Upcoming',
    value: 'UPCOMING',
  },
] as const;

export default function FilterSection() {
  const { filters, setFilter, categories } = useProjectsContext();

  return (
    <Reveal>
      <section className="px-5 lg:px-16 py-5 bg-background-dark">
        <div
          className="mx-auto flex w-full flex-col gap-6 rounded-xl px-6 py-5 lg:flex-row lg:items-center lg:justify-between border border-white/5"
          style={{
            background: 'rgba(255, 255, 255, 0.002)',
            boxShadow: '0px 20px 25px -5px #0000001A',
          }}
        >
          {/* Status Tabs */}
          <div className="flex flex-wrap items-center gap-3 md:gap-7">
            {STATUS_FILTERS.map((item) => {
              const active = filters.status === item.value;

              return (
                <button
                  key={item.value}
                  onClick={() => setFilter('status', item.value)}
                  className="relative pb-1 text-sm md:text-lg transition-colors text-montserrat"
                >
                  <span
                    className={`transition-colors ${active ? 'text-white' : 'text-white/60 hover:text-white'
                      }`}
                  >
                    {item.label}
                  </span>

                  {active && (
                    <motion.span
                      layoutId="active-project-filter"
                      className="absolute bottom-0 left-0 h-0.5 w-full rounded-full bg-[#59C4FF]"
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Filters */}
          <div className="flex flex-col gap-8 md:flex-row md:items-center">
            {/* Search */}
            {/* <div className="flex h-11 items-center gap-2 border-l border-white/15 pl-5">
              <Search size={18} className="text-white/60" />
              <input
                value={filters.search}
                onChange={(e) => setFilter('search', e.target.value)}
                placeholder="Search Project"
                className="w-40 bg-transparent text-sm text-white placeholder:text-white/45 outline-none"
              />
            </div> */}

            {/* Location */}
            {/* <div className="relative">
              <select
                value={filters.location}
                onChange={(e) => setFilter('location', e.target.value)}
                className="h-11 appearance-none rounded-md px-4 pr-10 text-lg text-white outline-none transition"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
              >
                {locations.map((location) => (
                  <option
                    key={location}
                    value={location}
                    className="bg-[#4A5663]"
                  >
                    {location}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60"
              />
            </div> */}
            {/* Category */}
            <div className="relative">
              <select
                value={filters.category}
                onChange={(e) => setFilter('category', e.target.value)}
                className="h-11 appearance-none rounded-md border border-white/10 bg-[#4A5663] px-4 pr-10 text-sm md:text-lg text-white outline-none transition hover:border-white/20"
              >
                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                    className="bg-[#4A5663]"
                  >
                    {category}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60"
              />
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
