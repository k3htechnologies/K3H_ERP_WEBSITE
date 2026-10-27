import { ROUTES } from '@/app/router/routePaths';
import Reveal from '@/shared/components/Reveal/Reveal';
import { useNavigate } from 'react-router-dom';

const STATS = [
  {
    value: '15+',
    label: 'Years',
  },
  {
    value: '75+',
    label: 'Projects',
  },
  {
    value: '5K+',
    label: 'Families',
  },
];

export default function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="relative h-screen overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-linear-to-t from-white via-white/5 to-white/0" />
        {/* <div className="absolute inset-0 bg-linear-to-b from-black via-black/5 to-black/0" /> */}
      </div>
      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col px-6">
        <div className="h-20 shrink-0" />
        <div className="flex flex-1 flex-col justify-center items-center">
        </div>
        <Reveal>
          <div className="mb-12 flex items-end justify-between gap-10">
            <div>
              <h2 className="text-3xl md:text-4xl md:leading-tight text-black text-cormorant-garamond font-extrabold">
                Shaping Mumbai's&nbsp;
                {/* <br /> */}
                Finest Landmarks.
              </h2>
              <div className="mt-4 flex items-center gap-6">
                <button
                  className="border border-black/30 bg-black/10 px-8 py-3 text-sm font-medium tracking-[0.15em] text-black backdrop-blur-md transition-all duration-300 hover:bg-primary hover:text-slate-900"
                  onClick={() => {
                    navigate(`/${ROUTES.PROJECTS}`);
                  }}
                >
                  VIEW SIGNATURE PROJECTS
                </button>
                <button
                  className="text-sm uppercase tracking-[0.3em] text-black underline underline-offset-4"
                  onClick={() => {
                    const section = document.getElementById('testimonials');
                    if (!section) return;
                    section.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                  }}
                >
                  View Testimonials
                </button>
              </div>
            </div>
            <div
              className="rounded-2xl p-0.5"
              style={{
                background:
                  'linear-gradient(147.91deg, #FFFFFF 9.57%, rgba(255,255,255,0) 56.98%, rgba(255,255,255,0.77) 97.79%)',
              }}
            >
              <div
                className="rounded-[14px]"
                style={{
                  background:
                    'linear-gradient(181.35deg, rgba(255,255,255,0.5) 1.15%, rgba(255,255,255,0) 98.91%)',
                  backdropFilter: 'blur(70px)',
                  WebkitBackdropFilter: 'blur(70px)',
                }}
              >
                <div className="grid grid-cols-3 divide-x divide-black/25">
                  {STATS.map((item) => (
                    <div
                      key={item.label}
                      className="px-8 py-6 text-center text-montserrat"
                    >
                      <h3 className="text-3xl font-semibold text-black">
                        {item.value}
                      </h3>
                      <p className="mt-2 text-xs uppercase tracking-[0.25em] text-black/70">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
