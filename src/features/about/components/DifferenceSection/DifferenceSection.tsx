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
        <div className="grid items-stretch gap-6 pt-20 sm:grid-cols-2 xl:grid-cols-4">
          {VALUES.map((item) => (
            <Reveal>
              <div
                key={item.title}
                className="group relative flex h-full overflow-hidden rounded-3xl p-px transition-all duration-500 hover:scale-[1.03] hover:z-10"
              >
                {/* Gradient Border */}
                {/* <div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background:
                      'linear-gradient(169.15deg, rgba(255,255,255,0.4) 0%, rgba(238,237,237,0.2) 96.79%)',
                  }}
                /> */}

                {/* Card */}
                <motion.div
                  className="relative flex h-full flex-1 flex-col rounded-[23px] px-8 py-8 transition-all duration-500 group-hover:-translate-y-1"
                  style={{
                    transformStyle: 'preserve-3d',
                    transformPerspective: 1200,
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(35px)',
                  }}
                >
                  <h3 className="font-heading text-xl leading-none text-white">
                    {item.title}
                  </h3>

                  <p className="mt-8 text-lg leading-[1.75] text-white/85 text-montserrat">
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
