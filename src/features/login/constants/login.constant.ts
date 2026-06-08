import { isDevelopment } from '@/app/config';
import type { Portal } from '@/features/login/types/login.type';

export const PORTALS: Portal[] = [
  {
    id: 'employee',
    title: 'Employee Login',
    subtitle: 'Workspace',
    description: 'Access employee workspace and internal resources.',
    authType: 'redirect',
    redirectUrl: isDevelopment() ? 'http://localhost:3000/sign-in' : '',
  },
  {
    id: 'customer',
    title: 'Customer Portal',
    subtitle: 'Customer Corner',
    description: 'Track projects, documents and support requests.',
    authType: 'redirect',
    redirectUrl: isDevelopment()
      ? 'http://localhost:4000/login?role=customer'
      : '',
  },
  {
    id: 'vendor',
    title: 'Vendor Portal',
    subtitle: "Vendor's Connect",
    description: 'Manage procurement, invoices and communications.',
    authType: 'redirect',
    redirectUrl: isDevelopment()
      ? 'http://localhost:4000/login?role=vendor'
      : '',
  },

  {
    id: 'partner',
    title: 'Channel Partner Login',
    subtitle: 'C.P Portal',
    description: 'Access channel partner tools and opportunities.',
    authType: 'redirect',
    redirectUrl: isDevelopment()
      ? 'http://localhost:4000/login?role=partner'
      : '',
  },

  {
    id: 'architect',
    title: 'Architect Login',
    subtitle: 'Consultant Hub',
    description: 'Review plans, submissions and project resources.',
    authType: 'redirect',
    redirectUrl: isDevelopment()
      ? 'http://localhost:4000/login?role=architect'
      : '',
  },
];
