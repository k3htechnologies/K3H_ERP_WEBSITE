import type {
  Category,
  Opening,
  VisionItem,
} from '@/features/career/types/career.type';

export const VISION_ITEMS: VisionItem[] = [
  {
    id: '01',
    title: 'Global Mentorship',
    description:
      'Direct access to our founding partners and a network of international specialists in luxury development.',
  },
  {
    id: '02',
    title: 'Iconic Portfolio',
    description:
      'Represent properties that are works of art, from Manhattan penthouses to private Mediterranean islands.',
  },
  {
    id: '03',
    title: 'Cultural Innovation',
    description:
      'A culture of relentless pursuit of excellence, where every voice is heard and every breakthrough celebrated.',
  },
];

export const TABS: Category[] = ['All', 'Brokerage', 'Creative', 'Operations'];

export const OPENINGS: Opening[] = [
  {
    id: 1,
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
