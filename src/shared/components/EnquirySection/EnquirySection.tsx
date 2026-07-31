import { useEffect, useState } from 'react';
import { Loader2, Mail, MapPin, PhoneCall } from 'lucide-react';

import Reveal from '@/shared/components/Reveal/Reveal';
import type {
  EnquiryFormData,
  EnquiryFormErrors,
} from '@/shared/components/EnquirySection/EnquirySection.types';
import { EMAIL_REGEX, MOBILE_REGEX } from '@/shared/constants';
import type {
  DropdownOption,
  LoadOptionsResult,
} from '@/shared/components/AsyncDropdown/AsyncDropdown';
import { EnquiryService } from '@/shared/components/EnquirySection/EnquirySection.service';
import InputField from '@/shared/components/InputField/InputField';
import AsyncDropdown from '@/shared/components/AsyncDropdown/AsyncDropdown';
import Modal from '@/shared/components/Modal/Modal';
import type { EnquiryPrefillData } from '@/app/provider/EnquiryProvider/EnquiryModalContext';

interface EnquirySectionProps {
  prefillData?: EnquiryPrefillData;
}

const EnquirySection = ({ prefillData }: EnquirySectionProps) => {
  const [location, setLocation] = useState<DropdownOption | null>(
    prefillData?.location ?? null
  );
  const [project, setProject] = useState<DropdownOption | null>(
    prefillData?.project ?? null
  );
  const isLocked = prefillData ? (prefillData.locked ?? true) : false;

  useEffect(() => {
    setLocation(prefillData?.location ?? null);
    setProject(prefillData?.project ?? null);
  }, [prefillData]);

  const [formData, setFormData] = useState<EnquiryFormData>({
    fullName: '',
    email: '',
    mobile: '',
  });
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    description: '',
  });
  const [errors, setErrors] = useState<EnquiryFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const loadLocations = async ({
    page,
    pageSize,
    keyword,
  }: {
    page: number;
    pageSize: number;
    keyword: string;
  }): Promise<LoadOptionsResult> => {
    const response = await EnquiryService.apiCallFetchLocations({
      pageNumber: page,
      pageSize,
      villageName: keyword,
    });
    if (response && response.Data && response.Data.length) {
      const data: DropdownOption[] = response?.Data.map((location) => ({
        id: String(location.VillageMasterId),
        label: location.VillageName,
      }));
      return {
        data,
        totalRecords: response.TotalNumberOfRecord ?? 0,
      };
    }
    return {
      data: [],
      totalRecords: 0,
    };
  };

  const loadProjectsBasedOnLocation = async ({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }): Promise<LoadOptionsResult> => {
    const response = await EnquiryService.apiCallFetchProjectsBasedOnLocation({
      LocationId: Number(location?.id) ?? '',
      pageNumber: page,
      pageSize,
    });
    if (response && response.Data && response.Data.length) {
      const data: DropdownOption[] = response?.Data.map((project) => ({
        id: String(project.ProjectId),
        label: project.ProjectName,
      }));
      return {
        data,
        totalRecords: response.TotalNumberOfRecord ?? 0,
      };
    }
    return {
      data: [],
      totalRecords: 0,
    };
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const validateForm = () => {
    const newErrors: EnquiryFormErrors = {};

    if (!(location && location.id)) {
      newErrors.projectLocation = 'Project Location is required';
    }
    if (!(project && project.id)) {
      newErrors.projectName = 'Project name is required';
    }
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!MOBILE_REGEX.test(formData.mobile)) {
      newErrors.mobile = 'Enter valid mobile number';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const isValid = validateForm();
    if (!isValid) return;
    try {
      setIsSubmitting(true);
      const response = await EnquiryService.apiCallSubmitEnquiry({
        UniqueKey: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        WebsiteLeadId: 0,
        ProjectLocation: project?.label ?? '',
        ProjectId: project?.id ?? '',
        FullName: formData.fullName,
        MobileNo: formData.mobile,
        EmailAddress: formData.email,
      });

      if (!response.IsSuccess) {
        throw new Error('Submission failed');
      }
      setModalState({
        isOpen: true,
        title: 'Enquiry Submitted',
        description: 'Your enquiry has been successfully submitted.',
      });
      setFormData({
        fullName: '',
        email: '',
        mobile: '',
      });
      setLocation(null);
      setProject(null);
    } catch (error) {
      console.error(error);
      setModalState({
        isOpen: true,
        title: 'Enquiry Failed',
        description: 'Something went wrong while submitting your enquiry.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // const handleDownloadBrochure = () => {
  //   const isValid = validateForm();
  //   if (isValid) {
  //     window.open('/brochures/rishabraj-avyaana.pdf', '_blank');
  //   }
  // };

  const onModalClose = () => {
    setModalState({
      isOpen: false,
      title: '',
      description: '',
    });
    setFormData({
      fullName: '',
      email: '',
      mobile: '',
    });
    setLocation(null);
    setProject(null);
  };

  return (
    <>
      <div className="bg-transparent px-6 py-8 md:px-10 lg:px-14">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1fr] lg:gap-20">
          {/* LEFT CONTENT */}
          <Reveal>
            <div className="max-w-xl">
              <p className="text-montserrat text-xl font-semibold uppercase tracking-[0.2em] text-primary">
                BEGIN YOUR JOURNEY
              </p>

              <h2 className="mt-5 font-heading text-3xl leading-normal text-text md:text-4xl font-bold">
                Let's Find the Right Home for You
              </h2>

              <p className="mt-8 max-w-lg text-montserrat text-sm leading-relaxed text-[#43474F]">
                Whether you're searching for your dream residence or your next
                investment, our relationship managers are here to guide you
                through every step—from project selection and pricing to site
                visits and personalized assistance.
              </p>
              <div className="mt-10 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-black/10 bg-white">
                    <PhoneCall size={18} className="text-text" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1D1D1D]">
                      Call us at
                    </p>
                    <a
                      href="tel:8989724545"
                      className="mt-1 text-sm font-medium text-primary"
                    >
                      +91 8989724545
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-black/10 bg-white">
                    <Mail size={18} className="text-text" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1D1D1D]">
                      Mail Us At
                    </p>
                    <a
                      href="mailto:info@hrishabraj.com"
                      className="mt-1 inline-block text-sm font-medium text-primary transition-opacity duration-300 hover:opacity-70"
                    >
                      info@hrishabraj.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-black/10 bg-white">
                    <MapPin size={18} className="text-text" />
                  </div>
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#1D1D1D]">
                      Visit us at
                    </p>
                    <p className="mt-1 text-sm font-medium text-primary">
                      H.Rishabraj Chambers, Borivali East
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* FORM */}
          <Reveal delay={200}>
            <div className="bg-white p-6 shadow-xl md:p-10">
              <form onSubmit={handleSubmit} className="space-y-3">
                <div>
                  <AsyncDropdown
                    label="Project Location"
                    placeholder="Borivali"
                    loadOptions={loadLocations}
                    value={location}
                    onChange={setLocation}
                    mandatory={true}
                    error={errors.projectLocation}
                    defaultValue={location}
                    disabled={isLocked}
                  />
                </div>
                <div>
                  <AsyncDropdown
                    key={location?.id ?? 'empty'}
                    label="Project Name"
                    placeholder="Rishabraj Avyaana"
                    loadOptions={loadProjectsBasedOnLocation}
                    value={project}
                    onChange={setProject}
                    mandatory={true}
                    error={errors.projectName}
                    defaultValue={project}
                    disabled={isLocked || !(location && location.id)}
                  />
                </div>
                <div>
                  <InputField
                    label="Full Name"
                    name="fullName"
                    placeholder="Julian Vane"
                    value={formData.fullName}
                    onChange={handleChange}
                    error={errors.fullName}
                    mandatory={true}
                  />
                </div>
                <div>
                  <InputField
                    label="Email Address"
                    name="email"
                    placeholder="j.vane@estateelite.com"
                    value={formData.email}
                    onChange={handleChange}
                    error={errors.email}
                    mandatory={true}
                  />
                </div>
                <div>
                  <InputField
                    label=" Mobile No."
                    name="mobile"
                    placeholder="+91 8766565656"
                    value={formData.mobile}
                    onChange={handleChange}
                    error={errors.mobile}
                    mandatory={true}
                    type="tel"
                  />
                </div>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                  {/* Schedule Site Visit */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="group flex flex-1 items-center justify-center rounded-md border border-primary bg-transparent p-6 text-xs font-semibold uppercase tracking-[0.18em] text-primary transition-all duration-300 hover:bg-primary hover:text-white disabled:pointer-events-none disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="mr-2 animate-spin" />
                        Scheduling...
                      </>
                    ) : (
                      'Schedule Site Visit'
                    )}
                  </button>

                  {/* Download Brochure */}
                  {/* <button
                  type="button"
                  onClick={handleDownloadBrochure}
                  className="group flex h-14 flex-1 items-center justify-center rounded-md bg-primary px-6 text-xs font-semibold uppercase tracking-[0.18em] text-white transition-all duration-300 hover:bg-primary/90 active:scale-[0.98]"
                >
                  Get Project Brochure
                </button> */}
                </div>
              </form>
            </div>
          </Reveal>
        </div>
      </div>
      <Modal
        isOpen={modalState.isOpen}
        title={modalState.title}
        description={modalState.description}
        onClose={() => onModalClose()}
      />
    </>
  );
};

export default EnquirySection;
