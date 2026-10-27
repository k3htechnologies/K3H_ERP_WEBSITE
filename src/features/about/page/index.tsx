import React from 'react';

import AboutHeroSection from '@/features/about/components/AboutHeroSection/AboutHeroSection';
import CompanyOverviewSection from '@/features/about/components/CompanyOverviewSection/CompanyOverviewSection';
import LeadershipSection from '@/features/about/components/LeadershipSection/LeadershipSection';
import CorePrinciplesSection from '@/features/about/components/CorePrinciplesSection/CorePrinciplesSection';
import DifferenceSection from '@/features/about/components/DifferenceSection/DifferenceSection';
import AchievementSection from '@/features/about/components/AchievementSection/AchievementSection';
import JourneyTimelineSectionNew from '@/features/about/components/JourneyTimelineSection/JourneyTimelineSectionNew';
import SectionContainer from '@/shared/components/Container/SectionContainer';
import EnquirySection from '@/shared/components/EnquirySection/EnquirySection';
import StickyHeroWrapper from '@/shared/components/StickyHeroWrapper/StickyHeroWrapper';
import ScrollOverlayWrapper from '@/shared/components/ScrollOverlayWrapper/ScrollOverlayWrapper';
import { useLocation } from 'react-router-dom';

const AboutUsPage: React.FC = () => {
  const { pathname } = useLocation();
  return (
    <>
      <StickyHeroWrapper
        videoSrc="/videos/OurStory-desktop.mp4"
        mobileVideoSrc="/videos/OurStory-mobile.mp4"
        scrollMultiplier={1}
        mobileScrollMultiplier={1}
        key={pathname}
      >
        <AboutHeroSection />
      </StickyHeroWrapper>
      <ScrollOverlayWrapper>
        <CompanyOverviewSection />
        <JourneyTimelineSectionNew />
        <LeadershipSection />
        <CorePrinciplesSection />
        <DifferenceSection />
        <AchievementSection />
        <SectionContainer ptClassName="pt-0" pbClassName="pb-0">
          <EnquirySection />
        </SectionContainer>
      </ScrollOverlayWrapper>
    </>
  );
};

export default AboutUsPage;
