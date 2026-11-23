import SectionContainer from '@/shared/components/Container/SectionContainer';
import Reveal from '@/shared/components/Reveal/Reveal';

const LeadershipSection = () => {
  return (
    <SectionContainer bgClassName="bg-background-dark">
      {/* ================= FIRST LEADER ================= */}
      <div className="grid items-start gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        <Reveal>
          <div className="relative mx-auto w-full">
            <img
              src="/leadership-founder.jpg"
              alt="Founder"
              className="h-100 w-full rounded-xl object-cover lg:h-150"
            />
            <div
              className="absolute lg:-bottom-20 -bottom-40 right-0 rounded-2xl p-7 text-white shadow-2xl lg:-right-6 lg:w-85 w-full"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,5)',
                backdropFilter: 'blur(40px)',
              }}
            >
              <div className="mb-0 text-5xl leading-none text-primary">❝</div>
              <h3 className="font-heading text-xl leading-tight">
                You don't win on emotion,
                <br />
                you win on execution..
              </h3>
              <div className="mt-5">
                <p className="text-sm text-white">Mr Harrish Kumar Jain</p>
                <p className="mt-1 text-xs text-white/60 font-bold">
                  Founder and Director
                </p>
              </div>
            </div>
          </div>
        </Reveal>
        <div>
          <Reveal>
            <h2 className="font-heading text-xl leading-tight text-white sm:text-3xl lg:text-4xl lg:mt-0 mt-40">
              The <span className="text-primary">Visionary</span>
              <br />
              Behind the Archive
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-10 leading-6 text-white/80 text-sm text-montserrat">
              At H. Rishabraj, we have always believed that redevelopment is not simply about
              construction. It is about trust. From the very beginning, our work has been guided by
              one clear commitment: to protect the interests of every homeowner who places their
              faith in us, while bringing a genuinely fresh and thoughtful approach to Mumbai's
              redevelopment landscape.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-10 leading-6 text-white/80 text-sm text-montserrat">
              That clarity of purpose is what has allowed us to build a reputation rooted in reliability,
              quality and care for the people we build for. It is also what drives us to consistently
              deliver ahead of schedule and to contribute, in our own way, to the larger vision of
              homes for every Mumbai family that deserves one.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-10 leading-6 text-white/80 text-sm text-montserrat">
              We are still building. Every day, we push the boundaries of what H. Rishabraj can be,
              not for the sake of ambition alone, but because we believe the developments we
              create should be truly meaningful and truly lasting.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <div className="my-10 h-px bg-white/10" />
          </Reveal>
          <Reveal delay={0.4}>
            <div className="flex gap-40">
              <div>
                <h3 className="font-heading text-3xl lg:text-4xl text-primary">
                  15+
                </h3>
                <p className="mt-2 text-xs uppercase tracking-[0.28em] text-white">
                  Global Awards
                </p>
              </div>
              <div>
                <h3 className="font-heading text-3xl lg:text-4xl text-primary">
                  75+
                </h3>
                <p className="mt-2 text-xs uppercase tracking-[0.28em] text-white">
                  Managed Estates
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
      {/* ================= SECOND LEADER ================= */}
      <div className="mt-10 md:mt-24 grid items-center gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20">
        <div className="w-full lg:mb-60">
          <Reveal>
            <p className="leading-6 text-white/80 text-sm text-montserrat">
              H. Rishabraj is being built into something the Mumbai skyline will remember, and that
              is not an ambition we hold lightly. As someone who has grown up in this industry in a
              hands on manner, accompanying my father to his meetings, watching how trust is
              built and how deals move I understand what it truly takes to be a developer people
              believe in.
            </p>
          </Reveal>
          <Reveal>
            <p className="mt-10 leading-6 text-white/80 text-sm text-montserrat">
              That early exposure has now become a genuine obsession with how businesses are
              built and how the right decisions today, shape what stands on a skyline years from
              now.
            </p>
          </Reveal>
          <Reveal>
            <p className="mt-10 leading-6 text-white/80 text-sm text-montserrat">
              Today I work across sales, design, planning and marketing at H. Rishabraj, with a
              direct hand in the decisions that affect how we go to market, how we support our
              partners, and how we build.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <div className="relative mx-auto w-full">
            <img
              src="/leadership-director.jpg"
              alt="Director"
              className="h-100 lg:h-150 w-full rounded-xl object-cover"
            />
            <div
              className="absolute -bottom-10 lg:-left-72 w-full lg:w-100 rounded-2xl p-6 text-white shadow-2xl"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,1)',
                backdropFilter: 'blur(40px)',
              }}
            >
              <div className="mb-0 text-5xl text-primary">❝</div>
              <p className="text-sm">Mr Krish Harrish Jain</p>
              <p className="mt-1 text-xs text-white/60 font-bold">Director</p>
            </div>
          </div>
        </Reveal>
      </div>
    </SectionContainer>
  );
};

export default LeadershipSection;
