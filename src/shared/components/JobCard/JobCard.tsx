import { useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Clock3,
  Laptop,
  MapPin,
  Users,
} from 'lucide-react';

import Reveal from '@/shared/components/Reveal/Reveal';
import Modal from '@/shared/components/Modal/Modal';
import type { JobCardProps } from '@/shared/components/JobCard/jobCard.type';
import { getPostedTime } from '@/shared/utils/getPostedTime';

type Job = JobCardProps['job'];

/* Meta grid shared by the card (white text) and the modal (dark text) */
const JobMeta = ({
  job,
  textClass,
  iconClass,
}: {
  job: Job;
  textClass: string;
  iconClass: string;
}) => (
  <div className={`grid grid-cols-2 gap-x-6 gap-y-4 text-montserrat ${textClass}`}>
    <div className="flex items-center gap-2">
      <MapPin size={16} className={iconClass} />
      <span className="text-sm">{job.WorkLocation}</span>
    </div>
    <div className="flex items-center gap-2">
      <BriefcaseBusiness size={16} className={iconClass} />
      <span className="text-sm">{job.DepartmentName}</span>
    </div>
    <div className="flex items-center gap-2">
      <Clock3 size={16} className={iconClass} />
      <span className="text-sm">{job.ExperienceYears} Years</span>
    </div>
    <div className="flex items-center gap-2">
      <Users size={16} className={iconClass} />
      <span className="text-sm">
        {job.NumberOfOpenings.toString().padStart(2, '0')} Openings
      </span>
    </div>
  </div>
);

const JobCard = ({ job, index, onApply }: JobCardProps) => {
  const descRef = useRef<HTMLParagraphElement>(null);
  const [open, setOpen] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);

  useLayoutEffect(() => {
    const el = descRef.current;
    if (!el) return;
    const check = () => setIsTruncated(el.scrollHeight > el.clientHeight + 1);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [job.JobDescription]);

  const paragraphs = (job.JobDescription ?? '')
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const handleApply = () => {
    setOpen(false);
    onApply?.(job);
  };

  const getModalTitle = () => (
    <div className="flex items-center gap-3">
      <span className="font-heading text-3xl capitalize leading-none text-text">
        {job.JobRoleName}
      </span>

      <div className="mb-4">
        <span className="inline-block capitalize rounded-full border border-[#D5EAFE] bg-[#F0F8FF] px-3 py-1 text-montserrat text-[12px] font-semibold text-[#008EDB]">
          {job.WorkMode}
        </span>
      </div>

    </div>
  );

  return (
    <Reveal className="flex h-full w-full">
      <motion.article
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ delay: index * 0.08, duration: 0.5 }}
        whileHover={{ y: -6 }}
        className={`group relative flex min-w-0 h-full w-full flex-1 flex-col overflow-hidden border p-7 ${index % 2 === 0
          ? 'rounded-tr-3xl rounded-bl-3xl'
          : 'rounded-tl-3xl rounded-br-3xl'
          }`}
        style={{
          border: '1px solid',
          borderImageSource:
            'linear-gradient(106.34deg, rgba(255, 255, 255, 0.45) 2.28%, rgba(255, 255, 255, 0) 51.14%, rgba(255, 255, 255, 0.75) 100%)',
          background:
            'linear-gradient(110.09deg, rgba(255, 255, 255, 0.35) -9.1%, rgba(255, 255, 255, 0) 51.58%, rgba(255, 255, 255, 0.1225) 112.26%)',
        }}
      >
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0"
          style={{
            background:
              'radial-gradient(circle at top left, rgba(255,255,255,.08), transparent 65%)',
          }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.35 }}
        />

        <div className="relative z-10 flex h-full flex-col">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-heading text-[30px] leading-tight text-white">
              {job.JobRoleName}
            </h3>

            <span className="rounded-full bg-[#DAE2FD] px-3 py-1 text-xs font-medium text-[#5C647A] text-montserrat">
              {job.WorkMode}
            </span>
          </div>

          <div className="mt-7">
            <JobMeta job={job} textClass="text-white" iconClass="text-[#00A6FF]" />
          </div>

          <p
            ref={descRef}
            className="mt-8 line-clamp-2 text-sm leading-7 text-white/75"
          >
            {job.JobDescription}
          </p>

          {isTruncated && (
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-haspopup="dialog"
              className="mt-2 self-start text-sm text-white/90 underline decoration-white/40 underline-offset-4 transition hover:decoration-[#00A6FF]"
            >
              Read full description
            </button>
          )}

          <div className="mt-auto">
            <div className="my-8 h-px bg-white/20" />
            <div className="flex items-center justify-between">
              <span className="text-sm text-white/65">
                {getPostedTime(
                  job.ModifiedDate ? job.ModifiedDate : job.CreatedDate
                )}
              </span>
              <button
                onClick={() => onApply?.(job)}
                className="group/apply inline-flex items-center gap-2 text-sm font-medium text-[#00A4E0] underline"
              >
                Apply Now
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover/apply:translate-x-1"
                />
              </button>
            </div>
          </div>
        </div>
      </motion.article>

      {createPortal(
        <Modal
          isOpen={open}
          title={getModalTitle()}
          onClose={() => setOpen(false)}
          size="3xl"
        >
          <div className="flex flex-col">
            <div
              data-lenis-prevent
              className="overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-[#D5DCE5]"
            >
              <h3 className="mb-3 text-montserrat text-sm font-semibold tracking-wide text-[#172033]">
                Job Overview
              </h3>

              <div className="grid grid-cols-2 gap-x-4 gap-y-4 rounded-xl border border-[#EDF2F7] bg-[#F7FAFD] p-4">
                {[
                  {
                    label: 'Department',
                    value: job.DepartmentName,
                    icon: Building2,
                  },
                  {
                    label: 'Location',
                    value: job.WorkLocation,
                    icon: MapPin,
                  },
                  {
                    label: 'Experience',
                    value: `${job.ExperienceYears} Years`,
                    icon: Clock3,
                  },
                  {
                    label: 'Openings',
                    value: `${job.NumberOfOpenings.toString().padStart(2, '0')} Openings`,
                    icon: Users,
                  },
                  {
                    label: 'Employment Type',
                    value: job.EmploymentType,
                    icon: BriefcaseBusiness,
                  },
                  {
                    label: 'Work Mode',
                    value: job.WorkMode,
                    icon: Laptop,
                  },
                ].map(({ label, value, icon: Icon }) => (
                  <div key={label} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#EDF7FF]">
                      <Icon size={16} className="text-[#009FE3]" />
                    </div>

                    <div className="min-w-0">
                      <p className="text-montserrat text-[9px] font-medium uppercase tracking-wide text-[#7A8CA6]">
                        {label}
                      </p>
                      <p className="truncate text-montserrat text-xs font-semibold text-[#263449]">
                        {value}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="my-5 h-px bg-[#EDF1F5]" />

              <section>
                <h3 className="mb-2 text-montserrat text-sm font-semibold text-[#172033]">
                  Job Description
                </h3>

                <div className="space-y-3 text-montserrat text-[14px] leading-[1.9] text-[#52627A]">
                  {paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
              </section>

              <div className="my-5 h-px bg-[#EDF1F5]" />

              <section>
                <h3 className="mb-2 text-montserrat text-sm font-semibold text-[#172033]">
                  Key Responsibilities
                </h3>

                <ul className="space-y-1 text-montserrat text-[14px] leading-relaxed text-[#52627A] marker:text-[#00A6FF]">
                  {job.JobResponsibilities?.split('\n').filter(Boolean).map((item, index) => (
                    <li key={index}>{item.trim()}</li>
                  ))}
                </ul>
              </section>

              <div className="my-5 h-px bg-[#EDF1F5]" />

              <section>
                <h3 className="mb-2 text-montserrat text-sm font-semibold text-[#172033]">
                  Requirements
                </h3>

                <ul className="space-y-1 text-montserrat text-[14px] leading-relaxed text-[#52627A] marker:text-[#00A6FF]">
                  {job.JobRequirement?.split('\n').filter(Boolean).map((item, index) => (
                    <li key={index}>{item.trim()}</li>
                  ))}
                </ul>
              </section>

              <div className="my-5 h-px bg-[#EDF1F5]" />

              <section>
                <h3 className="mb-2 text-montserrat text-sm font-semibold text-[#172033]">
                  Skills
                </h3>

                <ul className="space-y-1 text-montserrat text-[14px] leading-relaxed text-[#52627A] marker:text-[#00A6FF]">
                  {job.JobSkills?.split('\n').filter(Boolean).map((item, index) => (
                    <li key={index}>{item.trim()}</li>
                  ))}
                </ul>
              </section>

              <div className="my-5 h-px bg-[#EDF1F5]" />

              <section>
                <h3 className="mb-2 text-montserrat text-sm font-semibold text-[#172033]">
                  Qualification
                </h3>

                <ul className="space-y-1 text-montserrat text-[14px] leading-relaxed text-[#52627A] marker:text-[#00A6FF] pb-2">
                  {job.JobQualification?.split('\n').filter(Boolean).map((item, index) => (
                    <li key={index}>{item.trim()}</li>
                  ))}
                </ul>
              </section>
            </div>

            <div className="-mx-6 -mb-6 mt-0 flex shrink-0 items-center justify-between gap-3 border-t border-[#EDF1F5] bg-[#F8FAFC] px-6 py-4 md:-mx-8 md:-mb-8 md:px-8">
              <span className="text-montserrat text-[10px] font-medium text-[#74849B]">
                Posted {getPostedTime(
                  job.ModifiedDate ? job.ModifiedDate : job.CreatedDate
                )}
              </span>

              <button
                type="button"
                onClick={handleApply}
                className="inline-flex items-center gap-2 rounded-lg bg-[#08A5E5] px-5 py-2.5 text-montserrat text-xs font-semibold text-white transition hover:bg-[#008FCB]"
              >
                Apply Now
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </Modal>,
        document.body
      )}

    </Reveal>
  );
};

export default JobCard;