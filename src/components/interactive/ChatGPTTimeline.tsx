'use client';

import { useState } from 'react';

interface Milestone {
  date: string;
  title: string;
  detail: string;
  icon: string;
  stat?: string;
}

const milestones: Milestone[] = [
  {
    date: '2022.11',
    title: 'ChatGPT 출시',
    detail: '5일 만에 100만 사용자 달성',
    icon: '🚀',
    stat: '100만',
  },
  {
    date: '2023.01',
    title: '1억 사용자 돌파',
    detail: '역대 최빠 기록 (2달) — TikTok 9개월, Instagram 2.5년',
    icon: '📈',
    stat: '1억',
  },
  {
    date: '2023.03',
    title: 'GPT-4 출시',
    detail: '멀티모달 AI 시대 개막 — 이미지 인식 가능',
    icon: '🧠',
  },
  {
    date: '2024.05',
    title: 'GPT-4o 출시',
    detail: '실시간 음성 대화 — "그녀(Her)" 현실화',
    icon: '🎙️',
  },
  {
    date: '2026.02',
    title: '일상 도구로 자리잡음',
    detail: 'OpenAI는 9억+ 주간 사용자와 92%의 Fortune 500 사용 사례를 언급했습니다',
    icon: '🌍',
    stat: '9억+',
  },
];

export default function ChatGPTTimeline() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="mx-auto flex max-w-5xl flex-col items-center gap-6">
      {/* Timeline */}
      <div className="relative w-full">
        {/* Vertical center line */}
        <div className="absolute left-1/2 top-0 h-full w-0.5 -translate-x-1/2 bg-white/10" />

        <div className="flex flex-col gap-0">
          {milestones.map((m, i) => {
            const isLeft = i % 2 === 0;
            const isActive = activeIndex === i;

            return (
              <div
                key={m.date}
                className="timeline-node relative flex items-center"
                style={{
                  animationDelay: `${i * 0.15}s`,
                  minHeight: '64px',
                }}
              >
                {/* Left content */}
                <div
                  className={`flex w-[calc(50%_-_1.5rem)] ${
                    isLeft ? 'justify-end pr-4' : ''
                  }`}
                >
                  {isLeft && (
                    <button
                      onClick={() =>
                        setActiveIndex(isActive ? null : i)
                      }
                      className={`group cursor-pointer rounded-xl px-4 py-2 text-right transition-all duration-300 ${
                        isActive
                          ? 'bg-cyan-900/50 shadow-lg shadow-cyan-500/10'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <span className="block text-sm font-medium text-gray-500">
                        {m.date}
                      </span>
                      <span
                        className={`block text-lg font-bold transition-colors duration-300 ${
                          isActive ? 'text-cyan-400' : 'text-white group-hover:text-cyan-300'
                        }`}
                      >
                        {m.icon} {m.title}
                      </span>
                    </button>
                  )}
                </div>

                {/* Center node */}
                <button
                  onClick={() => setActiveIndex(isActive ? null : i)}
                  className={`relative z-10 flex h-5 w-5 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 transition-all duration-300 ${
                    isActive
                      ? 'scale-125 border-cyan-400 bg-cyan-400 shadow-lg shadow-cyan-400/40'
                      : 'border-gray-500 bg-gray-800 hover:border-cyan-300 hover:bg-gray-700'
                  }`}
                  aria-label={m.title}
                >
                  {isActive && (
                    <span className="absolute h-5 w-5 animate-ping rounded-full bg-cyan-400/40" />
                  )}
                </button>

                {/* Right content */}
                <div
                  className={`flex w-[calc(50%_-_1.5rem)] ${
                    !isLeft ? 'pl-4' : ''
                  }`}
                >
                  {!isLeft && (
                    <button
                      onClick={() =>
                        setActiveIndex(isActive ? null : i)
                      }
                      className={`group cursor-pointer rounded-xl px-4 py-2 text-left transition-all duration-300 ${
                        isActive
                          ? 'bg-cyan-900/50 shadow-lg shadow-cyan-500/10'
                          : 'hover:bg-white/5'
                      }`}
                    >
                      <span className="block text-sm font-medium text-gray-500">
                        {m.date}
                      </span>
                      <span
                        className={`block text-lg font-bold transition-colors duration-300 ${
                          isActive ? 'text-cyan-400' : 'text-white group-hover:text-cyan-300'
                        }`}
                      >
                        {m.icon} {m.title}
                      </span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detail panel */}
      {activeIndex !== null && (
        <div
          key={activeIndex}
          className="animate-fade-slide-up w-full max-w-lg rounded-2xl border border-cyan-500/20 bg-white/5 p-6 text-center backdrop-blur-sm"
        >
          <div className="mb-2 text-3xl">{milestones[activeIndex].icon}</div>
          {milestones[activeIndex].stat && (
            <div className="mb-1 text-3xl font-bold text-cyan-400">
              {milestones[activeIndex].stat}
            </div>
          )}
          <h3 className="mb-2 text-xl font-bold text-white">
            {milestones[activeIndex].title}
          </h3>
          <p className="text-lg text-gray-300">
            {milestones[activeIndex].detail}
          </p>
        </div>
      )}
    </div>
  );
}
