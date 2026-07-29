import { ArrowRight } from 'lucide-react';

import SectionContainer from '@/shared/components/Container/SectionContainer';
import Reveal from '@/shared/components/Reveal/Reveal';

export default function ProjectHighlightsSection() {
  return (
    <SectionContainer bgClassName="bg-background-dark">
      <Reveal>
        <div className="grid grid-cols-1 overflow-hidden lg:min-h-155 lg:grid-cols-[3fr_2fr]">
          <div className="overflow-hidden">
            <img
              src="/project/structure.png"
              alt="Structural Elegance"
              className="h-85 w-full object-cover transition duration-700 hover:scale-105 md:h-160"
            />
          </div>
          <div
            className="flex items-center px-8 py-12 md:px-12 lg:px-16 bg-[#34495A]/45 backdrop-blur-[60px]"
            style={{
              background:
                'linear-gradient(147.91deg, rgb(255, 255, 255) -31.4%, rgba(255, 255, 255, 0.05) 48.98%, rgba(255, 255, 255, 0.5) 115.79%)',
            }}
          >
            <Reveal delay={0.3}>
              <div className="max-w-md">
                <span className="mb-8 block h-0.5 w-10 bg-primary" />
                <h2 className="font-cormorant text-3xl font-medium leading-tight text-white lg:text-4xl">
                  Structural Elegance
                </h2>
                <p className="mt-8 text-montserrat leading-8 text-white/75 text-lg">
                  A rhythmic facade that changes character with the sun. Using
                  earthquake-resistant materials and premium finishes for a
                  timeless look.
                </p>

                <button className="text-montserrat group mt-12 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-white transition hover:text-primary">
                  Read More
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                <span className="mt-2 block h-0.5 w-14 bg-primary transition-all duration-300 group-hover:w-20" />
              </div>
            </Reveal>
          </div>
        </div>
      </Reveal>
      <Reveal delay={0.15}>
        <div className="grid grid-cols-1 overflow-hidden lg:min-h-155 lg:grid-cols-[2fr_3fr]">
          <div
            className="flex items-center px-8 py-12 md:px-12 lg:px-16 bg-[#34495A]/45 backdrop-blur-[60px]"
            style={{
              background:
                'linear-gradient(147.91deg, rgb(255, 255, 255) -31.4%, rgba(255, 255, 255, 0.05) 48.98%, rgba(255, 255, 255, 0.5) 115.79%)',
            }}
          >
            <Reveal delay={0.3}>
              <div className="max-w-md">
                <span className="mb-8 block h-0.5 w-10 bg-primary" />
                <h2 className="font-cormorant text-3xl font-medium leading-tight text-white lg:text-4xl">
                  The Grand Lobby
                </h2>
                <p className="mt-8 text-montserrat leading-8 text-white/75 text-lg">
                  Double-height entrance with Italian marble flooring and
                  custom-designed chandeliers. A reception that commands
                  respect.
                </p>
                <button className="text-montserrat group mt-12 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.25em] text-white transition hover:text-primary">
                  Read More
                  <ArrowRight
                    size={15}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
                <span className="mt-2 block h-0.5 w-14 bg-primary transition-all duration-300 group-hover:w-20" />
              </div>
            </Reveal>
          </div>
          <div className="overflow-hidden">
            <img
              src="/project/lobby.png"
              alt="Grand Lobby"
              className="h-85 w-full object-cover transition duration-700 hover:scale-105 md:h-160"
            />
          </div>
        </div>
      </Reveal>
    </SectionContainer>
  );
}
