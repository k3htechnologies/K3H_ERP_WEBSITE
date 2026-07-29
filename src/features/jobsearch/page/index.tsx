import JobSearchHeaderSection from '@/features/jobsearch/components/JobSearchHeaderSection/JobSearchHeaderSection';
import JobSearchFilterSection from '@/features/jobsearch/components/JobSearchFilterSection/JobSearchFilterSection';
import JobListingSection from '@/features/jobsearch/components/JobListingSection/JobListingSection';
import JobFooterSection from '@/features/jobsearch/components/JobFooterSection/JobFooterSection';
import { JobSearchProvider } from '@/features/jobsearch/context/JobSearchContextProvider';

const JobSearchPage = () => {
  return (
    <JobSearchProvider>
      <JobSearchHeaderSection />
      <div className="mx-auto w-full px-5 sm:px-8 md:px-12 lg:px-20 py-8 bg-background-dark">
        <div className="relative z-20">
          <JobSearchFilterSection />
        </div>
        <div className="relative z-10 mt-8">
          <JobListingSection />
        </div>
      </div>
      <JobFooterSection />
    </JobSearchProvider>
  );
};

export default JobSearchPage;
