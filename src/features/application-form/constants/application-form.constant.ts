import {
  BriefcaseBusiness,
  GraduationCap,
  IndianRupee,
  User2,
} from 'lucide-react';
import type { Step } from '@/features/application-form/types/application-form.type';
import type { FilterDropdownOption } from '@/shared/components/FilterDropdown/FilterDropdown.type';

export const STEPS: Step[] = [
  'Basic Details',
  'Education',
  'Experience',
  'Salary & Final',
];

export const STEP_ICONS = {
  'Basic Details': User2,
  Education: GraduationCap,
  Experience: BriefcaseBusiness,
  'Salary & Final': IndianRupee,
};

export const SALARY_RANGE_OPTIONS: FilterDropdownOption[] = [
  { label: '₹0 - ₹3,00,000', value: '0-300000' },
  { label: '₹3,00,000 - ₹6,00,000', value: '300000-600000' },
  { label: '₹6,00,000 - ₹9,00,000', value: '600000-900000' },
  { label: '₹9,00,000 - ₹12,00,000', value: '900000-1200000' },
  { label: '₹12,00,000 - ₹18,00,000', value: '1200000-1800000' },
  { label: '₹18,00,000 - ₹25,00,000', value: '1800000-2500000' },
  { label: '₹25,00,000+', value: '2500000+' },
];

export const QUALIFICATION_RANGE_OPTIONS: FilterDropdownOption[] = [
  { label: '10th Pass', value: '10th pass' },
  { label: '12th Pass', value: '12th pass' },
  { label: 'Diploma', value: 'diploma' },
  { label: 'Graduate', value: 'graduate' },
  { label: 'Post Graduate', value: 'post graduate' },
  { label: 'PhD', value: 'phd' },
  { label: 'Other', value: 'other' },
];

export const EMPTY_OPTION: FilterDropdownOption = { label: '', value: '' };

export const getOptionByValue = (OPTIONS: FilterDropdownOption[], value: string) =>
  OPTIONS.find((opt) => opt.value === value) ?? EMPTY_OPTION;
