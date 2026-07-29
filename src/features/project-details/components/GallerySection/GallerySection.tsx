import SectionContainer from '@/shared/components/Container/SectionContainer';
import Reveal from '@/shared/components/Reveal/Reveal';
import TiltedCard from '@/shared/components/TiltedCard/TiltedCard';

const GALLERY_IMAGES = {
  exterior: '/project/gallery/exterior.png',
  kitchen: '/project/gallery/kitchen.png',
  bedroom: '/project/gallery/bedroom.png',
  gym: '/project/gallery/gym.png',
};

export default function GallerySection() {
  return (
    <SectionContainer heading="Gallery">
      <section id="gallery">
        <Reveal delay={0.15}>
          <div className="grid gap-5 lg:grid-cols-[1.05fr_1fr] mt-16">
            <div>
              <TiltedCard
                imageSrc={GALLERY_IMAGES.exterior}
                altText="Project Exterior"
                containerHeight="100%"
                containerWidth="100%"
                imageHeight="100%"
                imageWidth="100%"
                scaleOnHover={1.02}
                rotateAmplitude={2}
                showMobileWarning={false}
                // showTooltip
              />
            </div>
            <div className="grid gap-5">
              <div className="grid grid-cols-2 gap-5">
                <TiltedCard
                  imageSrc={GALLERY_IMAGES.kitchen}
                  altText="Kitchen"
                  containerHeight="260px"
                  containerWidth="100%"
                  imageHeight="260px"
                  imageWidth="100%"
                  scaleOnHover={1.02}
                  rotateAmplitude={2}
                  showMobileWarning={false}
                  // showTooltip
                />
                <TiltedCard
                  imageSrc={GALLERY_IMAGES.bedroom}
                  altText="Bedroom"
                  containerHeight="260px"
                  containerWidth="100%"
                  imageHeight="260px"
                  imageWidth="100%"
                  scaleOnHover={1.02}
                  rotateAmplitude={2}
                  showMobileWarning={false}
                  // showTooltip
                />
              </div>
              <TiltedCard
                imageSrc={GALLERY_IMAGES.gym}
                altText="Gym"
                containerHeight="420px"
                containerWidth="100%"
                imageHeight="420px"
                imageWidth="100%"
                scaleOnHover={1.02}
                rotateAmplitude={2}
                showMobileWarning={false}
                // showTooltip
              />
            </div>
          </div>
        </Reveal>
      </section>
    </SectionContainer>
  );
}
