import { useFetch } from '@/shared/hooks/useFetch';
import { createQueryParams } from '@/shared/utils/createQueryParams';
import { JobSearchApi } from '@/features/jobsearch/api/jobsearch.api';
import type { JobSearchRequest } from '@/features/jobsearch/api/jobsearch.request';
import type { JobOpeningResponse } from '@/features/jobsearch/api/jobsearch.response';

export const useFetchJobs = (request: JobSearchRequest) => {
  const recordRequest = Object.fromEntries(
    Object.entries(request).map(([key, value]) => [key, value])
  );
  const queryParams = createQueryParams(recordRequest);
  return useFetch<JobOpeningResponse>(
    `${JobSearchApi.PULL_JOBS}?${queryParams}`
  );
};
