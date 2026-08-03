import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Footer from '@/app/layouts/Footer';
import Navbar from '@/app/layouts/NavBar';

const Layout: React.FC = () => {
  const { pathname } = useLocation();

  const isLightTheme = [
    '/home',
    '/contact',
    '/login',
    '/application-form',
    '/jobSearch',
  ].some((route) => pathname.startsWith(route));
  return (
    <>
      <Navbar vanish theme={isLightTheme ? 'light' : 'dark'} />
      <div className="max-h-full max-w-full bg-white">
        <Outlet />
        <div className="relative z-10 bg-white">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Layout;
