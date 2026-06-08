import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

import Container from '@/shared/components/Container/Container';
import Reveal from '@/shared/components/Reveal/Reveal';
import InputField from '@/shared/components/InputField/InputField';

import { PORTALS } from '@/features/login/constants/login.constant';
import type { Portal } from '@/features/login/types/login.type';
import OtpInput from '@/features/login/components/OtpInput/OtpInput';

const LoginPage = () => {
  const [activePortal, setActivePortal] = useState<Portal>(PORTALS[0]);
  const [identifier, setIdentifier] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  const handlePortalChange = (portal: Portal) => {
    setActivePortal(portal);
    setIdentifier('');
    setOtp('');
    setOtpSent(false);
  };

  const getIdentifierLabel = () => {
    switch (activePortal.id) {
      case 'employee':
        return 'Employee ID / Mobile Number';
      case 'customer':
        return 'Customer Id / Mobile Number';
      case 'vendor':
        return 'Vendor ID / Mobile Number';
      case 'partner':
        return 'Partner Code / Mobile Number';
      case 'architect':
        return 'Consultant ID / Mobile Number';
      default:
        return 'ID / Mobile Number';
    }
  };

  const getButtooLabel = () => {
    switch (activePortal.id) {
      case 'employee':
        return 'Employee';
      case 'customer':
        return 'Customer';
      case 'vendor':
        return 'Vendor';
      case 'partner':
        return 'Channel Partner';
      case 'architect':
        return 'Architect';
      default:
        return '';
    }
  };

  const handleSendOtp = async () => {
    if (!identifier.trim()) return;
    try {
      setIsSendingOtp(true);

      /*
        API CALL
      */

      await new Promise((resolve) => setTimeout(resolve, 1500));

      setOtpSent(true);
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyLogin = async () => {
    if (!otp.trim()) return;
    try {
      setIsVerifyingOtp(true);

      /*
        VERIFY OTP API
      */

      await new Promise((resolve) => setTimeout(resolve, 1500));

      console.log('Login Success');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  return (
    <section className="bg-[#FBF9F8] py-6 md:py-10">
      <Container>
        <Reveal>
          <div className="overflow-hidden border border-black/5 bg-white">
            <div className="border-b border-black/5 px-6 py-5 md:px-10">
              <img
                src="/logo-horizontal.png"
                alt="Logo"
                className="h-8 w-auto"
              />
            </div>
            {/* CONTENT */}
            <div className="px-6 py-10 md:px-10 md:py-14 lg:px-14">
              <h1 className="font-heading text-3xl leading-none text-text md:text-5xl">
                Login To Your Portal
              </h1>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#76777D]">
                Securely access employee services, customer resources, vendor
                tools, channel partner management and consultant collaboration
                portals.
              </p>

              <div className="mt-12 grid gap-8 lg:grid-cols-[320px_1fr]">
                {/* LEFT PANEL */}
                <div className="space-y-3">
                  {PORTALS.map((portal) => {
                    const active = portal.id === activePortal.id;
                    return (
                      <button
                        key={portal.id}
                        onClick={() => handlePortalChange(portal)}
                        className={` w-full border p-5 text-left transition-all duration-300
                          ${
                            active
                              ? 'border-primary bg-primary text-white'
                              : 'border-black/10 bg-white hover:border-primary'
                          }
                        `}
                      >
                        <p className="text-[10px] font-semibold uppercase tracking-[0.18em]">
                          {portal.subtitle}
                        </p>
                        <h3 className="mt-2 text-sm font-semibold">
                          {portal.title}
                        </h3>
                      </button>
                    );
                  })}
                </div>
                {/* RIGHT PANEL */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activePortal.id}
                    initial={{
                      opacity: 0,
                      x: 20,
                    }}
                    animate={{
                      opacity: 1,
                      x: 0,
                    }}
                    exit={{
                      opacity: 0,
                      x: -20,
                    }}
                    transition={{
                      duration: 0.25,
                    }}
                    className="border border-black/5 bg-white p-8 lg:p-10"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">
                      {activePortal.subtitle}
                    </p>
                    <h2 className="mt-3 font-heading text-4xl text-text">
                      {activePortal.title}
                    </h2>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#76777D]">
                      {activePortal.description}
                    </p>
                    {/* CUSTOMER */}
                    {activePortal.authType === 'redirect' ? (
                      <div className="mt-10">
                        <button
                          onClick={() => {
                            if (activePortal.redirectUrl) {
                              window.open(
                                activePortal.redirectUrl,
                                '_blank',
                                'noopener,noreferrer'
                              );
                            }
                          }}
                          className=" inline-flex h-14 items-center justify-center gap-2 bg-primary px-8 text-sm font-semibold uppercase tracking-[0.18em] text-white "
                        >
                          Open {getButtooLabel()} Portal
                          <ArrowRight size={18} />
                        </button>
                      </div>
                    ) : (
                      <>
                        <div className="mt-10 grid gap-5">
                          <InputField
                            label={getIdentifierLabel()}
                            name="identifier"
                            value={identifier}
                            placeholder={getIdentifierLabel()}
                            onChange={(e) => setIdentifier(e.target.value)}
                            disabled={otpSent}
                          />
                          {otpSent && (
                            <button
                              type="button"
                              onClick={() => {
                                setOtpSent(false);
                                setOtp('');
                                setIdentifier('');
                              }}
                              className="mt-2 text-xs font-medium text-primary"
                            >
                              Change Mobile Number
                            </button>
                          )}

                          {otpSent && (
                            <Reveal>
                              <div>
                                <label className="dm-sans text-[11px] font-semibold uppercase tracking-widest text-[#43474F]">
                                  One Time Password
                                </label>

                                <div className="mt-3">
                                  <OtpInput
                                    value={otp}
                                    onChange={setOtp}
                                    disabled={!otpSent}
                                  />
                                  <div className="mt-4 flex items-center gap-4">
                                    <button
                                      type="button"
                                      className="text-xs font-semibold uppercase tracking-wider text-primary"
                                      onClick={(e) => {
                                        e.preventDefault();
                                        setOtpSent(false);
                                        setOtp('');
                                        handleSendOtp();
                                      }}
                                    >
                                      Resend OTP
                                    </button>

                                    <span className="text-xs text-[#76777D]">
                                      OTP valid for 5 minutes
                                    </span>
                                  </div>
                                </div>

                                <p className="mt-3 text-xs text-primary">
                                  Enter the verification code sent to your
                                  registered mobile number.
                                </p>
                              </div>
                            </Reveal>
                          )}
                        </div>

                        <div className="mt-8 flex items-center justify-end">
                          {!otpSent ? (
                            <button
                              type="button"
                              onClick={handleSendOtp}
                              disabled={!identifier.trim() || isSendingOtp}
                              className=" inline-flex h-14 items-center justify-center bg-primary px-8 text-sm font-semibold uppercase tracking-[0.18em] text-white disabled:pointer-events-none disabled:opacity-60"
                            >
                              {isSendingOtp ? 'Sending OTP...' : 'Send OTP'}
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={handleVerifyLogin}
                              disabled={otp.length !== 6 || isVerifyingOtp}
                              className=" inline-flex h-14 items-center justify-center bg-primary px-8 text-sm font-semibold uppercase tracking-[0.18em] text-white disabled:pointer-events-none disabled:opacity-60
                              "
                            >
                              {isVerifyingOtp
                                ? 'Verifying...'
                                : 'Verify & Login'}
                            </button>
                          )}
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};

export default LoginPage;
