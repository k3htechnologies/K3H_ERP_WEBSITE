import { useMemo } from 'react';
import { motion } from 'framer-motion';

export interface Amenity {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface InfiniteMarqueeProps {
  items: Amenity[];
  direction?: 'left' | 'right';
  duration?: number;
}

export default function InfiniteMarquee({
  items,
  direction = 'left',
  duration = 35,
}: InfiniteMarqueeProps) {
  const duplicatedItems = useMemo(() => [...items, ...items], [items]);

  return (
    <div className="overflow-hidden">
      <motion.div
        className="flex w-max gap-8"
        animate={{
          x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'],
        }}
        transition={{
          duration,
          ease: 'linear',
          repeat: Infinity,
        }}
        whileHover={{
          animationPlayState: 'paused',
        }}
      >
        {duplicatedItems.map((amenity, index) => (
          <AmenityCard key={`${amenity.id}-${index}`} amenity={amenity} />
        ))}
      </motion.div>
    </div>
  );
}

function AmenityCard({ amenity }: { amenity: Amenity }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl w-175`}
      style={{
        background:
          'linear-gradient(181.35deg, rgba(255, 255, 255, 0.5) 1.15%, rgba(255, 255, 255, 0) 98.91%)',
        // border: '1px solid rgba(255, 255, 255, 0.36)',
        borderImageSource:
          'linear-gradient(80.29deg, rgba(255, 255, 255, 0.77) 8.57%, rgba(255, 255, 255, 0) 55.13%, #FFFFFF 95.22%)',
        backdropFilter: 'blur(70px)',
      }}
    >
      <div className={`overflow-hidden h-62.5 w-full`}>
        <img
          src={amenity.image}
          alt={amenity.title}
          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
        />
      </div>
      <div className="p-6">
        <h3 className="font-cormorant text-2xl leading-none text-white">
          {amenity.title}
        </h3>

        <p className="mt-4 text-sm leading-7 text-white/70 text-montserrat">
          {amenity.description}
        </p>
      </div>
    </div>
  );
}
