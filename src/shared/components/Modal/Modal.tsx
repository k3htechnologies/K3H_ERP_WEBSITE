import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import type { ModalProps } from '@/shared/components/Modal/Modal.type';

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

const Modal = ({
  isOpen,
  title,
  description,
  onClose,
  children,
}: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="
            fixed
            inset-0
            z-999
            flex
            items-center
            justify-center
            bg-black/45
            px-4
            backdrop-blur-[3px]
          "
        >
          {/* PANEL */}
          <motion.div
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="
              relative
              w-full
              max-w-md
              overflow-hidden
              border
              border-black/5
              bg-white
              p-6
              shadow-[0_20px_80px_rgba(0,0,0,0.18)]
              md:p-8
            "
          >
            {/* TOP ACCENT */}
            <div
              className="
                absolute
                left-0
                top-0
                h-1
                w-full
                bg-primary
              "
            />

            {/* CLOSE */}
            <button
              type="button"
              onClick={onClose}
              className="
                absolute
                right-4
                top-4
                flex
                h-10
                w-10
                items-center
                justify-center
                rounded-full
                border
                border-black/5
                text-[#76777D]
                transition-all
                duration-300
                hover:border-primary
                hover:text-primary
              "
            >
              <X size={18} />
            </button>

            {/* CONTENT */}
            <div className="pr-10">
              {title ? (
                <h3
                  className="
                    font-heading
                    text-3xl
                    uppercase
                    leading-none
                    text-text
                  "
                >
                  {title}
                </h3>
              ) : null}

              {description ? (
                <p
                  className="
                    mt-4
                    text-sm
                    leading-relaxed
                    text-[#5F6368]
                  "
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