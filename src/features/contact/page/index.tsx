import EnquirySection from '@/shared/components/EnquirySection/EnquirySection';

const ContactPage = () => {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8 md:px-8 md:py-12 lg:px-12 lg:py-16"
      style={{
        background:
          'linear-gradient(109.67deg, rgba(0, 0, 0, 0.45) -2.12%, rgba(255, 255, 255, 0.45) 47.39%, rgba(0, 0, 0, 0.45) 100%)',
      }}
    >
      <div className="absolute inset-0">
        <img
          src="/enquiry-bg.jpg"
          alt="Luxury Interior"
          className="h-full w-full object-cover"
        />
      </div>
      <div className="relative z-10 w-full max-w-7xl rounded-sm bg-[#F5F3F3B2]/70 backdrop-blur-md shadow-[0_30px_80px_rgba(0,0,0,0.15)] mt-18">
        <EnquirySection />
      </div>
    </section>
  );
};

export default ContactPage;
