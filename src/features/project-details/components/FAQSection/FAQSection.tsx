import { useState } from 'react';

import Reveal from '@/shared/components/Reveal/Reveal';
import SectionContainer from '@/shared/components/Container/SectionContainer';
import type { FAQ } from '@/shared/components/AccordionItem/AccordionItem';
import AccordionItem from '@/shared/components/AccordionItem/AccordionItem';

const FAQS: FAQ[] = [
  {
    id: 1,
    question: 'Is the project RERA compliant?',
    answer:
      'Yes. Ceremont is fully RERA registered and compliant with all applicable regulations. The RERA registration number is available in the project details.',
  },
  {
    id: 2,
    question: 'What is the status of construction?',
    answer:
      'The project is currently under construction and progressing according to schedule. Please contact our sales team for the latest construction updates and possession timeline.',
  },
  {
    id: 3,
    question: 'What are the home loan options?',
    answer:
      'We have tie-ups with multiple leading banks and financial institutions offering competitive home loan options with attractive interest rates and flexible repayment plans.',
  },
  {
    id: 4,
    question: 'What amenities are included?',
    answer:
      "Residents enjoy premium amenities including landscaped gardens, clubhouse, gymnasium, children's play area, mini theatre, meditation garden, banquet hall, jogging track and more.",
  },
  {
    id: 5,
    question: 'Can I schedule a site visit?',
    answer:
      'Absolutely. You can book a private site visit through our website or contact our sales team to arrange a convenient time.',
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(1);

  const handleToggle = (id: number) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <SectionContainer>
      <section id="faq">
        <div className="container mx-auto max-w-5xl px-6">
          <Reveal>
            <h2 className="text-center text-cormorant-garamond text-4xl text-secondary lg:text-5xl">
              Frequently Asked Questions
            </h2>
          </Reveal>

          <div className="mt-14">
            {FAQS.map((faq, index) => (
              <Reveal key={faq.id} delay={index * 0.08}>
                <AccordionItem
                  faq={faq}
                  isOpen={openId === faq.id}
                  onToggle={() => handleToggle(faq.id)}
                />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </SectionContainer>
  );
}
