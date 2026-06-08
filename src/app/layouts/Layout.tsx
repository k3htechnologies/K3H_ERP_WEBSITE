import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from '@/app/layouts/NavBar';
import Footer from '@/app/layouts/Footer';

const Layout: React.FC = () => {
  return (
    <>
        <NavBar />
        <Outlet />
        <Footer />
    </>
  );
};

export default Layout;
