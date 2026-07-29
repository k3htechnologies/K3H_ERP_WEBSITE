import React from 'react';

import ProjectHero from '@/features/projects/components/ProjectHero/ProjectHero';
import FilterSection from '@/features/projects/components/FilterSection/FilterSection';
import SignatureDevelopmentSection from '@/features/projects/components/SignatureDevelopments/SignatureDevelopments';
import CuratedPortfolioSection from '@/features/projects/components/CuratedPortfolio/CuratedPortfolio';
import LocationsSections from '@/features/projects/components/LocationsSection/LocationsSection';
import ProjectCTA from '@/shared/components/ProjectCTA/ProjectCTA';
import { ProjectsProvider } from '@/features/projects/context/ProjectsContextProvider';

const ProjectsPage: React.FC = () => {
  return (
    <>
      <ProjectHero />
      <ProjectsProvider>
        <FilterSection />
        <SignatureDevelopmentSection />
        <CuratedPortfolioSection />
        <LocationsSections />
      </ProjectsProvider>
      <ProjectCTA />
    </>
  );
};

export default ProjectsPage;
