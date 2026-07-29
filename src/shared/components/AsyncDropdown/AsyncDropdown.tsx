import { AnimatePresence, motion } from 'framer-motion';
import { Check, ChevronDown, Search } from 'lucide-react';
import { type KeyboardEvent, useEffect, useRef, useState } from 'react';

export interface DropdownOption {
  id: string;
  label: string;
  subtitle?: string;
}
interface LoadOptionsParams {
  page: number;
  pageSize: number;
  keyword: string;
}

export interface LoadOptionsResult {
  data: DropdownOption[];
  totalRecords: number;
}

interface AsyncDropdownProps {
  label?: string;
  placeholder?: string;
  value?: DropdownOption | null;
  defaultValue?: DropdownOption | null;
  mandatory?: boolean;
  error?: string;
  onChange?: (option: DropdownOption) => void;
  disabled?: boolean;
  pageSize?: number;
  loadOptions: (obj: LoadOptionsParams) => Promise<LoadOptionsResult>;
}

const PAGE_SIZE = 10;
export default function AsyncDropdown({
  label,
  placeholder = 'Select...',
  value,
  onChange,
  disabled,
  loadOptions,
  mandatory = false,
  defaultValue = null,
  error,
}: AsyncDropdownProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [highlighted, setHighlighted] = useState(0);
  const [options, setOptions] = useState<DropdownOption[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [initialized, setInitialized] = useState(false);
  const [selectedOption, setSelectedOption] = useState<DropdownOption | null>(
    defaultValue ?? null
  );
  const selected = value ?? selectedOption;
  const totalRecords = useRef(0);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const load = async (pageToLoad: number, keyword = '', reset = false) => {
    if (loading) return;
    setLoading(true);
    try {
      const response = await loadOptions({
        page: pageToLoad,
        pageSize: PAGE_SIZE,
        keyword,
      });
      totalRecords.current = response.totalRecords;
      setHasMore(pageToLoad * PAGE_SIZE < response.totalRecords);
      setOptions((prev) =>
        reset ? response.data : [...prev, ...response.data]
      );
      setPage(pageToLoad);
      setInitialized(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (value !== undefined) {
      setSelectedOption(value);
    }
  }, [value]);

  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, []);

  useEffect(() => {
    if (open) {
      requestAnimationFrame(() => searchInputRef.current?.focus());
    }
  }, [open]);

  const select = (option: DropdownOption) => {
    if (value === undefined) {
      setSelectedOption(option);
    }
    onChange?.(option);
    setOpen(false);
    setSearch('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (!open) {
      if (e.key === 'Enter' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }
    if (e.key === 'Escape') {
      setOpen(false);
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlighted((prev) => Math.min(prev + 1, options.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlighted((prev) => Math.max(prev - 1, 0));
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      if (options[highlighted]) {
        select(options[highlighted]);
      }
    }
  };

  useEffect(() => {
    if (!open) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loading) {
          load(page + 1, search);
        }
      },
      {
        threshold: 1,
      }
    );
    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => observer.disconnect();
  }, [page, loading, hasMore, search, open]);
  return (
    <>
      <div ref={containerRef} className="relative w-full">
        {label && (
          <label className="text-montserrat text-[11px] font-semibold uppercase tracking-widest text-primary-sub">
            {label}
            {mandatory && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}
        <motion.button
          type="button"
          whileTap={{ scale: 0.98 }}
          disabled={disabled}
          onClick={() => {
            setOpen((prev) => {
              const next = !prev;
              if (next && !initialized) {
                load(1, '', true);
              }
              return next;
            });
          }}
          onKeyDown={handleKeyDown}
          className={`flex mt-3 h-14 w-full items-center justify-between
border border-t-0 border-l-0 border-r-0
px-4
transition-all
backdrop-blur-md
${disabled && 'cursor-not-allowed'}
${error ? 'border-b-red-500' : 'border-b-black/10 hover:border-primary/50'}
`}
        >
          <div className="flex flex-col items-start">
            {selected ? (
              <>
                <span className="text-sm text-text">{selected.label}</span>
                {/* {value.subtitle && (
                <span className="text-xs text-text-light">
                  {value.subtitle}
                </span>
              )} */}
              </>
            ) : (
              <span className="text-[#B8BCC2] text-sm">{placeholder}</span>
            )}
          </div>
          {!disabled && (
            <motion.div
              animate={{
                rotate: open ? 180 : 0,
              }}
            >
              <ChevronDown size={18} />
            </motion.div>
          )}
        </motion.button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{
                opacity: 0,
                y: -8,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -8,
                scale: 0.97,
              }}
              transition={{
                duration: 0.2,
              }}
              className="absolute left-0 z-50 mt-3 w-full overflow-hidden rounded-2xl border border-white/40 bg-white/75 shadow-[0_25px_70px_rgba(0,0,0,0.12)] backdrop-blur-xl"
            >
              <div className="border-b border-black/5 p-4">
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    ref={searchInputRef}
                    value={search}
                    onChange={(e) => {
                      const keyword = e.target.value;
                      setSearch(keyword);
                      setHighlighted(0);
                      load(1, keyword, true);
                    }}
                    placeholder="Search..."
                    className="h-11 w-full rounded-lg border border-black/10 bg-white pl-10 pr-3 text-sm outline-none transition focus:border-primary"
                  />
                </div>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {!loading && options.length === 0 && (
                  <div className="py-12 text-center">
                    <p className="text-sm text-gray-500">No results found</p>
                  </div>
                )}
                {loading && options.length === 0 && (
                  <div className="p-8 text-center">Loading...</div>
                )}
                {options.map((option, index) => (
                  <motion.button
                    type="button"
                    key={option.id}
                    initial={{
                      opacity: 0,
                      x: -10,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    transition={{
                      delay: index * 0.02,
                    }}
                    onMouseEnter={() => setHighlighted(index)}
                    onClick={() => select(option)}
                    className={`flex w-full items-center justify-between px-5 py-4 transition
                    ${
                      highlighted === index
                        ? 'bg-primary/10'
                        : 'hover:bg-black/3'
                    }
                  `}
                  >
                    <div className="text-left">
                      <p className="font-medium">{option.label}</p>

                      {option.subtitle && (
                        <p className="mt-1 text-xs text-gray-500">
                          {option.subtitle}
                        </p>
                      )}
                    </div>

                    {selected?.id == option.id && (
                      <Check size={18} className="text-primary" />
                    )}
                  </motion.button>
                ))}
                {loading && options.length > 0 && (
                  <div className="py-3 text-center text-sm">
                    Loading more...
                  </div>
                )}
                <div ref={loadMoreRef} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        {error && (
          <motion.p
            initial={{
              opacity: 0,
              y: -4,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mt-2 text-xs font-medium text-red-500"
          >
            {error}
          </motion.p>
        )}
      </div>
    </>
  );
}
