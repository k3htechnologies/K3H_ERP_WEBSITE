import { apiClient } from '@/app/http/api-client';
import { useCallback, useEffect, useState } from 'react';
import { ProjectDetailsApi } from '@/features/project-details/api/project-details.api';
import { useLoading } from '@/app/provider/LoadingProvider/LoadingProvider';
import type {
  ProjectDetails,
  ProjectDetailsResponse,
} from '@/features/project-details/api/project-details.response';

export const useFetchProjectDetails = (projectId: string) => {
  const [data, setData] = useState<ProjectDetails | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const { showLoading, hideLoading, visible } = useLoading();
  const fetchProjectDetails = useCallback(async () => {
    if (!projectId) return;
    showLoading();
    setError(null);
    try {
      const response = await apiClient.get<ProjectDetailsResponse>(
        `${ProjectDetailsApi.FETCH_PROJECT_DETAILS(projectId)}`
      );
      if (response.IsSuccess && response.Data && response.Data.length)
        setData(response.Data[0]);
    } catch (err) {
      setError(err as Error);
    } finally {
      hideLoading();
    }
  }, [projectId]);

  useEffect(() => {
    fetchProjectDetails();
  }, [fetchProjectDetails]);

  return {
    data,
    error,
    loading: visible,
  };
};
