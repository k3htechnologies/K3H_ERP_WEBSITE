import { useEffect, useRef, useState } from 'react';

import Reveal from '@/shared/components/Reveal/Reveal';
import SectionContainer from '@/shared/components/Container/SectionContainer';

const STORY_TEMPLATES = [
  {
    title: 'The Art of Negative Space: Crafting Breathable Interiors',
    description:
      'Understanding why the space you leave empty is just as important as the furniture you choose.',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&auto=format&fit=crop&q=80',
    category: 'DESIGN PHILOSOPHY',
    author: 'AR. AARTI AGRAWAL',
    readTime: '6 MIN READ',
  },
  {
    title: 'Designing Homes Around Natural Light',
    description:
      'Large openings, warm textures and thoughtful layouts create healthier and happier living spaces.',
    image:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?w=1200&auto=format&fit=crop&q=80',
    category: 'DESIGN PHILOSOPHY',
    author: 'AR. NIKHIL SHAH',
    readTime: '8 MIN READ',
  },
  {
    title: 'Minimalism with Warmth: Finding Balance',
    description:
      'Simple forms paired with rich natural materials make interiors timeless and welcoming.',
    image:
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=1200&auto=format&fit=crop&q=80',
    category: 'DESIGN PHILOSOPHY',
    author: 'AR. PRIYA SHARMA',
    readTime: '5 MIN READ',
  },
  {
    title: 'Creating Calm Through Spatial Planning',
    description:
      'Thoughtful zoning and circulation can transform the experience of everyday living.',
    image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1200&auto=format&fit=crop&q=80',
    category: 'DESIGN PHILOSOPHY',
    author: 'AR. RAHUL DESAI',
    readTime: '7 MIN READ',
  },
  {
    title: 'Materials That Age Beautifully',
    description:
      'Stone, wood and natural finishes gain character over time while maintaining elegance.',
    image:
      'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=1200&auto=format&fit=crop&q=80',
    category: 'DESIGN PHILOSOPHY',
    author: 'AR. KAVYA MEHTA',
    readTime: '5 MIN READ',
  },
  {
    title: 'The Psychology of Warm Interior Tones',
    description:
      'Earth-inspired palettes create spaces that feel comforting, luxurious and timeless.',
    image:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&auto=format&fit=crop&q=80',
    category: 'DESIGN PHILOSOPHY',
    author: 'AR. MEERA KHAN',
    readTime: '6 MIN READ',
  },
  {
    title: 'Elevating Everyday Living Through Design',
    description:
      'Luxury is created through attention to detail rather than unnecessary ornamentation.',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=80',
    category: 'DESIGN PHILOSOPHY',
    author: 'AR. DEV PATEL',
    readTime: '7 MIN READ',
  },
  {
    title: 'The Future of Sustainable Urban Homes',
    description:
      'Modern developments increasingly prioritize sustainability without compromising luxury.',
    image:
      'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1200&auto=format&fit=crop&q=80',
    category: 'DESIGN PHILOSOPHY',
    author: 'AR. RIYA SHAH',
    readTime: '6 MIN READ',
  },
  {
    title: 'Biophilic Design: Bringing Nature Indoors',
    description:
      'Natural light, greenery and organic textures create healthier and more inviting homes.',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&auto=format&fit=crop&q=80',
    category: 'DESIGN PHILOSOPHY',
    author: 'AR. SANJAY KULKARNI',
    readTime: '5 MIN READ',
  },
  {
    title: 'Luxury Interiors Inspired by Simplicity',
    description:
      'Minimal detailing, premium materials and refined proportions define timeless luxury.',
    image:
      'https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?w=1200&auto=format&fit=crop&q=80',
    category: 'DESIGN PHILOSOPHY',
    author: 'AR. ISHA VERMA',
    readTime: '8 MIN READ',
  },
];

const STORIES = Array.from({ length: 20 }, (_, index) => ({
  id: index + 1,
  ...STORY_TEMPLATES[index % STORY_TEMPLATES.length],
}));

const getStoryLayout = (index: number) => {
  const indexInBatch = index % ITEMS_PER_LOAD;
  const featured = indexInBatch === 1 || indexInBatch === 5;

  return {
    featured,
    gridClass: featured
      ? 'xl:col-span-4 xl:row-span-6'
      : 'xl:col-span-4 xl:row-span-4',
    imageHeight: featured ? 'h-112.5' : 'h-55',
  };
};

const ITEMS_PER_LOAD = 8;

const BeyondBlueprintSection = () => {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const previousVisibleCount = useRef(ITEMS_PER_LOAD);
  const storyRefs = useRef<(HTMLDivElement | null)[]>([]);
  const visibleStories = STORIES.slice(0, visibleCount);
  const hasMore = visibleCount < STORIES.length;

  const handleLoadMore = () => {
    previousVisibleCount.current = visibleCount;
    setVisibleCount((prev) => Math.min(prev + ITEMS_PER_LOAD, STORIES.length));
  };

  useEffect(() => {
    if (visibleCount === ITEMS_PER_LOAD) return;

    const firstNewCard = storyRefs.current[previousVisibleCount.current];

    if (!firstNewCard) return;

    requestAnimationFrame(() => {
      firstNewCard.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  }, [visibleCount]);

  return (
    <SectionContainer
      bgClassName="bg-background-dark"
      heading={
        <>
          <span className="text-white">Beyond The</span>{' '}
          <span className="text-primary">Blueprint</span>
        </>
      }
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-12 xl:grid-rows-12 mt-14">
        {visibleStories.map((story, index) => {
          const layout = getStoryLayout(index);
          return (
            <div
              key={story.id}
              ref={(el) => {
                storyRefs.current[index] = el;
              }}
              className={`${layout.gridClass}`}
            >
              <Reveal delay={index * 0.05} className="h-full">
                <StoryCard story={story} imageHeight={layout.imageHeight} />
              </Reveal>
            </div>
          );
        })}
      </div>

      {hasMore && (
        <div className="mt-14 flex justify-center">
          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleLoadMore}
            className="rounded-2xl bg-primary px-8 py-3 text-sm font-medium uppercase tracking-[0.2em] text-white text-montserrat"
          >
            Load More Stories
          </motion.button>
        </div>
      )}
    </SectionContainer>
  );
};

export default BeyondBlueprintSection;

import { motion } from 'framer-motion';
import { Circle } from 'lucide-react';

interface StoryCardProps {
  story: (typeof STORIES)[number];
  imageHeight: string;
}

const StoryCard = ({ story, imageHeight }: StoryCardProps) => {
  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.35 }}
      className="group overflow-hidden rounded-3xl bg-white p-3 shadow-sm h-full"
    >
      <div className="overflow-hidden rounded-2xl">
        <motion.img
          whileHover={{ scale: 1.06 }}
          transition={{ duration: 0.6 }}
          src={story.image}
          className={`w-full object-cover ${imageHeight}`}
        />
      </div>

      <div className="mt-4">
        <div className="mb-3 flex items-center justify-between text-[10px] uppercase tracking-[0.22em] text-[#5D5F5F] text-montserrat">
          <span>{story.category}</span>
          <span>{story.readTime}</span>
        </div>

        <h3 className="text-cormorant-garamond text-[28px] leading-tight transition group-hover:text-primary text-[#1C1B1B]">
          {story.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-7 text-[#444748] text-montserrat">
          {story.description}
        </p>

        <div className="mt-5 flex items-center gap-2 text-xs uppercase tracking-wider text-[#1C1B1B] text-montserrat">
          <Circle size={12} fill="currentColor" />
          {story.author}
        </div>
      </div>
    </motion.article>
  );
};
