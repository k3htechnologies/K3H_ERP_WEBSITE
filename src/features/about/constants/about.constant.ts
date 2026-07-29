import type { VisionItem } from '@/features/career/types/career.type';
import type { AwardImage } from '@/shared/components/ImageSlider3D/ImageSlider3D';
import type { TimelineItem } from '@/features/about/components/JourneyTimelineSection/JourneyTimelineSectionNew';

export const TIMELINE_POINTS_DESKTOP = [
  {
    year: '2008',
    title: 'THE INCEPTION',
    description:
      'Founded with a singular vision to redefine metropolitan living through architectural integrity.',
  },
  {
    year: '2014',
    title: 'VERTICAL HORIZONS',
    description:
      "Completion of 'The Zenith', our first award-winning 60-story residential landmark.",
  },
  {
    year: '2021',
    title: 'SUSTAINABLE LEGACY',
    description:
      "Pioneering Net-Zero construction with 'Archive Green', a sustainable sanctuary.",
  },
  // {
  //   left: 76,
  //   year: '2023',
  //   position: 'bottom',
  //   description: 'A Milestone of Trust',
  // },
  // {
  //   left: 98,
  //   year: '2025',
  //   position: 'top',
  //   description: "Building Tomorrow's Mumbai",
  // },
];

export const VISION_ITEMS: VisionItem[] = [
  {
    id: '01',
    title: 'Pioneers in Redevelopment',
    description:
      'Transforming legacy structures into modern marvels while ensuring seamless transitions for existing communities..',
  },
  {
    id: '02',
    title: 'Absolute Trust',
    description:
      'Zero hidden costs, transparent documentation, and ethical practices.',
  },
  {
    id: '03',
    title: 'Uncompromising Quality',
    description:
      'Partnering with global brands for fittings and utilizing cutting-edge construction technology.',
  },
  {
    id: '04',
    title: 'On-Time Delivery',
    description:
      'A flawless track record of handing over keys before the promised date.',
  },
];

export const AWARDS: AwardImage[] = [
  {
    image: '/awards/award_edited.png',
    title: 'Award of Excellence',
  },
  {
    image: '/awards/Awards-3.png',
    title: 'Best Redevelopment Project',
  },
  {
    image: '/awards/Awards-4.png',
    title: 'Industry Leadership Award',
  },
  {
    image: '/awards/Awards-6.png',
    title: 'Construction Excellence',
  },
  {
    image: '/awards/Awards-7.png',
    title: 'Quality Achievement Award',
  },
  {
    image: '/awards/Awards-8.png',
    title: 'Best Developer Recognition',
  },
  {
    image: '/awards/Awards-9.png',
    title: 'Real Estate Excellence',
  },
  {
    image: '/awards/Awards-10.png',
    title: 'Innovation in Design',
  },
  {
    image: '/awards/Awards-11.png',
    title: 'Outstanding Project Award',
  },
  {
    image: '/awards/Awards-12.png',
    title: 'Trust & Transparency Award',
  },
  {
    image: '/awards/Awards-15.png',
    title: 'Best Residential Development',
  },
  {
    image: '/awards/Awards-16.png',
    title: 'Customer Choice Award',
  },
  {
    image: '/awards/aword.png',
    title: 'Special Recognition Award',
  },
  {
    image: '/awards/certificate.png',
    title: 'Certificate of Achievement',
  },
  {
    image: '/awards/IconicRedevelopment.png',
    title: 'Iconic Redevelopment Award',
  },
  {
    image: '/awards/RayAshaKiKiran.png',
    title: 'Ray Asha Ki Kiran Award',
  },
  {
    image: '/awards/TimesOfIndia1.png',
    title: 'Times Excellence Award',
  },
  {
    image: '/awards/TimesOfIndia2.png',
    title: 'Times Leadership Award',
  },
];

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    year: 2009,
    title: 'Designing one master piece at a time',
    description:
      'In 2009, Mr. Harish Kumar Jain shifted from textiles to real estate, starting with Shyam Krupa CHSL in Borivali East. With steadfast dedication & the committed team of 5 to 6 members, he finished the project in just 11 months, marking the beginning of his transformative journey in Daulat Nagar.',
    image: '/timeline/shyam-krupa.jpeg',
    imageAlt: 'City skyline lit up at night',
  },
  {
    year: 2019,
    title: 'Formation of BDA',
    description:
      'As a proactive leader, Mr. Harish Kumar Jain established BDA to represent the voice of small developers to change and affect policies. swiftly amassing over 700 members in just 5 months. His commitment to reforming real estate policies and overcoming bureaucratic hurdles in redevelopment projects is unparalleled.',
    image: '/timeline/BDA.png',
    imageAlt: 'Engineer reviewing blueprints on site',
  },
  {
    year: 2020,
    title: `Let’s Restart initiative`,
    description: `We're bringing Mumbai's stalled projects back to life! Our impactful initiative has already revitalised 9 projects, and we're committed to excellence. Our mission is to bring life back to these projects, transforming them into thriving spaces that contribute to the growth and development of the city.`,
    image: '/timeline/Lets-Restarts.png',
    imageAlt: 'Aerial view of the city skyline at dusk',
  },
  {
    year: 2021,
    title: 'Entry into the Commercial Market',
    description: `In 2021, we entered Mumbai's commercial real estate market aiming to transform Mumbai's skyline. Strengthening our team with construction expertise, we debuted with the landmark 63 GMA project in a strategic Mumbai location.`,
    image: '/timeline/commercial-market.png',
    imageAlt: 'Waterfront residential tower at sunset',
  },
  {
    year: 2023,
    title: 'Completed 50 projects',
    description: `As our company continues to grow, we have expanded our team with 150 employees, each bringing expertise in various fields. With our enhanced capabilities, we have successfully completed over 50 projects, delivering them before time with high quality, thus earning the trust of our customers.`,
    image: '/timeline/completed-projects.png',
    imageAlt: 'Engineer reviewing blueprints on site',
  },
  {
    year: 2026,
    title: `Getting stronger by the day`,
    description: `In 2026, our journey is marked by customer-centric planning and policy shaping, led by our MD's commitment to industry leadership. With a proven track record, we foster community growth in Society Redevelopment, MHADA, SRA, Cluster Developments, and Freehold Land Developments, driven by customer satisfaction.`,
    image: '/timeline/getting-stronger.png',
    imageAlt: 'Aerial view of the city skyline at dusk',
  },
];

export const CURVE_RADIUS = 36;
