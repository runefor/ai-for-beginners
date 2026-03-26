'use client';

import { useState } from 'react';
import { claudeCoworkSpotlight } from '@/components/interactive/agentExperienceData';

function SpotlightVideo() {
  return (
    <div className="rounded-[1.45rem] border border-white/10 bg-black/22 p-3 shadow-[0_24px_80px_rgba(0,0,0,0.28)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[12px] font-semibold tracking-[0.16em] text-slate-500 uppercase">시연 영상</p>
          <p className="mt-1 text-[1rem] font-semibold leading-snug text-white">{claudeCoworkSpotlight.videoTitle}</p>
        </div>
        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-[12px] font-semibold text-cyan-100">
          {claudeCoworkSpotlight.videoSourceLabel}
        </span>
      </div>
      <div className="mt-3 overflow-hidden rounded-[1.15rem] border border-white/8 bg-black">
        <div className="aspect-[16/9]">
          <iframe
            src={claudeCoworkSpotlight.videoEmbedUrl}
            title={claudeCoworkSpotlight.videoTitle}
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

export default function ClaudeCoworkSpotlight() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex h-full min-h-0 flex-col">
      <div className="grid min-h-0 flex-1 grid-cols-[0.92fr_1.08fr] gap-5">
        <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-linear-to-b from-slate-950/96 via-[#07111d] to-[#040913] p-7 shadow-[0_30px_90px_rgba(0,0,0,0.34)]">
          <div className="pointer-events-none absolute -top-14 -left-12 h-44 w-44 rounded-full bg-cyan-400/12 blur-3xl" />
          <div className="pointer-events-none absolute right-0 bottom-0 h-56 w-56 rounded-full bg-blue-500/10 blur-3xl" />

          <div className="relative flex h-full flex-col">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold tracking-[0.2em] text-cyan-100 uppercase">
                  {claudeCoworkSpotlight.label}
                </p>
                <h3 className="mt-3 text-[3.2rem] font-semibold leading-[0.96] tracking-[-0.05em] text-white">
                  {claudeCoworkSpotlight.serviceName}
                </h3>
                <p className="mt-4 max-w-[26ch] text-[1.2rem] leading-[1.55] text-slate-200">
                  {claudeCoworkSpotlight.shortDescription}
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-cyan-400/16 bg-cyan-950/25 px-4 py-3 text-right">
                <p className="text-[11px] font-semibold tracking-[0.16em] text-slate-400 uppercase">Core Message</p>
                <p className="mt-2 text-lg font-semibold leading-tight text-cyan-50">AI 동료는 채팅창 안이 아니라 업무 화면 안으로 들어옵니다</p>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-[1.02fr_0.98fr] gap-4">
              <div className="rounded-[1.4rem] border border-white/8 bg-black/18 px-5 py-5">
                <p className="text-[12px] font-semibold tracking-[0.16em] text-slate-400 uppercase">이 서비스는 무엇인가</p>
                <p className="mt-3 break-keep text-[1.02rem] leading-[1.68] text-slate-200">
                  {claudeCoworkSpotlight.definition}
                </p>
              </div>
              <div className="rounded-[1.4rem] border border-cyan-400/16 bg-linear-to-br from-cyan-950/28 to-slate-950 px-5 py-5">
                <p className="text-[12px] font-semibold tracking-[0.16em] text-cyan-100 uppercase">왜 지금 중요하나</p>
                <p className="mt-3 break-keep text-[1.02rem] leading-[1.68] text-cyan-50">
                  {claudeCoworkSpotlight.whyNow}
                </p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3">
              {claudeCoworkSpotlight.strengths.map((strength) => (
                <div
                  key={strength}
                  className="rounded-[1.3rem] border border-white/8 bg-white/4 px-4 py-4 text-[0.97rem] leading-[1.58] text-slate-200"
                >
                  {strength}
                </div>
              ))}
            </div>

            <div className="mt-auto pt-5">
              <div className="rounded-[1.5rem] border border-white/8 bg-black/18 px-5 py-4">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[12px] font-semibold tracking-[0.16em] text-slate-400 uppercase">한 문장 정리</p>
                    <p className="mt-2 text-[1.08rem] font-semibold leading-[1.5] text-white">
                      Claude Cowork는 답하는 AI가 아니라, 실제 업무 환경에서 다음 행동까지 이어가는 AI를 보여주는 대표 사례입니다.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="shrink-0 rounded-full border border-cyan-300/24 bg-cyan-950/40 px-5 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-cyan-300/40 hover:bg-cyan-950/60"
                  >
                    시연 보기
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-cyan-400/14 bg-linear-to-br from-[#081522] via-[#07111b] to-[#030811] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.3)]">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-cyan-300/35 to-transparent" />
          <div className="pointer-events-none absolute top-10 right-10 h-36 w-36 rounded-full border border-cyan-400/10" />
          <div className="pointer-events-none absolute right-24 bottom-16 h-24 w-24 rounded-full border border-white/6" />

          <div className="relative flex h-full flex-col">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[12px] font-semibold tracking-[0.18em] text-slate-500 uppercase">What You See In The Demo</p>
                <h4 className="mt-2 text-[2rem] font-semibold leading-[1.02] tracking-[-0.04em] text-white">
                  업무 화면 안에서
                  <br />
                  AI가 같이 일하는 방식
                </h4>
              </div>
              <div className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-100">
                Anthropic
              </div>
            </div>

            <div className="mt-5 rounded-[1.7rem] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.1),transparent_35%),linear-gradient(180deg,rgba(8,15,26,0.95),rgba(2,8,16,0.96))] p-5">
              <div className="flex items-center justify-between border-b border-white/8 pb-4">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-rose-400/85" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-300/85" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/85" />
                </div>
                <span className="font-mono text-[11px] tracking-[0.16em] text-cyan-100/70">cowork workspace</span>
              </div>

              <div className="mt-4 grid grid-cols-[0.94fr_1.06fr] gap-4">
                <div className="space-y-3">
                  <div className="rounded-[1.2rem] border border-white/8 bg-white/4 px-4 py-4">
                    <p className="text-[11px] font-semibold tracking-[0.16em] text-slate-500 uppercase">연결된 맥락</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {['Files', 'Docs', 'Browser', 'Connectors'].map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/8 bg-black/18 px-3 py-1.5 text-[12px] font-semibold text-slate-200"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[1.2rem] border border-cyan-400/14 bg-cyan-950/18 px-4 py-4">
                    <p className="text-[11px] font-semibold tracking-[0.16em] text-cyan-100 uppercase">영상 속 핵심 장면</p>
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {claudeCoworkSpotlight.moments.map((moment) => (
                        <div
                          key={moment}
                          className="rounded-[1rem] border border-white/8 bg-black/18 px-3 py-2 text-sm font-medium text-slate-100"
                        >
                          {moment}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-[1.4rem] border border-white/8 bg-black/18 px-4 py-4">
                  <p className="text-[11px] font-semibold tracking-[0.16em] text-slate-500 uppercase">AI가 맡는 흐름</p>
                  <div className="mt-4 space-y-3">
                    {claudeCoworkSpotlight.workflow.map((step, index) => (
                      <div
                        key={step}
                        className="flex items-start gap-3 rounded-[1rem] border border-white/8 bg-white/4 px-3 py-3"
                      >
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-cyan-400/18 bg-cyan-950/30 text-sm font-semibold text-cyan-100">
                          {index + 1}
                        </span>
                        <p className="text-[0.96rem] leading-[1.55] text-slate-200">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {[
                ['Reading', '자료를 읽고 맥락을 이해'],
                ['Drafting', '정리와 초안을 먼저 생성'],
                ['Action', '브라우저와 앱에서 후속 작업 연결'],
              ].map(([label, desc]) => (
                <div
                  key={label}
                  className="rounded-[1.25rem] border border-white/8 bg-white/4 px-4 py-4"
                >
                  <p className="text-[11px] font-semibold tracking-[0.16em] text-slate-500 uppercase">{label}</p>
                  <p className="mt-2 text-[0.95rem] leading-[1.55] text-slate-200">{desc}</p>
                </div>
              ))}
            </div>

            <div className="mt-auto pt-4">
              <p className="text-[0.98rem] leading-[1.62] text-slate-300">
                {claudeCoworkSpotlight.videoCaption}
              </p>
            </div>
          </div>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 z-[140] flex items-center justify-center p-6" onClick={() => setOpen(false)}>
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-slate-950/82 backdrop-blur-md"
            onClick={() => setOpen(false)}
          />

          <div
            className="animate-fade-slide-up relative z-10 grid max-h-full w-full max-w-[1360px] grid-cols-[0.88fr_1.12fr] gap-4 overflow-hidden rounded-[2rem] border border-cyan-400/18 bg-linear-to-b from-slate-900/96 to-[#050c16]/98 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.46)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex flex-col rounded-[1.6rem] border border-cyan-400/18 bg-cyan-950/20 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-cyan-200">Anthropic · 업무 동료형 AI</p>
                  <h3 className="mt-2 text-[2.15rem] font-semibold leading-[1.04] tracking-[-0.03em] text-white">
                    {claudeCoworkSpotlight.serviceName}
                  </h3>
                </div>
                <button
                  type="button"
                  aria-label="상세 패널 닫기"
                  onClick={() => setOpen(false)}
                  className="group relative flex h-12 w-12 shrink-0 items-center justify-center rounded-[1rem] border border-cyan-400/18 bg-linear-to-br from-slate-900 via-slate-800 to-slate-950 text-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.28)] transition duration-200 hover:-translate-y-0.5 hover:border-cyan-300/42 hover:shadow-[0_16px_36px_rgba(34,211,238,0.14)]"
                >
                  <span className="absolute inset-[5px] rounded-[0.82rem] border border-white/6 bg-linear-to-br from-white/6 via-transparent to-cyan-400/8" />
                  <span className="relative block h-4 w-4">
                    <span className="absolute top-1/2 left-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 rotate-45 bg-cyan-50 transition-colors group-hover:bg-white" />
                    <span className="absolute top-1/2 left-1/2 h-4 w-px -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-cyan-50 transition-colors group-hover:bg-white" />
                  </span>
                </button>
              </div>

              <div className="mt-4 inline-flex w-fit rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-[12px] font-semibold text-cyan-50">
                실제 업무 환경에서 함께 일하는 AI
              </div>

              <div className="mt-5 rounded-[1.3rem] border border-white/8 bg-black/18 px-4 py-4">
                <p className="text-[12px] font-semibold tracking-[0.14em] text-slate-400 uppercase">이 영상을 보면 이해되는 점</p>
                <p className="mt-2 break-keep text-[1.04rem] leading-[1.62] text-cyan-50">
                  채팅 답변을 잘하는지보다, 파일과 브라우저를 오가며 실제 작업을 어떻게 이어가는지가 핵심입니다.
                </p>
              </div>

              <div className="mt-4 rounded-[1.3rem] border border-white/8 bg-white/4 px-4 py-4">
                <p className="text-[12px] font-semibold tracking-[0.14em] text-slate-400 uppercase">영상에서 눈여겨볼 장면</p>
                <div className="mt-3 space-y-2">
                  {claudeCoworkSpotlight.workflow.map((step) => (
                    <div
                      key={step}
                      className="rounded-[1rem] border border-white/8 bg-black/18 px-3 py-3 text-[0.97rem] leading-[1.55] text-slate-200"
                    >
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-auto pt-4">
                <a
                  href={claudeCoworkSpotlight.videoWatchUrl}
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
                <p className="text-[12px] font-semibold tracking-[0.14em] text-slate-400 uppercase">영상에서 바로 보이는 장면</p>
                <p className="mt-2 break-keep text-[1rem] leading-[1.62] text-slate-200">
                  {claudeCoworkSpotlight.videoCaption}
                </p>
              </div>
              <SpotlightVideo />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
