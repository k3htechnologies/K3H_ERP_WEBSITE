import React, { useState } from 'react';
import type { TextWithToggleProps } from '@/shared/components/TextWithToggle/TextWithToggle.type';

const TextWithToggle: React.FC<TextWithToggleProps> = ({
  text,
  iconSize = 28,
  gap = 8,
  className = '',
  textClassName = '',
  defaultOpen = false,
  onToggle,
  ref = null,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleToggle = () => {
    const next = !isOpen;
    setIsOpen(next);
    onToggle?.(next);
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`inline-flex items-center leading-none ${className}`}
      style={{
        gap: `${gap}px`,
      }}
      ref={ref}
    >
      <span className={textClassName}>{text}</span>

      <span
        className={`inline-block text-white leading-none transition-transform duration-300 ease-in-out
                    ${isOpen ? 'rotate-45' : 'rotate-0'}
                `}
        style={{
          fontSize: `${iconSize}px`,
        }}
      >
        +
      </span>
    </button>
  );
};

export default TextWithToggle;
