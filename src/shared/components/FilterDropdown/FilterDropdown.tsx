import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { useEffect, useRef, useState, useId } from 'react';
import type { FilterDropdownProps } from '@/shared/components/FilterDropdown/FilterDropdown.type';

const THEME = {
  dark: {
    trigger: 'text-white',
    triggerBg: 'rgba(255,255,255,0.05)',
    triggerBorder: 'rgba(255,255,255,0.1)',
    triggerHover: 'hover:bg-white/10',
    chevron: 'text-white/50',
    placeholder: 'text-white/40',
    menuBg: '#49535D',
    menuBorder: 'rgba(255,255,255,0.08)',
    optionText: 'text-white',
    optionHover: 'hover:bg-white/10',
    check: 'text-[#3FA9F5]',
    label: 'text-white/70',
    errorBorder: '#F87171',
    errorText: 'text-red-400',
  },
  light: {
    trigger: 'text-slate-800',
    triggerBg: '#FFFFFF',
    triggerBorder: 'rgba(15,23,42,0.12)',
    triggerHover: 'hover:bg-slate-50',
    chevron: 'text-slate-400',
    placeholder: 'text-slate-400',
    menuBg: '#FFFFFF',
    menuBorder: 'rgba(15,23,42,0.08)',
    optionText: 'text-slate-700',
    optionHover: 'hover:bg-slate-100',
    check: 'text-[#3FA9F5]',
    label: 'text-slate-600',
    errorBorder: '#DC2626',
    errorText: 'text-red-600',
  },
} as const;

const FilterDropdown = ({
  selectedOption,
  options,
  onChange,
  theme = 'dark',
  label,
  mandatory = false,
  error,
  placeholder = 'Select',
  name,
  disabled = false,
  containerClass= ""
}: FilterDropdownProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const errorId = useId();

  const t = THEME[theme];
  const hasValue = Boolean(selectedOption?.value);
  const hasError = Boolean(error);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div ref={dropdownRef} className="relative min-w-32.5">
      {label && (
        <label className={`mb-1.5 block text-sm font-medium ${t.label}`}>
          {label}
          {mandatory && <span className="ml-0.5 text-red-500">*</span>}
        </label>
      )}

      <motion.button
        type="button"
        name={name}
        disabled={disabled}
        aria-invalid={hasError}
        aria-describedby={hasError ? errorId : undefined}
        aria-required={mandatory}
        whileHover={disabled ? undefined : { y: -2 }}
        whileTap={disabled ? undefined : { scale: 0.98 }}
        onClick={() => !disabled && setOpen((prev) => !prev)}
        className={`flex h-12 w-full items-center justify-between rounded-lg px-4 text-sm transition-all duration-300 ${containerClass} ${disabled ? 'cursor-not-allowed opacity-50' : t.triggerHover
          } ${hasValue ? t.trigger : t.placeholder}`}
        style={{
          background: t.triggerBg,
          border: `1px solid ${hasError ? t.errorBorder : t.triggerBorder}`,
        }}
      >
        <span>{hasValue ? selectedOption.label : placeholder}</span>

        <motion.div animate={{ rotate: open ? 180 : 0 }}>
          <ChevronDown size={16} className={t.chevron} />
        </motion.div>
      </motion.button>

      {hasError && (
        <p id={errorId} className={`mt-1 text-xs ${t.errorText}`}>
          {error}
        </p>
      )}

      <AnimatePresence>
        {open && !disabled && (
          <motion.div
            data-lenis-prevent
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 top-full z-99 mt-2 w-full overflow-scroll sidebar-scroll rounded-xl max-h-64"
            style={{
              background: t.menuBg,
              border: `1px solid ${t.menuBorder}`,
              boxShadow:
                theme === 'light'
                  ? '0 8px 24px rgba(15,23,42,0.08)'
                  : undefined,
            }}
          >
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition ${t.optionText} ${t.optionHover}`}
              >
                <span>{option.label}</span>

                {selectedOption.value === option.value && (
                  <Check size={16} className={t.check} />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FilterDropdown;
