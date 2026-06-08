import React, { memo, useEffect, useRef, useState } from 'react';
import type {
  CursorFollowerProps,
  CursorPosition,
} from '@/shared/components/CursorFollower/CursorFollower.type';

const CursorFollower: React.FC<CursorFollowerProps> = ({
  size = 14,
  className = '',
  lag = 0.18,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const mousePosition = useRef<CursorPosition>({
    x: 0,
    y: 0,
  });
  const currentPosition = useRef<CursorPosition>({
    x: 0,
    y: 0,
  });
  const followerRef = useRef<HTMLDivElement | null>(null);
  const animationFrameRef = useRef<number | null>(null);

  // TRACK POINTER
  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      mousePosition.current = {
        x: event.clientX,
        y: event.clientY,
      };
      setIsVisible(true);
    };
    const handlePointerLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('pointermove', handlePointerMove, {
      passive: true,
    });
    window.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);

      window.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  // SMOOTH ANIMATION LOOP
  useEffect(() => {
    const animate = () => {
      const follower = followerRef.current;
      if (!follower) {
        animationFrameRef.current = requestAnimationFrame(animate);
        return;
      }
      currentPosition.current.x +=
        (mousePosition.current.x - currentPosition.current.x) * lag;
      currentPosition.current.y +=
        (mousePosition.current.y - currentPosition.current.y) * lag;
      follower.style.transform = `
        translate3d(
          ${currentPosition.current.x}px,
          ${currentPosition.current.y}px,
          0
        )
        translate(-50%, -50%)
      `;
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [lag]);

  return (
    <div
      ref={followerRef}
      aria-hidden="true"
      className={`pointer-events-none fixed left-0 top-0 z-9999 bg-white mix-blend-difference will-change-transform transition-opacity duration-300
        ${isVisible ? 'opacity-100' : 'opacity-0'}
        ${className}
      `}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default memo(CursorFollower);
