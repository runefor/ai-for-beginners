'use client';

import { useState } from 'react';

interface StarterTool {
  badge: string;
  icon: string;
  title: string;
  subtitle: string;
  useCase: string;
  detail: string;
  url: string;
  videoTitle: string;
  videoCaption: string;
  videoEmbedUrl: string;
  videoWatchUrl: string;
  videoSourceLabel: string;
}

const starterTools: StarterTool[] = [
  {
    badge: 'BEST START',
    icon: '💬',
    title: 'Claude',
    subtitle: '상위권 성능의 대표 AI 도구',
    useCase: '대표 AI로 전체 감을 잡고 싶을 때',
    detail: '처음 기준점을 잡기 좋은 출발점입니다.',
    url: 'claude.ai',
    videoTitle: 'Getting started with Claude.ai',
    videoCaption: '기본 사용 흐름을 가장 빠르게 보여주는 입문 데모입니다.',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/0vZ_UVLhSQQ?rel=0&modestbranding=1&playsinline=1',
    videoWatchUrl: 'https://www.youtube.com/watch?v=0vZ_UVLhSQQ',
    videoSourceLabel: 'Anthropic',
  },
  {
    badge: 'SEARCH',
    icon: '🔍',
    title: 'Perplexity',
    subtitle: '검색 결과를 AI가 정리',
    useCase: '빠르게 찾고, 출처까지 같이 볼 때',
    detail: '답과 출처가 함께 보여 확인 흐름이 빠릅니다.',
    url: 'perplexity.ai',
    videoTitle: 'Learn 80% of Perplexity in under 10 minutes!',
    videoCaption: '질문부터 출처 확인까지 한 흐름으로 보여줍니다.',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/YoWdogtZRw8?rel=0&modestbranding=1&playsinline=1',
    videoWatchUrl: 'https://www.youtube.com/watch?v=YoWdogtZRw8',
    videoSourceLabel: 'Jeff Su',
  },
  {
    badge: 'DOCUMENT',
    icon: '📓',
    title: 'NotebookLM',
    subtitle: '내 자료를 넣고 요약',
    useCase: '내 자료 안에서 답을 뽑고 싶을 때',
    detail: '내 자료 기반이라 답이 더 정확해집니다.',
    url: 'notebooklm.google.com',
    videoTitle: 'NotebookLM demo',
    videoCaption: '자료 업로드부터 근거 기반 답변까지 바로 보입니다.',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/6dHmu1GALmA?rel=0&modestbranding=1&playsinline=1',
    videoWatchUrl: 'https://www.youtube.com/watch?v=6dHmu1GALmA',
    videoSourceLabel: 'Google Cloud',
  },
  {
    badge: 'PRESENT',
    icon: '📊',
    title: 'Gamma',
    subtitle: '발표 초안과 디자인 시안',
    useCase: '주제는 있는데 첫 화면이 막힐 때',
    detail: '핵심 문장만으로도 첫 초안을 빠르게 띄웁니다.',
    url: 'gamma.app',
    videoTitle: 'How to Use Gamma AI',
    videoCaption: '프롬프트에서 발표 초안이 잡히는 장면이 선명합니다.',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/KcbXKUR7-a0?rel=0&modestbranding=1&playsinline=1',
    videoWatchUrl: 'https://www.youtube.com/watch?v=KcbXKUR7-a0',
    videoSourceLabel: 'Kevin Stratvert',
  },
];

function OverlayVideo({ tool }: { tool: StarterTool }) {
  return (
    <div className="rounded-[1.5rem] border border-white/10 bg-white/5 p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[12px] font-semibold tracking-[0.16em] text-slate-400 uppercase">시연 영상</p>
          <p className="mt-1 text-[0.98rem] font-semibold leading-snug text-white">{tool.videoTitle}</p>
        </div>
        <span className="rounded-full border border-cyan-400/25 bg-cyan-400/10 px-2.5 py-1 text-[12px] font-semibold text-cyan-100">
          {tool.videoSourceLabel}
        </span>
      </div>
      <div className="mt-3 overflow-hidden rounded-[1.2rem] border border-white/8 bg-black">
        <div className="aspect-[16/9]">
          <iframe
            src={tool.videoEmbedUrl}
            title={tool.videoTitle}
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

export default function StarterToolkitShowcase() {
  const [selectedTool, setSelectedTool] = useState<StarterTool | null>(null);

  return (
    <div className="relative -mt-1 flex-1 min-h-0">
      <div className="grid grid-cols-4 items-start gap-5">
        {starterTools.map((tool) => (
          <button
            key={tool.title}
            type="button"
            onClick={() => setSelectedTool(tool)}
            className="group flex h-[25rem] flex-col rounded-[1.8rem] border border-white/12 bg-linear-to-b from-slate-900/85 to-[#08111d] p-6 text-left shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/35 hover:bg-linear-to-b hover:from-slate-900 hover:to-[#0b1523]"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="text-6xl">{tool.icon}</span>
              <span className="deck-chip">{tool.badge}</span>
            </div>

            <div className="mt-6 w-full text-left">
              <p className="text-[2.2rem] font-semibold text-white">{tool.title}</p>
              <p className="mt-2 text-lg text-slate-300">{tool.subtitle}</p>
            </div>

            <div className="mt-auto flex min-h-[7.4rem] w-full flex-col border-t border-white/10 pt-3 text-left">
              <p className="text-sm tracking-[0.18em] text-slate-500 uppercase">잘 맞는 순간</p>
              <p className="mt-2 text-xl text-slate-200">{tool.useCase}</p>
            </div>

            <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/8 pt-3">
              <span className="text-sm font-semibold tracking-[0.12em] text-slate-400 uppercase">{tool.url}</span>
              <span className="rounded-full border border-cyan-400/22 bg-cyan-950/35 px-4 py-2 text-sm font-semibold text-white transition-colors group-hover:border-cyan-300/35 group-hover:bg-cyan-950/55">
                시연 보기
              </span>
            </div>
          </button>
        ))}
      </div>

      {selectedTool ? (
        <div
          className="fixed inset-0 z-[140] flex items-center justify-center p-6"
          onClick={() => setSelectedTool(null)}
        >
          <div
            aria-hidden="true"
            onClick={() => setSelectedTool(null)}
            className="absolute inset-0 bg-slate-950/78 backdrop-blur-md"
          />

          <div
            className="animate-fade-slide-up relative z-10 grid max-h-full w-full max-w-[1320px] grid-cols-[0.92fr_1.08fr] gap-4 overflow-hidden rounded-[2rem] border border-cyan-400/18 bg-linear-to-b from-slate-900/96 to-[#050c16]/98 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.46)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex flex-col rounded-[1.6rem] border border-cyan-400/18 bg-cyan-950/20 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-cyan-200">{selectedTool.url}</p>
                  <h3 className="mt-2 break-keep text-[2.05rem] font-semibold leading-[1.08] tracking-[-0.03em] text-white">
                    {selectedTool.title}
                  </h3>
                  <p className="mt-3 text-[1.08rem] leading-[1.55] text-slate-200">{selectedTool.subtitle}</p>
                </div>
                <button
                  type="button"
                  aria-label="상세 패널 닫기"
                  onClick={() => setSelectedTool(null)}
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
                {selectedTool.badge}
              </div>

              <div className="mt-5 rounded-[1.3rem] border border-white/8 bg-black/18 px-4 py-4">
                <p className="text-[12px] font-semibold tracking-[0.14em] text-slate-400 uppercase">잘 맞는 순간</p>
                <p className="mt-2 break-keep text-[1.08rem] leading-[1.62] text-cyan-50">
                  {selectedTool.useCase}
                </p>
              </div>

              <div className="mt-4 rounded-[1.3rem] border border-white/8 bg-white/4 px-4 py-4">
                <p className="text-[12px] font-semibold tracking-[0.14em] text-slate-400 uppercase">먼저 보는 이유</p>
                <p className="mt-2 break-keep text-[1rem] leading-[1.62] text-slate-200">
                  {selectedTool.detail}
                </p>
              </div>

              <div className="mt-auto pt-4">
                <a
                  href={selectedTool.videoWatchUrl}
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
                  영상 핵심 장면
                </p>
                <p className="mt-2 break-keep text-[1rem] leading-[1.62] text-slate-200">
                  {selectedTool.videoCaption}
                </p>
              </div>
              <OverlayVideo tool={selectedTool} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
