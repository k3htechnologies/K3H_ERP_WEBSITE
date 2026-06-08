import React from 'react';
import { animateRoute } from '@/shared/components/AnimatedPage/AnimatePage';
import CareerHero from '@/features/career/components/CareerHeroSection/CareerHeroSection';
import VisionSection from '@/features/career/components/VisionSection/VisionSection';
import OpeningsSection from '@/features/career/components/OpeningsSection/OpeningsSection';
import PerspectiveGrid from '@/features/career/components/PerspectiveGrid/PerspectiveGrid';
import ContactSection from '@/features/career/components/ContactSection/ContactSection';

const CareerPage: React.FC = () => {
  return (
    <>
      <CareerHero />
      <VisionSection />
      <OpeningsSection />
      <PerspectiveGrid />
      <ContactSection />
    </>
  );
};

// export default animateRoute(CareerPage);
export default CareerPage;
