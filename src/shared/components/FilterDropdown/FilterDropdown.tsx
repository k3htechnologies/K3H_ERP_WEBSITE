import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type { FilterDropdownProps } from '@/shared/components/FilterDropdown/FilterDropdown.type';

const FilterDropdown = ({
  selectedOption,
  options,
  onChange,
}: FilterDropdownProps) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

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
      <motion.button
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-12 w-full items-center justify-between rounded-lg px-4 text-sm text-white transition-all duration-300 hover:bg-white/10"
        style={{
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <span>{selectedOption.label}</span>

        <motion.div animate={{ rotate: open ? 180 : 0 }}>
          <ChevronDown size={16} className="text-white/50" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{
              opacity: 0,
              y: 10,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: 8,
              scale: 0.98,
            }}
            transition={{
              duration: 0.2,
            }}
            className="absolute left-0 top-full z-99 mt-2 w-full overflow-scroll sidebar-scroll rounded-xl max-h-64"
            style={{
              background: '#49535D',
              border: '1px solid rgba(255,255,255,0.08)',
              //   backdropFilter: 'blur(24px)',
            }}
          >
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between px-4 py-3 text-left text-sm text-white transition hover:bg-white/10"
              >
                <span>{option.label}</span>

                {selectedOption.value === option.value && (
                  <Check size={16} className="text-[#3FA9F5]" />
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
