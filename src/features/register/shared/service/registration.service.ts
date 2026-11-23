import { apiClient } from "@/app/http/api-client";
import { RegistrationApi } from "../api/registration.api";
import { createQueryParams } from "@/shared/utils/createQueryParams";
import type { ApiResponse } from "@/app/http/types";

export const RegistrationService = {
  apiCallSendOTP: async (
    mobileNumber: string,
    module: string,
  ): Promise<ApiResponse<string>> => {
    const queryParams = createQueryParams({
      MobileNumber: mobileNumber,
      Module: module,
    });
    return apiClient.get<string>(`${RegistrationApi.Send_OTP}?${queryParams}`);
  },
  apiCallVerifyOTP: async (
    mobileNumber: string,
    otp: string,
    role: string,
  ): Promise<ApiResponse<boolean>> => {
    const queryParams = createQueryParams({
      MobileNumber: mobileNumber,
      OTP: otp,
      Role: role,
    });
    return apiClient.get<boolean>(
      `${RegistrationApi.Verify_OTP}?${queryParams}`,
    );
  },
};
