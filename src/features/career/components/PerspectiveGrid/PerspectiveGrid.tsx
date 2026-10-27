import Container from '@/shared/components/Container/Container';
import Reveal from '@/shared/components/Reveal/Reveal';

const PerspectiveGrid = () => {
  return (
    <Container>
      <div>
        <Reveal>
          <div className="mb-10">
            <p className="text-montserrat text-xl font-semibold uppercase tracking-[0.2em] text-[#775A19]">
              Perspective
            </p>

            <h2 className="mt-2 font-heading text-2xl uppercase md:leading-none text-text md:text-3xl">
              Life within the <span className="text-primary">H.RISHABRAJ</span>
            </h2>
          </div>
        </Reveal>

        <div
          className="grid grid-cols-1 gap-4 md:grid-cols-12 md:grid-rows-[320px_280px]"
        >
          <Reveal className="md:col-span-8">
            <div className="group relative h-full overflow-hidden">
              <img
                src="grid-img-1.jpg"
                alt="Team discussion"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/10"
              />
            </div>
          </Reveal>

          {/* VIDEO CARD */}
          <Reveal delay={150} className="md:col-span-4 md:row-span-2">
            <div className="group relative h-full overflow-hidden">
              <video
                autoPlay
                muted
                loop
                playsInline
                preload="metadata"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              >
                <source
                  src="https://player.vimeo.com/external/371433846.sd.mp4?s=236a2255a60365aa2184141f24a7910ec7ef0df5&profile_id=139&oauth2_token_id=57447761"
                  type="video/mp4"
                />
              </video>
              {/* OVERLAY */}
              <div
                className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent"
              />
              <div className="absolute bottom-6 left-6">
                <p
                  className="text-xs font-semibold uppercase tracking-[0.25em] text-white/80"
                >
                  Inside Our Process
                </p>
              </div>
            </div>
          </Reveal>
          <Reveal delay={250} className="md:col-span-4">
            <div className="group relative overflow-hidden">
              <img
                src="grid-img-3.jpg"
                alt="Construction team"
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </Reveal>
          <Reveal delay={350} className="md:col-span-4 md:row-span-2">
            <div
              className="flex h-full flex-col justify-center bg-[#23242B] p-8 md:p-10"
            >
              <p
                className="max-w-60 text-2xl leading-relaxed text-white md:text-3xl heading-libre-caslon"
              >
                “Architecture is a visual art, and the buildings speak for
                themselves.”
              </p>

              <div className="mt-5 md:mt-10">
                <span
                  className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50 text-hanken"
                >
                  — Julia V. Rossi, Principal
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={450} className="md:col-span-4 md:col-start-9">
            <div
              className="flex h-full flex-col justify-between bg-[#FBF9F8] p-2 md:pl-6"
            >
              <h3
                className="max-w-full font-heading text-4xl leading-[1.2] md:leading-[0.9] text-primary md:text-6xl"
              >
                “Excellence is not an act, but a habit.”
              </h3>

              <p
                className="mt-3 md:mt-6 max-w-[95%] text-sm leading-relaxed text-primary-sub text-montserrat"
              >
                Our culture is rooted in the relentless pursuit of perfection.
                Every interaction is an opportunity to define what it means to
                be elite.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </Container>
  );
};

export default PerspectiveGrid;
