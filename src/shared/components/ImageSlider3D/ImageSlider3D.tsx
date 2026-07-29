import {
  useReducedMotion,
} from 'framer-motion';
import { useEffect, useId, useState } from 'react';

const DEFAULT_DATA: AwardImage[] = [
  {
    image:
      'https://images.unsplash.com/photo-1540968221243-29f5d70540bf?w=800&auto=format&fit=crop&q=60',
    title: 'Best Residential Project',
  },
  {
    image:
      'https://images.unsplash.com/photo-1596135187959-562c650d98bc?w=800&auto=format&fit=crop&q=60',
    title: 'Excellence In Architecture',
  },
  {
    image:
      'https://images.unsplash.com/photo-1628944682084-831f35256163?w=800&auto=format&fit=crop&q=60',
    title: 'Urban Innovation Award',
  },
  {
    image:
      'https://images.unsplash.com/photo-1590013330451-3946e83e0392?w=800&auto=format&fit=crop&q=60',
    title: 'Luxury Housing Excellence',
  },
  {
    image:
      'https://images.unsplash.com/photo-1590421959604-741d0eec0a2e?w=800&auto=format&fit=crop&q=60',
    title: 'Developer Of The Year',
  },
  {
    image:
      'https://images.unsplash.com/photo-1572613000712-eadc57acbecd?w=800&auto=format&fit=crop&q=60',
    title: 'Smart Living Award',
  },
  {
    image:
      'https://images.unsplash.com/photo-1570097192570-4b49a6736f9f?w=800&auto=format&fit=crop&q=60',
    title: 'Best Redevelopment Project',
  },
  {
    image:
      'https://images.unsplash.com/photo-1620789550663-2b10e0080354?w=800&auto=format&fit=crop&q=60',
    title: 'Quality Construction Award',
  },
  {
    image:
      'https://images.unsplash.com/photo-1617775623669-20bff4ffaa5c?w=800&auto=format&fit=crop&q=60',
    title: 'Green Building Recognition',
  },
  {
    image:
      'https://images.unsplash.com/photo-1548600916-dc8492f8e845?w=800&auto=format&fit=crop&q=60',
    title: 'Customer Choice Award',
  },
  {
    image:
      'https://images.unsplash.com/photo-1573824969595-a76d4365a2e6?w=800&auto=format&fit=crop&q=60',
    title: 'Iconic Landmark Award',
  },
  {
    image:
      'https://images.unsplash.com/photo-1633936929709-59991b5fdd72?w=800&auto=format&fit=crop&q=60',
    title: 'Industry Leadership Award',
  },
  {
    image:
      'https://images.unsplash.com/photo-1572613000712-eadc57acbecd?w=800&auto=format&fit=crop&q=60',
    title: 'Design Excellence Award',
  },
  {
    image:
      'https://images.unsplash.com/photo-1570097192570-4b49a6736f9f?w=800&auto=format&fit=crop&q=60',
    title: 'Emerging Developer Award',
  },
  {
    image:
      'https://images.unsplash.com/photo-1620789550663-2b10e0080354?w=800&auto=format&fit=crop&q=60',
    title: 'Best Commercial Project',
  },
  {
    image:
      'https://images.unsplash.com/photo-1617775623669-20bff4ffaa5c?w=800&auto=format&fit=crop&q=60',
    title: 'Construction Innovation Award',
  },
  {
    image:
      'https://images.unsplash.com/photo-1548600916-dc8492f8e845?w=800&auto=format&fit=crop&q=60',
    title: 'Trusted Brand Award',
  },
  {
    image:
      'https://images.unsplash.com/photo-1573824969595-a76d4365a2e6?w=800&auto=format&fit=crop&q=60',
    title: 'Lifetime Achievement Award',
  },
];

export interface AwardImage {
  image: string;
  title?: string;
}

interface Slider3DProps {
  /** Array of image URLs to display */
  images?: AwardImage[];
  /** Duration of one full 360-degree rotation (in seconds) */
  duration?: number;
  /** Width of each card. Can be px, rem, em, etc. */
  cardWidth?: string;
  /** CSS aspect ratio of the cards */
  cardAspectRatio?: string;
  /** CSS perspective value for the 3D container */
  perspective?: string;
  /** Additional classes for the outermost container */
  containerClassName?: string;
  /** Additional classes for the individual image elements */
  imageClassName?: string;
  /** Direction of the rotation */
  rotationDirection?: 'left' | 'right';
  /** Whether to apply a gradient fade mask on the edges */
  withMask?: boolean;
  /** Scale applied to the card currently being hovered */
  hoverScale?: number;
}

export default function ImageSlider3D({
  images = DEFAULT_DATA,
  duration = 32,
  cardWidth = '17.5em',
  cardAspectRatio = '7/10',
  perspective = '35em',
  containerClassName = '',
  imageClassName = '',
  rotationDirection = 'left',
  withMask = true,
  hoverScale = 1.08,
}: Slider3DProps) {
  const n = images.length;
  const prefersReducedMotion = useReducedMotion();
  const animationDuration = prefersReducedMotion ? duration * 4 : duration;

  const maskStyles = withMask
    ? {
        WebkitMask:
          'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
        mask: 'linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)',
      }
    : {};

  const [loaded, setLoaded] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const isPaused = hoveredIndex !== null;

  // unique keyframe name so multiple instances on a page don't clash
  const uid = useId().replace(/:/g, '');
  const keyframeName = `slider3d-spin-${uid}`;

  useEffect(() => {
    Promise.all(
      images.map(
        (award) =>
          new Promise((resolve) => {
            const img = new Image();
            img.src = award.image;
            img.onload = resolve;
          })
      )
    ).then(() => setLoaded(true));
  }, []);

  const [warmed, setWarmed] = useState(false);

  useEffect(() => {
    if (!loaded) return;
    // give the browser a frame to promote compositor layers
    // before the animation actually starts running
    const raf1 = requestAnimationFrame(() => {
      const raf2 = requestAnimationFrame(() => setWarmed(true));
      return () => cancelAnimationFrame(raf2);
    });
    return () => cancelAnimationFrame(raf1);
  }, [loaded]);

  if (!loaded) {
    return (
      <div className="flex h-125 items-center justify-center">
        Loading Awards...
      </div>
    );
  }

  return (
    <div
      className={`grid w-full h-full min-h-125 overflow-hidden place-items-center ${containerClassName}`}
      style={{
        perspective: perspective,
        ...maskStyles,
      }}
    >
      {/* scoped keyframes for the spin, direction handled via animation-direction below */}
      <style>{`
        @keyframes ${keyframeName} {
          from { transform: rotateY(0deg); }
          to { transform: rotateY(360deg); }
        }
      `}</style>

      <div
        className="grid place-self-center pointer-events-auto"
        style={{
          transformStyle: 'preserve-3d',
          willChange: 'transform',
          transform: 'translateZ(0)',
          animationName: keyframeName,
          animationDuration: `${animationDuration}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          animationDirection:
            rotationDirection === 'left' ? 'normal' : 'reverse',
          animationPlayState: !warmed || isPaused ? 'paused' : 'running',
        }}
      >
        {images.map((award, i) => (
          <div
            key={i}
            className="col-start-1 row-start-1"
            style={{
              width: cardWidth,
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              // unchanged positioning transform, exactly as original
              transform: `translateZ(0) rotateY(calc(${i} * (1turn / ${n}))) translateZ(calc(-1 * (0.5 * ${cardWidth} + 0.5em) / tan(0.5 * (1turn / ${n}))))`,
            }}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {/* inner wrapper handles hover scale independently of the positioning transform above */}
            <div
              className="flex h-full flex-col overflow-hidden rounded-[28px]"
              style={{
                background: 'linear-gradient(180deg, #0F172A 0%, #334F90 100%)',
                transform:
                  hoveredIndex === i ? `scale(${hoverScale})` : 'scale(1)',
                transition: 'transform 0.35s ease-out',
                transformOrigin: 'center center',
              }}
            >
              {/* IMAGE AREA */}
              <div className="flex-1 p-4">
                <div
                  className="flex h-full items-center justify-center overflow-hidden rounded-3xl border border-white/10"
                  style={{
                    background:
                      'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 100%)',
                  }}
                >
                  <img
                    src={award.image}
                    alt={award.title}
                    className={`w-full object-contain p-6 ${imageClassName}`}
                    style={{
                      aspectRatio: cardAspectRatio,
                    }}
                  />
                </div>
              </div>

              {/* TITLE */}
              <div className="mt-auto px-6 pb-8">
                <h3 className="text-center font-heading text-[22px] font-semibold leading-tight text-white">
                  {award.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
