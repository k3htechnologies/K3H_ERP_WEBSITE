import { useEffect, useMemo, useState } from 'react';
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Camera,
  FileText,
} from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';

import Container from '@/shared/components/Container/Container';
import Reveal from '@/shared/components/Reveal/Reveal';
import type { ApplicationFormState } from '@/features/application-form/types/index.type';
import { STEP_ICONS, STEPS } from '@/features/application-form/constants';
import type { Opening } from '@/features/career/types/index.type';
import { OPENINGS } from '@/features/career/constants';
import {
  scrollToTop,
  validatePhotoFile,
  validateResumeFile,
} from '@/shared/utils';
import { EMAIL_REGEX, FILE_ISSUE, MOBILE_REGEX } from '@/shared/constants';
import Modal from '@/shared/components/Modal/Modal';
import InputField from '@/shared/components/InputField/InputField';
import { useScrollToTop } from '@/shared/hooks/useScrollToTop';
import UploadField from '@/shared/components/UploadField/UploadField';

const ApplicationFormPage = () => {
  useScrollToTop();
  const [currentStep, setCurrentStep] = useState(0);
  const [openings, setOpenings] = useState<Opening[]>([]);
  const [isLoadingOpenings, setIsLoadingOpenings] = useState(false);
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
    reasonForChange: '',
    currentSalary: '',
    expectedSalary: '',
    noticePeriod: '',
  });
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumePreviewUrl, setResumePreviewUrl] = useState('');
  const [isDraggingPhoto, setIsDraggingPhoto] = useState(false);
  const [isDraggingResume, setIsDraggingResume] = useState(false);
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
    const fetchOpenings = async () => {
      try {
        setIsLoadingOpenings(true);
        // const response = await fetch('/api/openings');
        // if (!response.ok) {
        //   throw new Error('Failed to fetch openings');
        // }
        // const data = await response.json();

        // currently using static data
        setOpenings(OPENINGS);

        // if coming from job openings section then set the value of position
        if (location.state && location.state.position) {
          setFormData((prev) => ({
            ...prev,
            position: location.state.position,
          }));
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingOpenings(false);
      }
    };

    fetchOpenings();
  }, []);

  useEffect(() => {
    return () => {
      if (resumePreviewUrl) {
        URL.revokeObjectURL(resumePreviewUrl);
      }
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }
    };
  }, [resumePreviewUrl, photoPreview]);

  const progress = useMemo(() => {
    return ((currentStep + 1) / STEPS.length) * 100;
  }, [currentStep]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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

  const handlePhotoDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDraggingPhoto(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    handlePhotoUpload(file);
  };

  const removePhoto = () => {
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

  const handleResumeDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDraggingResume(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    handleResumeUpload(file);
  };

  const removeResume = () => {
    if (resumePreviewUrl) {
      URL.revokeObjectURL(resumePreviewUrl);
    }
    setResumePreviewUrl('');
    setResumeFile(null);
  };

  const validateStep = () => {
    const newErrors: Partial<
      Record<keyof ApplicationFormState | 'photo' | 'resume', string>
    > = {};

    switch (currentStep) {
      // BASIC DETAILS
      case 0:
        if (!formData.position) newErrors.position = 'Position is required';

        if (!formData.referredBy.trim())
          newErrors.referredBy = 'This field is required';

        if (!formData.fullName.trim())
          newErrors.fullName = 'Full name is required';

        if (!formData.address.trim()) newErrors.address = 'Address is required';

        if (!formData.mobile.trim()) {
          newErrors.mobile = 'Mobile number is required';
        } else if (!MOBILE_REGEX.test(formData.mobile)) {
          newErrors.mobile = 'Enter valid mobile number';
        }

        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!EMAIL_REGEX.test(formData.email)) {
          newErrors.email = 'Enter valid email address';
        }

        if (!profilePhoto) newErrors.photo = 'Profile photo is required';

        if (!resumeFile) newErrors.resume = 'Resume is required';

        break;

      // EDUCATION
      case 1:
        if (!formData.qualification.trim())
          newErrors.qualification = 'Qualification is required';

        if (!formData.university.trim())
          newErrors.university = 'University is required';

        if (!formData.graduationYear.trim())
          newErrors.graduationYear = 'Graduation year is required';

        if (!formData.percentage.trim())
          newErrors.percentage = 'Percentage is required';

        break;

      // EXPERIENCE
      case 2:
        if (!formData.company.trim())
          newErrors.company = 'Company name is required';

        if (!formData.currentRole.trim())
          newErrors.currentRole = 'Role is required';

        if (!formData.experience.trim())
          newErrors.experience = 'Experience is required';

        if (!formData.reasonForChange.trim())
          newErrors.reasonForChange = 'Reason is required';

        break;

      // SALARY
      case 3:
        if (!formData.currentSalary.trim())
          newErrors.currentSalary = 'Current salary is required';

        if (!formData.expectedSalary.trim())
          newErrors.expectedSalary = 'Expected salary is required';

        if (!formData.noticePeriod.trim())
          newErrors.noticePeriod = 'Notice period is required';

        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
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
      const payload = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        payload.append(key, value);
      });
      if (profilePhoto) {
        payload.append('profilePhoto', profilePhoto);
      }
      if (resumeFile) {
        payload.append('resume', resumeFile);
      }
      // API CALL
      // const response = await fetch('/api/apply', {
      //   method: 'POST',
      //   body: payload,
      // });

      // if (!response.ok) {
      //   throw new Error('Submission failed');
      // }

      await new Promise((resolve) => setTimeout(resolve, 2000));

      setModalState({
        isOpen: true,
        title: 'Application Submitted',
        description: 'Your application has been successfully submitted.',
      });
      // console.log(payload);
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
      experience: '',
      reasonForChange: '',
      currentSalary: '',
      expectedSalary: '',
      noticePeriod: '',
    });
    setCurrentStep(0);
    removePhoto();
    removeResume();
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="grid gap-5 md:grid-cols-2">
            {/* UPLOAD RESUME */}
            <UploadField
              label="Upload Resume"
              accept=".pdf,.doc,.docx"
              file={resumeFile}
              error={errors.resume}
              onUpload={handleResumeUpload}
              onRemove={removeResume}
              previewUrl={resumePreviewUrl}
            />
            {/* <div className="md:col-span-1">
              <label className=" dm-sans text-[11px] font-semibold uppercase tracking-widest text-[#43474F]">
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
              label="Upload Photograph"
              accept="image/*"
              file={profilePhoto}
              error={errors.photo}
              previewUrl={photoPreview}
              onUpload={handlePhotoUpload}
              onRemove={removePhoto}
            />
            {/* <div className="md:col-span-1">
              <label className=" dm-sans text-[11px] font-semibold uppercase tracking-widest text-[#43474F]">
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

            <div>
              <label className="dm-sans text-[11px] font-semibold uppercase tracking-widest text-[#43474F]">
                Position Applied For
              </label>

              <div className="relative mt-3">
                <select
                  name="position"
                  value={formData.position}
                  onChange={(e) => {
                    setFormData((prev) => ({
                      ...prev,
                      position: e.target.value,
                    }));
                    setErrors((prev) => ({
                      ...prev,
                      position: '',
                    }));
                  }}
                  disabled={isLoadingOpenings}
                  className={` h-14 w-full appearance-none border-b px-4 pr-10 text-sm text-text outline-none transition-all duration-300 disabled:cursor-not-allowed disabled:bg-[#F5F5F5]
                    ${
                      errors.position
                        ? 'border-red-400 focus:border-red-500'
                        : 'border-black/10 focus:border-primary'
                    }
                  `}
                >
                  <option value="">
                    {isLoadingOpenings
                      ? 'Loading positions...'
                      : 'Select Position'}
                  </option>

                  {openings.map((opening) => (
                    <option key={opening.id} value={opening.id}>
                      {opening.title}
                    </option>
                  ))}
                </select>

                <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
                  <ChevronDown size={18} className="text-[#7E848C]" />
                </div>
              </div>

              {/* ERROR */}
              {errors.position && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-xs font-medium text-red-500"
                >
                  {errors.position}
                </motion.p>
              )}
            </div>

            <InputField
              label="Sourced Through / Referred By"
              name="referredBy"
              placeholder="Julian Vane"
              value={formData.referredBy}
              onChange={handleChange}
              error={errors.referredBy}
            />

            <InputField
              label="Full Name"
              name="fullName"
              placeholder="Enter Your Full Legal Name"
              value={formData.fullName}
              onChange={handleChange}
              error={errors.fullName}
            />

            <InputField
              label="Address"
              name="address"
              placeholder="Enter Your Current Address"
              value={formData.address}
              onChange={handleChange}
              error={errors.address}
            />

            <InputField
              label="Mobile No."
              name="mobile"
              placeholder="+91 9876565656"
              value={formData.mobile}
              onChange={handleChange}
              error={errors.mobile}
            />

            <InputField
              label="Email Address"
              name="email"
              placeholder="j.vane@estateelite.com"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={errors.email}
            />
          </div>
        );

      case 1:
        return (
          <div className="grid gap-5 md:grid-cols-2">
            <InputField
              label="Highest Qualification"
              name="qualification"
              placeholder="MBA in Marketing"
              value={formData.qualification}
              onChange={handleChange}
              error={errors.qualification}
            />

            <InputField
              label="University / Institution"
              name="university"
              placeholder="Harvard Business School"
              value={formData.university}
              onChange={handleChange}
              error={errors.university}
            />

            <InputField
              label="Graduation Year"
              name="graduationYear"
              placeholder="2023"
              value={formData.graduationYear}
              onChange={handleChange}
              error={errors.graduationYear}
            />

            <InputField
              label="Percentage / CGPA"
              name="percentage"
              placeholder="85%"
              value={formData.percentage}
              onChange={handleChange}
              error={errors.percentage}
            />
          </div>
        );

      case 2:
        return (
          <div className="grid gap-5 md:grid-cols-2">
            <InputField
              label="Current Company"
              name="company"
              placeholder="Google"
              value={formData.company}
              onChange={handleChange}
              error={errors.company}
            />

            <InputField
              label="Current Role"
              name="currentRole"
              placeholder="Senior Designer"
              value={formData.currentRole}
              onChange={handleChange}
              error={errors.currentRole}
            />

            <InputField
              label="Years Of Experience"
              name="experience"
              placeholder="5 Years"
              value={formData.experience}
              onChange={handleChange}
              error={errors.experience}
            />

            <InputField
              label="Reason For Change"
              name="reasonForChange"
              placeholder="Looking for better opportunities and growth"
              value={formData.reasonForChange}
              onChange={handleChange}
              error={errors.reasonForChange}
            />
          </div>
        );

      case 3:
        return (
          <div className="grid gap-5 md:grid-cols-2">
            <InputField
              label="Current Salary"
              name="currentSalary"
              placeholder="₹12,00,000"
              value={formData.currentSalary}
              onChange={handleChange}
              error={errors.currentSalary}
            />

            <InputField
              label="Expected Salary"
              name="expectedSalary"
              placeholder="₹18,00,000"
              value={formData.expectedSalary}
              onChange={handleChange}
              error={errors.expectedSalary}
            />

            <InputField
              label="Notice Period"
              name="noticePeriod"
              placeholder="30 Days"
              value={formData.noticePeriod}
              onChange={handleChange}
              error={errors.noticePeriod}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="bg-[#FBF9F8] py-6 md:py-10">
      <Container>
        <Reveal>
          <div className="overflow-hidden border border-black/5 bg-white">
            {/* TOP LOGO BAR */}
            <div className="border-b border-black/5 px-6 py-5 md:px-10">
              <img
                src="logo-horizontal.png"
                alt="H.Rishabraj"
                className="h-8 w-auto"
              />
            </div>

            {/* CONTENT */}
            <div className="px-6 py-10 md:px-10 md:py-14 lg:px-14">
              <h1 className="font-heading text-3xl leading-none text-text md:text-5xl">
                Start or complete your application
              </h1>

              {/* FORM CONTAINER */}
              <div className="mt-12 bg-[#FAFAFA] p-5 md:p-8 lg:p-10">
                {/* PROGRESS BAR */}
                <div>
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
                        <div key={step} className="flex items-center gap-2">
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
                <div className="mt-10">
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
                    className=" inline-flex h-14 items-center justify-center gap-2 border border-black/10 px-6 text-sm font-semibold uppercase tracking-[0.18em] text-text transition-all duration-300 hover:border-primary hover:text-primary disabled:pointer-events-none disabled:opacity-40"
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
