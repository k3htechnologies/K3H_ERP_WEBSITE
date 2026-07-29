import { useEffect, useRef, useState } from 'react';
import '@/shared/components/TiltedCard/TiltedCard.css';

interface TiltedCardProps {
  imageSrc: string;
  altText?: string;
  captionText?: string;
  containerHeight?: React.CSSProperties['height'];
  containerWidth?: React.CSSProperties['width'];
  imageHeight?: React.CSSProperties['height'];
  imageWidth?: React.CSSProperties['width'];
  scaleOnHover?: number;
  rotateAmplitude?: number;
  showMobileWarning?: boolean;
  showTooltip?: boolean;
  overlayContent?: React.ReactNode;
  displayOverlayContent?: boolean;
}

export default function TiltedCard({
  imageSrc,
  altText = 'Tilted card image',
  captionText = '',
  containerHeight = '300px',
  containerWidth = '100%',
  imageHeight = '300px',
  imageWidth = '300px',
  scaleOnHover = 1.08,
  rotateAmplitude = 14,
  showMobileWarning = true,
  showTooltip = true,
  overlayContent = null,
  displayOverlayContent = false,
}: TiltedCardProps) {
  const figureRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const captionRef = useRef<HTMLDivElement>(null);

  const animationFrame = useRef<number>(0);

  const current = useRef({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  });

  const target = useRef({
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  });

  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const animate = () => {
      current.current.rotateX +=
        (target.current.rotateX - current.current.rotateX) * 0.12;

      current.current.rotateY +=
        (target.current.rotateY - current.current.rotateY) * 0.12;

      current.current.scale +=
        (target.current.scale - current.current.scale) * 0.12;

      if (cardRef.current) {
        cardRef.current.style.transform = `
          perspective(800px)
          rotateX(${current.current.rotateX}deg)
          rotateY(${current.current.rotateY}deg)
          scale(${current.current.scale})
        `;
      }

      animationFrame.current = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrame.current!);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!figureRef.current || !captionRef.current) return;

    const rect = figureRef.current.getBoundingClientRect();

    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;

    target.current.rotateX = (-offsetY / (rect.height / 2)) * rotateAmplitude;

    target.current.rotateY = (offsetX / (rect.width / 2)) * rotateAmplitude;

    captionRef.current.style.left = `${e.clientX - rect.left}px`;
    captionRef.current.style.top = `${e.clientY - rect.top}px`;
    captionRef.current.style.opacity = '1';

    const velocityY = offsetY - lastY;
    captionRef.current.style.transform = `rotate(${-velocityY * 0.6}deg)`;

    setLastY(offsetY);
  };

  const handleMouseEnter = () => {
    target.current.scale = scaleOnHover;

    if (captionRef.current) {
      captionRef.current.style.opacity = '1';
    }
  };

  const handleMouseLeave = () => {
    target.current.rotateX = 0;
    target.current.rotateY = 0;
    target.current.scale = 1;

    if (captionRef.current) {
      captionRef.current.style.opacity = '0';
      captionRef.current.style.transform = 'rotate(0deg)';
    }
  };

  return (
    <figure
      ref={figureRef}
      className="tilted-card-figure"
      style={{
        width: containerWidth,
        height: containerHeight,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {showMobileWarning && (
        <div className="tilted-card-mobile-alert">
          This effect is not optimized for mobile.
        </div>
      )}

      <div
        ref={cardRef}
        className="tilted-card-inner"
        style={{
          width: imageWidth,
          height: imageHeight,
        }}
      >
        <img
          src={imageSrc}
          alt={altText}
          className="tilted-card-img"
          style={{
            width: imageWidth,
            height: imageHeight,
          }}
        />

        {displayOverlayContent && overlayContent && (
          <div className="tilted-card-overlay">{overlayContent}</div>
        )}
      </div>

      {showTooltip && (
        <div ref={captionRef} className="tilted-card-caption">
          {captionText}
        </div>
      )}
    </figure>
  );
}
