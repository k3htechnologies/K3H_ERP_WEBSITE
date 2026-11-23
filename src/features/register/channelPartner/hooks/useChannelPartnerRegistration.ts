import { useState } from "react";
import type { ChannelPartnerRegistrationRequest } from "../api/register.request";
import { Role } from "@/shared/constants";
import { ChannelPartnerRegisterService } from "../service/register.service";
import { createFormData } from "@/shared/utils/createFormData";
import { useNavigate } from "react-router-dom";
import useToast from "@/app/provider/ToastProvider/ToastProvider";

const initialState = {
  ChannelPartnerId: "0",
  Uniquekey: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  Name: "",
  MobileNumberCountryCode: "+91",
  MobileNumber: "",
  CompanyName: "",
  FirmsType: "",
  Designation: "",
  Type: "",
  RERANumber: "",
  Speciality: "",
  IsTermsAccepted: false,
};

type FormErrors = Partial<
  Record<keyof ChannelPartnerRegistrationRequest, string>
>;

export type CurrentStep = "BASIC" | "BUSINESS" | "PROFESSIONAL";

export const useChannelPartnerRegistration = () => {
  const { showError, showSuccess } = useToast();
  const navigate = useNavigate();

  //#region FORM
  const [formState, setFormState] =
    useState<ChannelPartnerRegistrationRequest>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const handleFieldChange = <K extends keyof ChannelPartnerRegistrationRequest>(
    field: K,
    value: ChannelPartnerRegistrationRequest[K],
  ) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };
  //#endregion

  //#region STEPS
  const [currentStep, setCurrentStep] = useState<CurrentStep>("BASIC");
  const [currentStepCount, setCurrentStepCount] = useState(1);
  const isFirstStep = currentStep === "BASIC";
  const isLastStep = currentStep === "PROFESSIONAL";
  //#endregion

  //#region VALIDATORS
  const continueWithBusinessInformation = () => {
    const validationErrors: FormErrors = {};
    if (!formState.RERANumber.trim()) {
      validationErrors.RERANumber = "RERA Registration Number is required.";
    }
    if (!formState.CompanyName.trim()) {
      validationErrors.CompanyName = "Company / Firm Name is required.";
    }
    if (!formState.FirmsType) {
      validationErrors.FirmsType = "Please select a firm type.";
    }
    if (!formState.Type) {
      validationErrors.Type = "Please select a type.";
    }
    setErrors((prev) => ({
      ...prev,
      ...validationErrors,
    }));
    const flag = Object.keys(validationErrors).length === 0;
    if (!flag) {
      return;
    }
    setCurrentStep("PROFESSIONAL");
    setCurrentStepCount(3);
  };
  //#endregion

  //#region REGISTER
  const [isSubmitting, setIsSubmitting] = useState(false);
  const register = async () => {
    const validationErrors: FormErrors = {};
    if (!formState.Designation.trim()) {
      validationErrors.Designation = "Please select a designation.";
    }
    if (!formState.Speciality.trim()) {
      validationErrors.Speciality = "Please select a speciality.";
    }
    // Assuming you add this field to your form state
    if (!formState.IsTermsAccepted) {
      validationErrors.IsTermsAccepted =
        "Please accept the Terms of Association and Privacy Policy.";
    }
    setErrors((prev) => ({
      ...prev,
      ...validationErrors,
    }));

    const flag = Object.keys(validationErrors).length === 0;
    if (!flag) {
      return;
    }
    try {
      setIsSubmitting(true);
      const formData = createFormData({
        ChannelPartnerId: formState.ChannelPartnerId,
        Uniquekey: formState.Uniquekey,
        Name: formState.Name,
        MobileNumberCountryCode: formState.MobileNumberCountryCode,
        MobileNumber: formState.MobileNumber,
        RERANumber: formState.RERANumber,
        CompanyName: formState.CompanyName,
        FirmsType: formState.FirmsType,
        Type: formState.Type,
        Designation: formState.Designation,
        Speciality: formState.Speciality,
      });
      const response =
        await ChannelPartnerRegisterService.apiCallChannelPartnerRegistration(
          formData,
        );
      if (response.IsSuccess) {
        showSuccess(
          response.SuccessMessage && response.SuccessMessage.length
            ? response.SuccessMessage[0]
            : "User Registered Successfully",
        );
        navigate(`/login?role=${Role.CP}`);
      }
    } catch (error) {
      showError("Some error occured");
    } finally {
      setIsSubmitting(false);
    }
  };
  //#endregion

  return {
    step: {
      current: currentStep,
      currentStepCount,
      isFirst: isFirstStep,
      isLast: isLastStep,
    },

    form: {
      values: formState,
      errors,
      handleFieldChange,
    },

    continueFromBasicInformation: () => {
      setCurrentStep("BUSINESS");
      setCurrentStepCount(2);
    },
    backFromBusinessInformation: () => {
      setCurrentStep("BASIC");
      setCurrentStepCount(1);
    },
    continueWithBusinessInformation,
    register,
    isSubmitting,
  };
};
