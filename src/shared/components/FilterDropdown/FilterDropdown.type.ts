export interface Option {
  label: string;
  value: string | null;
}

export interface FilterDropdownProps {
  selectedOption: Option;
  options: Option[];
  onChange: (value: Option) => void;
}
