import { apiClient } from '@/app/http/api-client';
import { ApplicationFormApi } from '@/features/application-form/api/application-form.api';
import type { ApplicationFormSubmitResponse } from '@/features/application-form/api/application-form.response';
import type { ApiResponse } from '@/app/http/types';
import { createQueryParams } from '@/shared/utils/createQueryParams';
import { JobSearchApi } from '@/features/jobsearch/api/jobsearch.api';
import type { JobOpeningResponse } from '@/features/jobsearch/api/jobsearch.response';
import type { JobSearchRequest } from '@/features/jobsearch/api/jobsearch.request';

export const ApplicationFormService = {
  apiCallFetchJobListing: async (request: JobSearchRequest) => {
    const recordRequest = Object.fromEntries(
      Object.entries(request).map(([key, value]) => [key, value])
    );
    const queryParams = createQueryParams(recordRequest);
    return apiClient.get<JobOpeningResponse>(
      `${JobSearchApi.PULL_JOBS}?${queryParams}`
    );
  },
  apiCallApplicationSubmit: async (
    formData: FormData
  ): Promise<ApiResponse<ApplicationFormSubmitResponse>> => {
    return apiClient.post<ApplicationFormSubmitResponse>(
      `${ApplicationFormApi.SUBMIT_APPLICATION}`,
      formData
    );
  },
};
