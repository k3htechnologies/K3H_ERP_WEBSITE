import { EMAIL_REGEX, MOBILE_REGEX } from '@/shared/constants';

export type ApplicationFieldName =
  | 'referredBy'
  | 'fullName'
  | 'address'
  | 'mobile'
  | 'email'
  | 'qualification'
  | 'university'
  | 'graduationYear'
  | 'percentage'
  | 'company'
  | 'currentRole'
  | 'experience'
  | 'reasonForChange'
  | 'skills'
  | 'currentSalary'
  | 'expectedSalary'
  | 'noticePeriod';

export type FormValues = Record<ApplicationFieldName, string>;

interface FieldConfig {
  label: string;
  required?: boolean;
  format?: (raw: string) => string;
  validate?: (value: string, values: FormValues) => string;
}

const MIN_TEXT_LIMIT = 50;
const MAX_TEXT_LIMIT = 250;

const FIELD_CONFIG: Record<ApplicationFieldName, FieldConfig> = {
  referredBy: {
    label: 'source/referred by',
    format: (raw) => raw.slice(0, MIN_TEXT_LIMIT),
    required: true,
  },
  fullName: {
    label: 'Full name',
    format: (raw) => raw.slice(0, MIN_TEXT_LIMIT),
    required: true,
  },
  address: {
    label: 'Address',
    format: (raw) => raw.slice(0, MAX_TEXT_LIMIT),
    required: true,
  },

  mobile: {
    label: 'Mobile number',
    required: true,
    format: (raw) => raw.replace(/\D/g, '').slice(0, 10),
    validate: (value) => {
      if (value.length < 10) return 'Mobile number must be 10 digits.';
      if (!MOBILE_REGEX.test(value)) return 'Enter a valid mobile number.';
      return '';
    },
  },

  email: {
    label: 'Email',
    required: true,
    format: (raw) => raw.trimStart().toLowerCase(),
    validate: (value) =>
      EMAIL_REGEX.test(value) ? '' : 'Enter a valid email address.',
  },

  qualification: {
    label: 'Qualification',
    required: true,
  },
  university: {
    label: 'University',
    format: (raw) => raw.slice(0, MAX_TEXT_LIMIT),
    required: true,
  },

  graduationYear: {
    label: 'Graduation year',
    required: true,
    format: (raw) => raw.replace(/\D/g, '').slice(0, 4),
    validate: (value) => {
      if (value.length < 4) return 'Enter a valid 4-digit graduation year.';
      const year = Number(value);
      const currentYear = new Date().getFullYear();
      if (year < 1900 || year > currentYear + 10) {
        return `Graduation year must be between 1900 and ${currentYear + 10}.`;
      }
      return '';
    },
  },

  percentage: {
    label: 'Percentage',
    required: true,
    format: (raw) => {
      const formatted = raw
        .replace(/[^\d.]/g, '')
        .replace(/(\..*)\./g, '$1')
        .replace(/^(\d{0,3})(\.\d{0,2})?.*$/, '$1$2');

      if (formatted !== '' && Number(formatted) > 100) {
        return '100';
      }
      return formatted;
    },
    validate: (value) => {
      const numericValue = Number(value);
      if (isNaN(numericValue)) return 'percentage/CGPA is required';
      if (numericValue < 0 || numericValue > 100)
        return 'Percentage must be between 0 and 100.';
      if (value.includes('.') && value.split('.')[1].length > 2)
        return 'Maximum 2 decimal places are allowed.';
      return '';
    },
  },

  company: {
    label: 'Company name',
    format: (raw) => raw.slice(0, MAX_TEXT_LIMIT),
    required: true,
  },
  currentRole: {
    label: 'Role',
    format: (raw) => raw.slice(0, MAX_TEXT_LIMIT),
    required: true,
  },

  experience: {
    label: 'Experience',
    required: true,
    format: (raw) =>
      raw
        .replace(/[^\d.]/g, '')
        .replace(/(\..*)\./g, '$1')
        .replace(/^(\d*\.?\d{0,2}).*$/, '$1'),
    validate: (value) => {
      const experience = Number(value);

      if (isNaN(experience)) return 'Enter a valid experience.';
      if (experience < 0 || experience > 60)
        return 'Experience must be between 0 and 60 years.';
      if (value.includes('.') && value.split('.')[1].length > 2)
        return 'Only two decimal places are allowed.';

      return '';
    },
  },

  reasonForChange: {
    label: 'Reason',
    format: (raw) => raw.slice(0, MAX_TEXT_LIMIT),
    required: true,
  },
  skills: { label: 'Skills', required: true },

  currentSalary: { label: 'Current salary', required: true },
  expectedSalary: { label: 'Expected salary', required: true },

  noticePeriod: {
    label: 'Notice period',
    required: true,
    format: (raw) => raw.replace(/\D/g, ''),
    validate: (value) => {
      const days = Number(value);
      if (isNaN(days)) return 'Enter a valid notice period.';
      if (days < 0 || days > 365)
        return 'Notice period must be between 0 and 365 days.';
      return '';
    },
  },
};

export const formatFieldValue = (
  name: ApplicationFieldName,
  raw: string
): string => {
  const config = FIELD_CONFIG[name];
  return config?.format ? config.format(raw) : raw;
};

export const validateField = (
  name: ApplicationFieldName,
  value: string,
  values: FormValues
): string => {
  const config = FIELD_CONFIG[name];
  if (!config) return '';

  if (config.required && !value.trim()) {
    return `${config.label} is required.`;
  }

  return config.validate ? config.validate(value, values) : '';
};

export const STEP_FIELDS: Record<number, ApplicationFieldName[]> = {
  0: ['referredBy', 'fullName', 'address', 'mobile', 'email'],
  1: ['qualification', 'university', 'graduationYear', 'percentage'],
  2: ['company', 'currentRole', 'experience', 'reasonForChange', 'skills'],
  3: ['currentSalary', 'expectedSalary', 'noticePeriod'],
};
