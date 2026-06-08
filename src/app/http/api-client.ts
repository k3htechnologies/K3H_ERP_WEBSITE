import { config } from "@/app/config";
import { ApiClientError } from "@/app/http/error";
import { RetryPolicy } from "@/app/http/retry";
import type {
  ApiConfig,
  ApiResponse,
  RequestConfig,
  RequestOptions,
} from "@/app/http/types";
import { registerInterceptors } from "@/app/http/interceptors";
import { authManager } from "./authManager";

export class ApiClient {
  private baseURL: string;
  private timeout: number;
  private defaultHeaders: Record<string, string>;
  private requestInterceptors: ((config: RequestConfig) => RequestConfig)[] =
    [];
  private responseInterceptors: ((
    response: Response,
  ) => Promise<Response> | Response)[] = [];

  constructor(config: ApiConfig) {
    this.baseURL = config.baseURL;
    this.timeout = config.timeout || 30000;
    this.defaultHeaders = {
      "Content-Type": "application/json",
      ...config.headers,
    };
  }

  addRequestInterceptor(interceptor: (config: RequestConfig) => RequestConfig) {
    this.requestInterceptors.push(interceptor);
  }

  addResponseInterceptor(
    interceptor: (response: Response) => Promise<Response> | Response | any,
  ) {
    this.responseInterceptors.push(interceptor);
  }

  // Main request method
  async request<T = unknown>(
    method: string,
    path: string,
    options: RequestOptions = {},
  ): Promise<ApiResponse<T>> {
    let config: RequestConfig = {
      method,
      url: `${this.baseURL}${path}`,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
      body: options.body,
      signal: options.signal,
    };

    for (const interceptor of this.requestInterceptors) {
      config = interceptor(config);
    }

    const controller = new AbortController();

    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      let response = await this.executeRequest(config, controller);

      if (response.status === 401 && !config._retry) {
        try {
          const newToken = await authManager.refreshAccessToken();

          const retryConfig: RequestConfig = {
            ...config,
            _retry: true,
            headers: {
              ...config.headers,
              Authorization: `Bearer ${newToken}`,
            },
          };

          response = await this.executeRequest(retryConfig, controller);
        } catch {
          authManager.logout();
          throw new ApiClientError(401, "Session expired", response);
        }
      }

      if (!response.ok) {
        let errorData = null;

        try {
          errorData = await response.json();
        } catch {}

        throw new ApiClientError(
          response.status,
          errorData?.message || response.statusText || "Request failed",
          response,
          errorData,
        );
      }

      let data: T | null = null;
      const contentType = response.headers.get("content-type");

      if (
        response.status !== 204 &&
        contentType?.includes("application/json")
      ) {
        data = (await response.json()) as T;
      }

      return {
        data,
        status: response.status,
        headers: response.headers,
      };
    } catch (error) {
      throw this.handleError(error);
    } finally {
      clearTimeout(timeoutId);
    }
  }

  private async executeRequest(
    config: RequestConfig,
    controller: AbortController,
  ): Promise<Response> {
    let response = await fetch(config.url, {
      method: config.method,
      headers: config.headers,
      body: config.body ? JSON.stringify(config.body) : undefined,
      signal: config.signal || controller.signal,
    });

    for (const interceptor of this.responseInterceptors) {
      response = await interceptor(response);
    }

    return response;
  }

  get<T>(path: string, options?: RequestOptions) {
    return this.request<T>("GET", path, options);
  }

  post<T>(path: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>("POST", path, { ...options, body });
  }

  put<T>(path: string, body?: unknown, options?: RequestOptions) {
    return this.request<T>("PUT", path, { ...options, body });
  }

  delete<T>(path: string, options?: RequestOptions) {
    return this.request<T>("DELETE", path, options);
  }

  async fetchDataWithRetry<T>(path: string) {
    return retryPolicy.executeWithRetry(
      () => this.get<T>(path),
      (error) => {
        // Retry on network errors and 5xx errors
        return error.isNetworkError() || error.isServerError();
      },
    );
  }

  private handleError(error: unknown): ApiClientError {
    if (error instanceof ApiClientError) {
      return error;
    }

    if (error instanceof Error) {
      if (error.name === "AbortError") {
        return new ApiClientError(0, "Request timeout or cancelled", null);
      }
      return new ApiClientError(0, error.message, null);
    }

    return new ApiClientError(0, "Unknown error occurred", null);
  }
}

export const apiClient = new ApiClient({
  baseURL: config.apiBaseUrl,
  timeout: 30000,
});
registerInterceptors();

const retryPolicy = new RetryPolicy({
  maxRetries: 3,
  initialDelay: 100,
  maxDelay: 5000,
  backoffMultiplier: 2,
});
