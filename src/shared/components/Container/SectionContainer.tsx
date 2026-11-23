import type { PropsWithChildren } from 'react';
import Reveal from '@/shared/components/Reveal/Reveal';

interface SectionContainerProps extends PropsWithChildren {
  bgClassName?: string;
  heading?: React.ReactNode;
  headingColorClass?: string;
  sideDescription?: React.ReactNode;
  footerHeading?: React.ReactNode;
  ptClassName?: string;
  pbClassName?: string;
}
const SectionContainer: React.FC<SectionContainerProps> = ({
  bgClassName = 'bg-trasperant',
  heading,
  headingColorClass = 'text-black',
  sideDescription,
  footerHeading,
  ptClassName = 'pt-16 lg:pt-24',
  pbClassName = 'pb-16 lg:pb-24',
  children,
}) => {
  return (
    <section className={`${ptClassName} ${pbClassName} ${bgClassName}`}>
      <div className="mx-auto w-full px-5 sm:px-8 md:px-12 lg:px-20">
        {heading && (
          <Reveal>
            <div className="flex flex-col gap-4 sm:gap-5 lg:flex-row lg:items-end lg:justify-between">
              <div className="min-w-0">
                <div className="mb-4 h-1 w-14 bg-primary sm:mb-6" />
                <h2
                  className={`font-heading text-2xl leading-tight font-bold sm:text-3xl md:text-5xl ${headingColorClass}`}
                >
                  {heading}
                </h2>
              </div>

              {sideDescription && (
                <div className="text-start lg:max-w-sm lg:shrink-0 lg:text-end">
                  <p className="max-w-sm text-montserrat text-sm font-medium leading-6">
                    {sideDescription}
                  </p>
                </div>
              )}
            </div>
          </Reveal>
        )}
        {children}
        {footerHeading && (
          <Reveal>
            <div className="flex mt-20 gap-4 justify-end">
              <div className="mb-6 h-0.5 w-16 bg-primary mt-3" />
              <h2 className="text-montserrat text-sm leading-tight text-secondary md:text-lg text-primary">
                {footerHeading}
              </h2>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
};

export default SectionContainer;
