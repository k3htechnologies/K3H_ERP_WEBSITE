import { useCallback, useEffect, useState } from 'react';

import { apiClient } from '@/app/http/api-client';
import { useLoading } from '@/app/provider/LoadingProvider/LoadingProvider';
import { HomeApi } from '@/features/home/api/home.api';
import type { FeaturedProjectsResponse } from '@/features/home/api/home.response';

export const useFetchFeaturedProjects = () => {
  const [data, setData] = useState<FeaturedProjectsResponse>();
  const [error, setError] = useState<Error | null>(null);
  const { hideLoading, visible } = useLoading();

  const fetchFeaturedProjectDetails = useCallback(async () => {
    setError(null);
    try {
      const response = await apiClient.get<FeaturedProjectsResponse>(
        `${HomeApi.PULL_FEATURES_PROJECT}`
      );
      setData(response.Data ?? []);
    } catch (err) {
      setError(err as Error);
    } finally {
      hideLoading();
    }
  }, []);

  useEffect(() => {
    fetchFeaturedProjectDetails();
  }, [fetchFeaturedProjectDetails]);
  return {
    loading: visible,
    data,
    error,
  };
};
