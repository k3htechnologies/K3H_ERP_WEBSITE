import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Download, MapPin } from 'lucide-react';
import Reveal from '@/shared/components/Reveal/Reveal';
import { useProjectDetailsContext } from '@/features/project-details/context/ProjectDetailsContext';

const sections = [
  {
    id: 'overview',
    label: 'Overview',
  },
  {
    id: 'gallery',
    label: 'Gallery',
  },
  {
    id: 'amenities',
    label: 'Amenities',
  },
  {
    id: 'floor-plans',
    label: 'Floor Plans',
  },
  {
    id: 'location',
    label: 'Location',
  },
  {
    id: 'faq',
    label: 'FAQ',
  },
];

export default function ProjectHero() {
  const { data } = useProjectDetailsContext();
  const [, setActiveSection] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) {
          setActiveSection(visible.target.id);
        }
      },
      {
        threshold: 0.4,
      }
    );
    sections.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (!section) return;
    section.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  };

  return (
    <>
      <section className="relative h-screen w-full overflow-hidden">
        {/* VIDEO BACKGROUND */}
        {/*
        <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
        >
            <source src="/videos/project.mp4" type="video/mp4" />
        </video>
        */}
        <img
          src={data?.ProjectPhotoURL}
          alt="Project"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {/* <div className="absolute inset-0 bg-black/55" /> */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/30 to-black/20" />
        <div className="relative flex mx-auto h-full w-[90%] items-center px-4">
          <div className="max-w-xl">
            <motion.h1
              // animate={{
              //   letterSpacing: ['0em', '0.04em', '0em'],
              // }}
              // transition={{
              //   duration: 5,
              //   repeat: Infinity,
              //   ease: 'easeInOut',
              // }}
              className="font-serif text-5xl md:text-7xl text-white"
            >
              {data?.ProjectName}
            </motion.h1>

            <Reveal delay={0.1}>
              <p className="mt-5 text-lg text-white/80 md:text-2xl">
                Where Luxury Meets Everyday Living
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="mt-8 flex items-center gap-3 text-white">
                <MapPin className="h-5 w-5" />
                <span className="text-lg">{data?.ProjectLocation}</span>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="mt-10 flex flex-wrap gap-5">
                <button className="border border-white/40 bg-white/10 px-8 py-4 text-sm uppercase tracking-[0.25em] text-white backdrop-blur-sm transition hover:border-primary hover:bg-primary">
                  Book a Site Visit
                </button>

                <button className="flex items-center gap-2 text-sm uppercase tracking-[0.25em] text-white transition hover:text-primary">
                  <Download size={16} />
                  Download Brochure
                </button>
              </div>
            </Reveal>
          </div>
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.9,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{
              delay: 0.5,
            }}
            className="absolute right-1 hidden lg:block"
          >
            <div
              className="w-56 rounded-[26px] p-5 text-center text-white"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,1)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div className="mx-auto mb-4 h-24 w-24 rounded-xl bg-white" />
              <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                RERA REGISTRATION NUMBER
              </p>
              <p className="mt-2 text-sm font-semibold">{data?.RERANumber}</p>
              {/* <p className="mt-1 text-xs text-white/60">CEREMONT</p> */}
            </div>
          </motion.div>
        </div>
      </section>
      <div className="sticky bottom-0 z-50 border-t border-white/10 bg-background-dark backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl justify-center overflow-x-auto">
          {sections.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className={`relative px-6 py-5 whitespace-nowrap text-sm transition  text-white/80 hover:text-white `}
            >
              {item.label}
              {/* <span
                className={`absolute bottom-2 left-1/2 h-0.5 -translate-x-1/2 bg-sky-400 transition-all ${
                  activeSection === item.id ? 'w-10' : 'w-0'
                }`}
              /> */}
            </button>
          ))}
        </div>
      </div>
    </>
  );
}
