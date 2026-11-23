export interface Portal {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  authType: 'otp' | 'redirect' | 'form';
  redirectUrl?: string;
  active: boolean
}

