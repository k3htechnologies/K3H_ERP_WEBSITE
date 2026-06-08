// components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white px-8 py-20 md:px-20 lg:px-32 border-t">
      <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
        {/* Left Section */}
        <div className="space-y-14 lg:pl-60">
          {/* Contact */}
          <div className="space-y-2">
            <p className="text-xl text-black/60 mb-1">Have a Question?</p>

            <a
              href="mailto:admin@hrishabraj.com"
              className="text-xl text-black hover:underline"
            >
              admin@hrishabraj.com
            </a>
          </div>

          {/* Business */}
          <div className="space-y-2">
            <p className="text-xl text-black/60 mb-1">Business Inquiries</p>

            <a href="#" className="text-xl underline">
              Let’s Connect!
            </a>
          </div>

          {/* Social Links */}
          <div className="flex flex-col gap-5 text-xl">
            <a href="#" className="hover:underline">
              Facebook
            </a>
            <a href="#" className="hover:underline">
              Instagram
            </a>
            <a href="#" className="hover:underline">
              LinkedIn
            </a>
            <a href="#" className="hover:underline">
              Twitter
            </a>
          </div>

          {/* Copyright */}
          <p className="pt-6 text-xl">© 2025 — All rights reserved</p>
        </div>

        {/* Right Section */}
        <div className="space-y-16 lg:pl-40">
          {/* Navigation */}
          <div className="grid grid-cols-2 gap-10">
            <div className="flex flex-col gap-6 text-xl">
              <a href="#" className="hover:underline">
                Projects
              </a>
              <a href="#" className="hover:underline">
                Blog
              </a>
              <a href="#" className="hover:underline">
                About Us
              </a>
              <a href="#" className="hover:underline">
                Teams
              </a>
            </div>

            <div className="flex flex-col gap-6 text-xl">
              <a href="#" className="hover:underline">
                Contact Us
              </a>

              <a href="#" className="hover:underline">
                Privacy Policy
              </a>
              <a href="#" className="hover:underline">
                Terms Condition
              </a>
              <a href="#" className="hover:underline">
                404
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div className="space-y-5">
            <h3 className="text-xl">Join Our Newsletter</h3>

            <div className="flex flex-col gap-4 sm:flex-row">
              <input
                type="email"
                placeholder="name@email.com"
                className="h-12 flex-1 border border-black bg-gray-100 px-8 text-xl outline-none placeholder:text-black placeholder:text-lg"
              />

              <button className="h-12 min-w-45 bg-black px-8 text-lg font-bold uppercase tracking-tighter text-white transition hover:opacity-90">
                Subscribe
              </button>
            </div>

            <p className="text-lg">Enter your email for business updates</p>
          </div>

          {/* Bottom Text */}
          <p className="pt-10 text-xl">Crafted by Coco Design & Team.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
