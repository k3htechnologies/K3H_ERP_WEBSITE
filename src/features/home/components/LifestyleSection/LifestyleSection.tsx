import SectionContainer from '@/shared/components/Container/SectionContainer';
import Reveal from '@/shared/components/Reveal/Reveal';

const LIFESTYLES = [
  {
    title: 'Curated Living',
    description:
      'Every amenity is thoughtfully designed to complement modern lifestyles, bringing together comfort, elegance, and everyday convenience in perfect harmony.',
    image: '/lifestyle/golf.jpg',
    className: 'lg:col-span-4 lg:row-span-1',
  },
  {
    title: 'Infinity Retreat',
    description:
      'Overlooking expansive views, the infinity pool offers a tranquil escape where relaxation, wellness, and refined living come together effortlessly.',
    image: '/lifestyle/pool.jpg',
    className: 'lg:col-span-8 lg:row-span-1',
  },
  {
    title: 'Recreation Reimagined',
    description:
      'From active pursuits to leisurely moments, dedicated recreational spaces are designed to inspire movement, foster connections, and create experiences for every generation.',
    image: '/lifestyle/indoor.jpg',
    className: 'lg:col-span-8 lg:row-span-1',
  },
  {
    title: 'Connected Communities',
    description:
      'Beautifully crafted social spaces bring neighbours together, creating an environment where families celebrate milestones, build relationships, and grow as a community.',
    image: '/lifestyle/running.jpg',
    className: 'lg:col-span-4 lg:row-span-1',
  },
];

export default function LifestyleSection() {
  return (
    <SectionContainer
      ptClassName="pt-0"
      heading={
        <>
          Life Beyond <span className="text-primary">Walls</span>
        </>
      }
      sideDescription={
        <>Where Every Space Is Designed To Elevate The Way You Live.</>
      }
    >
      <Reveal delay={0.2}>
        <div className="mt-14 grid grid-cols-1 gap-7 lg:grid-cols-12 lg:grid-rows-[700px_700px]">
          {LIFESTYLES.map((item) => (
            <div
              key={item.title}
              className={`group relative overflow-hidden rounded-2xl ${item.className}`}
            >
              <img
                loading="lazy"
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 translate-y-8 p-7 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                <h3 className="font-heading text-3xl text-white">
                  {item.title}
                </h3>

                <p className="mt-3 max-w-xl text-montserrat text-sm leading-6 text-white/90">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </SectionContainer>
  );
}
