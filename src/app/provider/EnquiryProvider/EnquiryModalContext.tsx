// context/EnquiryModalContext.tsx
import type { DropdownOption } from '@/shared/components/AsyncDropdown/AsyncDropdown';
import EnquiryModal from '@/shared/components/EnquiryModal/EnquiryModal';
import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from 'react';

export interface EnquiryPrefillData {
  location: DropdownOption;
  project: DropdownOption;
  locked?: boolean; // whether these fields should be disabled, defaults to true
}

interface EnquiryModalContextType {
  isOpen: boolean;
  prefillData: EnquiryPrefillData | null;
  openEnquiryModal: (prefill?: EnquiryPrefillData) => void;
  closeEnquiryModal: () => void;
}

const EnquiryModalContext = createContext<EnquiryModalContextType | undefined>(
  undefined
);

export const EnquiryModalProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [prefillData, setPrefillData] = useState<EnquiryPrefillData | null>(
    null
  );

  const openEnquiryModal = useCallback((prefill?: EnquiryPrefillData) => {
    setPrefillData(prefill ?? null);
    setIsOpen(true);
  }, []);

  const closeEnquiryModal = useCallback(() => {
    setIsOpen(false);
    // clear after the close animation finishes so content doesn't flash empty mid-exit
    setTimeout(() => setPrefillData(null), 300);
  }, []);

  return (
    <EnquiryModalContext.Provider
      value={{ isOpen, prefillData, openEnquiryModal, closeEnquiryModal }}
    >
      {children}
      <EnquiryModal
        open={isOpen}
        onClose={closeEnquiryModal}
        prefillData={prefillData}
      />
    </EnquiryModalContext.Provider>
  );
};

export const useEnquiryModal = () => {
  const context = useContext(EnquiryModalContext);
  if (!context) {
    throw new Error(
      'useEnquiryModal must be used within an EnquiryModalProvider'
    );
  }
  return context;
};
