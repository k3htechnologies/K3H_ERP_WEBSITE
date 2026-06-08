import React, { useRef, useState } from 'react';
import TextWithToggle from '@/shared/components/TextWithToggle/TextWithToggle';
import { FOOTER_LINKS, NAV_ITEMS } from '@/shared/constants';
import { Link, useNavigate } from 'react-router-dom';
import { scrollToTop } from '@/shared/utils';

const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const navigate = useNavigate();

  const handleNavigation = (
    e: React.MouseEvent<HTMLAnchorElement> | React.MouseEvent<HTMLDivElement>,
    path: string
  ) => {
    e.preventDefault();
    closeButtonRef.current?.click();
    // scrollToTop();
    navigate(path);
  };

  return (
    <>
      {/* MENU CONTENT */}
      <div
        className={`fixed bottom-15 left-1/2 z-40 w-1/2 max-w-5xl -translate-x-1/2 overflow-auto no-scrollbar bg-black origin-bottom transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]
        ${
          isMenuOpen
            ? 'pointer-events-auto opacity-100 scale-y-100'
            : 'pointer-events-none opacity-0 scale-y-0'
        }
    `}
        style={{
          maxHeight: '85vh',
        }}
      >
        {/* SCROLLABLE CONTENT */}
        <div
          className="z-40 h-full overflow-y-auto p-6 md:p-9"
        >
          {/* TOP */}
          <div className="mb-8 items-center justify-between hidden md:flex">
            <h2 className="text-3xl font-black font-heading text-white">
              HRISHABRAJ
            </h2>

            <button className="bg-[#efefef] px-8 py-4 text-sm font-black uppercase text-black transition hover:scale-105">
              LET&apos;S TALK HOMES
            </button>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {NAV_ITEMS.map((item) => (
              <div
                key={item.title}
                className="group relative h-40 cursor-pointer overflow-hidden"
                onClick={(e) => handleNavigation(e, item.link)}
              >
                {/* IMAGE */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-cover opacity-70 transition-transform duration-500 group-hover:scale-110"
                />

                {/* OVERLAY */}
                <div className="absolute inset-0 bg-white/75 transition-colors duration-300 group-hover:bg-white/60" />

                {/* TEXT */}
                <div className="relative z-10 flex h-full items-center justify-center">
                  <h3 className="text-2xl lg:text-3xl font-black text-black font-heading">
                    {item.title}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* FOOTER LINKS */}
          <div className="mt-10">
            <h4 className="mb-5 text-3xl font-black uppercase font-heading text-white">
              Pages
            </h4>

            <div className="grid grid-cols-1 gap-y-5 md:grid-cols-3">
              {FOOTER_LINKS.map((item) => (
                <Link
                  to={item.link}
                  onClick={(e) => handleNavigation(e, item.link)}
                  key={item.label}
                  className="text-lg font-medium text-gray-300 transition-colors duration-300 hover:text-white hover:underline dm-sans"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* NAVBAR */}
      <div className="fixed bottom-0 z-50 flex h-15 w-full items-center justify-center bg-gray-200">
        <div className="flex h-full w-1/2 items-center justify-center bg-black px-8 sm:justify-between">
          <p className="hidden text-xl text-white sm:block font-heading">
            HRISHABRAJ
          </p>
          <TextWithToggle
            text="MENU"
            textClassName="text-white text-xl font-heading"
            onToggle={(state) => setIsMenuOpen(state)}
            ref={closeButtonRef}
          />
        </div>
      </div>
    </>
  );
};

export default NavBar;
