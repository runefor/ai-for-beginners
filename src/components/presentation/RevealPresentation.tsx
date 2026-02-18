'use client';

import { useEffect, useRef } from 'react';
import Reveal from 'reveal.js';
import 'reveal.js/dist/reveal.css';
import 'reveal.js/dist/theme/black.css';

interface RevealPresentationProps {
  children: React.ReactNode;
}

export default function RevealPresentation({ children }: RevealPresentationProps) {
  const deckRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<Reveal.Api | null>(null);

  useEffect(() => {
    if (!deckRef.current || revealRef.current) return;

    const deck = new Reveal(deckRef.current, {
      hash: true,
      slideNumber: true,
      controls: true,
      progress: true,
      center: true,
      transition: 'slide',
      width: 1920,
      height: 1080,
      margin: 0.04,
      minScale: 0.2,
      maxScale: 2.0,
      embedded: false,
    });

    deck.initialize().then(() => {
      revealRef.current = deck;
    });

    return () => {
      if (revealRef.current) {
        revealRef.current.destroy();
        revealRef.current = null;
      }
    };
  }, []);

  return (
    <div className="reveal" ref={deckRef}>
      <div className="slides">
        {children}
      </div>
    </div>
  );
}
