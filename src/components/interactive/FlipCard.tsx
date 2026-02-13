'use client';

import { useState } from 'react';

interface FlipCardProps {
  front: React.ReactNode;
  back: React.ReactNode;
  className?: string;
}

export default function FlipCard({ front, back, className = '' }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`group cursor-pointer [perspective:1000px] ${className}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] ${
          flipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* Front */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-white/10 p-6 [backface-visibility:hidden]">
          {front}
        </div>
        {/* Back */}
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-2xl bg-cyan-900/80 p-6 [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {back}
        </div>
      </div>
    </div>
  );
}
