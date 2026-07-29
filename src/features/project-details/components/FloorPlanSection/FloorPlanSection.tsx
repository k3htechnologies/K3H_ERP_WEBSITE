import { AnimatePresence, motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { useState } from 'react';

import Reveal from '@/shared/components/Reveal/Reveal';
import SectionContainer from '@/shared/components/Container/SectionContainer';

interface FloorPlan {
  id: string;
  label: string;
  title: string;
  image: string;
  carpetArea: string;
  orientation: string;
  price: string;
}

const FLOOR_PLANS: FloorPlan[] = [
  {
    id: '2bhk',
    label: '2 BHK',
    title: '2 BHK Premium Suite',
    image: '/project/floor-plans/2bhk.png',
    carpetArea: '720 sq.ft',
    orientation: 'East–West Facing',
    price: 'Starting ₹55L*',
  },
  {
    id: '3bhk',
    label: '3 BHK',
    title: '3 BHK Luxury Residence',
    image: '/project/floor-plans/2bhk.png',
    carpetArea: '1045 sq.ft',
    orientation: 'North-East Facing',
    price: 'Starting ₹89L*',
  },
  {
    id: '4bhk',
    label: '4 BHK',
    title: '4 BHK Signature Residence',
    image: '/project/floor-plans/2bhk.png',
    carpetArea: '1650 sq.ft',
    orientation: 'Corner Facing',
    price: 'Starting ₹1.55Cr*',
  },
];

export default function FloorPlanSection() {
  const [activeTab, setActiveTab] = useState(FLOOR_PLANS[0]);

  return (
    <SectionContainer heading="Designed For Every Family">
      <section id="floor-plans" className="mt-8">
        <Reveal>
          <div className="flex justify-center">
            <div className="flex gap-10 border-b border-slate-300">
              {FLOOR_PLANS.map((plan) => (
                <button
                  key={plan.id}
                  onClick={() => setActiveTab(plan)}
                  className="relative pb-4 text-xs font-semibold uppercase tracking-[0.18em] text-secondary"
                >
                  {plan.label}

                  {activeTab.id === plan.id && (
                    <motion.span
                      layoutId="activeFloorTab"
                      className="absolute bottom-0 left-0 h-[2px] w-full bg-primary"
                      transition={{
                        type: 'spring',
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab.id}
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -30,
            }}
            transition={{
              duration: 0.4,
            }}
            className="mt-14 grid items-center gap-14 lg:grid-cols-[1fr_1fr]"
          >
            <Reveal>
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
                <img
                  src={activeTab.image}
                  alt={activeTab.title}
                  className="h-full w-full object-contain transition duration-500 hover:scale-105"
                />
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div>
                <h2 className="text-cormorant-garamond text-3xl text-secondary">
                  {activeTab.title}
                </h2>
                <div className="mt-10 divide-y divide-slate-200 border-y border-slate-200">
                  <InfoRow label="Carpet Area" value={activeTab.carpetArea} />
                  <InfoRow label="Orientation" value={activeTab.orientation} />
                  <InfoRow label="Price" value={activeTab.price} />
                </div>
                <button className="mt-10 inline-flex w-full items-center justify-center gap-3 bg-primary px-8 py-5 text-xs font-semibold uppercase tracking-[0.25em] text-white transition hover:opacity-90">
                  <Download size={16} />
                  Download PDF Layout
                </button>
              </div>
            </Reveal>
          </motion.div>
        </AnimatePresence>
      </section>
    </SectionContainer>
  );
}

interface InfoRowProps {
  label: string;
  value: string;
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex items-center justify-between py-7">
      <span className="text-sm text-secondary/70 text-montserrat">{label}</span>
      <span className="font-medium text-secondary text-montserrat">
        {value}
      </span>
    </div>
  );
}
