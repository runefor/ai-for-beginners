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
    <button
      type="button"
      aria-pressed={flipped}
      className={`group block cursor-pointer rounded-[1.8rem] text-left [perspective:1200px] ${className}`}
      onClick={() => setFlipped(!flipped)}
    >
      <div
        className={`relative h-full w-full transition-transform duration-500 [transform-style:preserve-3d] ${
          flipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        <div className="absolute inset-0 flex flex-col rounded-[1.8rem] border border-white/12 bg-linear-to-b from-slate-900/85 to-[#08111d] p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] [backface-visibility:hidden]">
          {front}
          <div className="mt-4 border-t border-white/10 pt-3 text-sm tracking-[0.16em] text-slate-500 uppercase">
            Click to reveal
          </div>
        </div>
        <div className="absolute inset-0 flex flex-col rounded-[1.8rem] border border-cyan-400/20 bg-linear-to-b from-cyan-950/80 to-slate-950 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] [backface-visibility:hidden] [transform:rotateY(180deg)]">
          {back}
        </div>
      </div>
    </button>
  );
}
