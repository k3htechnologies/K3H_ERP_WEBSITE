import { apiClient } from '@/app/http/api-client';
import { RebuildLandApi } from '@/features/login/api/rebuild-land-api';
import type { RebuildLandAddFormSubmitResponse } from '@/features/login/service/rebuild-land-add-form.response';
import type { ApiResponse } from '@/app/http/types';

export const RebuildLandAddFormService = {

    apiCallRebuildLandAddFormSubmit: async (formData: FormData): Promise<ApiResponse<RebuildLandAddFormSubmitResponse>> => {
        return apiClient.post<RebuildLandAddFormSubmitResponse>(`${RebuildLandApi.REBUILD_LAND_ADD_FORM}`, formData);
    },

}
