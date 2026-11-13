import { useState } from 'react';
import SectionContainer from '@/shared/components/Container/SectionContainer';
import Reveal from '@/shared/components/Reveal/Reveal';

const FEATURES = [
  {
    id: '01',
    title: 'Track Record',
    description:
      'Proven through delivery.',
    image: '/why-choose-us/craftmanship.jpg',
  },
  {
    id: '02',
    title: 'Redevelopment expertise',
    description:
      'Redevelopment done with mindfulness.',
    image: '/why-choose-us/trust.jpg',
  },
  {
    id: '03',
    title: 'Location',
    description:
      'Rooted in estabilished neighbourhoods.',
    image: '/why-choose-us/innovation.jpg',
  },
  {
    id: '04',
    title: 'Long- term value',
    description:
      'Built for more than the present.',
    image: '/why-choose-us/legacy.jpg',
  },
];

export default function WhyChooseUs() {
  const [activeCard, setActiveCard] = useState<string | null>(null);

  const handleCardClick = (id: string) => {
    setActiveCard((current) => (current === id ? null : id));
  };

  return (
    <SectionContainer
      heading={
        <>
          Why Choose <span className="text-primary">H. RISHABRAJ</span>
        </>
      }
      sideDescription="Building with Integrity. Delivering with Excellence."
    >
      <Reveal delay={0.2}>
        <div className="mt-8 ms:mt-10 lg:mt-14 grid grid-cols-2 gap-5 xl:grid-cols-4">
          {FEATURES.map((item) => {
            const isActive = activeCard === item.id;

            return (
              <div
                key={item.id}
                role="button"
                tabIndex={0}
                aria-expanded={isActive}
                onClick={() => handleCardClick(item.id)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    handleCardClick(item.id);
                  }
                }}
                className={`group relative h-80 overflow-hidden rounded-xl cursor-pointer md:h-105 ${isActive ? 'is-active' : ''
                  }`}
              >
                <img
                  loading="lazy"
                  src={item.image}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Blue Overlay */}
                <div className="absolute inset-0 bg-[#34495A]/45 transition-colors duration-500 group-hover:bg-black/70 group-[.is-active]:bg-black/70" />

                <span className="absolute right-6 top-5 font-heading text-xl md:text-4xl text-white/20">
                  {item.id}
                </span>

                {/* Bottom Gradient */}
                <div className="absolute inset-x-0 bottom-0 h-36 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

                <div className="absolute inset-x-0 bottom-0 overflow-hidden p-4 md:p-6">
                  <div className="relative min-h-50 md:min-h-80">
                    <div className="absolute inset-x-0 bottom-0 flex flex-col justify-end">
                      <h3 className="font-heading text-sm text-white transition-transform duration-500 ease-out md:text-2xl">
                        {item.title}
                      </h3>
                      <div className="grid grid-rows-[0fr] opacity-0 transition-all duration-500 ease-out group-hover:grid-rows-[1fr] group-hover:opacity-100 group-[.is-active]:grid-rows-[1fr] group-[.is-active]:opacity-100">
                        <div className="overflow-hidden">
                          <p className="pt-3 text-[10px] text-white/90 text-montserrat md:text-lg md:leading-8">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </SectionContainer>
  );
}