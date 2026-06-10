import { ROUTES } from "@/app/router/routePaths";

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

export const NAV_ITEMS = [
  {
    title: 'HOME',
    link: `/${ROUTES.HOMEPAGE}`,
    image:
      'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'PROJECTS',
    link: `/${ROUTES.PROJECTS}`,
    image:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'BLOGS',
    link: `/${ROUTES.BLOGS}`,
    image:
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'ABOUT',
    link: `/${ROUTES.ABOUT}`,
    image:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'CAREER',
    link: `/${ROUTES.CAREER}`,
    image:
      'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1200&auto=format&fit=crop',
  },
  {
    title: 'LOGIN',
    link: `/${ROUTES.LOGIN}`,
    image:
      'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=1200&auto=format&fit=crop',
  }
];

export const FOOTER_LINKS = [

  {
    label : 'Projects Detail',
    link : `/${ROUTES.PROJECTS}`
  },
  {
    label : 'Blog Details',
    link : `/${ROUTES.BLOGS}`
  },
  {
    label : 'Teams',
    link : `/${ROUTES.TEAMS}`
  },
  {
    label : 'Contact',
    link : `/${ROUTES.CONTACT}`
  },
  {
    label : 'Terms Condition',
    link : `/${ROUTES.TERMS}`
  },
  {
    label : 'Privacy Policy',
    link : `/${ROUTES.PRIVACY}`
  }
];

export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const MOBILE_REGEX = /^[0-9+\-\s()]{10,}$/;

export const FILE_ISSUE = {
  SIZE: "SIZE",
  FORMAT: "FORMAT",
};
