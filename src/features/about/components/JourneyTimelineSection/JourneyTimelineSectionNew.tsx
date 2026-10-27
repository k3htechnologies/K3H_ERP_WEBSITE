import { useLayoutEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';

import SectionContainer from '@/shared/components/Container/SectionContainer';
import CountUp from '@/shared/components/CountUp/CountUp';
import Reveal from '@/shared/components/Reveal/Reveal';
import {
  CURVE_RADIUS,
  TIMELINE_ITEMS,
} from '@/features/about/constants/about.constant';

export interface TimelineItem {
  year: number;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}

export type TimelinePoint = {
  x: number;
  y: number;
};

const MOBILE_DOT_OFFSET = 20;

export default function JourneyTimelineSectionNew() {
  const desktopContainerRef = useRef<HTMLDivElement>(null);
  const desktopContentRef = useRef<HTMLDivElement>(null);
  const desktopRowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mobileContainerRef = useRef<HTMLDivElement>(null);
  const mobileContentRef = useRef<HTMLDivElement>(null);
  const mobileRowRefs = useRef<(HTMLDivElement | null)[]>([]);
  const gutterRef = useRef<HTMLDivElement>(null);

  const [pathD, setPathD] = useState('');
  const [dot, setDot] = useState({ x: 0, y: 0 });
  const [, setMilestones] = useState<
    {
      progress: number;
      x: number;
      y: number;
    }[]
  >([]);

  const [mobilePathD, setMobilePathD] = useState('');

  const { scrollYProgress: scrollYProgressDesktop } = useScroll({
    target: desktopContainerRef,
    offset: ['start 50%', 'end 50%'],
  });
  const progressDesktop = useTransform(
    scrollYProgressDesktop,
    [0, 1],
    [0.02, 1]
  );
  const smoothProgressDesktop = useSpring(progressDesktop, {
    stiffness: 80,
    damping: 18,
  });

  const { scrollYProgress: scrollYProgressMobile } = useScroll({
    target: mobileContainerRef,
    offset: ['start 50%', 'end 50%'],
  });
  const progressMobile = useTransform(
    scrollYProgressMobile,
    [0, 0.8],
    [0.02, 1]
  );
  const smoothProgressMobile = useSpring(progressMobile, {
    stiffness: 80,
    damping: 18,
  });

  useLayoutEffect(() => {
    function measure() {
      const container = desktopContainerRef.current;
      const gutter = gutterRef.current;
      const content = desktopContentRef.current;
      if (!container || !gutter || !content) return;

      const containerRect = container.getBoundingClientRect();
      const gutterRect = gutter.getBoundingClientRect();
      const contentRect = content.getBoundingClientRect();

      // Track A hugs the left gutter (under the leading dot).
      const trackLeftX =
        gutterRect.left - containerRect.left + gutterRect.width / 2;
      // Track B sits on the boundary between the two content columns.
      // For two equal columns with a symmetric gap, that boundary always
      // falls exactly at the content area's horizontal midpoint.
      const trackMidX =
        contentRect.left - containerRect.left + contentRect.width / 2;
      const rows = desktopRowRefs.current
        .filter((el): el is HTMLDivElement => Boolean(el))
        .map((el) => {
          const rect = el.getBoundingClientRect();
          return {
            top: rect.top - containerRect.top,
            bottom: rect.bottom - containerRect.top,
          };
        });

      if (rows.length === 0) return;

      const dotY = rows[0].top;
      setDot({ x: trackLeftX, y: dotY });
      const points: TimelinePoint[] = [];
      let d = `M ${trackLeftX} ${dotY}`;

      rows.forEach((row, i) => {
        const currentX = i % 2 === 0 ? trackLeftX : trackMidX;
        const isLast = i === rows.length - 1;

        if (i === 0) {
          d += ` L ${currentX} ${row.bottom}`;
        }

        if (isLast) return;

        const nextRow = rows[i + 1];
        const nextX = (i + 1) % 2 === 0 ? trackLeftX : trackMidX;

        const gap = nextRow.top - row.bottom;

        // radius cannot exceed half of the available gap
        const r = Math.min(CURVE_RADIUS, gap / 2);

        // where the horizontal section lives
        const horizontalY = row.bottom + gap / 2;

        // end of first vertical
        const verticalEnd = horizontalY - r;

        // start of second vertical
        // const nextVerticalStart = horizontalY + r;

        // continue vertical
        d += ` L ${currentX} ${verticalEnd}`;

        if (nextX > currentX) {
          // ===== Going Right =====

          // top-right corner
          d += ` A ${r} ${r} 0 0 0 ${currentX + r} ${horizontalY}`;

          // horizontal
          d += ` L ${nextX - r} ${horizontalY}`;

          // bottom-left corner
          d += ` A ${r} ${r} 0 0 1 ${nextX} ${horizontalY + r}`;
        } else {
          // ===== Going Left =====

          // top-left corner
          d += ` A ${r} ${r} 0 0 1 ${currentX - r} ${horizontalY}`;

          // horizontal
          d += ` L ${nextX + r} ${horizontalY}`;

          // bottom-right corner
          d += ` A ${r} ${r} 0 0 0 ${nextX} ${horizontalY + r}`;
        }

        // vertical to next row
        d += ` L ${nextX} ${nextRow.bottom}`;
        points.push({
          x: nextX,
          y: nextRow.top,
        });
      });

      const totalHeight = rows[rows.length - 1].bottom;
      const calculatedMilestones = points.map((point) => ({
        ...point,
        progress: point.y / totalHeight,
      }));

      setMilestones(calculatedMilestones);
      setPathD(d);
    }

    measure();

    const ro = new ResizeObserver(measure);
    if (desktopContainerRef.current) ro.observe(desktopContainerRef.current);
    window.addEventListener('resize', measure);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  useLayoutEffect(() => {
    function measureMobile() {
      const container = mobileContainerRef.current;
      if (!container) return;

      const rows = mobileRowRefs.current.filter((el): el is HTMLDivElement =>
        Boolean(el)
      );
      if (rows.length === 0) return;

      const containerRect = container.getBoundingClientRect();
      const lastRowRect = rows[rows.length - 1].getBoundingClientRect();

      // Every dot sits MOBILE_DOT_OFFSET px below its row's top edge, so the
      // last dot's y-position relative to the container is:
      const lastDotY = lastRowRect.top - containerRect.top + MOBILE_DOT_OFFSET;

      setMobilePathD(`M20 ${MOBILE_DOT_OFFSET} V${lastDotY}`);
    }

    measureMobile();

    const ro = new ResizeObserver(measureMobile);
    if (mobileContentRef.current) ro.observe(mobileContentRef.current);
    window.addEventListener('resize', measureMobile);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measureMobile);
    };
  }, []);

  return (
    <SectionContainer
      heading="Our Journey"
      footerHeading={`"Excellence has no shortcut."`}
    >
      {/* Desktop */}
      <div className="hidden sm:flex justify-center content-center mt-14">
        <div ref={desktopContainerRef} className="relative max-w-7xl">
          <svg
            className="pointer-events-none absolute left-0 top-0 hidden h-full w-full sm:block"
            aria-hidden="true"
          >
            {pathD && (
              <>
                <path
                  d={pathD}
                  stroke="#D8D6D2"
                  strokeWidth={10}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <motion.path
                  d={pathD}
                  fill="none"
                  stroke="#36454f"
                  strokeWidth={10}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    pathLength: smoothProgressDesktop,
                  }}
                />
              </>
            )}
            {pathD && <circle cx={dot.x} cy={dot.y} r={20} fill="#36454f" />}
          </svg>

          <div className="flex">
            <div ref={gutterRef} className="hidden w-10 shrink-0 sm:block" />

            <div
              ref={desktopContentRef}
              className="flex flex-1 flex-col gap-16 sm:gap-20"
            >
              {TIMELINE_ITEMS.map((item, i) => {
                const imageOnLeft = i % 2 === 1;
                return (
                  <div
                    key={item.year}
                    ref={(el) => {
                      desktopRowRefs.current[i] = el;
                    }}
                    className="grid grid-cols-1 items-center gap-8 sm:grid-cols-2 sm:gap-14"
                  >
                    {imageOnLeft ? (
                      <>
                        <TimelineImage item={item} />
                        <TimelineText item={item} />
                      </>
                    ) : (
                      <>
                        <TimelineText item={item} />
                        <TimelineImage item={item} />
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      {/* Mobile */}
      <div className="relative mt-14 sm:hidden">
        <div className="relative" ref={mobileContainerRef}>
          <svg
            className="pointer-events-none absolute left-5 top-0 h-full"
            width={40}
            height="100%"
            preserveAspectRatio="none"
          >
            {mobilePathD && (
              <>
                <path
                  d={mobilePathD}
                  stroke="#D8D6D2"
                  strokeWidth={6}
                  fill="none"
                  strokeLinecap="round"
                />
                <motion.path
                  d={mobilePathD}
                  stroke="#36454f"
                  strokeWidth={6}
                  fill="none"
                  strokeLinecap="round"
                  style={{
                    pathLength: smoothProgressMobile,
                  }}
                />
              </>
            )}
          </svg>

          <div ref={mobileContentRef} className="flex flex-col gap-14">
            {TIMELINE_ITEMS.map((item, index) => (
              <div
                key={item.year}
                ref={(el) => {
                  mobileRowRefs.current[index] = el;
                }}
                className="relative pl-16"
              >
                <div className="absolute left-5 top-5 -translate-x-1/2">
                  <div className="h-5 w-5 rounded-full bg-background-dark" />
                </div>
                <TimelineText item={item} />
                <div className="mt-6">
                  <TimelineImage item={item} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}

function TimelineText({ item }: { item: TimelineItem }) {
  return (
    <div className="text-background-dark pl-5">
      <CountUp
        end={item.year}
        duration={1000}
        className="font-serif text-5xl leading-none sm:text-6xl text-primary"
        toLocalString={false}
      />
      <Reveal>
        <h3 className="mt-5 text-lg font-medium font-heading">{item.title}</h3>
        <p className="mt-2 max-w-lg text-sm leading-relaxed text-[#9B958C] text-montserrat text-justify">
          {item.description}
        </p>
      </Reveal>
    </div>
  );
}

function TimelineImage({ item }: { item: TimelineItem }) {
  return (
    <div className="overflow-hidden rounded-2xl">
      <img
        src={item.image}
        alt={item.imageAlt}
        className="h-56 w-full object-cover sm:h-64"
      />
    </div>
  );
}
