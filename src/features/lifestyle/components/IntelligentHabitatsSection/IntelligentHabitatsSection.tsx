import { motion } from 'framer-motion';

import SectionContainer from '@/shared/components/Container/SectionContainer';
import Reveal from '@/shared/components/Reveal/Reveal';
import {
  HABITATS_FEATURES,
  habitatscardVariants,
  habitatscontainerVariants,
  habitatsimageVariants,
} from '@/features/lifestyle/constants/lifestyle.constants';

const IntelligentHabitatsSection = () => {
  return (
    <SectionContainer
      heading={
        <>
          Intelligent <span className="text-primary">Habitats</span>
        </>
      }
      sideDescription={<span className="text-[#00658C]">FUTURE READY</span>}
    >
      <div className="mt-12 grid gap-10 lg:grid-cols-[420px_1fr] lg:items-center">
        <Reveal>
          <motion.div
            variants={habitatscontainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="space-y-5"
          >
            {HABITATS_FEATURES.map((item) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={item.title}
                  variants={habitatscardVariants}
                  whileHover={{
                    y: -5,
                    scale: 1.02,
                  }}
                  transition={{
                    duration: 0.25,
                  }}
                  className="group flex items-start gap-4 rounded-3xl bg-white p-7 shadow-[0_18px_40px_rgba(0,0,0,0.05)]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F4FAFE] text-[#2E74B5] transition group-hover:bg-[#2E74B5] group-hover:text-white">
                    <Icon size={20} strokeWidth={1.8} />
                  </div>

                  <div>
                    <h3 className="font-medium text-[#2D2D2D]">{item.title}</h3>

                    <p className="mt-1 text-sm leading-6 text-[#666666]">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </Reveal>
        <Reveal>
          <motion.div
            variants={habitatsimageVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            whileHover={{
              scale: 1.015,
            }}
            transition={{
              duration: 0.35,
            }}
            className="overflow-hidden rounded-4xl shadow-[0_25px_70px_rgba(0,0,0,0.15)]"
          >
            <img
              src="/habitats.jpeg"
              alt="Luxury smart living"
              className="h-80 w-full object-cover md:h-90 lg:h-100"
            />
          </motion.div>
        </Reveal>
      </div>
    </SectionContainer>
  );
};

export default IntelligentHabitatsSection;
