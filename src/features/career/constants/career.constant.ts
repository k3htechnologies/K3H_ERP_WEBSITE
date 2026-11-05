import type {
  Category,
  Opening,
  VisionItem,
} from '@/features/career/types/career.type';

export const VISION_ITEMS: VisionItem[] = [
  {
    id: '01',
    title: 'Grow With Us',
    description:
      'Take on new challenges, develop your expertise, and build your career through meaningful responsibilities and opportunities across projects.',
  },
  {
    id: '02',
    title: 'Be Part of Something Bigger',
    description:
      `Contribute to landmark developments that shape Mumbai's skyline and create lasting value for the communities they serve.`,
  },
  {
    id: '03',
    title: 'Work Together. Move Forward.',
    description:
      'Join a team that values collaboration, encourages fresh perspectives, and brings together diverse expertise to achieve shared goals.',
  },
  {
    id: '04',
    title: 'Make Your Mark',
    description:
      'Bring your ideas, skills, and ambition to an organisation driven by quality, integrity, and the pursuit of excellence.',
  },
];

export const TABS: Category[] = ['All', 'Brokerage', 'Creative', 'Operations'];

export const OPENINGS: Opening[] = [
  {
    id: 11,
    title: 'Senior Property Advisor',
    category: 'Brokerage',
    location: 'Mumbai',
    description:
      'Guide premium clientele through luxury real estate acquisitions while building long-term investor relationships.',
  },
  {
    id: 2,
    title: 'Marketing Director',
    category: 'Creative',
    location: 'Mumbai',
    description:
      'Lead brand campaigns, creative direction, and digital storytelling across flagship developments.',
  },
  {
    id: 3,
    title: 'Client Relations Manager',
    category: 'Operations',
    location: 'Mumbai',
    description:
      'Deliver exceptional client experiences and oversee communication throughout the customer journey.',
  },
];
