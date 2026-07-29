import type { Variants } from 'framer-motion';
import {
  Trees,
  GraduationCap,
  Cross,
  LockKeyhole,
  Smartphone,
  Unplug,
} from 'lucide-react';

export const ELEVATED_STANDARD_EASE = [0.22, 1, 0.36, 1] as const;
export const GREEN_IMPACT_EASE = [0.22, 1, 0.36, 1] as const;
export const GALLERY_EASE = [0.22, 1, 0.36, 1] as const;
export const FAMILY_EASE = [0.22, 1, 0.36, 1] as const;

export const FEATURES = [
  {
    id: '01',
    title: 'Luxury',
    description:
      'Timeless design, refined craftsmanship, and exceptional finishes define every residence we create.',
  },
  {
    id: '02',
    title: 'Wellness',
    description:
      'Designed to inspire wellbeing through light, space, nature, and purposeful living.',
  },
  {
    id: '03',
    title: 'Intelligent Living',
    description:
      'Technology that works quietly in the background, allowing life to unfold effortlessly.',
  },
  {
    id: '04',
    title: 'Security',
    description:
      'Advanced protection thoughtfully integrated to safeguard every moment at home.',
  },
  {
    id: '05',
    title: 'Connectivity',
    description: `Perfectly positioned to connect you with Mumbai's finest business, education, and lifestyle destinations.`,
  },
  {
    id: '06',
    title: 'Comfort',
    description:
      'Interiors thoughtfully designed to make every day feel effortlessly refined.',
  },
];

export const elevatedStandardContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export const elevatedStandardCardVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: ELEVATED_STANDARD_EASE,
    },
  },
};

export const INITIATIVES = [
  {
    icon: Trees,
    title: 'Afforestation',
    description:
      'Expanding urban green spaces through thoughtful tree plantation initiatives.',
  },
  {
    icon: GraduationCap,
    title: 'Education',
    description:
      'Supporting brighter futures through education, learning, and community development.',
  },
  {
    icon: Cross,
    title: 'Healthcare',
    description:
      'Improving lives through accessible healthcare and community wellness initiatives.',
  },
];

export const STATS = [
  {
    value: '10K+',
    label: 'Trees Planted',
  },
  {
    value: '5K',
    label: 'Lives Positively Impacted',
  },
];

export const greenImpactContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.14,
    },
  },
};

export const greenImpactItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: GREEN_IMPACT_EASE,
    },
  },
};

export const greenImpactImageVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -60,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: GREEN_IMPACT_EASE,
    },
  },
};

export const HABITATS_FEATURES = [
  {
    icon: LockKeyhole,
    title: 'Intelligent Security',
    description:
      'Discreet protection with seamless access and complete peace of mind.',
  },
  {
    icon: Smartphone,
    title: 'Smart Home Control',
    description:
      'Personalize lighting, climate, and ambience with intuitive automation.',
  },
  {
    icon: Unplug,
    title: 'Connected Experiences',
    description:
      'Effortless connectivity that keeps your home responsive to your lifestyle.',
  },
];

export const habitatscontainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export const habitatscardVariants = {
  hidden: {
    opacity: 0,
    x: -40,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut' as const,
    },
  },
};

export const habitatsimageVariants = {
  hidden: {
    opacity: 0,
    x: 60,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: 'easeOut' as const,
    },
  },
};

export const GALLERY_IMAGES = [
  {
    id: 1,
    title: 'Luxury Living Room',
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&auto=format&fit=crop&q=80',
    video:
      'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  },
  {
    id: 2,
    title: 'Indoor Sports Court',
    image:
      'https://images.unsplash.com/photo-1629276301820-0f3eedc29fd0?w=1200&auto=format&fit=crop&q=80',
    video:
      'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  },
  {
    id: 3,
    title: 'Infinity Pool',
    image:
      'https://images.unsplash.com/photo-1573843981267-be1999ff37cd?w=1200&auto=format&fit=crop&q=80',
    video:
      'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  },
  {
    id: 4,
    title: 'Morning Jog',
    image:
      'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=1200&auto=format&fit=crop&q=80',
    video:
      'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  },
  {
    id: 5,
    title: 'Luxury Skyline',
    image:
      'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1200&auto=format&fit=crop&q=80',
    video:
      'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  },
  {
    id: 6,
    title: 'Landscape Garden',
    image:
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200&auto=format&fit=crop&q=80',
    video:
      'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
  },
];

export const gallerycontainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const galleryitemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.65,
      ease: GALLERY_EASE,
    },
  },
};

export const galleryimageHoverVariants: Variants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.08,
    transition: {
      duration: 0.8,
      ease: GALLERY_EASE,
    },
  },
};

export const galleryoverlayVariants: Variants = {
  rest: {
    opacity: 0,
  },
  hover: {
    opacity: 1,
    transition: {
      duration: 0.35,
    },
  },
};

export const galleryplayButtonVariants: Variants = {
  rest: {
    opacity: 0,
    scale: 0.8,
    y: 20,
  },
  hover: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 380,
      damping: 22,
    },
  },
};

export const gallerypageVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.98,
    filter: 'blur(10px)',
  },
  animate: {
    opacity: 1,
    scale: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.55,
      ease: GALLERY_EASE,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.98,
    filter: 'blur(10px)',
    transition: {
      duration: 0.35,
      ease: GALLERY_EASE,
    },
  },
};

export const COMMUNITY_FEATURES = [
  {
    title: 'Seasonal Celebrations',
    description:
      'Celebrate traditions together through thoughtfully curated community experiences.',
  },
  {
    title: `Children's Play Spaces`,
    description:
      'Safe, engaging spaces where young minds play, explore, and create lasting friendships.',
  },
];

export const familycontainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

export const familyitemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: FAMILY_EASE,
    },
  },
};

export const familyimageVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 50,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: FAMILY_EASE,
    },
  },
};

export const EXPERIENCES = [
  {
    id: 1,
    time: '7:00 AM',
    title: 'Morning Wellness',
    description: 'Begin your day in perfect balance.',
    image: '/timed-exp/timed-exp-1.jpeg',
  },
  {
    id: 2,
    time: '10:00 AM',
    title: 'Business Lounge',
    description: 'Where productivity meets sophistication.',
    image: '/timed-exp/timed-exp-2.jpeg',
  },
  {
    id: 3,
    time: '3:00 PM',
    title: 'Social Clubhouse',
    description: 'Thoughtfully designed for gatherings.',
    image: '/timed-exp/timed-exp-3.jpeg',
  },
  {
    id: 4,
    time: '6:00 PM',
    title: 'Landscaped Gardens',
    description: 'Nature woven into everyday living.',
    image: '/timed-exp/timed-exp-4.jpeg',
  },
  {
    id: 5,
    time: '7:30 PM',
    title: 'Sky Lounge',
    description: 'Evenings above the city skyline.',
    image: '/timed-exp/timed-exp-5.jpeg',
  },
  {
    id: 6,
    time: '9:30 PM',
    title: 'Private Retreat',
    description: 'End every day in timeless comfort.',
    image: '/timed-exp/timed-exp-6.jpeg',
  },
];

export const GAP = 28;

export const timedExpimageVariants = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.08,
    transition: {
      duration: 0.7,
    },
  },
};

// export const timedExpoverlayVariants = {
//   rest: {
//     opacity: 0,
//   },
//   hover: {
//     opacity: 1,
//     transition: {
//       duration: 0.35,
//     },
//   },
// };
export const timedExpoverlayVariants = {
  rest: {
    opacity: 1,
  },
  hover: {
    opacity: 0,
    transition: {
      duration: 0.35,
      ease: 'easeOut' as const,
    },
  },
};

// export const timedExpglassVariants = {
//   rest: {
//     opacity: 0,
//     y: 35,
//   },
//   hover: {
//     opacity: 1,
//     y: 0,
//     transition: {
//       duration: 0.45,
//     },
//   },
// };

export const timedExpglassVariants = {
  rest: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
  },
  hover: {
    opacity: 0,
    y: 20,
    filter: 'blur(6px)',
    transition: {
      duration: 0.35,
      ease: 'easeOut' as const,
    },
  },
};
