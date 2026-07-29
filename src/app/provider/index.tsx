// app/providers/AppProviders.tsx

import type { ReactNode } from 'react';

import { LoadingProvider } from '@/app/provider/LoadingProvider/LoadingProvider';
import { EnquiryModalProvider } from '@/app/provider/EnquiryProvider/EnquiryModalContext';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <LoadingProvider>
      <EnquiryModalProvider>{children}</EnquiryModalProvider>
    </LoadingProvider>
  );
}
