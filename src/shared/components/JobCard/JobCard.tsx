import { useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowRight,
  BriefcaseBusiness,
  Clock3,
  MapPin,
  Users,
} from 'lucide-react';

import Reveal from '@/shared/components/Reveal/Reveal';
import type { JobCardProps } from '@/shared/components/JobCard/jobCard.type';
import { getPostedTime } from '@/shared/utils/getPostedTime';
import { JobDescriptionModal } from '../JobDescriptionModal/JobDescriptionModal';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/app/router/routePaths';

type Job = JobCardProps['job'];

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

  const navigate = useNavigate();

  useLayoutEffect(() => {
    const el = descRef.current;
    if (!el) return;
    const check = () => setIsTruncated(el.scrollHeight > el.clientHeight + 1);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, [job.JobDescription]);

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

      <JobDescriptionModal
        isOpen={open}
        onClose={() => setOpen(false)}
        job={job}
        onApply={(job) => {
          navigate(`/${ROUTES.APPLICATION_FORM}`, {
            state: {
              position: job.JobOpeningMasterId,
              JobOpeningMasterId: job.JobOpeningMasterId,
              JobRoleName: job.JobRoleName
            },
          });
        }}
      />

    </Reveal>
  );
};

export default JobCard;