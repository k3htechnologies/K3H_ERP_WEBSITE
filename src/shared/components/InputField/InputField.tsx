import { motion } from 'framer-motion';
import type { InputFieldProps } from './InputField.type';

const InputField = ({
  label,
  name,
  placeholder,
  value,
  onChange,
  error,
  type = 'text',
  disabled = false
}: InputFieldProps) => {
  return (
    <div>
      {/* LABEL */}
      <label className="dm-sans text-[11px] font-semibold uppercase tracking-widest text-[#43474F]">
        {label}
      </label>

      {/* INPUT */}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className={` mt-3 h-14 w-full border-b bg-transparent px-4 text-sm text-text outline-none transition-all duration-300 placeholder:text-[#B8BCC2]
          ${
            error
              ? 'border-red-400 focus:border-red-500'
              : 'border-black/10 focus:border-primary'
          }
        `}
      />

      {/* ERROR */}
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
  );
};

export default InputField;
