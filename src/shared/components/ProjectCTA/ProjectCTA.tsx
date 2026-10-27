import { motion } from 'framer-motion';

import Reveal from '@/shared/components/Reveal/Reveal';
import {
  useEnquiryModal,
  type EnquiryPrefillData,
} from '@/app/provider/EnquiryProvider/EnquiryModalContext';
import { useContext, useRef } from 'react';
import { ProjectDetailsContext } from '@/features/project-details/context/ProjectDetailsContext';

interface ProjectCTAProps {
  backgroundImage?: string;
}

export default function ProjectCTA({ }: ProjectCTAProps) {
  const prefillRef = useRef<EnquiryPrefillData | undefined>(undefined);
  const { openEnquiryModal } = useEnquiryModal();
  const context = useContext(ProjectDetailsContext);
  if (context) {
    const { data } = context;
    const prefillData: EnquiryPrefillData = {
      location: {
        id: '1',
        label: data?.ProjectLocation ?? '',
      },
      project: {
        id: String(data?.ProjectId),
        label: data?.ProjectName ?? '',
      },
      locked: true,
    };
    prefillRef.current = prefillData;
  }
  return (
    <section className="relative isolate overflow-hidden bg-background-dark">
      <div className="container relative z-10 mx-auto flex min-h-100 flex-col items-center justify-center px-6 py-24 text-center lg:min-h-150">
        <Reveal>
          <h2 className="max-w-3xl text-cormorant-garamond text-2xl leading-tight text-white lg:text-3xl">
            Schedule a private site visit today and experience the luxury of{' '}
            <br />
            {context && context.data?.ProjectName
              ? context.data.ProjectName
              : 'H.RISHABRAJ'}
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-col gap-5 sm:flex-row">
            <motion.button
              whileHover={{
                scale: 1.04,
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
              transition={{
                duration: 0.25,
              }}
              className="bg-primary px-10 py-5 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-lg"
              onClick={() => openEnquiryModal(prefillRef.current)}
            >
              Book a Site Visit
            </motion.button>

            {/* <motion.button
              whileHover={{
                scale: 1.04,
                y: -2,
              }}
              whileTap={{
                scale: 0.98,
              }}
              transition={{
                duration: 0.25,
              }}
              className="border border-white/20 bg-white/10 px-10 py-5 text-xs font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              Get a Call Back
            </motion.button> */}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
