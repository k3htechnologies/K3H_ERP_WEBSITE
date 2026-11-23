import { apiClient } from "@/app/http/api-client";
import { ChannelPartnerRegistrationApi } from "../api/register.api";

export const ChannelPartnerRegisterService = {
  apiCallChannelPartnerRegistration: async (formData: FormData) => {
    return apiClient.post(
      `${ChannelPartnerRegistrationApi.Register}`,
      formData,
    );
  },
};
