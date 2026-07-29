import type { ContainerProps } from '@/shared/components/Container/Container.type';

const Container = ({ children, className = '' }: ContainerProps) => {
  return (
    <div
      className={`
        mx-auto
        w-full
        px-4
        sm:px-6
        lg:px-20
        py-6
        md:py-10
        ${className}
      `}
    >
      {children}
    </div>
  );
};

export default Container;
