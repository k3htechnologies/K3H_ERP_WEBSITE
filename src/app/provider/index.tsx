// app/providers/AppProviders.tsx

import type { ReactNode } from 'react';

import { LoadingProvider } from '@/app/provider/LoadingProvider/LoadingProvider';
import { EnquiryModalProvider } from '@/app/provider/EnquiryProvider/EnquiryModalContext';
import LenisProvider from '@/app/provider/LenisProvider/LenisProvider';

interface AppProvidersProps {
  children: ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <LenisProvider>
      <LoadingProvider>
        <EnquiryModalProvider>{children}</EnquiryModalProvider>
      </LoadingProvider>
    </LenisProvider>
  );
}
