export interface FilterDropdownOption {
  label: string;
  value: string;
}

export type FilterDropdownTheme = 'light' | 'dark';

export interface FilterDropdownProps {
  /** Currently selected option. Pass `{ label: '', value: '' }` to represent "nothing selected" when used as a form field with a placeholder. */
  selectedOption: FilterDropdownOption;
  options: FilterDropdownOption[];
  onChange: (option: FilterDropdownOption) => void;

  /**
   * Visual theme. Defaults to 'dark' so existing usages (e.g. the filters bar)
   * keep working with zero changes.
   */
  theme?: FilterDropdownTheme;

  /** Field label rendered above the control. Omit for the bare filter use-case. */
  label?: string;
  /** Adds a required asterisk next to the label and marks the control as required for a11y. */
  mandatory?: boolean;
  /** Validation error message. When present, the control switches to an error style. */
  error?: string;
  /** Shown when selectedOption.value is empty. */
  placeholder?: string;
  /** `name` is useful when the dropdown is wired into a form state object keyed by field name. */
  name?: string;
  disabled?: boolean;
}
