'use client';

import { useState } from 'react';

interface Milestone {
  date: string;
  title: string;
  cardTitle: string;
  productName: string;
  detail: string;
  takeaway: string;
  videoTitle: string;
  videoCaption: string;
  videoEmbedUrl: string;
  videoWatchUrl: string;
  videoSourceLabel: string;
  icon: string;
  tag: string;
  tagClassName: string;
}

const milestones: Milestone[] = [
  {
    date: '2025.01.23',
    title: 'OpenAI, Operator를 리서치 프리뷰로 공개',
    cardTitle: '웹을 대신 움직이는 AI',
    productName: 'Operator',
    detail: '브라우저를 직접 보고 클릭하고 스크롤하는 에이전트형 제품이 소비자 접점에 등장한 초기 사례입니다.',
    takeaway: '"AI가 웹에서 직접 행동하기 시작했다"는 변화로 설명하면 가장 빠르게 이해됩니다.',
    videoTitle: 'Operator 공식 데모',
    videoCaption: 'OpenAI가 직접 보여준 예약, 구매, 웹 조작 흐름입니다.',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/gYqs-wUKZsM?rel=0&modestbranding=1&playsinline=1',
    videoWatchUrl: 'https://www.youtube.com/watch?v=gYqs-wUKZsM',
    videoSourceLabel: 'OpenAI',
    icon: '🌐',
    tag: 'OpenAI',
    tagClassName: 'bg-emerald-500/15 text-emerald-300',
  },
  {
    date: '2025.02.02',
    title: 'OpenAI, deep research를 공개',
    cardTitle: '조사를 맡아주는 AI',
    productName: 'deep research',
    detail: '복잡한 질문을 단계적으로 조사하고, 출처를 모아 보고서 형태로 정리하는 흐름을 전면에 내세운 제품입니다.',
    takeaway: '"답변형 AI"보다 "리서치 결과물을 만들어주는 AI"라고 설명하는 쪽이 자연스럽습니다.',
    videoTitle: 'deep research 사용자 사례',
    videoCaption: '리서치 업무를 실제로 어떻게 줄여주는지 보여주는 OpenAI 공식 사례 영상입니다.',
    videoEmbedUrl: 'https://player.vimeo.com/video/1052813124?h=29ea9af4d7&title=0&byline=0&portrait=0',
    videoWatchUrl: 'https://vimeo.com/1052813124',
    videoSourceLabel: 'OpenAI',
    icon: '🔎',
    tag: 'OpenAI',
    tagClassName: 'bg-sky-500/15 text-sky-300',
  },
  {
    date: '2025.07.17',
    title: 'OpenAI, ChatGPT agent를 공식 출시',
    cardTitle: '조사와 실행을 함께 하는 AI',
    productName: 'ChatGPT agent',
    detail: '브라우저 조작과 조사 기능을 묶어, 요청을 받아 결과물까지 이어지는 통합형 작업 경험을 제시했습니다.',
    takeaway: '"대답하는 챗봇"에서 "일을 끝까지 처리하는 인터페이스"로 바뀌는 장면입니다.',
    videoTitle: 'ChatGPT agent 실제 작업 데모',
    videoCaption: '스프레드시트 작성과 실행 흐름까지 이어지는 OpenAI 공식 데모입니다.',
    videoEmbedUrl: 'https://player.vimeo.com/video/1101942353?h=c72fb80a6e&title=0&byline=0&portrait=0',
    videoWatchUrl: 'https://vimeo.com/1101942353',
    videoSourceLabel: 'OpenAI',
    icon: '🤖',
    tag: 'Agent',
    tagClassName: 'bg-violet-500/15 text-violet-300',
  },
  {
    date: '2026.01.30',
    title: 'Anthropic, Cowork 시연으로 AI 동료 개념을 보여줌',
    cardTitle: '업무 화면에서 같이 일하는 AI',
    productName: 'Cowork',
    detail: '실제 업무 공간에서 AI가 파일을 읽고 정리하고 다음 작업까지 이어가는 동료형 인터페이스를 보여준 시연입니다.',
    takeaway: '"채팅창 속 AI"가 아니라 "업무 화면 안에서 같이 일하는 AI"라고 설명하면 받아들이기 쉽습니다.',
    videoTitle: 'Cowork 설명형 데모',
    videoCaption: 'Cowork의 실제 사용 흐름을 길지 않게 설명해주는 외부 데모 영상입니다.',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/I7p77eJZIBI?rel=0&modestbranding=1&playsinline=1',
    videoWatchUrl: 'https://www.youtube.com/watch?v=I7p77eJZIBI',
    videoSourceLabel: 'Tool Finder',
    icon: '🧑‍💻',
    tag: 'Anthropic',
    tagClassName: 'bg-cyan-500/15 text-cyan-300',
  },
  {
    date: '2026.03.13',
    title: 'ChatGPT 앱 연동에 write actions가 추가',
    cardTitle: '앱에 결과를 바로 쓰는 AI',
    productName: 'Write actions',
    detail: '메일 초안 작성, 문서 생성, 일정 설정처럼 연결된 앱에 실제 결과를 써 넣는 작업까지 가능해진 업데이트입니다.',
    takeaway: '"답을 보여주는 단계"를 넘어 "앱에 결과를 반영하는 단계"로 넘어갔다고 설명할 수 있습니다.',
    videoTitle: 'Apps in ChatGPT 공식 빌드 데모',
    videoCaption: 'OpenAI 공식 Build Hour에서 Apps in ChatGPT를 실제로 다루는 데모 구간입니다.',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/mFG-4vUJ0kI?start=247&rel=0&modestbranding=1&playsinline=1',
    videoWatchUrl: 'https://www.youtube.com/watch?v=mFG-4vUJ0kI&t=247s',
    videoSourceLabel: 'OpenAI',
    icon: '🔗',
    tag: 'Apps',
    tagClassName: 'bg-pink-500/15 text-pink-300',
  },
];

function OverlayVideo({ milestone }: { milestone: Milestone }) {
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
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone | null>(null);

  return (
    <div className="relative mx-auto flex h-full w-full max-w-[1480px] flex-col gap-4">
      <div className="rounded-full border border-cyan-500/20 bg-linear-to-r from-cyan-950/35 via-slate-950 to-slate-950 px-6 py-3 text-center shadow-[0_18px_40px_rgba(8,145,178,0.12)]">
        <p className="text-[12px] font-semibold tracking-[0.16em] text-cyan-100 uppercase md:text-[0.95rem]">
          2025.01 - 2026.03 | 요즘 AI의 핵심은 대화가 아니라 실행입니다
        </p>
      </div>

      <div className="relative flex-1">
        <div className="pointer-events-none absolute top-1/2 right-8 left-8 hidden h-px -translate-y-1/2 bg-linear-to-r from-cyan-400/0 via-cyan-400/40 to-cyan-400/0 lg:block" />
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-5">
          {milestones.map((milestone) => (
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
                  Open Detail
                </span>
                <span className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[12px] font-semibold text-white transition-colors group-hover:border-cyan-400/25 group-hover:bg-cyan-950/35">
                  보기
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
            className="animate-fade-slide-up relative z-10 grid max-h-full w-full max-w-[1320px] gap-4 overflow-hidden rounded-[2rem] border border-cyan-400/18 bg-linear-to-b from-slate-900/96 to-[#050c16]/98 p-5 shadow-[0_30px_100px_rgba(0,0,0,0.46)] xl:grid-cols-[0.9fr_1.1fr]"
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
                <p className="text-[12px] font-semibold tracking-[0.14em] text-slate-400 uppercase">
                  초보자에게 중요한 한 줄
                </p>
                <p className="mt-2 break-keep text-[1.08rem] leading-[1.62] text-cyan-50">
                  {selectedMilestone.takeaway}
                </p>
              </div>

              <div className="mt-4 rounded-[1.3rem] border border-white/8 bg-white/4 px-4 py-4">
                <p className="text-[12px] font-semibold tracking-[0.14em] text-slate-400 uppercase">
                  왜 중요한가
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
                  영상에서 바로 보이는 장면
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
