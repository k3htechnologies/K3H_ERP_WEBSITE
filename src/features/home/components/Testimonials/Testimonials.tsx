import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import SectionContainer from '@/shared/components/Container/SectionContainer';

const TESTIMONIALS = [
  {
    quote: `
Growing up in IC Colony, I always envisioned owning a home here. When I saw the project of H. Rishabraj , I was impressed. After discussing with my family, we decided to purchase a flat with H. Rishabraj Group. What truly excited me was the efficiency of the entire process - from house selection to flat registration, it took less than 40 days. The team members were incredibly cooperative throughout the journey, and we are thoroughly satisfied with our new home.`,
    name: 'Dr Pankaj Malhotra',
    designation: 'H.Rishabraj Agnel',
  },
  {
    quote: `
I was planning to shift from Vasai to Kandivali when I heard about the H. Rishabraj project. The project offers all the amenities I need at the perfect location. I would definitely recommend my friends and family members to connect with H. Rishabraj when they are planning to buy a house`,
    name: 'Mr. Mayur Fofaria',
    designation: 'Samaj Darshan',
  },
  {
    quote: `We handed over our building to Mr. Harrish Kumar Jain for redevelopment. We are totally satisfied with the work. Mr. Jain is a man of few words, but he delivered on his promises. We never thought the project would end without any disputes. The work culture is very positive, and the staff is also aligned with the developer's vision.`,
    name: 'Mr. Ramesh Hemdev',
    designation: '52 Park Avenue',
  },
  {
    quote: `Our redevelopment project was stuck. Then, Mr. Harrish Kumar Jain stepped in. Within 3 months, all our approvals were in place. In less than 2 years, our project was completed with the occupancy certificate (OC) obtained. The building stands out as one of the best buildings in our locality. A redevelopment process is a very emotional journey, and Mr. Harrish did justice to it. Thank you, H.Rishabraj Team.`,
    name: 'Mr. Manoj Bhatia',
    designation: '52 Park Avenue',
  },
  {
    quote: `
Our project faced a stall around 2013. Mr. Harish Kumar Jain proved to be a man of his word. He assured us that he would deliver our project by 2023, and he not only fulfilled his promise but also delivered our dream to us.`,
    name: 'Mrs. Vaishali Gandhi',
    designation: 'H.Rishabraj Samaj Darshan',
  },
  {
    quote: `
The homes are thoughtfully designed, offering ample space and parking for various vehicles, along with amenities suitable for all age groups. Moreover, the construction quality is impeccable. I am extremely pleased with my experience with H. Rishabraj Group.`,
    name: 'Mr. Aakash Nichani',
    designation: 'H.Rishabraj Pride',
  },
  {
    quote: `
I had booked a 3 BHK with a developer in Borivali, but after 5-6 years, construction stopped at the 10th floor. I was in deep tension as my 1 crore investment was stuck. Then, I met Harish Bhai. Within just 2 years, he gave me possession of my flat in his project. Very happy & satisfied.`,
    name: 'Mr. Jalgaonkar',
    designation: 'H.Rishabraj Suraj',
  },
];

export default function Testimonials() {
  const [[index, direction], setIndex] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    setIndex(([prev]) => {
      const next =
        (prev + newDirection + TESTIMONIALS.length) % TESTIMONIALS.length;

      return [next, newDirection];
    });
  };

  const testimonial = TESTIMONIALS[index];

  return (
    <SectionContainer
      bgClassName="bg-background-dark"
      heading={
        <span className="text-white">
          Voice Of <span className="text-primary">Trust</span>
        </span>
      }
      sideDescription={
        <span className="text-white">
          Every home tells a story. These are the voices behind our legacy of
          trust.
        </span>
      }
    >
      <div className="mt-20 flex justify-center" id="testimonials">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={index}
            custom={direction}
            variants={{
              enter: (direction: number) => ({
                x: direction > 0 ? 150 : -150,
                opacity: 0,
                scale: 0.95,
              }),
              center: {
                x: 0,
                opacity: 1,
                scale: 1,
              },
              exit: (direction: number) => ({
                x: direction > 0 ? -150 : 150,
                opacity: 0,
                scale: 0.95,
              }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="w-full max-w-4xl"
          >
            <div
              className="rounded-2xl p-px"
              style={{
                background:
                  'linear-gradient(147.91deg,#FFFFFF 9.57%,rgba(255,255,255,0.05) 56.98%,rgba(255,255,255,0.5) 97.79%)',
              }}
            >
              <div className="rounded-[15px] bg-[#34495A]/45 px-14 py-16 text-center backdrop-blur-[60px]">
                <div className="text-6xl leading-none text-primary">”</div>
                <p className="mx-auto mt-6 max-w-3xl font-heading text-xl leading-relaxed text-white">
                  {testimonial.quote}
                </p>
                <h3 className="mt-12 font-heading text-2xl italic text-primary">
                  {testimonial.name}
                </h3>
                <p className="mt-3 text-lg tracking-[0.15em] text-white text-montserrat">
                  {testimonial.designation}
                </p>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="mt-12 flex justify-center gap-5">
        <button
          onClick={() => paginate(-1)}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={() => paginate(1)}
          className="flex h-14 w-14 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white transition-all duration-300 hover:border-primary hover:bg-primary hover:text-white"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </SectionContainer>
  );
}
