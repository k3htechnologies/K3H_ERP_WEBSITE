export interface TextWithToggleProps {
  text: string;
  iconSize?: number;
  gap?: number;
  className?: string;
  textClassName?: string;
  defaultOpen?: boolean;
  onToggle?: (isOpen: boolean) => void;
  ref?:  React.Ref<HTMLButtonElement> | undefined;
}
