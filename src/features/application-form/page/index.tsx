import { useEffect, useMemo, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';

import Reveal from '@/shared/components/Reveal/Reveal';
import type { ApplicationFormState } from '@/features/application-form/types/application-form.type';
import {
  getOptionByValue,
  QUALIFICATION_RANGE_OPTIONS,
  SALARY_RANGE_OPTIONS,
  STEP_ICONS,
  STEPS,
} from '@/features/application-form/constants/application-form.constant';
import {
  scrollToTop,
  validatePhotoFile,
  validateResumeFile,
} from '@/shared/utils';
import { FILE_ISSUE } from '@/shared/constants';
import Modal from '@/shared/components/Modal/Modal';
import InputField from '@/shared/components/InputField/InputField';
import UploadField from '@/shared/components/UploadField/UploadField';
import Container from '@/shared/components/Container/Container';
import { ApplicationFormService } from '@/features/application-form/service/application-form.service';
import { createFormData } from '@/shared/utils/createFormData';
import AsyncDropdown, {
  type DropdownOption,
  type LoadOptionsResult,
} from '@/shared/components/AsyncDropdown/AsyncDropdown';
import type { FilterDropdownOption } from '@/shared/components/FilterDropdown/FilterDropdown.type';
import FilterDropdown from '@/shared/components/FilterDropdown/FilterDropdown';
import {
  formatFieldValue,
  STEP_FIELDS,
  validateField,
  type ApplicationFieldName,
  type FormValues,
} from '../utils/ApplicationFormFieldvalidation';
import { ROUTES } from '@/app/router/routePaths';

const ApplicationFormPage = () => {
  const navigate = useNavigate();

  const [job, setJob] = useState<DropdownOption | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<ApplicationFormState>({
    position: '',
    referredBy: '',
    fullName: '',
    address: '',
    mobile: '',
    email: '',
    qualification: '',
    university: '',
    graduationYear: '',
    percentage: '',
    company: '',
    currentRole: '',
    experience: '',
    skills: '',
    reasonForChange: '',
    currentSalary: '',
    expectedSalary: '',
    noticePeriod: '',
  });
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumePreviewUrl, setResumePreviewUrl] = useState<string>('');
  // const [isDraggingPhoto, setIsDraggingPhoto] = useState(false);
  // const [isDraggingResume, setIsDraggingResume] = useState(false);
  const [modalState, setModalState] = useState({
    isOpen: false,
    title: '',
    description: '',
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof ApplicationFormState | 'photo' | 'resume', string>>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.JobOpeningMasterId) {
      setJob({
        id: location.state.JobOpeningMasterId,
        label: location.state.JobRoleName,
      });
      setFormData((prev) => ({
        ...prev,
        position: location.state.position,
      }));
    }
  }, [location.state]);

  useEffect(() => {
    return () => {
      if (resumePreviewUrl) {
        URL.revokeObjectURL(resumePreviewUrl);
      }
    };
  }, [resumePreviewUrl]);

  useEffect(() => {
    return () => {
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [photoPreview]);

  const progress = useMemo(() => {
    return ((currentStep + 1) / STEPS.length) * 100;
  }, [currentStep]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const name = e.target.name as ApplicationFieldName;
    const value = formatFieldValue(name, e.target.value);

    setFormData((prev) => {
      const next = { ...prev, [name]: value };
      const error = validateField(name, value, next as unknown as FormValues);
      setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
      return next;
    });
  };

  const handleRangeChange =
    (name: ApplicationFieldName) => (option: FilterDropdownOption) => {
      const value = option.value;
      setFormData((prev) => {
        const next = { ...prev, [name]: value };
        const error = validateField(name, value, next as unknown as FormValues);
        setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
        return next;
      });
    };

  const handlePhotoUpload = (file: File) => {
    const isValid = validatePhotoFile(file);
    if (!isValid.status) {
      if (isValid.issue === FILE_ISSUE.FORMAT) {
        setModalState({
          isOpen: true,
          title: 'Invalid Image Format',
          description: 'Only JPG, PNG and WEBP image formats are allowed.',
        });
      } else if (isValid.issue === FILE_ISSUE.SIZE) {
        setModalState({
          isOpen: true,
          title: 'Image Too Large',
          description: 'Please upload an image smaller than 5MB.',
        });
      }
      return;
    }
    setErrors((prev) => ({
      ...prev,
      photo: '',
    }));
    setProfilePhoto(file);
    const imageUrl = URL.createObjectURL(file);
    setPhotoPreview(imageUrl);
  };

  // const handlePhotoDrop = (e: React.DragEvent<HTMLLabelElement>) => {
  //   e.preventDefault();
  //   setIsDraggingPhoto(false);
  //   const file = e.dataTransfer.files?.[0];
  //   if (!file) return;
  //   handlePhotoUpload(file);
  // };

  const removePhoto = () => {
    if (photoPreview) {
      URL.revokeObjectURL(photoPreview);
    }
    setProfilePhoto(null);
    setPhotoPreview('');
  };

  const handleResumeUpload = (file: File) => {
    const isValid = validateResumeFile(file);
    if (!isValid.status) {
      if (isValid.issue === FILE_ISSUE.FORMAT) {
        setModalState({
          isOpen: true,
          title: 'Invalid Resume Format',
          description: 'Only PDF, DOC and DOCX files are allowed.',
        });
      } else if (isValid.issue === FILE_ISSUE.SIZE) {
        setModalState({
          isOpen: true,
          title: 'Resume Too Large',
          description: 'Please upload a resume smaller than 5MB.',
        });
      }
      return;
    }
    setErrors((prev) => ({
      ...prev,
      resume: '',
    }));
    setResumeFile(file);
    const fileUrl = URL.createObjectURL(file);
    setResumePreviewUrl(fileUrl);
  };

  // const handleResumeDrop = (e: React.DragEvent<HTMLLabelElement>) => {
  //   e.preventDefault();
  //   setIsDraggingResume(false);
  //   const file = e.dataTransfer.files?.[0];
  //   if (!file) return;
  //   handleResumeUpload(file);
  // };

  const removeResume = () => {
    if (resumePreviewUrl) {
      URL.revokeObjectURL(resumePreviewUrl);
    }
    setResumePreviewUrl('');
    setResumeFile(null);
  };

  const validateStep = () => {
    const fields = STEP_FIELDS[currentStep] ?? [];

    const stepErrors: Partial<Record<ApplicationFieldName, string>> = {};
    fields.forEach((name) => {
      // Same rule, same function, as handleChange — nothing to keep in sync by hand.
      stepErrors[name] = validateField(
        name,
        formData[name],
        formData as unknown as FormValues
      );
    });

    // Fields that don't live in `formData` (file uploads, async-select) stay as
    // explicit checks, since they're sourced from separate component state.
    const extraErrors: Partial<
      Record<'position' | 'photo' | 'resume', string>
    > = {};
    if (currentStep === 0) {
      if (!job) extraErrors.position = 'Position applied for is required';
      if (!profilePhoto) extraErrors.photo = 'Profile photo is required';
      if (!resumeFile) extraErrors.resume = 'Resume is required';
    }

    // Overwrite (not merge-append) so a field that now passes clears its old error.
    setErrors((prev) => ({ ...prev, ...stepErrors, ...extraErrors }));

    const allErrors = { ...stepErrors, ...extraErrors };
    return Object.values(allErrors).every((error) => !error);
  };

  const nextStep = () => {
    const isValid = validateStep();
    if (!isValid) return;
    if (currentStep < STEPS.length - 1) {
      scrollToTop();
      setCurrentStep((prev) => prev + 1);
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      scrollToTop();
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    const isValid = validateStep();
    if (!isValid) return;
    try {
      setIsSubmitting(true);
      const request: FormData = createFormData({
        CareerId: '0',
        UniqueKey: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
        JobOpeningMasterId: job?.id,
        ResumeUrl: resumeFile,
        Photograph: profilePhoto,
        SourceId: formData.referredBy,
        FullName: formData.fullName,
        MobileNo: formData.mobile,
        Email: formData.email,
        HighestQualification: formData.qualification,
        UniversityInstitution: formData.university,
        GraduationYear: formData.graduationYear,
        PercentageCgpa: formData.percentage,
        CurrentCompany: formData.company,
        CurrentRole: formData.currentRole,
        YearsOfExperience: formData.experience,
        ReasonForChange: formData.reasonForChange,
        Skills: formData.skills,
        CurrentSalary: formData.currentSalary,
        ExpectedSalary: formData.expectedSalary,
        NoticePeriod: formData.noticePeriod,
      });
      const response =
        await ApplicationFormService.apiCallApplicationSubmit(request);
      if (response && response.IsSuccess) {
        setModalState({
          isOpen: true,
          title: 'Application Submitted',
          description: 'Your application has been successfully submitted.',
        });
      }
    } catch (error) {
      // console.error(error);
      setModalState({
        isOpen: true,
        title: 'Submission Failed',
        description: 'Something went wrong while submitting your application.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const onModalClose = () => {
    setModalState({
      isOpen: false,
      title: '',
      description: '',
    });
    setFormData({
      position: '',
      referredBy: '',
      fullName: '',
      address: '',
      mobile: '',
      email: '',
      qualification: '',
      university: '',
      graduationYear: '',
      percentage: '',
      company: '',
      currentRole: '',
      skills: '',
      experience: '',
      reasonForChange: '',
      currentSalary: '',
      expectedSalary: '',
      noticePeriod: '',
    });
    setCurrentStep(0);
    removePhoto();
    removeResume();
    navigate(`/${ROUTES.CAREER}`);
  };

  const loadJobs = async ({
    page,
    pageSize,
    keyword,
  }: {
    page: number;
    pageSize: number;
    keyword: string;
  }): Promise<LoadOptionsResult> => {
    const response = await ApplicationFormService.apiCallFetchJobListing({
      pageNumber: page,
      pageSize,
      roleName: keyword,
    });
    if (response && response.Data && response.Data.length) {
      const data: DropdownOption[] = response?.Data.map((job) => ({
        id: String(job.JobOpeningMasterId),
        label: job.JobRoleName,
        subtitle: job.WorkLocation,
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

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="grid gap-5 md:grid-cols-2 w-full">
            {/* UPLOAD RESUME */}
            <UploadField
              label="Upload Resume"
              accept=".pdf,.doc,.docx"
              file={resumeFile}
              error={errors.resume}
              onUpload={handleResumeUpload}
              onRemove={removeResume}
              previewUrl={resumePreviewUrl}
              mandatory={true}
            />
            {/* <div className="md:col-span-1">
              <label className=" text-montserrat text-[11px] font-semibold uppercase tracking-widest text-primary-sub">
                Upload Resume
              </label>
              {!resumeFile ? (
                <label
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDraggingResume(true);
                  }}
                  onDragLeave={() => setIsDraggingResume(false)}
                  onDrop={handleResumeDrop}
                  className={` mt-3 flex h-45 cursor-pointer flex-col items-center justify-center border border-dashed bg-[#F2F4F6] transition-all duration-300
                    ${
                      isDraggingResume
                        ? 'border-primary bg-primary/5 scale-[1.01]'
                        : 'border-[#C6C6CD]'
                    }
                    hover:border-primary
                  `}
                >
                  <FileText size={30} className="text-[#7E848C]" />
                  <p className="mt-4 text-sm text-[#45464D]">
                    Click or drag to upload your resume
                  </p>
                  <span className="mt-1 text-xs text-[#76777D]">
                    PDF, DOC up to 5MB
                  </span>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      handleResumeUpload(file);
                    }}
                    className="hidden"
                  />
                  {errors.resume && (
                    <p className="mt-2 text-xs text-red-500">{errors.resume}</p>
                  )}
                </label>
              ) : (
                <div className=" mt-3 relative flex h-45 flex-col justify-between overflow-hidden border border-black/10 bg-white p-6 transition-all duration-300 hover:border-primary/30">
                  <div className="flex items-start gap-4">
                    <div className=" flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-primary/8">
                      <FileText size={30} className="text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className=" line-clamp-2 text-sm font-semibold leading-relaxed text-text">
                        {resumeFile.name}
                      </p>
                      <div className="mt-3 flex items-center gap-2">
                        <span className=" rounded-full bg-[#EEF7FF] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-primary">
                          Resume Uploaded
                        </span>
                        <span className="text-xs text-[#76777D]">
                          {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 flex items-center justify-between">
                    <div className="flex-1 pr-4">
                      <div className="h-1.5 overflow-hidden rounded-full bg-black/5">
                        <div className="h-full w-full rounded-full bg-primary" />
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeResume}
                      className=" inline-flex items-center justify-center rounded-full border border-red-200 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-red-500 transition-all duration-300 hover:bg-red-500 hover:text-white"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              )}
            </div> */}
            {/* UPLOAD PHOTO*/}
            <UploadField
              label="Profile Photo"
              accept="image/*"
              file={profilePhoto}
              error={errors.photo}
              previewUrl={photoPreview}
              onUpload={handlePhotoUpload}
              onRemove={removePhoto}
              mandatory={true}
            />
            {/* <div className="md:col-span-1">
              <label className=" text-montserrat text-[11px] font-semibold uppercase tracking-widest text-primary-sub">
                Upload Photograph
              </label>

              {!profilePhoto ? (
                <label
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDraggingPhoto(true);
                  }}
                  onDragLeave={() => setIsDraggingPhoto(false)}
                  onDrop={handlePhotoDrop}
                  className={` mt-3 flex h-45 cursor-pointer flex-col items-center justify-center border border-dashed bg-[#F2F4F6] transition-all duration-300
                    ${
                      isDraggingPhoto
                        ? 'border-primary bg-primary/5 scale-[1.01]'
                        : 'border-[#C6C6CD]'
                    }
                    hover:border-primary
                  `}
                >
                  <Camera size={30} className="text-[#7E848C]" />
                  <p className="mt-4 text-sm text-[#45464D]">
                    Click or drag to upload professional photo
                  </p>
                  <span className="mt-1 text-xs text-[#76777D]">
                    JPG, PNG up to 5MB
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      handlePhotoUpload(file);
                    }}
                    className="hidden"
                  />
                  {errors.photo && (
                    <p className="mt-2 text-xs text-red-500">{errors.photo}</p>
                  )}
                </label>
              ) : (
                <div className=" mt-3 relative flex h-45 flex-col items-center justify-center overflow-hidden border border-black/10 bg-linear-to-br from-[#F8F9FB] to-[#EEF2F6] p-5">
                  <div className=" relative h-28 w-28 overflow-hidden rounded-full border-4 border-white shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
                    <img
                      src={photoPreview}
                      alt="Profile Preview"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="mt-5 text-center">
                    <p className="max-w-55 truncate text-sm font-medium text-text">
                      {profilePhoto.name}
                    </p>
                    <p className="mt-1 text-xs text-[#76777D]">
                      {(profilePhoto.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={removePhoto}
                    className=" absolute right-4 top-4 flex h-8 items-center justify-center rounded-full border border-red-200 bg-white px-3 text-[10px] font-semibold uppercase tracking-[0.15em] text-red-500 transition-all duration-300 hover:bg-red-500 hover:text-white"
                  >
                    Remove
                  </button>
                </div>
              )}
            </div> */}

            <AsyncDropdown
              label="Position Applied For"
              placeholder="Select a position"
              loadOptions={loadJobs}
              value={job}
              onChange={setJob}
              mandatory={true}
              error={errors.position}
              defaultValue={job}
            />
            <InputField
              label="Sourced Through / Referred By"
              name="referredBy"
              placeholder="Enter Sourced Through / Referred By"
              value={formData.referredBy}
              onChange={handleChange}
              error={errors.referredBy}
              mandatory={true}
            />
            <InputField
              label="Full Name"
              name="fullName"
              placeholder="Enter Your Full Name"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
              mandatory={true}
            />
            <InputField
              label="Address"
              name="address"
              placeholder="Enter Your Address"
              value={formData.address}
              onChange={handleChange}
              error={errors.address}
              mandatory={true}
            />
            <InputField
              label="Mobile No."
              name="mobile"
              placeholder="Enter Your Mobile No."
              value={formData.mobile}
              onChange={handleChange}
              error={errors.mobile}
              mandatory={true}
              type="tel"
            />
            <InputField
              label="Email Address"
              name="email"
              placeholder="Enter Your Email Address"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
              mandatory={true}
            />
          </div>
        );

      case 1:
        return (
          <div className="grid gap-5 md:grid-cols-2">
            <FilterDropdown
              name="qualification"
              theme="light"
              label="Highest Qualification"
              mandatory
              placeholder="Select Highest Qualification"
              options={QUALIFICATION_RANGE_OPTIONS}
              selectedOption={getOptionByValue(QUALIFICATION_RANGE_OPTIONS, formData.qualification)}
              onChange={handleRangeChange('qualification')}
              error={errors.qualification}
              containerClass='absolute bottom-0 bg-transperant'
            />

            <InputField
              label="University / Institution"
              name="university"
              placeholder="Enter university/institute"
              value={formData.university}
              onChange={handleChange}
              error={errors.university}
              mandatory={true}
            />

            <InputField
              label="Passing Year"
              name="graduationYear"
              placeholder="Enter passing year"
              value={formData.graduationYear}
              onChange={handleChange}
              error={errors.graduationYear}
              mandatory={true}
            />

            <InputField
              label="Percentage / CGPA"
              name="percentage"
              placeholder="Enter percentage/CGPA"
              value={formData.percentage}
              onChange={handleChange}
              error={errors.percentage}
              mandatory={true}
            />
          </div>
        );

      case 2:
        return (
          <div className="grid gap-5 md:grid-cols-2">
            <InputField
              label="Current Company"
              name="company"
              placeholder="Enter current company"
              value={formData.company}
              onChange={handleChange}
              error={errors.company}
              mandatory={true}
            />

            <InputField
              label="Current Role"
              name="currentRole"
              placeholder="Senior Designer"
              value={formData.currentRole}
              onChange={handleChange}
              error={errors.currentRole}
              mandatory={true}
            />

            <InputField
              label="Years Of Experience"
              name="experience"
              placeholder="Enter years of experience"
              value={formData.experience}
              onChange={handleChange}
              error={errors.experience}
              mandatory={true}
            />

            <InputField
              label="Reason For Change"
              name="reasonForChange"
              placeholder="Enter reason for change"
              value={formData.reasonForChange}
              onChange={handleChange}
              error={errors.reasonForChange}
              mandatory={true}
            />

            <InputField
              label="Skills"
              name="skills"
              placeholder="Enter skills"
              value={formData.skills}
              onChange={handleChange}
              error={errors.skills}
              mandatory={true}
            />
          </div>
        );

      case 3:
        return (
          <div className="grid gap-5 md:grid-cols-2">
            <FilterDropdown
              name="currentSalary"
              theme="light"
              label="Current CTC"
              mandatory
              placeholder="Select current CTC"
              options={SALARY_RANGE_OPTIONS}
              selectedOption={getOptionByValue(SALARY_RANGE_OPTIONS, formData.currentSalary)}
              onChange={handleRangeChange('currentSalary')}
              error={errors.currentSalary}
            />

            <FilterDropdown
              name="expectedSalary"
              theme="light"
              label="Expected CTC"
              mandatory
              placeholder="Select expected CTC"
              options={SALARY_RANGE_OPTIONS}
              selectedOption={getOptionByValue(SALARY_RANGE_OPTIONS, formData.expectedSalary)}
              onChange={handleRangeChange('expectedSalary')}
              error={errors.expectedSalary}
            />

            <InputField
              label="Notice Period (in a days)"
              name="noticePeriod"
              placeholder="Enter notice period"
              value={formData.noticePeriod}
              onChange={handleChange}
              error={errors.noticePeriod}
              mandatory={true}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="bg-[#FBF9F8] py-6 md:py-12">
      <Container>
        <Reveal>
          <div className="overflow-hidden border border-black/5 bg-white">
            {/* TOP LOGO BAR */}
            {/* <div className="border-b border-black/5 px-6 py-5 md:px-10">
              <img
                src="logo-horizontal.png"
                alt="H.Rishabraj"
                className="h-8 w-auto"
              />
            </div> */}

            {/* CONTENT */}
            <div className="px-6 py-10 md:px-10 md:py-14 lg:px-14">
              <h1 className="font-heading-anton text-3xl leading-none text-text md:text-4xl">
                Start or complete your application
              </h1>

              {/* FORM CONTAINER */}
              <div className="mt-12 bg-[#FAFAFA] p-5 md:p-8 lg:p-10">
                {/* PROGRESS BAR */}
                <div className='w-full'>
                  <div className="relative h-0.5 w-full bg-black/10">
                    <motion.div
                      animate={{
                        width: `${progress}%`,
                      }}
                      transition={{
                        duration: 0.4,
                      }}
                      className="absolute left-0 top-0 h-full bg-primary"
                    />
                  </div>

                  {/* STEPS */}
                  <div className="mt-6 grid grid-cols-2 gap-5 md:grid-cols-4">
                    {STEPS.map((step, index) => {
                      const Icon = STEP_ICONS[step];
                      const isActive = currentStep >= index;
                      return (
                        <div
                          key={step}
                          className="flex items-center gap-2 text-montserrat"
                        >
                          <Icon
                            size={14}
                            className={
                              isActive ? 'text-primary' : 'text-[#76777D]'
                            }
                          />

                          <span
                            className={` text-[11px] font-semibold uppercase tracking-widest
                              ${isActive ? 'text-primary' : 'text-[#9CA3AF]'}
                            `}
                          >
                            {String(index + 1).padStart(2, '0')} {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* FORM */}
                <div className="mt-10 w-full">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{
                        opacity: 0,
                        y: 20,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -20,
                      }}
                      transition={{
                        duration: 0.35,
                      }}
                    >
                      {renderStepContent()}
                    </motion.div>
                  </AnimatePresence>
                </div>

                <div className="mt-10 flex flex-col gap-4 border-t border-black/5 pt-8 sm:flex-row sm:items-center sm:justify-between">
                  {/* PREVIOUS */}
                  <button
                    type="button"
                    onClick={previousStep}
                    disabled={currentStep === 0}
                    aria-hidden={currentStep === 0}
                    tabIndex={currentStep === 0 ? -1 : 0}
                    className={`inline-flex h-14 items-center justify-center gap-2 border border-black/10 px-6 text-sm font-semibold uppercase tracking-[0.18em] text-text transition-[opacity,border-color,color] duration-300 ease-in-out hover:border-primary hover:text-primary ${
                      currentStep === 0
                        ? 'pointer-events-none opacity-0'
                        : 'opacity-100'
                    }`}
                  >
                    <ChevronLeft size={18} />
                    Previous
                  </button>

                  {/* NEXT */}
                  <button
                    type="button"
                    onClick={
                      currentStep === STEPS.length - 1 ? handleSubmit : nextStep
                    }
                    disabled={isSubmitting}
                    className=" inline-flex h-14 items-center justify-center gap-2 bg-primary px-8 text-sm font-semibold uppercase tracking-[0.2em] text-white transition-all duration-300 hover:translate-y-0.5 hover:opacity-90 disabled:pointer-events-none disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{
                            repeat: Infinity,
                            duration: 1,
                            ease: 'linear',
                          }}
                          className="h-4 w-4 rounded-full border-2 border-white border-t-transparent"
                        />
                        Submitting...
                      </>
                    ) : currentStep === STEPS.length - 1 ? (
                      'Submit Application'
                    ) : (
                      'Save & Continue'
                    )}
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
      <Modal
        isOpen={modalState.isOpen}
        title={modalState.title}
        description={modalState.description}
        onClose={() => onModalClose()}
      />
    </section>
  );
};

export default ApplicationFormPage;