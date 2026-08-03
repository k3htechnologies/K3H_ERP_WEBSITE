import React from 'react';

interface ScrollOverlayWrapperProps {
  children: React.ReactNode;
  className?: string;
}

const ScrollOverlayWrapper = ({
  children,
  className = '',
}: ScrollOverlayWrapperProps) => {
  return (
    <div className={`relative z-10 rounded-t-[40px] bg-white ${className}`}>
      {children}
    </div>
  );
};

export default ScrollOverlayWrapper;
