'use client';

import { useEffect, useState } from 'react';

interface TypingEffectProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
  startDelay?: number;
  cursorVariant?: 'bar' | 'block';
  keepCursor?: boolean;
  cursorClassName?: string;
}

export default function TypingEffect({
  text,
  speed = 50,
  className = '',
  onComplete,
  startDelay = 500,
  cursorVariant = 'bar',
  keepCursor = false,
  cursorClassName = '',
}: TypingEffectProps) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), startDelay);
    return () => clearTimeout(timer);
  }, [startDelay]);

  useEffect(() => {
    if (!started) return;
    if (displayed.length >= text.length) {
      onComplete?.();
      return;
    }
    const timer = setTimeout(() => {
      setDisplayed(text.slice(0, displayed.length + 1));
    }, speed);
    return () => clearTimeout(timer);
  }, [displayed, started, text, speed, onComplete]);

  return (
    <span className={className}>
      {displayed}
      {(displayed.length < text.length || keepCursor) && (
        cursorVariant === 'block' ? (
          <span
            aria-hidden="true"
            className={`ml-2 inline-block h-[0.88em] w-[0.55em] animate-pulse rounded-[2px] bg-cyan-200 align-[-0.08em] shadow-[0_0_16px_rgba(165,243,252,0.35)] ${cursorClassName}`}
          />
        ) : (
          <span aria-hidden="true" className={`animate-pulse ${cursorClassName}`}>
            |
          </span>
        )
      )}
    </span>
  );
}
