import Reveal from '@/shared/components/Reveal/Reveal';
import { VISION_ITEMS } from '@/features/career/constants/career.constant';
import Container from '@/shared/components/Container/Container';

const VisionSection = () => {
  return (
    <Container>
      <div className="grid gap-16 lg:grid-cols-[0.9fr_1.3fr] lg:gap-24">
        {/* LEFT SIDE */}
        <Reveal>
          <div className="max-w-md">
            <p className="mb-5 text-xl font-semibold uppercase tracking-[0.25em] text-primary">
              H.RISHABRAJ
            </p>

            <h2 className="max-w-sm font-heading text-2xl uppercase leading-normal md:text-3xl text-[#1D1D1D] font-bold">
              Where <br></br> Visionaries Find Their Home
            </h2>

            <p className="mt-12 max-w-sm text-sm text-montserrat leading-relaxed text-[#5f6368]">
              We don’t just sell properties ,we curate legacies. Our team is a
              constellation of the industry’s brightest minds working in
              concert.
            </p>
          </div>
        </Reveal>

        {/* RIGHT SIDE */}
        <div className="grid gap-x-12 gap-y-16 md:grid-cols-2">
          {VISION_ITEMS.map((item, index) => (
            <Reveal
              key={item.id}
              delay={index * 150}
              className={`
                  ${index === 2 ? 'md:col-start-2' : ''}
                `}
            >
              <div className="border-t border-black/10 pt-8 group transition-all">
                <span className="heading-playfair text-3xl leading-none text-primary md:text-4xl font-bold">
                  {item.id}.
                </span>
                <h3 className="mt-5 heading-playfair text-xl leading-none text-text transition-transform duration-500 group-hover:translate-x-2 md:text-3xl">
                  {item.title}
                </h3>
                <p className="mt-6 max-w-sm text-sm text-montserrat leading-relaxed text-[#5f6368]">
                  {item.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default VisionSection;
