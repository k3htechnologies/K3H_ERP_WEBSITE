import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

import type { AnimateRouteOptions } from '@/shared/components/AnimatedPage/AnimatedPage.type';

const defaultOptions: AnimateRouteOptions = {
  duration: 0.6,
  ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
};

export const animateRoute = (
  Component: React.ComponentType,
  options: AnimateRouteOptions = {}
) => {
  const { duration, ease } = {
    ...defaultOptions,
    ...options,
  };

  const AnimatedRoute: React.FC = () => {
    const location = useLocation();

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          //   initial={{
          //     opacity: 0,
          //     x: 120,
          //     scale: 0.98,
          //     filter: 'blur(10px)',
          //   }}
          //   animate={{
          //     opacity: 1,
          //     x: 0,
          //     scale: 1,
          //     filter: 'blur(0px)',
          //   }}
          //   exit={{
          //     opacity: 0,
          //     x: -120,
          //     scale: 0.98,
          //     filter: 'blur(10px)',
          //   }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{
            duration,
            ease,
          }}
        >
          <Component />
        </motion.div>
      </AnimatePresence>
    );
  };

  return AnimatedRoute;
};
