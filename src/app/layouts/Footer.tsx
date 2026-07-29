import React from 'react';
import { Link } from 'react-router-dom';

import Container from '@/shared/components/Container/Container';
import Reveal from '@/shared/components/Reveal/Reveal';
import {
  APARTMENTS_LOC,
  FOOTER_LINKS,
  // SOCIAL_LINKS,
  TOPOLOGY,
} from '@/shared/constants';

const Footer: React.FC = () => {
  return (
    <>
      <footer>
        <Container className="w-full">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-6 xl:grid-cols-12">
            <div className="rounded-lg  p-6 xl:col-span-3 md:col-span-3 sm:col-span-2">
              <div className="max-w-xl">
                <Reveal>
                  <img
                    src="/Hrishabraj-logo-dark.svg"
                    alt="H.Rishabraj"
                    className="h-14 w-auto md:w-full md:h-28"
                  />
                </Reveal>

                <Reveal delay={0.1}>
                  <p className="mt-6 max-w-sm text-sm leading-relaxed text-about-dark text-montserrat">
                    <span className="font-bold">Coporate office</span> : 13th
                    Floor, H.Rishabraj Chambers, Road No.10, Daulat Nagar,
                    Borivali (East), Mumbai-66
                  </p>
                </Reveal>

                <Reveal delay={0.1}>
                  <p className="mt-2 max-w-sm text-sm leading-relaxed text-about-dark text-montserrat">
                    <span className="font-bold">Head Office</span> : 103, Jai
                    Trith, Road No.10, Daulat Nagar, Borivali (East), Mumbai-66
                  </p>
                </Reveal>

                <Reveal delay={0.2}>
                  <div className="mt-4 space-y-2">
                    <div className="flex gap-4 text-sm text-montserrat">
                      <span className="min-w-22.5 text-about-dark">
                        Telephone :
                      </span>
                      <a
                        href="tel:8989724545"
                        className="text-primary transition-opacity hover:opacity-70"
                      >
                        8989724545
                      </a>
                    </div>

                    <div className="flex gap-4 text-sm text-montserrat">
                      <span className="min-w-22.5 text-about-dark">Mail :</span>
                      <a
                        href="mailto:info@hrishabraj.com"
                        className="text-primary transition-opacity hover:opacity-70"
                      >
                        info@hrishabraj.com
                      </a>
                    </div>
                  </div>
                </Reveal>
              </div>
            </div>
            <div className="rounded-lg p-6 xl:col-span-2 md:col-span-2 sm:col-span-2">
              <Reveal delay={0.15}>
                <ul className="space-y-4 text-center md:text-left">
                  {FOOTER_LINKS.map((footerLink) => (
                    <li key={footerLink.label}>
                      <Link
                        to={footerLink.link}
                        className="text-montserrat text-sm font-semibold uppercase tracking-[0.15em] text-primary transition-all duration-300 hover:translate-x-1 hover:opacity-70"
                      >
                        {footerLink.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            {/* Locations */}
            <div className="rounded-lg p-6 xl:col-span-3 md:col-span-3 sm:col-span-2">
              <Reveal delay={0.1}>
                <h3 className="mb-4 font-heading text-lg uppercase tracking-[0.3em] font-bold text-primary">
                  Locations
                </h3>
              </Reveal>

              <Reveal delay={0.15}>
                <ul className="space-y-4 text-center md:text-left">
                  {APARTMENTS_LOC.map((loc) => (
                    <li key={loc}>
                      <p className="text-montserrat text-sm font-semibold uppercase tracking-[0.15em] text-primary transition-all duration-300 hover:translate-x-1 hover:opacity-70">
                        {loc}
                      </p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <div className="rounded-lg  p-6 xl:col-span-4 md:col-span-4 sm:col-span-2">
              <Reveal delay={0.1}>
                <h3 className="mb-4 font-heading text-lg uppercase tracking-[0.3em] font-bold text-primary">
                  Typology
                </h3>
              </Reveal>
              <Reveal delay={0.15}>
                <ul className="space-y-4 text-center md:text-left">
                  {TOPOLOGY.map((loc) => (
                    <li key={loc}>
                      <p className="text-montserrat text-sm font-semibold uppercase tracking-[0.15em] text-primary transition-all duration-300 hover:translate-x-1 hover:opacity-70">
                        {loc}
                      </p>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            {/* <div className="rounded-lg p-6 text-white xl:col-span-1 md:col-span-6 sm:col-span-2">
              <Reveal delay={0.1}>
                <h3 className="mb-4 font-heading text-lg uppercase tracking-[0.3em] font-bold text-primary">
                  Social
                </h3>
              </Reveal>
              <Reveal delay={0.2}>
                <ul className="space-y-4 text-center md:text-left">
                  {SOCIAL_LINKS.map((link) => (
                    <li key={link.label}>
                      <a
                        target="_blank"
                        href={link.url}
                        className="text-montserrat text-sm font-semibold uppercase tracking-[0.25em] text-primary transition-all duration-300 hover:translate-x-1 hover:opacity-70"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div> */}
          </div>
          {/* BOTTOM BAR */}
          <div className="mt-10 flex flex-col items-center justify-between gap-6 border-t border-primary/10 pt-8 md:flex-row">
            <p className="text-montserrat text-center text-xs font-medium uppercase tracking-[0.18em] text-primary">
              © 2026 H.RISHABRAJ DEVELOPER. ALL RIGHTS RESERVED.
            </p>

            <div className="flex items-center gap-5">
              <a
                href="https://www.instagram.com/accounts/login/?next=%2Fh.rishabrajdevelopers%2F&source=omni_redirect&hl=en"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-primary transition-all duration-300 hover:-translate-y-1 hover:opacity-70"
              >
                <svg
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M7.75 2C4.574 2 2 4.574 2 7.75v8.5C2 19.426 4.574 22 7.75 22h8.5C19.426 22 22 19.426 22 16.25v-8.5C22 4.574 19.426 2 16.25 2h-8.5Zm0 1.8h8.5a3.95 3.95 0 0 1 3.95 3.95v8.5a3.95 3.95 0 0 1-3.95 3.95h-8.5a3.95 3.95 0 0 1-3.95-3.95v-8.5A3.95 3.95 0 0 1 7.75 3.8Zm8.95 1.35a.95.95 0 1 0 0 1.9.95.95 0 0 0 0-1.9ZM12 6.5A5.5 5.5 0 1 0 17.5 12 5.506 5.506 0 0 0 12 6.5Zm0 1.8A3.7 3.7 0 1 1 8.3 12 3.704 3.704 0 0 1 12 8.3Z" />
                </svg>
              </a>
              <a
                href="https://www.facebook.com/H.RishabrajBuilders"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="text-primary transition-all duration-300 hover:-translate-y-1 hover:opacity-70"
              >
                <svg
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M13.5 22v-8h2.7l.4-3h-3.1V9.1c0-.9.3-1.5 1.6-1.5H17V4.9c-.4-.1-1.4-.2-2.6-.2-2.6 0-4.4 1.6-4.4 4.5V11H7v3h3v8h3.5Z" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/company/hrishabrajgroup/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="text-primary transition-all duration-300 hover:-translate-y-1 hover:opacity-70"
              >
                <svg
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M4.98 3.5A1.98 1.98 0 1 0 5 7.46a1.98 1.98 0 0 0-.02-3.96ZM3.5 8.75h3V20h-3V8.75Zm5.5 0h2.87v1.54h.04c.4-.76 1.38-1.56 2.84-1.56 3.03 0 3.59 2 3.59 4.59V20h-3v-5.67c0-1.35-.02-3.08-1.88-3.08-1.88 0-2.17 1.47-2.17 2.98V20h-3V8.75Z" />
                </svg>
              </a>
              <a
                href="https://www.youtube.com/@h.rishabrajgroup6514"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                className="text-primary transition-all duration-300 hover:-translate-y-1 hover:opacity-70"
              >
                <svg
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M23.498 6.186a2.974 2.974 0 0 0-2.093-2.105C19.548 3.5 12 3.5 12 3.5s-7.548 0-9.405.581A2.974 2.974 0 0 0 .502 6.186C0 8.06 0 12 0 12s0 3.94.502 5.814a2.974 2.974 0 0 0 2.093 2.105C4.452 20.5 12 20.5 12 20.5s7.548 0 9.405-.581a2.974 2.974 0 0 0 2.093-2.105C24 15.94 24 12 24 12s0-3.94-.502-5.814ZM9.6 15.568V8.432L15.818 12 9.6 15.568Z" />
                </svg>
              </a>
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
