import { motion, AnimatePresence } from 'framer-motion';
import { Play } from 'lucide-react';

import Reveal from '@/shared/components/Reveal/Reveal';
import SectionContainer from '@/shared/components/Container/SectionContainer';
import { useState } from 'react';
import {
  GALLERY_IMAGES,
  gallerycontainerVariants,
  galleryimageHoverVariants,
  galleryitemVariants,
  galleryoverlayVariants,
  gallerypageVariants,
  galleryplayButtonVariants,
} from '@/features/lifestyle/constants/lifestyle.constants';

const LifestyleGallerySection = () => {
  type GalleryItem = (typeof GALLERY_IMAGES)[number];

  const [selectedVideo, setSelectedVideo] = useState<GalleryItem | null>(null);
  return (
    <SectionContainer
      bgClassName="bg-background-dark"
      heading={
        <>
          <span className="text-primary">Lifestyle</span>{' '}
          <span className="text-white">Gallery</span>
        </>
      }
      sideDescription={
        <span className="text-white/80 uppercase">
          Snapshots of a life lived in full color.
        </span>
      }
    >
      <Reveal>
        <AnimatePresence mode="wait">
          {selectedVideo ? (
            <motion.div
              key="video"
              variants={gallerypageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="mt-14"
            >
              <div className=" relative mt-14 flex h-105 items-center justify-center overflow-hidden rounded-4xl bg-black shadow-2xl sm:h-100 lg:h-125 xl:h-150">
                <video
                  src={selectedVideo.video}
                  controls
                  autoPlay
                  loop
                  playsInline
                  className="max-h-full max-w-full object-contain"
                />
                <button
                  onClick={() => setSelectedVideo(null)}
                  className=" absolute left-6 top-6 rounded-full bg-black/60 px-5 py-3 text-sm font-medium text-white backdrop-blur-xl transition hover:bg-primary"
                >
                  ← Back to Gallery
                </button>
                <div className="absolute bottom-8 left-8">
                  <h3 className="text-3xl font-semibold text-white">
                    {selectedVideo.title}
                  </h3>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="gallery"
              variants={gallerypageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <motion.div
                variants={gallerycontainerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: true,
                  amount: 0.15,
                }}
                className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
              >
                {GALLERY_IMAGES.map((item, index) => (
                  <motion.div
                    key={item.id}
                    variants={galleryitemVariants}
                    initial="rest"
                    animate="rest"
                    whileHover="hover"
                    className="group relative overflow-hidden rounded-2xl"
                  >
                    <div className="aspect-video overflow-hidden">
                      <motion.img
                        variants={galleryimageHoverVariants}
                        src={item.image}
                        alt={item.title}
                        loading={index > 2 ? 'lazy' : 'eager'}
                        className="h-full w-full object-cover"
                      />
                    </div>

                    {/* Overlay */}
                    <motion.div
                      variants={galleryoverlayVariants}
                      className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent"
                    />

                    {/* Glass Play Button */}
                    <motion.button
                      onClick={() => setSelectedVideo(item)}
                      variants={galleryplayButtonVariants}
                      whileTap={{
                        scale: 0.95,
                      }}
                      className=" absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 items-center gap-3 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-white shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-xl"
                    >
                      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
                        <Play size={16} fill="currentColor" />
                      </span>
                      <span className="whitespace-nowrap text-base font-medium">
                        {item.title}
                      </span>
                    </motion.button>
                    {/* Border */}
                    <div className="pointer-events-none absolute inset-0 rounded-2xl border border-white/0 transition-all duration-300 group-hover:border-white/20" />
                    {/* Shine */}
                    <div className="absolute -left-full top-0 h-full w-1/2 -skew-x-12 bg-white/10 blur-xl transition-all duration-1000 group-hover:left-[140%]" />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </Reveal>
    </SectionContainer>
  );
};

export default LifestyleGallerySection;
