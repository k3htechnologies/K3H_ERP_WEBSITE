import type { JobOpening } from '@/features/jobsearch/api/jobsearch.response';

export interface JobCardProps {
  job: JobOpening;
  index: number;
  onApply?: (job: JobOpening) => void;
}
