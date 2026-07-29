import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

interface AccordionItemProps {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}

export default function AccordionItem({
  faq,
  isOpen,
  onToggle,
}: AccordionItemProps) {
  return (
    <div className="border-b border-secondary/20">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 py-7 text-left transition hover:text-primary"
      >
        <h3 className="text-cormorant-garamond text-xl text-secondary">
          {faq.question}
        </h3>

        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
          }}
          transition={{
            duration: 0.25,
          }}
        >
          <ChevronDown size={18} className="text-secondary" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{
              height: 0,
              opacity: 0,
            }}
            animate={{
              height: 'auto',
              opacity: 1,
            }}
            exit={{
              height: 0,
              opacity: 0,
            }}
            transition={{
              duration: 0.3,
            }}
            className="overflow-hidden"
          >
            <div className="pb-7 pr-10">
              <p className="max-w-4xl text-sm leading-8 text-secondary/70 text-montserrat">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
