import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from '../../hooks/useReducedMotion';

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  className?: string;
}

const formatter = new Intl.NumberFormat('en-IN');

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 700,
  className = '',
}) => {
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(value);
  const previousRef = useRef(value);

  useEffect(() => {
    if (reduced) {
      previousRef.current = value;
      return;
    }

    const start = previousRef.current;
    const diff = value - start;
    if (diff === 0) return;

    const startTime = performance.now();
    let rafId = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(start + diff * eased));

      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        previousRef.current = value;
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [value, duration, reduced]);

  const shown = reduced ? value : display;
  return <span className={`tabular-nums ${className}`}>{formatter.format(shown)}</span>;
};

export default AnimatedNumber;
