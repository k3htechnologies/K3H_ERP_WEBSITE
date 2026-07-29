import Reveal from '@/shared/components/Reveal/Reveal';
import { AWARDS } from '@/features/about/constants/about.constant';
import ImageSlider3D from '@/shared/components/ImageSlider3D/ImageSlider3D';
import SectionContainer from '@/shared/components/Container/SectionContainer';

const AchievementSection = () => {
  return (
    <SectionContainer
      bgClassName="bg-white"
      heading="Awards & Recognition"
      footerHeading="Achievements"
    >
      <Reveal delay={0.2}>
        <p className="mx-auto mt-10 max-w-3xl text-center text-base leading-relaxed text-primary-sub">
          We consistently deliver projects ahead of schedule, surpassing
          expectations and <br /> actively contributing to our vision of
          “Energizing Happiness”.
        </p>
      </Reveal>
      {/* CAROUSLE */}
      <ImageSlider3D images={AWARDS} />
    </SectionContainer>
  );
};

export default AchievementSection;
