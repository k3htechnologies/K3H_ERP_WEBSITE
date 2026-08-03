import React from 'react';
import CareerHero from '@/features/career/components/CareerHeroSection/CareerHeroSection';
import VisionSection from '@/features/career/components/VisionSection/VisionSection';
import OpeningsSection from '@/features/career/components/OpeningsSection/OpeningsSection';
import PerspectiveGrid from '@/features/career/components/PerspectiveGrid/PerspectiveGrid';
import StickyHeroWrapper from '@/shared/components/StickyHeroWrapper/StickyHeroWrapper';
import ScrollOverlayWrapper from '@/shared/components/ScrollOverlayWrapper/ScrollOverlayWrapper';

const CareerPage: React.FC = () => {
  return (
    <>
      <StickyHeroWrapper>
        <CareerHero />
      </StickyHeroWrapper>
      <ScrollOverlayWrapper>
        <VisionSection />
        <OpeningsSection />
        <PerspectiveGrid />
      </ScrollOverlayWrapper>
    </>
  );
};

export default CareerPage;
