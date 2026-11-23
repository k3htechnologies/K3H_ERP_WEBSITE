import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import Reveal from '@/shared/components/Reveal/Reveal';
import { useJobSearchContext } from '@/features/jobsearch/context/JobSearchContextProvider';
import {
  badgeVariants,
  containerVariants,
  itemVariants,
} from '@/features/jobsearch/constants/jobsearch.constants';

const JobSearchHeaderSection = () => {
  const navigate = useNavigate();

  const { totalRecords } = useJobSearchContext();

  return (
    <section className="bg-[#FBF9F8] pt-28 lg:pt-34 pb-8">
      <div className="mx-auto w-full px-5 sm:px-8 md:px-12 lg:px-20">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Back Button */}
          <motion.button
            variants={itemVariants}
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => navigate(-1)}
            className="group mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#0058BE]"
          >
            <ArrowLeft
              size={16}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            <span>Back to Career</span>
          </motion.button>

          <Reveal>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <motion.div variants={itemVariants}>
                <div className="mb-6 h-1 w-14 bg-primary" />
                <h2 className="font-heading text-2xl leading-tight md:text-3xl font-bold">
                  Open Positions
                </h2>
                <p className="mt-3 max-w-xl text-[#424754] text-sm text-montserrat">
                  Explore your next professional chapter with us.
                </p>
              </motion.div>

              <motion.div
                variants={badgeVariants}
                whileHover={{
                  y: -2,
                  scale: 1.04,
                }}
                className="flex h-10 items-center justify-center rounded-full  bg-[#ECEEF0] px-5 shadow-sm"
              >
                <span className="text-sm font-medium text-[#424754] text-montserrat">
                  {totalRecords} Roles Available
                </span>
              </motion.div>
            </div>
          </Reveal>
        </motion.div>
      </div>
    </section>
  );
};

export default JobSearchHeaderSection;
