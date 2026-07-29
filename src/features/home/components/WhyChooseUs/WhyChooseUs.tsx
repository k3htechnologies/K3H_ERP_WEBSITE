import SectionContainer from '@/shared/components/Container/SectionContainer';
import Reveal from '@/shared/components/Reveal/Reveal';

const FEATURES = [
  {
    id: '01',
    title: 'Architectural Excellence',
    description:
      'Every H.Rishabraj residence is crafted with meticulous attention to detail, combining thoughtful planning, premium materials, and exceptional execution to create luxury homes that stand the test of time.',
    image: '/why-choose-us/craftmanship.jpg',
  },
  {
    id: '02',
    title: 'Built on Trust',
    description:
      'Our foundation is built on transparency, integrity, and consistent delivery. Every relationship we build with homeowners, partners, and communities is strengthened through accountability and an unwavering commitment to excellence.',
    image: '/why-choose-us/trust.jpg',
  },
  {
    id: '03',
    title: 'Timeless Design',
    description:
      'We believe great architecture never follows trends. Every development seamlessly blends contemporary living with timeless design, creating elegant spaces that remain relevant for generations.',
    image: '/why-choose-us/innovation.jpg',
  },
  {
    id: '04',
    title: 'Legacy',
    description:
      'Beyond exceptional residences, we create lasting assets. Prime locations, intelligent planning, and uncompromising quality ensure every H.Rishabraj development continues to deliver enduring value for years to come.',
    image: '/why-choose-us/legacy.jpg',
  },
];

export default function WhyChooseUs() {
  return (
    <SectionContainer
      heading={
        <>
          Why Choose <span className="text-primary">H.RISHABRAJ</span>
        </>
      }
      sideDescription="Building Dreams with Transparency and Excellence."
    >
      <Reveal delay={0.2}>
        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {FEATURES.map((item) => (
            <div
              key={item.id}
              className="group relative h-105 overflow-hidden rounded-xl"
            >
              <img
                loading="lazy"
                src={item.image}
                alt={item.title}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Blue Overlay */}
              <div className="absolute inset-0 bg-[#34495A]/45 transition-opacity duration-500 group-hover:bg-black/70" />

              {/* Number */}
              <span className="absolute right-6 top-5 font-heading text-4xl text-white/20">
                {item.id}
              </span>

              {/* Bottom Gradient */}
              <div className="absolute inset-x-0 bottom-0 h-36 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

              {/* Title */}
              {/* Bottom Content */}
              <div className="absolute inset-x-0 bottom-0 overflow-hidden p-6">
                <div className="relative min-h-80">
                  {/* Default State */}
                  <div className="absolute inset-0 transition-all duration-500 ease-out group-hover:-translate-y-4 group-hover:opacity-0">
                    <h3 className="font-heading text-2xl text-white absolute bottom-0">
                      {item.title}
                    </h3>
                  </div>

                  {/* Hover State */}
                  <div className="absolute inset-0 translate-y-6 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                    <h3 className="font-heading text-2xl text-white">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-lg leading-8 text-white/90 text-montserrat">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Reveal>
    </SectionContainer>
  );
}
