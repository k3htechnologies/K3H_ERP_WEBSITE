import React from 'react';

import ProjectHero from '@/features/projects/components/ProjectHero/ProjectHero';
import FilterSection from '@/features/projects/components/FilterSection/FilterSection';
import SignatureDevelopmentSection from '@/features/projects/components/SignatureDevelopments/SignatureDevelopments';
import CuratedPortfolioSection from '@/features/projects/components/CuratedPortfolio/CuratedPortfolio';
import LocationsSections from '@/features/projects/components/LocationsSection/LocationsSection';
import ProjectCTA from '@/shared/components/ProjectCTA/ProjectCTA';
import { ProjectsProvider } from '@/features/projects/context/ProjectsContextProvider';
import StickyHeroWrapper from '@/shared/components/StickyHeroWrapper/StickyHeroWrapper';
import ScrollOverlayWrapper from '@/shared/components/ScrollOverlayWrapper/ScrollOverlayWrapper';

const ProjectsPage: React.FC = () => {
  return (
    <>
      <StickyHeroWrapper>
        <ProjectHero />
      </StickyHeroWrapper>
      <ScrollOverlayWrapper>
        <ProjectsProvider>
          <FilterSection />
          <SignatureDevelopmentSection />
          <CuratedPortfolioSection />
          <LocationsSections />
        </ProjectsProvider>
        <ProjectCTA />
      </ScrollOverlayWrapper>
    </>
  );
};

export default ProjectsPage;
