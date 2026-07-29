import { motion } from 'framer-motion';

import { TIMELINE_POINTS_DESKTOP } from '@/features/about/constants/about.constant';
import SectionContainer from '@/shared/components/Container/SectionContainer';

const TIMELINE_START = 10;
const TIMELINE_END = 90;
const ANIMATION_DURATION = 10;
const VISIBLE_UNTIL = 0.8;
const REVEAL_DURATION = 0.03;

const getPointPosition = (index: number, total: number) => {
  if (total === 1) {
    return (TIMELINE_START + TIMELINE_END) / 2;
  }
  const gap = (TIMELINE_END - TIMELINE_START) / (total - 1);
  return TIMELINE_START + gap * index;
};

const getAppearTime = (index: number, total: number) => {
  return ((index + 1) / total) * VISIBLE_UNTIL;
};

const getLineAnimation = (total: number) => {
  const heights: string[] = ['0%'];
  const times: number[] = [0];
  for (let i = 0; i < total; i++) {
    const position = getPointPosition(i, total);
    const appear = getAppearTime(i, total);
    heights.push(`${position}%`);
    heights.push(`${position}%`);
    times.push(appear);
    times.push(appear + REVEAL_DURATION);
  }
  heights.push('0%');
  times.push(1);
  return {
    heights,
    times,
  };
};

const JourneyTimelineSection = () => {
  const lineAnimation = getLineAnimation(TIMELINE_POINTS_DESKTOP.length);
  return (
    <SectionContainer
      heading="Our Journey"
      footerHeading={`"Excellence has no shortcut."`}
    >
      {/* <div className="mx-auto mt-28 hidden max-w-5xl md:block">
          <div className="relative h-20">
            <div className="absolute top-1/2 h-px w-full -translate-y-1/2 bg-primary/20" />
            <motion.div
              className="absolute top-1/2 h-px -translate-y-1/2 bg-[#22D1EE]"
              animate={{
                width: [
                  '0%',
                  '10%',
                  '10%',
                  '32%',
                  '32%',
                  '54%',
                  '54%',
                  '76%',
                  '76%',
                  '98%',
                  '98%',
                  '0%',
                ],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: 'linear',
                times: [
                  0, 0.1, 0.15, 0.25, 0.3, 0.4, 0.45, 0.55, 0.6, 0.7, 0.85, 1,
                ],
              }}
            />
            {TIMELINE_POINTS_DESKTOP.map((point, index) => (
              <div
                key={point.year}
                className="absolute top-1/2 -translate-y-1/2"
                style={{
                  left: `${point.left}%`,
                }}
              >
                <motion.div
                  className={`absolute left-1/2 -translate-x-1/2 whitespace-nowrap font-heading text-2xl text-primary
    ${point.position === 'top' ? '-top-12' : 'top-8'}
  `}
                  animate={{
                    opacity: [0, 0, 1, 1, 1, 0, 0],
                    y:
                      point.position === 'top'
                        ? [12, 12, 0, 0, 0, 0, 0]
                        : [-12, -12, 0, 0, 0, 0, 0],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'linear',
                    times: [
                      0,
                      index * 0.15 + 0.1,
                      index * 0.15 + 0.15,
                      0.83,
                      0.839,
                      0.84,
                      1,
                    ],
                  }}
                >
                  {point.year}
                </motion.div>
                <motion.div
                  className={`absolute left-1/2 -translate-x-1/2
    ${point.position === 'top' ? 'top-3' : 'bottom-3'}
  `}
                  style={{
                    transformOrigin:
                      point.position === 'top' ? 'top center' : 'bottom center',
                  }}
                  animate={{
                    height: [0, 0, 70, 70, 70, 0],
                    opacity: [0, 0, 1, 1, 1, 0],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'linear',
                    times: [
                      0,
                      index * 0.15 + 0.1,
                      index * 0.15 + 0.15,
                      0.83,
                      0.839,
                      0.84,
                    ],
                  }}
                >
                  <svg
                    width="14"
                    height="100%"
                    viewBox="0 0 14 80"
                    preserveAspectRatio="none"
                    className={`overflow-visible
      ${point.position === 'bottom' ? 'rotate-180' : ''}
    `}
                  >
                    <line
                      x1="7"
                      y1="0"
                      x2="7"
                      y2="68"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-[#DCDCDC]"
                    />
                    <path
                      d="M2 63 L7 70 L12 63"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#DCDCDC]"
                    />
                  </svg>
                </motion.div>
                <motion.div
                  className={`absolute left-1/2 w-40 -translate-x-1/2 text-center
    ${point.position === 'top' ? 'top-20.5' : '-top-25'}
  `}
                  animate={{
                    opacity: [0, 0, 1, 1, 1, 0, 0],
                    y:
                      point.position === 'top'
                        ? [-8, -8, 0, 0, 0, 0, 0]
                        : [8, 8, 0, 0, 0, 0, 0],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'linear',
                    times: [
                      0,
                      index * 0.15 + 0.12,
                      index * 0.15 + 0.18,
                      0.83,
                      0.839,
                      0.84,
                      1,
                    ],
                  }}
                >
                  <p className="text-montserrat text-xs font-medium leading-relaxed text-[#343434]">
                    {point.description}
                  </p>
                </motion.div>
                <motion.div
                  className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-[#22D1EE] shadow-[0_0_0_2px_#22D1EE]"
                  animate={{
                    scale: [0, 0, 1, 1, 1, 0, 0],
                    opacity: [0, 0, 1, 1, 1, 0, 0],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'linear',
                    times: [
                      0,
                      index * 0.15 + 0.1,
                      index * 0.15 + 0.15,
                      0.83,
                      0.839,
                      0.84,
                      1,
                    ],
                  }}
                />
              </div>
            ))}
          </div>
        </div> */}
      <div className="mt-16 block">
        <div className="relative mx-auto h-180 max-w-sm">
          {/* Base Line */}
          <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-primary/20" />
          {/* Animated Progress Line */}
          <motion.div
            className="absolute left-1/2 top-0 w-px -translate-x-1/2 bg-[#22D1EE]"
            animate={{
              height: lineAnimation.heights,
            }}
            transition={{
              duration: ANIMATION_DURATION,
              repeat: Infinity,
              ease: 'linear',
              times: lineAnimation.times,
            }}
          />
          {TIMELINE_POINTS_DESKTOP.map((point, index) => {
            const total = TIMELINE_POINTS_DESKTOP.length;
            const top = getPointPosition(index, total);
            const appear = getAppearTime(index, total);
            const isLeft = index % 2 === 0;

            return (
              <div
                key={point.year}
                className="absolute left-1/2"
                style={{
                  top: `${top}%`,
                  transform: 'translate(-50%, -50%)',
                }}
              >
                {/* Point */}
                <motion.div
                  className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-white bg-[#22D1EE] shadow-[0_0_0_2px_#22D1EE]"
                  animate={{
                    scale: [0, 0, 1, 1, 1, 0, 0],
                    opacity: [0, 0, 1, 1, 1, 0, 0],
                  }}
                  transition={{
                    duration: ANIMATION_DURATION,
                    repeat: Infinity,
                    ease: 'linear',
                    times: [
                      0,
                      appear,
                      appear + REVEAL_DURATION,
                      0.9,
                      0.95,
                      0.96,
                      1,
                    ],
                  }}
                />

                {/* Arrow */}
                <motion.div
                  className={`absolute top-1/2 -translate-y-1/2 ${
                    isLeft ? 'left-4' : '-left-20'
                  }`}
                  animate={{
                    width: [0, 0, 60, 60, 60, 0],
                    opacity: [0, 0, 1, 1, 1, 0],
                  }}
                  transition={{
                    duration: ANIMATION_DURATION,
                    repeat: Infinity,
                    ease: 'linear',
                    times: [0, appear, appear + REVEAL_DURATION, 0.9, 0.95, 1],
                  }}
                >
                  <svg
                    width="100%"
                    height="14"
                    viewBox="0 0 80 14"
                    preserveAspectRatio="none"
                    className={isLeft ? '' : 'rotate-180'}
                  >
                    <line
                      x1="0"
                      y1="7"
                      x2="68"
                      y2="7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      className="text-[#DCDCDC]"
                    />

                    <path
                      d="M63 2 L70 7 L63 12"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#DCDCDC]"
                    />
                  </svg>
                </motion.div>

                {/* Description */}
                <motion.div
                  className={`absolute top-1/2 -translate-y-1/2 ${
                    isLeft
                      ? 'md:left-30 left-20 text-left'
                      : 'md:-left-90 -left-50 text-right'
                  }`}
                  animate={{
                    opacity: [0, 0, 1, 1, 1, 0, 0],
                    x: isLeft
                      ? [-10, -10, 0, 0, 0, 0, 0]
                      : [10, 10, 0, 0, 0, 0, 0],
                  }}
                  transition={{
                    duration: ANIMATION_DURATION,
                    repeat: Infinity,
                    ease: 'linear',
                    times: [
                      0,
                      appear,
                      appear + REVEAL_DURATION,
                      0.9,
                      0.95,
                      0.96,
                      1,
                    ],
                  }}
                >
                  <h2 className="mb-2 font-heading text-2xl text-primary">
                    {point.year}
                  </h2>
                  <p className="mb-2 font-medium text-black">{point.title}</p>
                  <p className="md:w-60 w-40 text-xs leading-relaxed text-[#444748] text-montserrat">
                    {point.description}
                  </p>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </SectionContainer>
  );
};

export default JourneyTimelineSection;
