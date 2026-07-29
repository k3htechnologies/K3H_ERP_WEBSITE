import BeyondBlueprintSection from '@/features/media/components/BeyondBlueprintSection/BeyondBlueprintSection';
import HeadlinesSection from '@/features/media/components/HeadlinesSection/HeadlinesSection';
import MediaHeroSection from '@/features/media/components/MediaHeroSection/MediaHeroSection';
import MomentsThatMatterSection from '@/features/media/components/MomentsThatMatterSection/MomentsThatMatterSection';

const MediaPage = () => {
  return (
    <>
      <MediaHeroSection />
      <HeadlinesSection />
      <BeyondBlueprintSection />
      <MomentsThatMatterSection />
    </>
  );
};

export default MediaPage;
