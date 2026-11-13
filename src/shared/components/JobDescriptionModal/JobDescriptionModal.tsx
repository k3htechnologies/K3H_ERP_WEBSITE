import { createPortal } from "react-dom";
import type { JobDescriptionModalProps } from "./JobDescriptionModal.type";
import Modal from "../Modal/Modal";
import { ArrowRight, BriefcaseBusiness, Building2, Clock3, Laptop, MapPin, Users } from "lucide-react";
import { getPostedTime } from "@/shared/utils/getPostedTime";

export const JobDescriptionModal = ({ isOpen, onClose, job, onApply }: JobDescriptionModalProps) => {

  const JobDescription = (job.JobDescription ?? '')
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const JobResponsibilities = job.JobResponsibilities?.split('\n').filter(Boolean);

  const JobRequirement = job.JobRequirement?.split('\n').filter(Boolean);

  const JobSkills = job.JobSkills?.split('\n').filter(Boolean);

  const JobQualification = job.JobQualification?.split('\n').filter(Boolean);

  const getModalTitle = () => (
    <div className="flex items-center gap-3">
      <span className="font-heading text-3xl capitalize leading-none text-text">
        {job.JobRoleName}
      </span>

      <div className="mb-2">
        <span className="inline-block capitalize rounded-full border border-[#D5EAFE] bg-[#F0F8FF] px-3 py-1 text-montserrat text-[12px] font-semibold text-[#008EDB]">
          {job.WorkMode}
        </span>
      </div>

    </div>
  );

  const handleApply = () => {
    onClose?.();
    onApply?.(job);
  };

  return createPortal(
    <Modal
      isOpen={isOpen}
      title={getModalTitle()}
      onClose={onClose}
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
              {JobDescription.map((p, i) => (
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
              {JobResponsibilities?.map((item, index) => (
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
              {JobRequirement?.map((item, index) => (
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
              {JobSkills?.map((item, index) => (
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
              {JobQualification?.map((item, index) => (
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
  )
}