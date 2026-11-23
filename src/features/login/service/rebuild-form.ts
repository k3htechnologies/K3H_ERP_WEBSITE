import { apiClient } from '@/app/http/api-client';
import { RebuildApi } from '@/features/login/api/rebuild.api';
import type { RebuildFormSubmitResponse } from '@/features/login/service/rebuild-form.response';
import type { ApiResponse } from '@/app/http/types';

export const RebuildFormService = {

    apiCallRebuildFormSubmit: async (formData: FormData): Promise<ApiResponse<RebuildFormSubmitResponse>> => {
        return apiClient.post<RebuildFormSubmitResponse>(`${RebuildApi.REBUILD_ADD_FORM}`, formData);
    },

}
