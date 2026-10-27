import { useState } from 'react';

import SectionContainer from '@/shared/components/Container/SectionContainer';
import Reveal from '@/shared/components/Reveal/Reveal';

const LIFESTYLES = [
  {
    title: 'Curated Living',
    description:
      'Every amenity is thoughtfully designed to complement modern lifestyles, bringing together comfort, elegance, and everyday convenience in perfect harmony.',
    image: '/lifestyle/golf.jpg',
    className: 'col-span-5 lg:col-span-4',
  },
  {
    title: 'Infinity Retreat',
    description:
      'Overlooking expansive views, the infinity pool offers a tranquil escape where relaxation, wellness, and refined living come together effortlessly.',
    image: '/lifestyle/pool.jpg',
    className: 'col-span-7 lg:col-span-8',
  },
  {
    title: 'Recreation Reimagined',
    description:
      'From active pursuits to leisurely moments, dedicated recreational spaces are designed to inspire movement, foster connections, and create experiences for every generation.',
    image: '/lifestyle/indoor.jpg',
    className: 'col-span-7 lg:col-span-8',
  },
  {
    title: 'Connected Communities',
    description:
      'Beautifully crafted social spaces bring neighbours together, creating an environment where families celebrate milestones, build relationships, and grow as a community.',
    image: '/lifestyle/running.jpg',
    className: 'col-span-5 lg:col-span-4',
  },
];

export default function LifestyleSection() {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <SectionContainer
      ptClassName="pt-0"
      heading={
        <>
          Life Beyond <span className="text-primary">Walls</span>
        </>
      }
      sideDescription="Where Every Space Is Designed To Elevate The Way You Live."
    >
      <Reveal delay={0.2}>
        <div className="mt-8 grid grid-cols-12 grid-rows-[220px_220px] gap-3 sm:mt-10 sm:grid-rows-[300px_300px] sm:gap-5 lg:mt-14 lg:grid-rows-[700px_700px] lg:gap-7">
          {LIFESTYLES.map((item, index) => {
            const isActive = activeCard === index;

            return (
              <div
                key={item.title}
                onClick={() =>
                  setActiveCard((prev) => (prev === index ? null : index))
                }
                className={`group relative h-full min-w-0 cursor-pointer overflow-hidden rounded-lg sm:rounded-xl lg:rounded-2xl ${item.className}`}
              >
                <img
                  loading="lazy"
                  src={item.image}
                  alt={item.title}
                  className={`h-full w-full object-cover transition-all duration-700 ${isActive
                    ? 'scale-105 grayscale-0'
                    : 'grayscale lg:group-hover:scale-105 lg:group-hover:grayscale-0'
                    }`}
                />

                {/* Overlay */}
                <div
                  className={`absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent transition-opacity duration-500 ${isActive
                    ? 'opacity-100'
                    : 'opacity-100 lg:opacity-0 lg:group-hover:opacity-100'
                    }`}
                />

                {/* Content */}
                <div
                  className={`absolute inset-x-0 bottom-0 p-2 transition-all duration-500 sm:p-4 lg:p-7 ${isActive
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-4 opacity-0 lg:translate-y-8 lg:group-hover:translate-y-0 lg:group-hover:opacity-100'
                    }`}
                >
                  <h3 className="font-heading text-xs leading-tight text-white sm:text-lg lg:text-3xl">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-[10px] leading-4 text-white/90 sm:mt-2 sm:text-sm sm:leading-5 lg:mt-3 lg:text-sm lg:leading-6">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </SectionContainer>
  );
}