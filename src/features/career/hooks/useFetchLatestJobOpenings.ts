import { useFetch } from '@/shared/hooks/useFetch';
import { JobSearchApi } from '@/features/jobsearch/api/jobsearch.api';
import { createQueryParams } from '@/shared/utils/createQueryParams';
import type { JobOpeningResponse } from '@/features/jobsearch/api/jobsearch.response';
import type { JobSearchRequest } from '@/features/jobsearch/api/jobsearch.request';

export const useFetchLatestJobOpenings = (request: JobSearchRequest) => {
  const recordRequest = Object.fromEntries(
    Object.entries(request).map(([key, value]) => [key, value])
  );
  const queryParams = createQueryParams(recordRequest);
  return useFetch<JobOpeningResponse>(
    `${JobSearchApi.PULL_JOBS}?${queryParams}`
  );
};
