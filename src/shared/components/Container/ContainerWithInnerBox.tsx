import Reveal from '@/shared/components/Reveal/Reveal';
import type { ContainerProps } from '@/shared/components/Container/Container.type';

const ContainerWithInnerBox = ({
  children,
  className = '',
  backgroundColor,
  heading,
  subHeading,
}: ContainerProps) => {
  return (
    <div
      className={`
        mx-auto
        w-full
        max-w-7xl
        px-4
        sm:px-6
        lg:px-8
        py-6
        md:py-10
        ${className}
      `}
    >
      <div
        className="px-8 py-20 md:px-16"
        style={{
          backgroundColor: backgroundColor || 'transparent',
        }}
      >
        {/* HEADER */}
        {heading && (
          <div>
            <Reveal>
              <p className="text-montserrat text-lg font-semibold uppercase tracking-[0.25em] text-primary">
                {heading}
              </p>
            </Reveal>
            {subHeading && (
              <Reveal delay={0.1}>
                <h2 className="mt-4 font-heading text-3xl text-about-dark md:text-5xl font-bold">
                  {subHeading}
                </h2>
              </Reveal>
            )}
          </div>
        )}

        {children}
      </div>
    </div>
  );
};

export default ContainerWithInnerBox;
