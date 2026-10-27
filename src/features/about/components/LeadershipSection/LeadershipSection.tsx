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
              className="absolute lg:-bottom-12 -bottom-40 right-0 rounded-2xl p-7 text-white shadow-2xl lg:-right-6 lg:w-85 w-full"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,5)',
                backdropFilter: 'blur(20px)',
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
                <p className="mt-1 text-xs text-white/60">
                  Founder and Managing Director
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
              Mr Harrish Kumar Jain is the force behind the Group spearheading
              into Real Estate space and carving its own niche in Redevelopment
              Space. He is the son of Mr. Ratanchandji Jain who is a
              distinguished Businessman and a well-known philanthropist.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-10 leading-6 text-white/80 text-sm text-montserrat">
              Mr Harrish Kumar Jain even before graduating from college begun
              his entrepreneurial journey in the textile business and after
              completion of his graduation saw great potential in the
              Redevelopment of Societies and so his journey began, learning
              along the way and guided by Family Values of Commitment and
              Dedication in a short span of a decade he through his companies
              has managed to develop more than 75+ projects successfully
              delivering to the delight of existing and new customers.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-10 leading-6 text-white/80 text-sm text-montserrat">
              His leadership qualities and drive for benchmarking the real
              estate industry drove him to become the Founder member of
              Brihanmumbai Developers Association (BDA) which could garner 700+
              members in a short span of 5 months and he leads the way to solve
              the issues faced by developers executing redevelopment projects at
              all levels of government and bureaucracy.
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
              A graduate of Regent's University London, Krish Harrish Jain brings
              a fresh global perspective to H. Rishabraj Group while carrying
              forward the values and vision that have shaped its legacy. As part
              of the Group's next generation of leadership, he heads management,
              overseeing large-scale operations, strengthening organisational
              processes, and driving operational excellence across every
              vertical.
            </p>
          </Reveal>
          <Reveal>
            <p className="mt-10 leading-6 text-white/80 text-sm text-montserrat">
              With a progressive outlook and a deep understanding of evolving
              urban lifestyles, Krish is focused on creating developments that
              combine thoughtful design, lasting value, and exceptional customer
              experiences. He believes that successful real estate goes beyond
              construction, shaping communities that enrich the way people live.
            </p>
          </Reveal>
          <Reveal>
            <p className="mt-10 leading-6 text-white/80 text-sm text-montserrat">
              Committed to innovation, efficiency, and sustainable growth, Krish
              is dedicated to steering H. Rishabraj Group towards its next phase
              of expansion while upholding its enduring commitment to quality,
              trust, and excellence. His vision is to contribute to a smarter,
              more liveable Mumbai by delivering developments that stand the
              test of time.
            </p>
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <div className="relative mx-auto w-full">
            <img
              src="/leadership-director.jpg"
              alt="Managing Director"
              className="h-100 lg:h-150 w-full rounded-xl object-cover"
            />
            <div
              className="absolute -bottom-10 lg:-left-72 w-full lg:w-100 rounded-2xl p-6 text-white shadow-2xl"
              style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,1)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div className="mb-0 text-5xl text-primary">❝</div>
              <p className="text-sm">Mr Krish Harrish Jain</p>
              <p className="mt-1 text-xs text-white/60">Managing Director</p>
            </div>
          </div>
        </Reveal>
      </div>
    </SectionContainer>
  );
};

export default LeadershipSection;
