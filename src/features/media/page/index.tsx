import BeyondBlueprintSection from '@/features/media/components/BeyondBlueprintSection/BeyondBlueprintSection';
import HeadlinesSection from '@/features/media/components/HeadlinesSection/HeadlinesSection';
import MediaHeroSection from '@/features/media/components/MediaHeroSection/MediaHeroSection';
import MomentsThatMatterSection from '@/features/media/components/MomentsThatMatterSection/MomentsThatMatterSection';
import ScrollOverlayWrapper from '@/shared/components/ScrollOverlayWrapper/ScrollOverlayWrapper';
import StickyHeroWrapper from '@/shared/components/StickyHeroWrapper/StickyHeroWrapper';

const MediaPage = () => {
  return (
    <>
      <StickyHeroWrapper>
        <MediaHeroSection />
      </StickyHeroWrapper>
      <ScrollOverlayWrapper>
        <HeadlinesSection />
        <BeyondBlueprintSection />
        <MomentsThatMatterSection />
      </ScrollOverlayWrapper>
    </>
  );
};

export default MediaPage;
