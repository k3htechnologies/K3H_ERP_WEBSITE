import { isDevelopment } from '@/app/config';
import type { Portal } from '@/features/login/types/login.type';

const DEV_LOGIN_BASE_ROUTE = 'http://10.8.2.9:480/login';
const PROD_LOGIN_BASE_ROUTE = 'https://portal.k3htechnologies.com/login';
const DEV_ERP_URL = 'http://10.8.2.7:411';
const PROD_ERP_URL = 'https://erp.k3htechnologies.com';

export const PORTALS: Portal[] = [
  {
    id: 'employee',
    title: 'Employee Login',
    subtitle: 'Workspace',
    description: 'Access employee workspace and internal resources.',
    authType: 'redirect',
    redirectUrl: isDevelopment() ? DEV_ERP_URL : PROD_ERP_URL,
    active: true,
  },
  {
    id: 'customer',
    title: 'Customer Portal',
    subtitle: 'Customer Corner',
    description: 'Track projects, documents and support requests.',
    authType: 'redirect',
    redirectUrl: isDevelopment()
      ? `${DEV_LOGIN_BASE_ROUTE}?role=CUSTOMER`
      : `${PROD_LOGIN_BASE_ROUTE}?role=CUSTOMER`,
    active: false,
  },
  {
    id: 'vendor',
    title: 'Vendor Portal',
    subtitle: "Vendor's Connect",
    description: 'Manage procurement, invoices and communications.',
    authType: 'redirect',
    redirectUrl: isDevelopment()
      ? `${DEV_LOGIN_BASE_ROUTE}?role=VENDOR`
      : `${PROD_LOGIN_BASE_ROUTE}?role=VENDOR`,
    active: false,
  },

  {
    id: 'partner',
    title: 'Channel Partner Login',
    subtitle: 'C.P Portal',
    description: 'Access channel partner tools and opportunities.',
    authType: 'redirect',
    redirectUrl: isDevelopment()
      ? `${DEV_LOGIN_BASE_ROUTE}?role=CP`
      : `${PROD_LOGIN_BASE_ROUTE}?role=CP`,
    active: true,
  },

  {
    id: 'architect',
    title: 'Architect Login',
    subtitle: 'Consultant Hub',
    description: 'Review plans, submissions and project resources.',
    authType: 'redirect',
    redirectUrl: isDevelopment()
      ? `${DEV_LOGIN_BASE_ROUTE}?role=ARCHITECT`
      : `${PROD_LOGIN_BASE_ROUTE}?role=ARCHITECT`,
    active: false,
  },
];
