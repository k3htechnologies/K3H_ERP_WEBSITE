/**
 * Fields collected by the common first step of every registration flow.
 * Each role's request type (ChannelPartner, Vendor, ...) must include these.
 */
export interface BasicInfoValues {
  Name: string;
  MobileNumber: string;
  MobileNumberCountryCode: string;
}

export type BasicInfoErrors = Partial<Record<keyof BasicInfoValues, string>>;

export type BasicInfoFieldChange = <K extends keyof BasicInfoValues>(
  field: K,
  value: BasicInfoValues[K],
) => void;
