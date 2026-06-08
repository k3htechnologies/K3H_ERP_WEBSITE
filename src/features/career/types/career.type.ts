export interface VisionItem {
  id: string;
  title: string;
  description: string;
}

export type Category = 'All' | 'Brokerage' | 'Creative' | 'Operations';

export interface Opening {
  id: number;
  title: string;
  category: Exclude<Category, 'All'>;
  location: string;
  description: string;
}

export interface FormData {
  fullName: string;
  email: string;
  mobile: string;
  portfolio: string;
}

export interface FormErrors {
  fullName?: string;
  email?: string;
  mobile?: string;
  portfolio?: string;
}
