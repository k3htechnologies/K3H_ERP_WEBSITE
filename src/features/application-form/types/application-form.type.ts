export type Step =
  | 'Basic Details'
  | 'Education'
  | 'Experience'
  | 'Salary & Final';

export interface ApplicationFormState {
  position: string;
  referredBy: string;
  fullName: string;
  address: string;
  mobile: string;
  email: string;
  qualification: string;
  university: string;
  graduationYear: string;
  percentage: string;
  company: string;
  currentRole: string;
  experience: string;
  skills: string;
  reasonForChange: string;
  currentSalary: string;
  expectedSalary: string;
  noticePeriod: string;
}
