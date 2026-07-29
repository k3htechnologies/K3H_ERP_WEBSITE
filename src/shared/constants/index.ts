import { ROUTES } from '@/app/router/routePaths';

export const HERO_BACKGROUND_IMAGES: string[] = [
  'https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1920&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1920&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1920&auto=format&fit=crop',
];

export const HERO_CURSOR_IMAGES: string[] = [
  'https://images.unsplash.com/photo-1514565131-fce0801e5785?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1519501025264-65ba15a82390?q=80&w=1200&auto=format&fit=crop',
];

export const SCALE_SCROLL_DISTANCE = 600;
export const BACKGROUND_TRANSITION_DISTANCE = 1000;
export const TRAIL_LIFETIME = 900;
export const TRAIL_SPAWN_DELAY = 50;

// export const NAV_ITEMS = [
//   {
//     title: 'HOME',
//     link: `/${ROUTES.HOMEPAGE}`,
//     image:
//       'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1200&auto=format&fit=crop',
//   },
//   {
//     title: 'PROJECTS',
//     link: `/${ROUTES.PROJECTS}`,
//     image:
//       'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop',
//   },
//   {
//     title: 'BLOGS',
//     link: `/${ROUTES.BLOGS}`,
//     image:
//       'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop',
//   },
//   {
//     title: 'ABOUT',
//     link: `/${ROUTES.ABOUT}`,
//     image:
//       'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop',
//   },
//   {
//     title: 'CAREER',
//     link: `/${ROUTES.CAREER}`,
//     image:
//       'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1200&auto=format&fit=crop',
//   },
//   {
//     title: 'LOGIN',
//     link: `/${ROUTES.LOGIN}`,
//     image:
//       'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1200&auto=format&fit=crop',
//   },
// ];

export const NAV_ITEMS = [
  {
    label: 'Home',
    to: `/${ROUTES.HOMEPAGE}`,
  },
  {
    label: 'About Us',
    to: `/${ROUTES.ABOUT}`,
  },
  {
    label: 'Projects',
    to: `/${ROUTES.PROJECTS}`,
  },
  {
    label: 'Lifestyle',
    to: `/${ROUTES.LIFESTYLE}`,
  },
  {
    label: 'Media',
    to: `/${ROUTES.MEDIA}`,
  },
  {
    label: 'Career',
    to: `/${ROUTES.CAREER}`,
  },
  {
    label: 'Contact Us',
    to: `/${ROUTES.CONTACT}`,
  },
  {
    label: 'Login',
    to: `/${ROUTES.LOGIN}`,
  },
];

export const FOOTER_LINKS = [
  {
    label: 'Home',
    link: '/',
  },
  {
    label: 'About Us',
    link: `/${ROUTES.ABOUT}`,
  },
  {
    label: 'Projects',
    link: `/${ROUTES.PROJECTS}`,
  },
  {
    label: 'Lifestyle',
    link: `/${ROUTES.LIFESTYLE}`,
  },
  {
    label: 'Careers',
    link: `/${ROUTES.CAREER}`,
  },
  {
    label: 'Media',
    link: `/${ROUTES.MEDIA}`,
  },
  {
    label: 'Contact Us',
    link: `/${ROUTES.CONTACT}`,
  },
  {
    label: 'Login',
    link: `/${ROUTES.LOGIN}`,
  },
];

export const APARTMENTS_LOC = [
  'Apartments in Borivali(E)',
  'Apartments in Dahisar(E)',
  'Apartments in Goregaon(E)',
  'Apartments in Andheri(W)',
  'Apartments in Bandra(W)',
  'Apartments in Khar(W)',
  'Penthouse in Borivali(W)',
];
export const TOPOLOGY = [
  '2 & 3 BHK in Borivali(W)',
  '3 & 4 BHK in Juhu',
  '2 & 3 BHK in Khar(W)',
  'Premium Office Spaces in Goregaon(W)',
  'Boutique office spaces in Borivali(E)',
  '2 & 3 BHK GEM Residencies in Dahisar(E)',
];
export const SOCIAL_LINKS = [
  {
    label: 'Instagram',
    url: 'https://www.instagram.com/accounts/login/?next=%2Fh.rishabrajdevelopers%2F&source=omni_redirect&hl=en',
  },
  {
    label: 'LinkedIn',
    url: 'https://www.linkedin.com/company/hrishabrajgroup/',
  },
  {
    label: 'Facebook',
    url: 'https://www.facebook.com/H.RishabrajBuilders',
  },
  {
    label: 'Youtube',
    url: 'https://www.youtube.com/@h.rishabrajgroup6514',
  },
] as const;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MOBILE_REGEX = /^[0-9+\-\s()]{10,}$/;

export const FILE_ISSUE = {
  SIZE: 'SIZE',
  FORMAT: 'FORMAT',
};
