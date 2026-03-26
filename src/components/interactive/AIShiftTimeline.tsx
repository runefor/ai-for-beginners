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
    title: 'OpenAI가 Operator를 리서치 프리뷰로 공개',
    cardTitle: '웹을 대신 움직이는 AI',
    productName: 'Operator',
    detail: 'AI가 브라우저 화면을 보고 클릭하고 스크롤하며, 사람이 하던 웹 작업을 대신 수행하기 시작한 사례입니다.',
    takeaway: '이때부터 AI는 답만 하는 도구를 넘어, 웹에서 직접 클릭하고 작업하는 단계로 넘어갔습니다.',
    videoTitle: 'OpenAI Operator Demo',
    videoCaption: '시작부터 Operator 화면과 실제 요청 예시가 바로 보여서, 브라우저를 대신 움직이는 AI라는 점을 이해시키기에 더 적합한 시연 영상입니다.',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/WMMxD0Z2IeE?rel=0&modestbranding=1&playsinline=1',
    videoWatchUrl: 'https://www.youtube.com/watch?v=WMMxD0Z2IeE',
    videoSourceLabel: 'Weiran Ye',
    icon: '🌐',
    tag: 'OpenAI',
    tagClassName: 'bg-emerald-500/15 text-emerald-300',
  },
  {
    date: '2025.02.02',
    title: 'OpenAI가 deep research를 공개',
    cardTitle: '조사를 대신 해주는 AI',
    productName: 'deep research',
    detail: '복잡한 질문을 여러 단계로 조사하고, 출처를 정리해 보고서 형태의 결과물까지 만드는 흐름을 보여준 제품입니다.',
    takeaway: '이제 AI는 한 번 답하고 끝나는 것이 아니라, 자료를 찾아 정리해 결과물까지 만들어줍니다.',
    videoTitle: 'OpenAI deep research in practice.',
    videoCaption: 'OpenAI 공식 실사용 데모로, 질문을 이해하고 자료를 찾아 근거 있는 결과를 정리하는 흐름을 짧게 보여줍니다.',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/zm6F0vo2E64?start=39&rel=0&modestbranding=1&playsinline=1',
    videoWatchUrl: 'https://www.youtube.com/watch?v=zm6F0vo2E64&t=39s',
    videoSourceLabel: 'OpenAI',
    icon: '🔎',
    tag: 'OpenAI',
    tagClassName: 'bg-sky-500/15 text-sky-300',
  },
  {
    date: '2025.07.17',
    title: 'OpenAI가 ChatGPT agent를 공식 출시',
    cardTitle: '조사하고 실행하는 AI',
    productName: 'ChatGPT agent',
    detail: '조사 기능과 웹 실행 기능이 합쳐지면서, 요청을 이해하고 실제 작업까지 이어지는 흐름이 한 화면에 담기기 시작했습니다.',
    takeaway: 'AI가 답변 도구를 넘어, 일을 끝까지 처리하는 작업 파트너로 바뀌는 흐름을 보여줍니다.',
    videoTitle: 'Delegate work to ChatGPT agent',
    videoCaption: 'OpenAI 공식 데모로, 조사부터 스프레드시트 정리와 후속 온라인 작업까지 한 번에 이어지는 흐름을 보여줍니다.',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/AGr_Xolg0Ps?start=7&rel=0&modestbranding=1&playsinline=1',
    videoWatchUrl: 'https://www.youtube.com/watch?v=AGr_Xolg0Ps&t=7s',
    videoSourceLabel: 'OpenAI',
    icon: '🤖',
    tag: 'Agent',
    tagClassName: 'bg-violet-500/15 text-violet-300',
  },
  {
    date: '2026.01.30',
    title: 'Anthropic이 Cowork 시연으로 AI 동료 개념을 보여줌',
    cardTitle: '업무 화면에서 함께 일하는 AI',
    productName: 'Cowork',
    detail: '채팅창 밖의 실제 업무 환경에서 AI가 자료를 읽고 정리하며 다음 작업까지 이어가는 모습을 보여준 시연입니다.',
    takeaway: '앞으로는 AI를 따로 부르는 것이 아니라, 일하는 화면 안에서 함께 쓰게 될 가능성이 큽니다.',
    videoTitle: 'Claude Cowork: The AI That Actually Does Your Work',
    videoCaption: '파일 정리, 리포트 작성, 커넥터 연결, 브라우저 연동까지 실제 화면으로 이어서 보여주는 핸즈온 데모입니다.',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/pXR_bShli10?start=121&rel=0&modestbranding=1&playsinline=1',
    videoWatchUrl: 'https://www.youtube.com/watch?v=pXR_bShli10&t=121s',
    videoSourceLabel: 'The Tech Girl',
    icon: '🧑‍💻',
    tag: 'Anthropic',
    tagClassName: 'bg-cyan-500/15 text-cyan-300',
  },
  {
    date: '2026.03.13',
    title: 'ChatGPT 앱 연동에 write actions 기능이 추가',
    cardTitle: '앱에 결과를 직접 반영하는 AI',
    productName: 'Write actions',
    detail: '메일, 문서, 일정 같은 연결된 서비스에 AI가 실제 결과를 작성하거나 반영할 수 있게 된 업데이트입니다.',
    takeaway: '이제 AI는 답을 보여주는 데서 끝나지 않고, 다른 앱에 결과를 직접 남길 수 있습니다.',
    videoTitle: 'Apps in ChatGPT',
    videoCaption: 'OpenAI 공식 소개 영상으로, ChatGPT 안에서 외부 앱과 연결해 결과를 주고받는 경험을 가장 직접적으로 보여줍니다.',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/2C4Cs6503gw?rel=0&modestbranding=1&playsinline=1',
    videoWatchUrl: 'https://www.youtube.com/watch?v=2C4Cs6503gw',
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
        <p className="text-[0.95rem] font-semibold tracking-[0.16em] text-cyan-100 uppercase">
          2025.01 - 2026.03 | 최근 AI는 답변형 도구에서 실행형 도구로 바뀌고 있습니다
        </p>
      </div>

      <div className="relative flex-1">
        <div className="pointer-events-none absolute top-1/2 right-8 left-8 h-px -translate-y-1/2 bg-linear-to-r from-cyan-400/0 via-cyan-400/40 to-cyan-400/0" />
        <div className="grid grid-cols-5 gap-3">
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
