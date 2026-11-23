import EnquirySection from '@/shared/components/EnquirySection/EnquirySection';

const ContactPage = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8 md:px-8 md:py-12 lg:px-12 lg:py-16">
      <div className="absolute inset-0 bg-black">
        <img
          src="/enquiry-bg.jpg"
          alt="Luxury Interior"
          className="h-full w-full object-cover opacity-60"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(109.67deg, rgba(0, 0, 0, 0.45) -2.12%, rgba(255, 255, 255, 0.45) 47.39%, rgba(0, 0, 0, 0.45) 100%)',
            boxShadow: '0px 1px 2px 0px rgba(0, 0, 0, 0.05)',
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-7xl rounded-sm bg-[#F5F3F3]/70 backdrop-blur-md shadow-[0_30px_80px_rgba(0,0,0,0.15)] mt-18">
        <EnquirySection />
      </div>
    </section>
  );
};

export default ContactPage;
