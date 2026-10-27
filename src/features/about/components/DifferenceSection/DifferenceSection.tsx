import { motion } from 'framer-motion';

import Reveal from '@/shared/components/Reveal/Reveal';
import SectionContainer from '@/shared/components/Container/SectionContainer';

const VALUES = [
  {
    title: 'Craftsmanship',
    description:
      'Every H.Rishabraj residence is shaped through meticulous planning, premium materials, and exceptional execution, where every finish, proportion, and detail reflects our commitment to architectural excellence.',
  },
  {
    title: 'Trust',
    description:
      'Built on transparency, integrity, and consistent delivery, we have earned the confidence of homeowners, partners, and communities through every milestone we achieve.',
  },
  {
    title: 'Innovation',
    description:
      'We create luxury residences that balance timeless architecture with contemporary living, ensuring every space remains elegant, functional, and relevant for generations.',
  },
  {
    title: 'Legacy',
    description:
      'Every development is envisioned as a lasting asset, combining exceptional locations, thoughtful planning, and enduring quality to create value that extends well beyond possession.',
  },
];

const DifferenceSection = () => {
  return (
    <SectionContainer
      headingColorClass="text-white"
      heading="Why Choose Us"
      footerHeading="The Difference"
      bgClassName="bg-background-dark"
    >
      <Reveal>
        <div className="grid grid-cols-2 items-stretch gap-3 pt-10 sm:gap-5 sm:pt-14 xl:grid-cols-4 xl:gap-6 xl:pt-20">
          {VALUES.map((item) => (
            <Reveal key={item.title}>
              <div className="group relative flex h-full min-w-0 overflow-hidden rounded-2xl p-px transition-all duration-500 hover:z-10 hover:scale-[1.02] sm:rounded-3xl sm:hover:scale-[1.03]">
                <motion.div
                  className="relative flex h-full min-w-0 flex-1 flex-col rounded-[15px] px-3 py-4 transition-all duration-500 group-hover:-translate-y-1 sm:rounded-[23px] sm:px-5 sm:py-6 xl:px-8 xl:py-8"
                  style={{
                    transformStyle: 'preserve-3d',
                    transformPerspective: 1200,
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(35px)',
                  }}
                >
                  <h3 className="font-heading text-base leading-tight text-white sm:text-lg xl:text-xl">
                    {item.title}
                  </h3>

                  <p className="mt-4 leading-relaxed text-white/85 text-montserrat sm:mt-6 text-sm sm:leading-7 xl:mt-8 xl:text-lg xl:leading-[1.75]">
                    {item.description}
                  </p>
                </motion.div>
              </div>
            </Reveal>
          ))}
        </div>
      </Reveal>
    </SectionContainer>
  );
};

export default DifferenceSection;