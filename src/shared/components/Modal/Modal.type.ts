export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full';

export interface ModalProps {
  isOpen: boolean;
  title?: string;
  description?: string;
  onClose: () => void;
  children?: React.ReactNode;
  size?: ModalSize;
}