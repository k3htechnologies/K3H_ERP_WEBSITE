import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

import type { ModalProps, ModalSize } from '@/shared/components/Modal/Modal.type';

const backdrop = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
  },
};

const modal = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
  exit: {
    opacity: 0,
    y: 20,
    scale: 0.96,
    transition: {
      duration: 0.22,
    },
  },
};

const sizeClasses: Record<ModalSize, string> = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-lg',
  xl: 'max-w-2xl',
  '2xl': 'max-w-4xl',
  '3xl': 'max-w-6xl',
  full: 'max-w-[calc(100vw-2rem)]',
};

const Modal = ({
  isOpen,
  title,
  description,
  onClose,
  children,
  size = 'md',
}: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="fixed inset-0 z-999 flex items-center justify-center bg-black/45 px-4 backdrop-blur-[3px]"
        >
          <motion.div
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`relative w-full ${sizeClasses[size]} max-h-[90vh] overflow-y-auto overscroll-contain border border-black/5 bg-white p-6 shadow-[0_20px_80px_rgba(0,0,0,0.18)] md:p-8`}
          >
            <div
              className="absolute left-0 top-0 h-1 w-full bg-primary"
            />
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-black/5 text-[#76777D] transition-all duration-300 hover:border-primary hover:text-primary"
            >
              <X size={18} />
            </button>

            <div>
              {title ? (
                <h3
                  className="font-heading text-3xl uppercase leading-none text-text"
                >
                  {title}
                </h3>
              ) : null}

              {description ? (
                <p
                  className="mt-4 text-sm leading-relaxed text-[#5F6368]"
                >
                  {description}
                </p>
              ) : null}

              {children ? (
                <div className="mt-6">
                  {children}
                </div>
              ) : null}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default Modal;