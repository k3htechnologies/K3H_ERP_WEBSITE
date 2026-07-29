import React from 'react';

import HeroSection from '@/features/home/components/HeroSection/HeroSection';
import LegacySection from '@/features/home/components/LegacySection/LegacySection';
import WhyChooseUs from '@/features/home/components/WhyChooseUs/WhyChooseUs';
import LifestyleSection from '@/features/home/components/LifestyleSection/LifestyleSection';
import Testimonials from '@/features/home/components/Testimonials/Testimonials';
import FeaturedProjects from '@/features/home/components/FeaturedProjects/FeaturedProjects';

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <LegacySection />
      <FeaturedProjects />
      <WhyChooseUs />
      <LifestyleSection />
      <Testimonials />
    </>
  );
};

export default HomePage;
