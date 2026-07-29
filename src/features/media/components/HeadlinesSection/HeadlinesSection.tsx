import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import Reveal from '@/shared/components/Reveal/Reveal';
import SectionContainer from '@/shared/components/Container/SectionContainer';

const HEADLINE_CATEGORIES = ['All', 'Press Releases', 'Media Coverage'];

const HEADLINES = [
  {
    id: 1,
    type: 'Press Releases',
    featured: true,
    category: 'PRESS RELEASE',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1600&auto=format&fit=crop&q=80',
    date: 'October 24, 2024',
    title:
      "H.Rishabraj Unveils 'The Zenith': A New Benchmark in Sustainable Luxury Living",
    description:
      'Introducing a landmark residential development that combines sustainable architecture, smart home technology, and thoughtfully curated lifestyle spaces to redefine premium urban living.',
  },
  {
    id: 2,
    type: 'Press Releases',
    featured: false,
    category: 'PRESS RELEASE',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
    date: 'September 12, 2024',
    title:
      'H.Rishabraj Announces Expansion into High-Growth Residential Markets',
    description:
      'The company revealed plans to strengthen its presence with multiple premium residential developments across rapidly growing urban corridors.',
  },
  {
    id: 3,
    type: 'Press Releases',
    featured: false,
    category: 'PRESS RELEASE',
    image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1200&auto=format&fit=crop&q=80',
    date: 'August 02, 2024',
    title: 'Strategic Partnership to Deliver Next-Generation Smart Communities',
    description:
      'A new collaboration aims to integrate smart infrastructure, energy-efficient systems, and enhanced resident experiences across future developments.',
  },

  {
    id: 4,
    type: 'Media Coverage',
    featured: true,
    category: 'MEDIA COVERAGE',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1600&auto=format&fit=crop&q=80',
    date: 'October 08, 2024',
    title:
      'Featured by Business Today for Excellence in Sustainable Real Estate',
    description: `Business Today highlighted H.Rishabraj's innovative design philosophy, commitment to sustainability, and consistent delivery of premium residential communities.`,
  },
  {
    id: 5,
    type: 'Media Coverage',
    featured: false,
    category: 'MEDIA COVERAGE',
    image:
      'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1200&auto=format&fit=crop&q=80',
    date: 'September 21, 2024',
    title:
      'Urban Living Weekly Showcases the Future of Luxury Residential Design',
    description:
      'The publication explored how modern architecture and lifestyle-focused amenities are shaping the next generation of premium housing.',
  },
  {
    id: 6,
    type: 'Media Coverage',
    featured: false,
    category: 'MEDIA COVERAGE',
    image:
      'https://images.unsplash.com/photo-1462396240927-52058a6a84ec?w=1200&auto=format&fit=crop&q=80',
    date: 'August 28, 2024',
    title:
      'Architectural Digest Highlights the Craftsmanship Behind Signature Projects',
    description:
      'The feature praised the meticulous attention to detail, timeless aesthetics, and innovative planning reflected across the company’s flagship developments.',
  },
];

const HeadlinesSection = () => {
  const [activeTab, setActiveTab] = useState('All');
  const filteredArticles = useMemo(() => {
    if (activeTab === 'All') return HEADLINES;

    return HEADLINES.filter((article) => article.type === activeTab);
  }, [activeTab]);

  const featuredArticle =
    filteredArticles.find((article) => article.featured) ?? filteredArticles[0];

  const sideArticles = filteredArticles.filter(
    (article) => article.id !== featuredArticle?.id
  );
  return (
    <SectionContainer
      heading={
        <>
          In The <span className="text-primary">Headlines</span>
        </>
      }
      sideDescription={
        <Reveal delay={0.15}>
          <div className="flex flex-wrap gap-3">
            {HEADLINE_CATEGORIES.map((item) => (
              <button
                key={item}
                onClick={() => setActiveTab(item)}
                className={`rounded-full border px-5 py-2 text-sm transition-all duration-300
      ${
        activeTab === item
          ? 'border-primary bg-primary text-white'
          : 'border-neutral-300 text-neutral-600 hover:border-primary hover:text-primary'
      }`}
              >
                {item}
              </button>
            ))}
          </div>
        </Reveal>
      }
    >
      <div className="mt-12 grid items-stretch gap-8 lg:grid-cols-[2.25fr_1fr]">
        {/* Featured */}
        {/* <Reveal> */}
        <motion.article
          whileHover="hover"
          initial="rest"
          animate="rest"
          className="group cursor-pointer"
        >
          <div className="relative overflow-hidden rounded-3xl">
            <motion.img
              variants={{
                rest: { scale: 1 },
                hover: { scale: 1.05 },
              }}
              transition={{ duration: 0.6 }}
              src={featuredArticle.image}
              className="aspect-16/10 w-full object-cover"
            />

            <span
              className="absolute left-5 top-5 rounded-full px-4 py-2 text-[10px] font-semibold tracking-widest"
              style={{
                background: 'rgba(255, 255, 255, 0.7)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {featuredArticle.category}
            </span>
          </div>

          <div className="mt-7">
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-500 text-montserrat">
              {featuredArticle.date}
            </p>

            <h3 className="mt-4 max-w-3xl text-3xl leading-snug text-cormorant-garamond">
              {featuredArticle.title}
            </h3>

            <p className="mt-5 max-w-2xl text-neutral-600 leading-8 text-montserrat">
              {featuredArticle.description}
            </p>

            <motion.div
              className="mt-8 inline-flex items-center gap-2 text-primary text-montserrat"
              variants={{
                rest: { x: 0 },
                hover: { x: 8 },
              }}
            >
              Read Story
              <ArrowRight size={18} />
            </motion.div>
          </div>
        </motion.article>
        {/* </Reveal> */}

        {/* Side Articles */}
        <div className="flex h-full flex-col overflow-hidden max-h-200">
          <div className="sidebar-scroll flex-1 space-y-8 overflow-y-auto pr-2">
            {sideArticles.map((article, index) => (
              <Reveal key={article.id} delay={0.15 * (index + 1)}>
                <motion.article
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.35 }}
                  className="group cursor-pointer"
                >
                  <div className="overflow-hidden rounded-2xl">
                    <motion.img
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.6 }}
                      src={article.image}
                      className="aspect-16/10 w-full object-cover"
                    />
                  </div>

                  <p className="mt-5 text-xs uppercase tracking-[0.22em] text-neutral-500 text-montserrat">
                    {article.category} - {article.date}
                  </p>

                  <h4 className="mt-3 text-lg leading-8 transition group-hover:text-primary text-montserrat">
                    {article.title}
                  </h4>
                </motion.article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </SectionContainer>
  );
};

export default HeadlinesSection;
