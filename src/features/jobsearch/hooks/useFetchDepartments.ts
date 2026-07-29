import { useFetch } from '@/shared/hooks/useFetch';
import { JobSearchApi } from '@/features/jobsearch/api/jobsearch.api';
import type { Department } from '@/features/jobsearch/api/jobsearch.response';

export const useFetchDepartments = () => {
  return useFetch<Department[]>(`${JobSearchApi.PULL_DEPARTMENTS}`);
};
