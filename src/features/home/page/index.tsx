import React from 'react';

import HeroSection from '@/features/home/components/HeroSection/HeroSection';
import LegacySection from '@/features/home/components/LegacySection/LegacySection';
import WhyChooseUs from '@/features/home/components/WhyChooseUs/WhyChooseUs';
import LifestyleSection from '@/features/home/components/LifestyleSection/LifestyleSection';
import Testimonials from '@/features/home/components/Testimonials/Testimonials';
import FeaturedProjects from '@/features/home/components/FeaturedProjects/FeaturedProjects';
import StickyHeroWrapper from '@/shared/components/StickyHeroWrapper/StickyHeroWrapper';
import ScrollOverlayWrapper from '@/shared/components/ScrollOverlayWrapper/ScrollOverlayWrapper';
import { useLocation } from 'react-router-dom';

const HomePage: React.FC = () => {
  const { pathname } = useLocation();
  return (
    <>
      <StickyHeroWrapper
        videoSrc="/videos/HRR-2-desktop.mp4"
        mobileVideoSrc='/videos/HRR-2-mobile.mp4'
        scrollMultiplier={1}
        mobileScrollMultiplier={1}
        key={pathname}
      >
        <HeroSection />
      </StickyHeroWrapper>
      <ScrollOverlayWrapper>
        <LegacySection />
        <FeaturedProjects />
        <WhyChooseUs />
        <LifestyleSection />
        <Testimonials />
      </ScrollOverlayWrapper>
    </>
  );
};

export default HomePage;
