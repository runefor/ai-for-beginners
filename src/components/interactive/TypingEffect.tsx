'use client';

import { useEffect, useState } from 'react';

interface TypingEffectProps {
  text: string;
  speed?: number;
  className?: string;
  onComplete?: () => void;
}

export default function TypingEffect({
  text,
  speed = 50,
  className = '',
  onComplete,
}: TypingEffectProps) {
  const [displayed, setDisplayed] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 500);
    return () => clearTimeout(timer);
  }, []);

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
      {displayed.length < text.length && (
        <span className="animate-pulse">|</span>
      )}
    </span>
  );
}
