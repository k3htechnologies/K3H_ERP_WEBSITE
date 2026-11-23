import { useState } from "react";

import { RegistrationService } from "../service/registration.service";
import type {
  BasicInfoErrors,
  BasicInfoFieldChange,
  BasicInfoValues,
} from "../types/basicInfo.types";
import { useLoading } from "@/app/provider/LoadingProvider/LoadingProvider";
import useToast from "@/app/provider/ToastProvider/ToastProvider";

export const OTP_LENGTH = 4;

interface UseRegistrationBasicInfoOptions {
  values: BasicInfoValues;
  onFieldChange: BasicInfoFieldChange;
  module: string;
  role: string;
  onVerified: () => void;
}

export const useRegistrationBasicInfo = ({
  values,
  onFieldChange,
  module,
  role,
  onVerified,
}: UseRegistrationBasicInfoOptions) => {
  const { runWithLoader } = useLoading();
  const { showSuccess } = useToast();

  //#region FIELDS
  const [errors, setErrors] = useState<BasicInfoErrors>({});

  const handleFieldChange: BasicInfoFieldChange = (field, value) => {
    onFieldChange(field, value);
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };
  //#endregion

  //#region OTP
  const [otpState, setOtpState] = useState({
    isSent: false,
    isVerified: false,
    isLoading: false,
    value: "",
  });

  const handleOtpChange = (otp: string) => {
    setOtpState((prev) => ({ ...prev, value: otp }));
  };

  const sendOtp = async () => {
    const newErrors: BasicInfoErrors = {};
    if (!values.Name.trim()) {
      newErrors.Name = "Full name is required.";
    }
    if (!values.MobileNumber.trim()) {
      newErrors.MobileNumber = "Mobile number is required.";
    } else if (!/^\d{10}$/.test(values.MobileNumber)) {
      newErrors.MobileNumber = "Enter a valid mobile number.";
    }
    setErrors((prev) => ({ ...prev, ...newErrors }));
    if (Object.keys(newErrors).length > 0) return;

    runWithLoader(async () => {
      try {
        setOtpState((prev) => ({ ...prev, isLoading: true }));
        const response = await RegistrationService.apiCallSendOTP(
          values.MobileNumber,
          module,
        );
        if (
          response.IsSuccess &&
          response.SuccessMessage &&
          response.Data?.length
        ) {
          setOtpState((prev) => ({ ...prev, isSent: true }));
          showSuccess(response.Data);
        }
      } finally {
        setOtpState((prev) => ({ ...prev, isLoading: false }));
      }
    }, "Validating contact...");
  };

  const verifyOtp = () => {
    runWithLoader(async () => {
      try {
        setOtpState((prev) => ({ ...prev, isLoading: true }));
        const response = await RegistrationService.apiCallVerifyOTP(
          values.MobileNumber,
          otpState.value,
          role,
        );
        if (response && response.IsSuccess) {
          setOtpState((prev) => ({ ...prev, isVerified: true }));
          showSuccess(
            response.SuccessMessage
              ? response.SuccessMessage[0]
              : "Verified successfully",
          );
          onVerified();
        }
      } finally {
        setOtpState((prev) => ({ ...prev, isLoading: false }));
      }
    }, "Verifying otp");
  };

  const canVerify = otpState.isSent && otpState.value.length === OTP_LENGTH;
  //#endregion

  return {
    errors,
    handleFieldChange,
    otp: {
      state: otpState,
      canVerify,
      handleOtpChange,
      sendOtp,
      verifyOtp,
    },
  };
};
