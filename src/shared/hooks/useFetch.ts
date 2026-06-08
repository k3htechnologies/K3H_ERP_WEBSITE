import { apiClient } from "@/app/http/api-client";
import { ApiClientError } from "@/app/http/error";
import { RequestManager } from "@/app/http/requestManager";
import { useEffect, useRef, useState } from "react";

export function useFetch<T>(url: string) : {data : T | null, loading : boolean, error : ApiClientError | null} {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<ApiClientError | null>(null);
  const requestManager = useRef(new RequestManager());
  const requestId = useRef(crypto.randomUUID());

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const signal = requestManager.current.createController(requestId.current);
        const response = await apiClient.get<T>(url, { signal });
        setData(response.data);
        setError(null);
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