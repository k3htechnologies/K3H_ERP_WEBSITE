import { apiClient } from '@/app/http/api-client';
import { VendorManagementApi } from '@/features/login/api/vendor-management';
import type { VendorManagementFormSubmitResponse } from '@/features/login/service/vendorManagement-form.response';
import type { ApiResponse } from '@/app/http/types';

export const VendorManagementFormService = {

    apiCallVendorManagementFormSubmit: async (formData: FormData): Promise<ApiResponse<VendorManagementFormSubmitResponse>> => {
        return apiClient.post<VendorManagementFormSubmitResponse>(`${VendorManagementApi.VENDOR_MANAGEMENT_ADD}`, formData);
    },

}
