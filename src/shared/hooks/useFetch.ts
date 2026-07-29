import { apiClient } from '@/app/http/api-client';
import { ApiClientError } from '@/app/http/error';
import { RequestManager } from '@/app/http/requestManager';
import { useEffect, useRef, useState } from 'react';
import { generateId } from '@/shared/utils';
import type { ApiResponse } from '@/app/http/types';

export function useFetch<T>(url: string): {
  data: ApiResponse<T> | null;
  loading: boolean;
  error: ApiClientError | null;
} {
  const [data, setData] = useState<ApiResponse<T> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiClientError | null>(null);
  const requestManager = useRef(new RequestManager());
  const requestId = useRef(generateId());

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const signal = requestManager.current.createController(
          requestId.current
        );
        const response = await apiClient.get<T>(url, { signal });
        if (response.IsSuccess) {
          setData(response);
          setError(null);
          return;
        }
        throw new ApiClientError(
          response.HttpStatusCode as number,
          response.ErrorMessage?.length ? response.ErrorMessage[0] : '',
          null
        );
      } catch (err) {
        if (err instanceof ApiClientError) {
          setError(err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      requestManager.current.cancel(requestId.current);
    };
  }, [url]);

  return { data, loading, error };
}
