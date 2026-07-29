import SectionContainer from '@/shared/components/Container/SectionContainer';
import { useProjectsContext } from '@/features/projects/context/ProjectsContextProvider';
import { motion } from 'framer-motion';
// import { useNavigate } from 'react-router-dom';

const SignatureDevelopmentSection = () => {
  // const navigate = useNavigate();
  const { data, loading, error } = useProjectsContext();

  const signatureProjects = (data as any)?.signatureDevelopments ?? [];

  return (
    <SectionContainer
      heading={
        <>
          <span className="text-primary">Signature </span>
          Developments
        </>
      }
    >
      {loading && (
        <div className="relative mt-10 h-100 w-full overflow-hidden rounded-2xl bg-neutral-800 lg:h-150">
          <div className="absolute inset-0 animate-pulse bg-neutral-700/40" />
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-linear-to-r from-transparent via-white/10 to-transparent" />
        </div>
      )}
      {/* {!loading && error && (
        <div className="mt-10 flex h-80 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/5">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white">
              Failed to load projects
            </h3>
            <p className="mt-2 text-sm text-white/60">
              Please try again later.
            </p>
          </div>
        </div>
      )} */}
      {!loading && !error && signatureProjects.length === 0 && (
        <div className="mt-10 flex h-80 items-center justify-center rounded-2xl border border-white/10 bg-[#1B1B1B]">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-white">
              No Signature Developments
            </h3>
            <p className="mt-2 text-sm text-white/60">
              There are no projects matching the selected filters.
            </p>
          </div>
        </div>
      )}
      {
        // !loading && !error && signatureProjects.length > 0 && (
        true && (
          // <div className="relative mt-10 h-100 w-full rounded-2xl lg:h-150">
          //   <img
          //     src="/about-hero-background.jpg"
          //     alt="Project Background"
          //     className="absolute inset-0 h-full w-full rounded-2xl object-cover"
          //   />
          //   <div className="absolute inset-0 rounded-2xl bg-linear-to-b from-black/70 via-black/30 to-black/60" />
          //   <div className="absolute inset-0 rounded-2xl bg-black/20" />
          // </div>
          <div className="relative mt-10 h-100 overflow-hidden rounded-3xl lg:h-150">
            {/* Background */}
            <img
              src="/Avyanna.jpeg"
              alt="Project Background"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-linear-to-b from-black/40 via-black/20 to-black/70" />
            <motion.div
              initial={{
                opacity: 0,
                x: -60,
                y: 40,
                rotateY: -35,
                rotateZ: -6,
                scale: 0.9,
                filter: 'blur(10px)',
              }}
              whileInView={{
                opacity: 1,
                x: 0,
                y: 0,
                rotateY: 0,
                rotateZ: 0,
                scale: 1,
                filter: 'blur(0px)',
              }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 1,
                ease: [0.22, 1, 0.36, 1],
              }}
              style={{
                transformStyle: 'preserve-3d',
                transformPerspective: 1200,
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                backdropFilter: 'blur(35px)',
              }}
              className="absolute bottom-8 left-8 z-20 w-85 rounded-[28px] p-7 lg:bottom-10 lg:left-10"
            >
              <div className="flex gap-2">
                <span className="text-montserrat rounded-full border border-primary px-3 py-1 text-[10px] uppercase tracking-wider text-primary">
                  Ongoing Project
                </span>

                <span className="text-montserrat rounded-full bg-white/10 px-3 py-1 text-[10px] uppercase tracking-wider text-white">
                  Elite Series
                </span>
              </div>

              <h3 className="text-cormorant-garamond mt-6 text-3xl text-white">
                Rishabraj Avyaana
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-white/70 text-montserrat">
                Premium 1, 2 &amp; 3 BHK Residences in the heart of the city.
              </p>

              <div className="mt-8 space-y-3 text-sm text-white/70 text-montserrat">
                <div>📍 Goregaon West • Possession Dec 2029</div>

                <div className="flex gap-6">
                  <span>🏠 1, 2 &amp; 3 BHK</span>
                  <span>✨ 25+ Amenities</span>
                </div>
              </div>

              {/* <motion.button
                whileHover={{
                  x: 5,
                }}
                className="mt-8 text-sm font-medium text-primary text-montserrat"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate('/project/Rishabraj Avyaana', {
                    state: {
                      projectId: 1,
                    },
                  });
                }}
              >
                Explore Project →
              </motion.button> */}
            </motion.div>
          </div>
        )
      }
    </SectionContainer>
  );
};

export default SignatureDevelopmentSection;
