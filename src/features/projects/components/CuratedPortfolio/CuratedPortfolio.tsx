import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

import SectionContainer from '@/shared/components/Container/SectionContainer';
import { useProjectsContext } from '@/features/projects/context/ProjectsContextProvider';
import Reveal from '@/shared/components/Reveal/Reveal';

export const PROJECTS_RESPONSE = {
  signatureDevelopments: [
    {
      id: 1,
      title: 'Ceramont',
      location: 'Borivali West',
      image:
        'https://images.unsplash.com/photo-1460317442991-0ec209397118?w=1600&auto=format&fit=crop&q=80',
    },
  ],

  curatedPortfolio: [
    {
      id: 1,
      title: 'Trident',
      image: '/curated/Trident.jpg',
      location: 'JUHU • POSSESSION AUGUST 2028',
      configuration: '2, 3 & 4 BHK Luxury Residences',
      status: 'ONGOING',
      featured: true,
    },
    {
      id: 2,
      title: 'Ceramont',
      image: '/curated/Ceramont.jpg',
      location: 'MALAD WEST • POSSESSION DECEMBER 2031',
      configuration: '2 & 3 BHK Luxury Residences',
      status: 'ONGOING',
      featured: false,
    },
    {
      id: 3,
      title: 'Astral',
      image: '/curated/Astral.jpg',
      location: 'BORIVALI WEST • POSSESSION AUGUST 2029',
      configuration: '2 & 3 BHK Luxury Residences',
      status: 'ONGOING',
      featured: false,
    },
    {
      id: 4,
      title: 'Forest Front',
      image: '/curated/Forest.jpg',
      location: 'BORIVALI EAST • POSSESSION DECEMBER 2028',
      configuration: '1, 2 & 3 BHK Luxury Residences',
      status: 'ONGOING',
      featured: true,
    },
  ],
};

const CuratedPortfolioSection = () => {
  const { loading } = useProjectsContext();

  //   const projects = (data as any)?.curatedPortfolio ?? [];
  const projects = PROJECTS_RESPONSE.curatedPortfolio;

  return (
    <>
      <SectionContainer
        bgClassName="bg-background-dark"
        headingColorClass="text-white"
        heading={
          <>
            Curated <span className="text-primary">Portfolio</span>
          </>
        }
        sideDescription={
          <span className="text-white">
            Every home tells a story. These are the voices behind our legacy of
            trust.
          </span>
        }
      >
        {loading && (
          <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className={`overflow-hidden rounded-2xl bg-[#394550] animate-pulse ${
                  index === 0 || index === 3
                    ? 'md:col-span-2 h-107.5'
                    : 'h-107.5'
                }`}
              />
            ))}
          </div>
        )}
        {/* {error && (
          <div className="mt-10 flex h-80 items-center justify-center rounded-2xl border border-white/10 bg-[#394550]">
            <p className="text-white/70">Failed to load projects.</p>
          </div>
        )} */}
        {projects && projects.length ? (
          <div className="mt-10 space-y-6">
            <div className="grid gap-6 lg:grid-cols-[7fr_3fr]">
              {[projects[0], projects[1]].map((project) => (
                <ProjectCard key={project.id} project={project} delay={0.02} />
              ))}
            </div>
            <div className="grid gap-6 lg:grid-cols-[3fr_7fr]">
              {[projects[2], projects[3]].map((project) => (
                <ProjectCard key={project.id} project={project} delay={0.08} />
              ))}
            </div>
          </div>
        ) : (
          <div className="mt-10 flex h-80 items-center justify-center rounded-2xl border border-white/10 bg-[#394550]">
            <p className="text-white/70">No projects found.</p>
          </div>
        )}
      </SectionContainer>
    </>
  );
};

export default CuratedPortfolioSection;

interface ProjectCardProps {
  project: any;
  delay: number;
}

function ProjectCard({ project, delay }: ProjectCardProps) {
  return (
    <Reveal delay={delay}>
      <motion.article
        whileHover="hover"
        initial="rest"
        animate="rest"
        className="group overflow-hidden rounded-2xl"
      >
        <div className="relative h-120 overflow-hidden">
          <motion.img
            variants={{
              rest: {
                scale: 1,
              },
              hover: {
                scale: 1.06,
              },
            }}
            transition={{ duration: 0.45 }}
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
          />

          <span
            className="text-montserrat absolute left-4 top-4 rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-white"
            style={{
              background:
                project.status === 'ONGOING'
                  ? 'rgba(9,120,37,.9)'
                  : 'rgba(19,91,236,.9)',
            }}
          >
            {project.status}
          </span>
        </div>

        <div
          className="flex items-end justify-between p-6"
          style={{
            background:
              'linear-gradient(268.38deg, rgba(255,255,255,0.35) 2.49%, rgba(255,255,255,0) 45.09%, rgba(255,255,255,0.1225) 96.73%)',
          }}
        >
          <div>
            <h3 className="text-cormorant-garamond text-2xl text-white">
              {project.title}
            </h3>

            <p className="text-montserrat mt-3 text-xs uppercase tracking-[0.18em] text-white/70">
              {project.location}
            </p>

            <p className="text-montserrat mt-5 text-sm text-white/60">
              {project.configuration}
            </p>
          </div>

          <motion.div
            variants={{
              rest: { x: 0 },
              hover: { x: 4 },
            }}
          >
            <ArrowUpRight size={30} className="text-primary" />
          </motion.div>
        </div>
      </motion.article>
    </Reveal>
  );
}
