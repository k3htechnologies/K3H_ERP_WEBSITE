import { createQueryParams } from '@/shared/utils/createQueryParams';
import type { ProjectFilters } from '@/features/projects/api/projects.request';
import { useFetch } from '@/shared/hooks/useFetch';
import { ProjectApi } from '@/features/projects/api/projects.api';

export const useFetchProjects = (request: ProjectFilters) => {
  const queryParams = createQueryParams({
    Status: request.status,
    Category: request.category,
    Location: request.location,
  });
  return useFetch(`${ProjectApi.PULL_PROJECTS}?${queryParams}`);
};
