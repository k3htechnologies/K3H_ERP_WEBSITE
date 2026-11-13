import type { JobOpening } from '@/features/jobsearch/api/jobsearch.response';

export interface JobDescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  job: JobOpening;
  onApply?: (job: JobOpening) => void;
}
