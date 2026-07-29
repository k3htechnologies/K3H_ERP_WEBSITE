import ElevatedStandardSection from '@/features/lifestyle/components/ElevatedStandardSection/ElevatedStandardSection';
import GreenImpactSection from '@/features/lifestyle/components/GreenImpactSection/GreenImpactSection';
import IntelligentHabitatsSection from '@/features/lifestyle/components/IntelligentHabitatsSection/IntelligentHabitatsSection';
import LifestyleGallerySection from '@/features/lifestyle/components/LifestyleGallerySection/LifestyleGallerySection';
import LifeStyleHeroSection from '@/features/lifestyle/components/LifeStyleHeroSection/LifeStyleHeroSection';
import OneFamilySection from '@/features/lifestyle/components/OneFamilySection/OneFamilySection';
import TimedExperiencesSection from '@/features/lifestyle/components/TimedExperiencesSection/TimedExperiencesSection';

const LifeStylePage = () => {
  return (
    <>
      <LifeStyleHeroSection />
      <IntelligentHabitatsSection />
      <ElevatedStandardSection />
      <TimedExperiencesSection />
      <OneFamilySection />
      <GreenImpactSection />
      <LifestyleGallerySection />
    </>
  );
};

export default LifeStylePage;
