export interface EnquiryFormData {
  fullName: string;
  email: string;
  mobile: string;
}

export interface EnquiryFormErrors {
  projectLocation?: string;
  projectName?: string;
  fullName?: string;
  email?: string;
  mobile?: string;
}
