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
      ptClassName="pt-0"
      pbClassName='pb-6'
    >
      <Reveal delay={0.2}>
        <p className="mx-auto mt-10 max-w-3xl text-center text-base leading-relaxed text-primary-sub">
          Our achievements reflect our commitment to quality, disciplined execution, and
          continuous improvement. <br />Every milestone reinforces our pursuit of excellence and
          our responsibility to deliver developments that create lasting value for the people and
          communities we serve.
        </p>
      </Reveal>
      {/* CAROUSLE */}
      <ImageSlider3D images={AWARDS} />
    </SectionContainer>
  );
};

export default AchievementSection;
