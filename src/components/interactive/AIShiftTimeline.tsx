'use client';

import { useState } from 'react';
import { agentMilestones, type AgentMilestone } from '@/components/interactive/agentExperienceData';

function OverlayVideo({ milestone }: { milestone: AgentMilestone }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[12px] font-semibold tracking-[0.16em] text-slate-400 uppercase">시연 영상</p>
          <p className="mt-1 text-[0.98rem] font-semibold leading-snug text-white">{milestone.videoTitle}</p>
        </div>
        <span className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-2.5 py-1 text-[12px] font-semibold text-cyan-100">
          {milestone.videoSourceLabel}
        </span>
      </div>
      <div className="mt-3 overflow-hidden rounded-[1.2rem] border border-white/8 bg-black">
        <div className="aspect-[16/7.1]">
          <iframe
            src={milestone.videoEmbedUrl}
            title={milestone.videoTitle}
            className="h-full w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

export default function AIShiftTimeline() {
  const [selectedMilestone, setSelectedMilestone] = useState<AgentMilestone | null>(null);

  return (
    <div className="relative mx-auto flex h-full w-full max-w-[1480px] flex-col gap-4">
      <div className="rounded-full border border-cyan-500/20 bg-linear-to-r from-cyan-950/35 via-slate-950 to-slate-950 px-6 py-3 text-center shadow-[0_18px_40px_rgba(8,145,178,0.12)]">
        <p className="text-[0.95rem] font-semibold tracking-[0.16em] text-cyan-100 uppercase">
          2025.01 - 2026.03 | 최근 AI는 답변형 도구에서 실행형 도구로 바뀌고 있습니다
        </p>
      </div>

      <div className="relative flex-1">
        <div className="pointer-events-none absolute top-1/2 right-8 left-8 h-px -translate-y-1/2 bg-linear-to-r from-cyan-400/0 via-cyan-400/40 to-cyan-400/0" />
        <div className="grid grid-cols-5 gap-3">
          {agentMilestones.map((milestone) => (
            <button
              key={milestone.date}
              type="button"
              onClick={() => setSelectedMilestone(milestone)}
              className="group relative flex min-h-[214px] min-w-0 flex-col rounded-[1.8rem] border border-white/10 bg-white/4 px-5 py-5 text-left transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/45 hover:bg-white/7"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-2xl">{milestone.icon}</span>
                <span className={`inline-flex rounded-full px-2.5 py-1 text-[12px] font-semibold ${milestone.tagClassName}`}>
                  {milestone.tag}
                </span>
              </div>
              <p className="mt-4 text-[11px] font-semibold tracking-[0.12em] text-slate-400 uppercase">{milestone.date}</p>
              <h3 className="mt-3 break-keep text-[1.08rem] font-semibold leading-[1.22] tracking-[-0.03em] text-white">
                {milestone.cardTitle}
              </h3>
              <p className="mt-3 text-[12px] font-semibold tracking-[0.02em] text-cyan-100/92">{milestone.productName}</p>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-[11px] font-semibold tracking-[0.12em] text-slate-400 uppercase">
                  자세히 보기
                </span>
                <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[12px] font-semibold text-white transition-colors group-hover:border-cyan-400/25 group-hover:bg-cyan-950/35">
                  열기
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selectedMilestone ? (
        <div
          className="absolute inset-0 z-30 flex items-center justify-center p-4"
          onClick={() => setSelectedMilestone(null)}
        >
          <div
            aria-hidden="true"
            onClick={() => setSelectedMilestone(null)}
            className="absolute inset-0 bg-slate-950/78 backdrop-blur-md"
          />

          <div
            className="animate-fade-slide-up relative z-10 grid max-h-full w-full max-w-[1320px] grid-cols-[0.9fr_1.1fr] gap-4 overflow-hidden rounded-[2rem] border border-cyan-400/18 bg-linear-to-b from-slate-900/96 to-[#050c16]/98 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.46)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex flex-col rounded-[1.6rem] border border-cyan-400/18 bg-cyan-950/20 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-cyan-200">{selectedMilestone.date}</p>
                  <h3 className="mt-2 break-keep text-[2.05rem] font-semibold leading-[1.08] tracking-[-0.03em] text-white">
                    {selectedMilestone.cardTitle}
                  </h3>
                </div>
                <button
                  type="button"
                  aria-label="상세 패널 닫기"
                  onClick={() => setSelectedMilestone(null)}
                  className="group relative flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem] border border-cyan-400/18 bg-linear-to-br from-slate-900 via-slate-800 to-slate-950 text-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.28)] transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/42 hover:shadow-[0_16px_36px_rgba(34,211,238,0.14)]"
                >
                  <span className="absolute inset-[5px] rounded-[0.82rem] border border-white/6 bg-linear-to-br from-white/6 via-transparent to-cyan-400/8" />
                  <span className="relative block h-4 w-4">
                    <span className="absolute top-1/2 left-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 rotate-45 bg-cyan-50 transition-colors group-hover:bg-white" />
                    <span className="absolute top-1/2 left-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-cyan-50 transition-colors group-hover:bg-white" />
                  </span>
                </button>
              </div>

              <div className="mt-3 inline-flex w-fit rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[12px] font-semibold text-cyan-50">
                {selectedMilestone.productName}
              </div>

              <p className="mt-4 break-keep text-[1.02rem] leading-[1.65] text-slate-200">
                {selectedMilestone.title}
              </p>

              <div className="mt-5 rounded-[1.3rem] border border-white/8 bg-black/18 px-4 py-4">
                <p className="break-keep text-[1.08rem] leading-[1.62] text-cyan-50">
                  {selectedMilestone.takeaway}
                </p>
              </div>

              <div className="mt-4 rounded-[1.3rem] border border-white/8 bg-white/4 px-4 py-4">
                <p className="text-[12px] font-semibold tracking-[0.14em] text-slate-400 uppercase">
                  이 변화가 중요한 이유
                </p>
                <p className="mt-2 break-keep text-[1rem] leading-[1.62] text-slate-200">
                  {selectedMilestone.detail}
                </p>
              </div>

              <div className="mt-auto pt-4">
                <a
                  href={selectedMilestone.videoWatchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-fit rounded-full border border-cyan-400/20 bg-cyan-950/35 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-950/55"
                >
                  영상 새 창으로 보기
                </a>
              </div>
            </div>

            <div className="flex min-h-0 flex-col gap-4 rounded-[1.6rem] border border-white/10 bg-black/18 p-5">
              <div>
                <p className="text-[12px] font-semibold tracking-[0.14em] text-slate-400 uppercase">
                  영상에서 확인할 수 있는 장면
                </p>
                <p className="mt-2 break-keep text-[1rem] leading-[1.62] text-slate-200">
                  {selectedMilestone.videoCaption}
                </p>
              </div>
              <OverlayVideo milestone={selectedMilestone} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
