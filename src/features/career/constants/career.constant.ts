import type {
  Category,
  Opening,
  VisionItem,
} from '@/features/career/types/career.type';

export const VISION_ITEMS: VisionItem[] = [
  {
    id: '01',
    title: 'Meaningful Growth',
    description:
      'Grow alongside experienced leaders through real opportunities, continuous learning, and hands-on project exposure.',
  },
  {
    id: '02',
    title: 'Landmark Projects',
    description:
      'Contribute to premium developments that redefine urban living and become enduring landmarks across Mumbai.',
  },
  {
    id: '03',
    title: 'People-First Culture',
    description:
      'Be part of a collaborative workplace where ideas are valued, talent is nurtured, and success is shared.',
  },
  {
    id: '04',
    title: 'Purpose-Driven Excellence',
    description:
      'Work with a team united by craftsmanship, integrity, and the pursuit of creating spaces that inspire generations.',
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
