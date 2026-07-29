import { useNavigationState } from '@/shared/hooks/useNavigationState';
import AmenitiesSection from '@/features/project-details/components/AmenitiesSection/AmenitiesSection';
import FAQSection from '@/features/project-details/components/FAQSection/FAQSection';
import FloorPlanSection from '@/features/project-details/components/FloorPlanSection/FloorPlanSection';
import GallerySection from '@/features/project-details/components/GallerySection/GallerySection';
import ProjectHero from '@/features/project-details/components/ProjectHero/ProjectHero';
import ProjectHighlightsSection from '@/features/project-details/components/ProjectHighlightsSection/ProjectHighlightsSection';
import ProjectOverviewSection from '@/features/project-details/components/ProjectOverviewSection/ProjectOverviewSection';
import LocationSection from '@/features/project-details/components/LocationSection/LocationSection';
import ProjectCTA from '@/shared/components/ProjectCTA/ProjectCTA';
import { ProjectDetailsProvider } from '@/features/project-details/context/ProjectDetailsContext';

const ProjectDetails = () => {
  const { projectId } = useNavigationState<{ projectId: string }>() ?? {};
  if (!projectId) {
    return null;
  }
  return (
    <ProjectDetailsProvider projectId={projectId}>
      <ProjectHero />
      <ProjectOverviewSection />
      <ProjectHighlightsSection />
      <GallerySection />
      <AmenitiesSection />
      <FloorPlanSection />
      <LocationSection />
      <FAQSection />
      <ProjectCTA />
    </ProjectDetailsProvider>
  );
};

export default ProjectDetails;
