export interface FilterDropdownOption {
  label: string;
  value: string;
}

export type FilterDropdownTheme = 'light' | 'dark';

export interface FilterDropdownProps {
  selectedOption: FilterDropdownOption;
  options: FilterDropdownOption[];
  onChange: (option: FilterDropdownOption) => void;
  theme?: FilterDropdownTheme;
  label?: string;
  mandatory?: boolean;
  error?: string;
  placeholder?: string;
  name?: string;
  disabled?: boolean;
  containerClass?: string;
}
