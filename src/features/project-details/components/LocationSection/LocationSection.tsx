import { Car, Hospital, TrainFront, Trees } from 'lucide-react';

import Reveal from '@/shared/components/Reveal/Reveal';
import SectionContainer from '@/shared/components/Container/SectionContainer';

interface LocationPoint {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const LOCATIONS: LocationPoint[] = [
  {
    id: 1,
    title: 'Borivali Station',
    description:
      '5 Minutes Drive — Connect to the heart of the city in no time.',
    icon: <TrainFront size={18} />,
  },
  {
    id: 2,
    title: 'Western Express Highway',
    description:
      "2 Minutes — Direct access to one of Mumbai's primary arteries.",
    icon: <Car size={18} />,
  },
  {
    id: 3,
    title: 'Sanjay Gandhi National Park',
    description:
      '10 Minutes — Lush green lungs and recreation at your doorstep.',
    icon: <Trees size={18} />,
  },
  {
    id: 4,
    title: 'Elite Healthcare',
    description:
      '4 Top-tier hospitals within a 3km radius for your peace of mind.',
    icon: <Hospital size={18} />,
  },
];

export default function LocationSection() {
  return (
    <SectionContainer bgClassName="bg-background-dark">
      <section id="location">
        <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1fr]">
          <div>
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                The Connected Life
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-6 max-w-xl text-cormorant-garamond text-3xl leading-tight text-[#E5E2DC]">
                Seamless Access to the Best of Mumbai
              </h2>
            </Reveal>
            <div className="mt-14 space-y-10">
              {LOCATIONS.map((item, index) => (
                <Reveal key={item.id} delay={0.15 + index * 0.08}>
                  <div className="flex gap-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-primary text-primary">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-cormorant-garamond text-2xl text-[#E5E2DC]">
                        {item.title}
                      </h3>
                      <p className="mt-2 max-w-sm text-sm leading-7 text-[#C4C7CC] text-montserrat">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
          <Reveal delay={0.2}>
            <div className="relative overflow-hidden rounded-2xl">
              <iframe
                title="Project Location"
                loading="lazy"
                className="h-105 w-full border-0 lg:h-150"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.052078186249!2d72.85942287499431!3d19.236561982001298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b100770734ef%3A0xdde18f271cb1658c!2sRishabraj%20Chambers!5e0!3m2!1sen!2sin!4v1783937220458!5m2!1sen!2sin"
              ></iframe>
              {/* Dark Overlay */}
              {/* <div className="pointer-events-none absolute inset-0 bg-black/55 mix-blend-multiply" /> */}

              <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/30" />

              {/* Marker */}

              {/* <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <span className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-sky-400/30" />

                <div className="h-5 w-5 rounded-full border-4 border-white bg-sky-400 shadow-[0_0_25px_8px_rgba(56,189,248,0.5)]" />
              </div> */}
              {/* Open Maps Button */}
              <a
                href="https://maps.google.com/?pb=!1m18!1m12!1m3!1d3767.052078186249!2d72.85942287499431!3d19.236561982001298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b100770734ef%3A0xdde18f271cb1658c!2sRishabraj%20Chambers!5e0!3m2!1sen!2sin!4v1783937220458!5m2!1sen!2sin"
                target="_blank"
                rel="noopener noreferrer"
                className="absolute bottom-5 right-5 rounded-lg bg-white/10 px-5 py-3 text-xs font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md transition hover:bg-primary"
              >
                Open Map
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </SectionContainer>
  );
}
