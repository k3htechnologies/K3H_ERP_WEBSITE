import SectionContainer from '@/shared/components/Container/SectionContainer';
import InfiniteMarquee, {
  type Amenity,
} from '@/shared/components/InfiniteMarquee/InfiniteMarquee';
import Reveal from '@/shared/components/Reveal/Reveal';

const topAmenities: Amenity[] = [
  {
    id: 1,
    title: "Kids' Adventure Zone",
    description:
      'A safe, creative space for your little ones to explore, play and grow every day.',
    image: '/project/amenities/garden.png',
  },
  {
    id: 2,
    title: 'Celebration Hall',
    description:
      "The perfect venue for life's milestone parties and community gatherings.",
    image: '/project/amenities/hall.png',
  },
  {
    id: 3,
    title: 'Zen Meditation Garden',
    description:
      'Find your inner peace in a meticulously landscaped sanctuary designed for mindfulness.',
    image: '/project/amenities/garden.png',
  },
];

export default function AmenitiesSection() {
  return (
    <SectionContainer bgClassName="bg-background-dark">
      <section id="amenities">
        <Reveal>
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-primary">
            Elevated Lifestyle
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 max-w-3xl font-heading text-2xl text-white lg:text-3xl">
            15+ World-Class Amenities
          </h2>
        </Reveal>
        <Reveal delay={0.15} className="mt-10">
          <InfiniteMarquee items={topAmenities} direction="left" />
          <div className="h-8" />
          <InfiniteMarquee items={topAmenities} direction="right" />
        </Reveal>
      </section>
    </SectionContainer>
  );
}
