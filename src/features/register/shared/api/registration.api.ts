export const RegistrationApi = {
  Send_OTP: "/auth/registration-sendOtp",
  Verify_OTP: "/auth/registration-otp-validation",
} as const;

export type RegistrationApiKeys = keyof typeof RegistrationApi;
