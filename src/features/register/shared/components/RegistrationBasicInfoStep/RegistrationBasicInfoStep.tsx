import { Headset, ShieldCheck, Zap } from "lucide-react";


import { Button } from "@/shared/components/Forms/Button";
import OtpInput from "@/shared/components/OtpInput/OtpInput";
import {
  OTP_LENGTH,
  useRegistrationBasicInfo,
} from "../../hooks/useRegistrationBasicInfo";
import type {
  BasicInfoFieldChange,
  BasicInfoValues,
} from "../../types/basicInfo.types";
import MobileNumberInput from "@/shared/components/MobileNumberInput/MobileNumberInput";
import { Input } from "@/shared/components/Forms/Input";

interface RegistrationBasicInfoStepProps {
  values: BasicInfoValues;
  onFieldChange: BasicInfoFieldChange;
  module: string;
  role: string;
  onVerified: () => void;
}

export default function RegistrationBasicInfoStep({
  values,
  onFieldChange,
  module,
  role,
  onVerified,
}: RegistrationBasicInfoStepProps) {
  const { errors, handleFieldChange, otp } = useRegistrationBasicInfo({
    values,
    onFieldChange,
    module,
    role,
    onVerified,
  });

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          if (otp.canVerify) {
            otp.verifyOtp();
          }
        }}
      >
        <div className="mt-10 space-y-6">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            required
            value={values.Name}
            onChange={(e) => {
              handleFieldChange("Name", e.target.value);
            }}
            error={errors.Name}
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-[1fr_120px]">
            <MobileNumberInput
              label="Mobile Number"
              mobileNumber={values.MobileNumber ?? ""}
              countryCode={values.MobileNumberCountryCode ?? "+91"}
              required
              error={errors.MobileNumber}
              onMobileChange={(value) => {
console.log(value)
                handleFieldChange("MobileNumber", value)
              }
              }
              onCountryCodeChange={(value) =>
                handleFieldChange("MobileNumberCountryCode", value)
              }
            />
            <div className="flex items-end">
              <Button
                type="button"
                className="h-11 w-full"
                variant="outline"
                onClick={otp.sendOtp}
              >
                Send OTP
              </Button>
            </div>
          </div>
          {otp.state.isSent && (
            <OtpInput
              length={OTP_LENGTH}
              value={otp.state.value}
              onChange={otp.handleOtpChange}
            />
          )}
          <Button
            className="mt-2 h-12 w-full rounded-xl"
            style={{ width: "stretch" }}
            disabled={!otp.canVerify}
            type="submit"
          >
            Continue
          </Button>
        </div>
      </form>
      <div className="mt-12 grid grid-cols-3 gap-4 border-t border-slate-200 pt-8">
        <div className="flex flex-col items-center text-center">
          <div className="mb-3 rounded-full bg-sky-100 p-3">
            <ShieldCheck className="text-sky-600" size={20} />
          </div>

          <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">
            RERA Verified
          </span>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="mb-3 rounded-full bg-sky-100 p-3">
            <Zap className="text-sky-600" size={20} />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">
            Fast Approval
          </span>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="mb-3 rounded-full bg-sky-100 p-3">
            <Headset className="text-sky-600" size={20} />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wide text-slate-600">
            Dedicated Manager
          </span>
        </div>
      </div>
    </>
  );
}
