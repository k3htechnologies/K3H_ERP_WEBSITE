export interface Portal {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  authType: 'otp' | 'redirect';
  redirectUrl?: string;
  active: boolean
}