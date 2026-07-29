import { useReveal } from '@/shared/hooks/useReveal';
import type { RevealProps } from '@/shared/components/Reveal/Reveal.type';

const Reveal = ({ children, className = '', delay = 0 }: RevealProps) => {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={
        {
          '--delay': `${delay}ms`,
        } as React.CSSProperties
      }
      className={`
        reveal
        ${isVisible ? 'reveal-active' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Reveal;
