import SectionContainer from '@/shared/components/Container/SectionContainer';

const LocationsSections = () => {
  const mapSrc =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3767.052078186249!2d72.85942287499431!3d19.236561982001298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b100770734ef%3A0xdde18f271cb1658c!2sRishabraj%20Chambers!5e0!3m2!1sen!2sin!4v1783937220458!5m2!1sen!2sin';

  return (
    <SectionContainer
      heading={
        <>
          Mumbai <span className="text-primary">Footprint</span>
        </>
      }
      sideDescription={<span>Explore our presence across Mumbai.</span>}
    >
      <div className="relative mt-10 overflow-hidden rounded-3xl border border-black/10">
        <iframe
          title="Mumbai Footprint"
          src={mapSrc}
          loading="lazy"
          className="h-112.5 w-full border-0 lg:h-162.5"
        />

        {/* <button className="absolute bottom-6 right-20 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition hover:scale-105">
          View All Locations
        </button> */}
      </div>
    </SectionContainer>
  );
};

export default LocationsSections;
