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

const AboutUsPage: React.FC = () => {
  return (
    <>
      <AboutHeroSection />
      <CompanyOverviewSection />
      <JourneyTimelineSectionNew />
      <LeadershipSection />
      <CorePrinciplesSection />
      <DifferenceSection />
      <AchievementSection />
      <SectionContainer>
        <EnquirySection />
      </SectionContainer>
    </>
  );
};

export default AboutUsPage;
