import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import Reveal from '@/shared/components/Reveal/Reveal';
import SectionContainer from '@/shared/components/Container/SectionContainer';

const FEATURED_EVENT = {
  badge: 'RECENT EVENT',
  title: 'The Annual Founders Gala 2024',
  description:
    "A night of celebration with our partners and residents, marking a decade of architectural excellence in Mumbai's skyline.",
  image:
    'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=1600&auto=format&fit=crop&q=80',
};

const UPCOMING_EVENTS = [
  {
    id: 1,
    month: 'SEP',
    day: '12',
    title: 'Unveiling The Horizon: Rooftop Lounge Launch',
    description: 'Exclusive preview for residents and the design community.',
  },
  {
    id: 2,
    month: 'AUG',
    day: '28',
    title: 'Urban Sustainability Workshop',
    description: 'Panel discussion with leading environmental architects.',
  },
  {
    id: 3,
    month: 'JUL',
    day: '05',
    title: 'Art in Architecture Exhibition',
    description: 'Showcasing local artists in our flagship lobby spaces.',
  },
];

const MomentsThatMatterSection = () => {
  return (
    <SectionContainer
      heading={
        <>
          <span className="text-primary">Moments</span> That Matter
        </>
      }
      sideDescription={
        <Reveal delay={0.2}>
          <button className="text-montserrat text-sm uppercase underline underline-offset-4 text-primary transition hover:opacity-70">
            View Full Calendar
          </button>
        </Reveal>
      }
    >
      <div className="mt-14 grid gap-10 xl:grid-cols-[2fr_1fr]">
        {/* Featured */}
        <Reveal>
          <motion.article
            whileHover="hover"
            initial="rest"
            animate="rest"
            className="group relative overflow-hidden rounded-[28px]"
          >
            <motion.img
              variants={{
                rest: {
                  scale: 1,
                },
                hover: {
                  scale: 1.05,
                },
              }}
              transition={{ duration: 0.7 }}
              src={FEATURED_EVENT.image}
              className="h-137.5 w-full object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />

            <div className="absolute bottom-10 lg:left-8 left-4 max-w-lg">
              <span className="rounded px-4 py-2 text-[10px] font-semibold tracking-[0.18em] bg-[#5D5F5F] text-white">
                {FEATURED_EVENT.badge}
              </span>

              <h3 className="mt-6 text-3xl font-bold leading-tight text-white text-cormorant-garamond">
                {FEATURED_EVENT.title}
              </h3>
              <p className="mt-3 text-sm leading-4 text-white/80 text-montserrat">
                {FEATURED_EVENT.description}
              </p>
              <motion.button
                variants={{
                  rest: {
                    x: 0,
                  },
                  hover: {
                    x: 8,
                  },
                }}
                className="mt-8 inline-flex items-center gap-3 rounded-xl bg-primary px-7 py-4 text-sm uppercase tracking-[0.18em] text-white text-montserrat"
              >
                Explore Gallery
                <ArrowRight size={18} />
              </motion.button>
            </div>
          </motion.article>
        </Reveal>
        {/* Events */}
        <Reveal delay={0.15}>
          <div className="flex h-full flex-col">
            {UPCOMING_EVENTS.map((event) => (
              <motion.article
                key={event.id}
                whileHover={{ x: 8 }}
                transition={{ duration: 0.3 }}
                className="group flex gap-6 border-b border-neutral-200 py-8 first:pt-0 last:border-none"
              >
                <div className="w-16 shrink-0 text-center">
                  <p className="text-xs uppercase tracking-[0.18em] text-neutral-500 text-montserrat">
                    {event.month}
                  </p>

                  <p className="mt-2 text-5xl leading-none text-cormorant-garamond">
                    {event.day}
                  </p>
                </div>

                <div>
                  <h4 className="text-lg leading-snug transition group-hover:text-primary text-cormorant-garamond font-bold">
                    {event.title}
                  </h4>
                  <p className="mt-3 text-[#444748] leading-7 text-montserrat text-sm">
                    {event.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </Reveal>
      </div>
    </SectionContainer>
  );
};

export default MomentsThatMatterSection;
