import { useEffect, useRef, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { NAV_ITEMS } from '@/shared/constants';
import { ROUTES } from '@/app/router/routePaths';
import { useEnquiryModal } from '@/app/provider/EnquiryProvider/EnquiryModalContext';

type NavTheme = 'light' | 'dark';

interface NavbarProps {
  vanish?: boolean;
  theme?: NavTheme;
}

const ease = [0.22, 1, 0.36, 1] as const;

// Premium, slightly "weighted" spring — used for logo/nav collapse
const springTransition = {
  type: 'spring' as const,
  stiffness: 260,
  damping: 28,
  mass: 0.9,
};

// Softer spring for the whole header hiding/showing on scroll
const vanishTransition = {
  type: 'spring' as const,
  stiffness: 220,
  damping: 26,
  mass: 1,
};

// Routes where the floating center logo should NOT appear when the navbar vanishes
const CENTER_LOGO_HIDDEN_ROUTES: string[] = [
  ROUTES.APPLICATION_FORM,
  ROUTES.LOGIN,
  ROUTES.CONTACT,
];

// Single source of truth for every theme-dependent value.
// Layout, spacing, and animation stay identical across themes — only these tokens swap.
const THEME_STYLES: Record<
  NavTheme,
  {
    panelBackground: string;
    borderColor: string;
    textIdle: string;
    textHover: string;
    buttonBorder: string;
    buttonBg: string;
    buttonText: string;
    buttonHoverBg: string;
    buttonHoverText: string;
    logoSrc: string;
  }
> = {
  dark: {
    panelBackground:
      'linear-gradient(160.18deg, rgba(255, 255, 255, 0.08) 14.52%, rgba(153, 153, 153, 0) 88.06%)',
    borderColor: '#FFFFFF1A',
    textIdle: 'text-white',
    textHover: 'hover:text-primary',
    buttonBorder: 'border-white/30',
    buttonBg: 'bg-white/10',
    buttonText: 'text-white',
    buttonHoverBg: 'hover:bg-primary',
    buttonHoverText: 'hover:text-slate-900',
    logoSrc: '/Hrishabraj-logo-light.svg',
  },
  light: {
    panelBackground:
      'linear-gradient(160.18deg, rgba(15, 15, 15, 0.05) 14.52%, rgba(15, 15, 15, 0) 88.06%)',
    borderColor: '#0000001A',
    textIdle: 'text-slate-900',
    textHover: 'hover:text-primary',
    buttonBorder: 'border-slate-900/20',
    buttonBg: 'bg-slate-900/5',
    buttonText: 'text-slate-900',
    buttonHoverBg: 'hover:bg-primary',
    buttonHoverText: 'hover:text-white',
    // logoSrc: '/Hrishabraj-logo-dark.svg',
    logoSrc: '/Hrishabraj-logo-light.svg',
  },
};

const navVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.055,
      delayChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: -14,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.45,
      ease,
    },
  },
};

// Mobile menu items animate in from the side instead of dropping down,
// so the desktop and mobile reveals each feel native to their own layout.
const mobileNavVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
      delayChildren: 0.1,
    },
  },
};

const mobileItemVariants = {
  hidden: {
    opacity: 0,
    x: -16,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease,
    },
  },
};

export default function Navbar({
  vanish = false,
  theme = 'dark',
}: NavbarProps) {
  const t = THEME_STYLES[theme];

  const [visible, setVisible] = useState(true);
  const [middleLogoVisibility, setMiddleLogoVisibility] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  const location = useLocation();

  const { openEnquiryModal } = useEnquiryModal();

  // Normalize current path against ROUTES values (which are stored without leading slashes,
  // e.g. 'about', 'login' — only ROUTES.HOME is '/').
  const currentPath = location.pathname.replace(/^\/+/, '');
  const isCenterLogoAllowedOnRoute = !CENTER_LOGO_HIDDEN_ROUTES.some(
    (route) => route.replace(/^\/+/, '') === currentPath
  );

  const showCenterLogo = !menuOpen && isCenterLogoAllowedOnRoute;

  useEffect(() => {
    if (!vanish) return;

    const updateVisibility = () => {
      const current = window.scrollY;

      if (current < 20) {
        setVisible(true);
        setMiddleLogoVisibility(true);
      } else if (current > lastScrollY.current) {
        setVisible(false);
        setMiddleLogoVisibility(false);
      } else {
        setVisible(true);
        setMiddleLogoVisibility(true);
      }

      lastScrollY.current = current;
      ticking.current = false;
    };

    const handleScroll = () => {
      if (!ticking.current) {
        ticking.current = true;
        requestAnimationFrame(updateVisibility);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [vanish]);

  // Lock body scroll while the mobile menu is open so the page behind it doesn't scroll.
  useEffect(() => {
    if (menuOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={false}
        animate={{
          y: visible ? 0 : -140,
          opacity: visible ? 1 : 0,
        }}
        transition={vanishTransition}
      >
        {/* Static background panel — never fades, never blurs.
            Only its contents (logo/nav) animate individually below. */}
        <div
          className="relative"
          style={{
            background: menuOpen ? t.panelBackground : '',
            borderWidth: menuOpen ? '1px 1px 0px 1px' : '',
            borderStyle: menuOpen ? 'solid' : '',
            borderColor: menuOpen ? t.borderColor : '',
            backdropFilter: menuOpen ? 'blur(35px)' : '',
          }}
        >
          <div className="mx-4 sm:mx-6 lg:mx-20 grid h-20 lg:h-28 grid-cols-[auto_1fr_auto] items-center">
            <div className="flex items-center">
              <motion.div
                animate={{
                  opacity: menuOpen ? 1 : 0,
                  scale: menuOpen ? 1 : 0.985,
                  filter: menuOpen ? 'blur(0px)' : 'blur(6px)',
                }}
                transition={springTransition}
              >
                <AnimatePresence mode="wait">
                  {menuOpen && (
                    <motion.div
                      key="logo"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      transition={{ duration: 0.3, ease }}
                    >
                      <Logo logoSrc={t.logoSrc} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Desktop / tablet nav — unchanged behavior, just hidden below lg since
                the mobile menu below takes over that role on small screens. */}
            <div className="hidden lg:flex justify-center">
              <motion.div
                animate={{
                  opacity: menuOpen ? 1 : 0,
                  scale: menuOpen ? 1 : 0.985,
                  filter: menuOpen ? 'blur(0px)' : 'blur(6px)',
                }}
                transition={springTransition}
              >
                <AnimatePresence mode="wait">
                  {menuOpen && (
                    <motion.nav
                      key="navbar"
                      variants={navVariants}
                      initial="hidden"
                      animate="visible"
                      exit={{ opacity: 0, transition: { duration: 0.2, ease } }}
                    >
                      <ul className="flex items-center gap-10">
                        {NAV_ITEMS.map((item) => (
                          <motion.li key={item.to} variants={itemVariants}>
                            <NavLink
                              to={item.to}
                              onClick={() => setMenuOpen(false)}
                              className={({ isActive }) =>
                                `text-xs font-medium uppercase tracking-[0.18em] transition-colors ${
                                  isActive
                                    ? 'text-primary'
                                    : `${t.textIdle} ${t.textHover}`
                                }`
                              }
                            >
                              {item.label}
                            </NavLink>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.nav>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>

            {/* Always visible — no opacity/blur/scale animation tied to menuOpen */}
            <div className="flex items-center justify-end gap-3 sm:gap-4">
              {!currentPath.includes('project/') && (
                <button
                  onClick={() => openEnquiryModal()}
                  className={`border ${t.buttonBorder} ${t.buttonBg} px-6 py-2.5 text-xs font-medium uppercase tracking-[0.12em] ${t.buttonText} transition-colors duration-200 ${t.buttonHoverBg} ${t.buttonHoverText} hidden lg:block`}
                >
                  Enquire Now
                </button>
              )}

              <button
                onClick={() => setMenuOpen((p) => !p)}
                aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={menuOpen}
                className={`flex h-11 w-11 shrink-0 items-center justify-center border ${t.buttonBorder} ${t.buttonBg} ${t.buttonText} transition-colors duration-200 ${t.buttonHoverBg} ${t.buttonHoverText} focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/70`}
              >
                <AnimatePresence mode="wait" initial={false}>
                  {menuOpen ? (
                    <motion.span
                      key="close"
                      initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                      transition={{ duration: 0.25, ease }}
                      className="flex items-center justify-center"
                    >
                      <X size={20} />
                    </motion.span>
                  ) : (
                    <motion.span
                      key="menu"
                      initial={{ opacity: 0, rotate: 90, scale: 0.6 }}
                      animate={{ opacity: 1, rotate: 0, scale: 1 }}
                      exit={{ opacity: 0, rotate: -90, scale: 0.6 }}
                      transition={{ duration: 0.25, ease }}
                      className="flex items-center justify-center"
                    >
                      <Menu size={20} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>

          {/* Mobile menu panel — takes over the nav role below lg. Same menuOpen
              state and same NAV_ITEMS/onClick/route behavior as desktop, just
              laid out as a full-width stacked list sized for touch. */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                key="mobile-panel"
                className="lg:hidden overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.35, ease }}
              >
                <motion.nav
                  variants={mobileNavVariants}
                  initial="hidden"
                  animate="visible"
                  className="mx-4 sm:mx-6 flex flex-col gap-1 pb-6 pt-2"
                >
                  <ul className="flex flex-col divide-y divide-white/10">
                    {NAV_ITEMS.map((item) => (
                      <motion.li key={item.to} variants={mobileItemVariants}>
                        <NavLink
                          to={item.to}
                          onClick={() => setMenuOpen(false)}
                          className={({ isActive }) =>
                            `block py-4 text-base font-medium uppercase tracking-[0.14em] transition-colors ${
                              isActive
                                ? 'text-primary'
                                : `${t.textIdle} ${t.textHover}`
                            }`
                          }
                        >
                          {item.label}
                        </NavLink>
                      </motion.li>
                    ))}
                  </ul>

                  {!currentPath.includes('project/') && (
                    <motion.button
                      variants={mobileItemVariants}
                      onClick={() => {
                        openEnquiryModal();
                        setMenuOpen(false);
                      }}
                      className={`mt-5 w-full border ${t.buttonBorder} ${t.buttonBg} px-6 py-3.5 text-xs font-medium uppercase tracking-[0.12em] ${t.buttonText} transition-colors duration-200 ${t.buttonHoverBg} ${t.buttonHoverText}`}
                    >
                      Enquire Now
                    </motion.button>
                  )}
                </motion.nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      {/* Floating centered logo — appears only once the navbar has vanished,
          and only on routes not in CENTER_LOGO_HIDDEN_ROUTES */}
      <AnimatePresence>
        {showCenterLogo && middleLogoVisibility && (
          <motion.div
            key="center-vanish-logo"
            className="fixed inset-x-0 top-6 lg:top-10 z-40 flex justify-center"
            initial={{ opacity: 0, y: -16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -16, scale: 0.96 }}
            transition={springTransition}
          >
            <Link to={ROUTES.HOMEPAGE} className="block">
              <img
                src="/Hrishabraj-logo-light.svg"
                alt="H. Rishabraj"
                className="h-14 w-auto object-contain lg:h-24"
              />
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const Logo = ({ logoSrc }: { logoSrc: string }) => (
  <Link to={ROUTES.HOMEPAGE} className="block">
    <img
      src={logoSrc}
      alt="H. Rishabraj"
      className="h-10 w-auto object-contain lg:h-14"
    />
  </Link>
);
