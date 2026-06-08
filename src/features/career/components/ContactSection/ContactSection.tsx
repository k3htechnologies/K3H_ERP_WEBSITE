import { useState } from 'react';
import { Mail, MapPin, Loader2 } from 'lucide-react';

import Container from '@/shared/components/Container/Container';
import Reveal from '@/shared/components/Reveal/Reveal';
import type { FormData, FormErrors } from '@/features/career/types/index.type';
import { EMAIL_REGEX, MOBILE_REGEX } from '@/shared/constants';

const ContactSection = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    mobile: '',
    portfolio: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isSubmitted, setIsSubmitted] = useState(false);

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
    const newErrors: FormErrors = {};

    /* FULL NAME */
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
    }

    /* EMAIL */
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }

    /* MOBILE */
    if (!formData.mobile.trim()) {
      newErrors.mobile = 'Mobile number is required';
    } else if (!MOBILE_REGEX.test(formData.mobile)) {
      newErrors.mobile = 'Enter valid mobile number';
    }

    /* PORTFOLIO URL */
    if (formData.portfolio.trim()) {
      try {
        new URL(formData.portfolio);
      } catch {
        newErrors.portfolio = 'Enter valid URL';
      }
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
      const response = await fetch('/api/careers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Submission failed');
      }
      setIsSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        mobile: '',
        portfolio: '',
      });

      setTimeout(() => {
        setIsSubmitted(false);
      }, 4000);
    } catch (error) {
      console.error(error);

      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-[#FBF9F8] py-6 md:py-10">
      <Container>
        <div className="bg-[#F5F3F2] px-6 py-12 md:px-10 md:py-16 lg:px-14">
          <div className="grid gap-14 lg:grid-cols-[0.9fr_1fr] lg:gap-20">
            {/* LEFT CONTENT */}
            <Reveal>
              <div className="max-w-xl">
                <p className="dm-sans text-2xl font-semibold uppercase tracking-[0.2em] text-[#775A19]">
                  Join The Collective
                </p>

                <h2 className="mt-5 font-heading text-3xl leading-normal text-text md:text-5xl">
                  Elevate Your <br></br> Career Trajectory
                </h2>

                <p className="mt-8 max-w-lg text-base leading-relaxed text-[#5F6368]">
                  Our most successful partners don’t wait for the right role
                  they present the right vision. If you possess extraordinary
                  talent, we want to see it.
                </p>

                {/* CONTACT INFO */}
                <div className="mt-10 space-y-5">
                  {/* EMAIL */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-black/10 bg-white">
                      <Mail size={18} className="text-text" />
                    </div>

                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8B9097]">
                        Mail Us At
                      </p>

                      <a
                        href="mailto:hiring@hrishabraj.com"
                        className="mt-1 inline-block text-sm font-medium text-primary transition-opacity duration-300 hover:opacity-70"
                      >
                        hiring@hrishabraj.com
                      </a>
                    </div>
                  </div>

                  {/* LOCATION */}
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-black/10 bg-white">
                      <MapPin size={18} className="text-text" />
                    </div>

                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#8B9097]">
                        Headquarters
                      </p>

                      <p className="mt-1 text-sm font-medium text-primary">
                        Mumbai
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* FORM */}
            <Reveal delay={200}>
              <div className="bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,0.03)] md:p-10">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* FULL NAME */}
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-widest text-[#43474F] dm-sans">
                      Full Name
                    </label>

                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Julian Vane"
                      className="mt-3 w-full border-b border-black/10 bg-transparent pb-3 text-base text-text outline-none transition-colors duration-300 placeholder:text-[#B2B5BA] focus:border-primary"
                    />

                    {errors.fullName && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-widest text-[#43474F] dm-sans">
                      Email Address
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="j.vane@estateelite.com"
                      className="mt-3 w-full border-b border-black/10 bg-transparent pb-3 text-base text-text outline-none transition-colors duration-300 placeholder:text-[#B2B5BA] focus:border-primary"
                    />

                    {errors.email && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {/* MOBILE */}
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-widest text-[#43474F] dm-sans">
                      Mobile No.
                    </label>

                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="+91 8766565656"
                      className="mt-3 w-full border-b border-black/10 bg-transparent pb-3 text-base text-text outline-none transition-colors duration-300 placeholder:text-[#B2B5BA] focus:border-primary"
                    />

                    {errors.mobile && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.mobile}
                      </p>
                    )}
                  </div>

                  {/* PORTFOLIO */}
                  <div>
                    <label className="text-[11px] font-semibold uppercase tracking-widest text-[#43474F] dm-sans">
                      Portfolio Or LinkedIn URL
                    </label>

                    <input
                      type="text"
                      name="portfolio"
                      value={formData.portfolio}
                      onChange={handleChange}
                      placeholder="https://linkedin.com/in/..."
                      className="mt-3 w-full border-b border-black/10 bg-transparent pb-3 text-base text-text outline-none transition-colors duration-300 placeholder:text-[#B2B5BA] focus:border-primary"
                    />

                    {errors.portfolio && (
                      <p className="mt-2 text-sm text-red-500">
                        {errors.portfolio}
                      </p>
                    )}
                  </div>

                  {/* SUCCESS MESSAGE */}
                  {isSubmitted && (
                    <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                      Profile submitted successfully.
                    </div>
                  )}

                  {/* BUTTON */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className=" mt-4 flex h-14 w-full items-center justify-center gap-2 bg-primary text-sm font-semibold uppercase tracking-[0.22em] text-white transition-all duration-300 hover:translate-y-0.5 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      'Submit Profile'
                    )}
                  </button>
                </form>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default ContactSection;
