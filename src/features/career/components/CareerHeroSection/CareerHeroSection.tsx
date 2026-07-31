import { ROUTES } from '@/app/router/routePaths';
import { useReveal } from '@/shared/hooks/useReveal';
import { scrollToTop } from '@/shared/utils';
import { useNavigate } from 'react-router-dom';

const CareerHero = () => {
  const { ref, isVisible } = useReveal<HTMLDivElement>();
  const navigate = useNavigate();

  const handleNavigation = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    scrollToTop();
    navigate(`/${ROUTES.APPLICATION_FORM}`);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background Video */}
      {/* <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      >
        <source src="https://www.youtube.com/shorts/lWdGeLSRC3c" type="video/mp4" />
      </video> */}
      <img
        src="/career-hero-background.jpg"
        alt="Background"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/45" />

      {/* Logo */}
      {/* <div className="absolute left-1/2 top-10 z-20 -translate-x-1/2">
        <img
          src="logo-white.png"
          alt="logo"
          className="h-16 w-auto object-contain"
        />
      </div> */}

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <div
          ref={ref}
          className={`
            mx-auto max-w-5xl text-center
            transition-all duration-1000 ease-out
            ${
              isVisible
                ? 'translate-y-0 opacity-100'
                : 'translate-y-16 opacity-0'
            }
          `}
        >
          <h1 className="font-heading text-3xl font-black text-white md:text-4xl lg:text-[4rem] tracking-wider">
            Build the Future With Us
          </h1>
          <p className="mx-auto my-8 max-w-4xl text-lg leading-relaxed text-gray-200 md:text-xl text-montserrat">
            Join the team behind Mumbai's next generation of landmarks. Explore
            opportunities to grow, innovate, and build a career with H.
            Rishabraj.
          </p>
          <button
            className=" inline-flex items-center gap-3 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md transition-all duration-500 hover:bg-primary"
            onClick={handleNavigation}
          >
            Apply Now →
          </button>
        </div>
      </div>
    </section>
  );
};

export default CareerHero;
