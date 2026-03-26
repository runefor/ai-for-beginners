'use client';

import { useCallback, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import TypingEffect from '@/components/interactive/TypingEffect';
import { withBasePath } from '@/lib/utils';

type TabId = 'chat' | 'document' | 'image' | 'video' | 'agent';

const tabConfig: { id: TabId; icon: string; label: string }[] = [
  { id: 'chat', icon: '💬', label: '질문' },
  { id: 'document', icon: '📄', label: '문서' },
  { id: 'image', icon: '🎨', label: '이미지' },
  { id: 'video', icon: '🎬', label: '영상' },
  { id: 'agent', icon: '🛠️', label: '작업' },
];

const tabData: Record<
  TabId,
  {
    description: string;
    prompt: string;
    tool: string;
    toolColor: string;
    time: string;
  }
> = {
  chat: {
    description: '질문하면 바로 초안이 나옵니다',
    prompt: '이번 주말 서울에서 비 와도 괜찮은 실내 데이트 코스 3개 추천해줘',
    tool: 'ChatGPT / Gemini / Claude',
    toolColor: 'bg-emerald-500/90',
    time: '~5초',
  },
  document: {
    description: '문서를 넣으면 요약과 할 일이 나옵니다',
    prompt: '이 회의록을 3줄로 요약하고, 담당자별 할 일을 정리해줘',
    tool: 'NotebookLM',
    toolColor: 'bg-cyan-500/90',
    time: '~10초',
  },
  image: {
    description: '문장 한 줄이 이미지 초안이 됩니다',
    prompt: '우리 동네 분식집 홍보용 레트로 포스터 만들어줘',
    tool: 'ChatGPT 이미지 / Midjourney',
    toolColor: 'bg-fuchsia-500/90',
    time: '~15초',
  },
  video: {
    description: '짧은 설명이 바로 영상이 됩니다',
    prompt: '석양 속 도쿄 거리를 천천히 걷는 장면, 영화 예고편 분위기',
    tool: 'Veo / Sora',
    toolColor: 'bg-rose-500/90',
    time: '~1분',
  },
  agent: {
    description: '조사부터 실행까지 이어집니다',
    prompt: '이번 주 고객 미팅 후보 시간을 찾아서 표로 정리하고 초안 메일까지 써줘',
    tool: 'ChatGPT agent / Cowork / OpenClaw',
    toolColor: 'bg-amber-500/90',
    time: '~1~3분',
  },
};

export default function GenerativeAIShowcase() {
  const [activeTab, setActiveTab] = useState<TabId>('chat');
  const [steps, setSteps] = useState<Record<TabId, number>>({
    chat: 0,
    document: 0,
    image: 0,
    video: 0,
    agent: 0,
  });
  const [typingDone, setTypingDone] = useState(false);

  const currentStep = steps[activeTab];

  const advance = () => {
    if (currentStep < 2) {
      setSteps((prev) => ({ ...prev, [activeTab]: prev[activeTab] + 1 }));
      if (currentStep === 0) {
        setTypingDone(false);
      }
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value as TabId);
    setTypingDone(false);
  };

  const handleTypingComplete = useCallback(() => {
    setTypingDone(true);
  }, []);

  const renderResult = (tabId: TabId) => {
    switch (tabId) {
      case 'chat':
        return (
          <div className="animate-fade-slide-up rounded-[1.5rem] border border-white/10 bg-white/5 p-5 text-left">
            <p className="text-lg font-semibold text-cyan-200">추천 코스</p>
            <div className="mt-4 space-y-3 text-lg text-slate-200">
              <div className="rounded-xl bg-black/20 p-3">1. 코엑스 별마당도서관 + 아쿠아리움 + 실내 카페</div>
              <div className="rounded-xl bg-black/20 p-3">2. 국립중앙박물관 + 용산 실내 전시 + 브런치</div>
              <div className="rounded-xl bg-black/20 p-3">3. 성수 팝업스토어 + 편집숍 + 디저트 카페</div>
            </div>
          </div>
        );
      case 'document':
        return (
          <div className="animate-fade-slide-up rounded-[1.5rem] border border-white/10 bg-white/5 p-5 text-left">
            <p className="text-lg font-semibold text-cyan-200">3줄 요약</p>
            <p className="mt-3 text-lg leading-relaxed text-slate-200">
              신규 서비스 일정은 2주 미뤄졌고, 디자인 시안은 금요일까지 확정합니다.
              마케팅 팀은 다음 주까지 소개 페이지 초안을 제출합니다. 개발팀은 결제 오류를 우선 수정합니다.
            </p>
            <div className="mt-5 rounded-[1.2rem] bg-black/20 p-4">
              <p className="text-sm font-semibold tracking-[0.2em] text-slate-400 uppercase">액션 아이템</p>
              <ul className="mt-3 space-y-2 text-base text-slate-200">
                <li>- 디자인: 금요일 오후 3시까지 최종 시안 공유</li>
                <li>- 마케팅: 소개 페이지 초안 작성</li>
                <li>- 개발: 결제 오류 수정 일정 보고</li>
              </ul>
            </div>
          </div>
        );
      case 'image':
        return (
          <div className="animate-fade-slide-up flex flex-col items-center gap-3">
            <div
              className="flex h-52 w-80 items-center justify-center overflow-hidden rounded-[1.5rem]"
              style={{
                background:
                  'linear-gradient(135deg, #431407 0%, #9a3412 35%, #f97316 70%, #fed7aa 100%)',
              }}
            >
              <div className="rounded-[1.5rem] border border-orange-200/50 bg-white/10 px-6 py-4 text-center backdrop-blur-sm">
                <p className="text-sm font-semibold tracking-[0.3em] text-orange-100 uppercase">Seoul Tteokbokki</p>
                <p className="mt-3 text-4xl">🍢</p>
                <p className="mt-3 text-lg font-bold text-white">복고풍 포스터 생성</p>
              </div>
            </div>
            <p className="text-sm text-slate-400">한 줄이면 홍보 초안이 뜹니다.</p>
          </div>
        );
      case 'video':
        return (
          <div className="animate-fade-slide-up">
            <div className="mx-auto max-w-4xl overflow-hidden rounded-[1.5rem] bg-black/20 p-2">
              <video
                width="560"
                height="215"
                controls
                muted
                autoPlay
                loop
                playsInline
                className="w-full rounded-[1.3rem] bg-black object-contain"
              >
                <source src={withBasePath('/images/showcase/sora-tokyo-walk.mp4')} type="video/mp4" />
              </video>
            </div>
            <p className="mt-3 text-center text-sm text-slate-400">장면 설명만으로 영상 초안이 뜹니다.</p>
          </div>
        );
      case 'agent':
        return (
          <div className="animate-fade-slide-up rounded-[1.5rem] border border-white/10 bg-white/5 p-5 text-left">
            <p className="text-lg font-semibold text-cyan-200">AI가 대신 처리하는 순서</p>
            <div className="mt-4 space-y-3">
              {[
                '캘린더에서 가능한 시간 확인',
                '회의 후보 시간을 표로 정리',
                '메일 초안 작성',
                '사람이 검토 후 전송',
              ].map((step, index) => (
                <div
                  key={step}
                  className="flex items-center gap-3 rounded-xl bg-black/20 px-4 py-3 text-base text-slate-200"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500/20 text-sm font-semibold text-amber-200">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </div>
              ))}
            </div>
            <p className="mt-4 text-sm text-slate-400">자동 실행 전 최종 확인은 사람 몫입니다.</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <Tabs value={activeTab} onValueChange={handleTabChange} className="mx-auto flex w-full max-w-5xl flex-col gap-4">
      <TabsList className="mx-auto h-auto max-w-full flex-wrap justify-center rounded-full border border-white/10 bg-white/6 p-2">
        {tabConfig.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className="rounded-full px-4 py-2 text-base text-slate-400 data-[state=active]:bg-white/10 data-[state=active]:text-white"
          >
            <span className="mr-1.5">{tab.icon}</span> {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabConfig.map((tab) => {
        const data = tabData[tab.id];
        const step = steps[tab.id];

        return (
          <TabsContent key={tab.id} value={tab.id} className="mt-0">
            <div className="relative min-h-[420px] rounded-[1.8rem] border border-white/10 bg-white/4 p-6">
              {step === 0 ? (
                <div className="flex h-[340px] flex-col items-center justify-center gap-5">
                  <span className="text-7xl">{tab.icon}</span>
                  <h3 className="max-w-2xl text-center text-3xl font-semibold text-white">{data.description}</h3>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex justify-end">
                    <div className="max-w-[78%] rounded-[1.6rem] rounded-br-sm bg-cyan-600/90 px-5 py-3 text-lg text-white">
                      {step === 1 && !typingDone ? (
                        <TypingEffect text={data.prompt} speed={30} onComplete={handleTypingComplete} />
                      ) : (
                        data.prompt
                      )}
                    </div>
                  </div>

                  {step >= 2 ? (
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-sm">🤖</div>
                        <span className="text-sm text-slate-400">AI</span>
                      </div>
                      {renderResult(tab.id)}
                      <div className="flex items-center justify-center gap-3">
                        <span className={`rounded-full ${data.toolColor} px-3 py-1 text-xs font-medium text-white`}>
                          {data.tool}
                        </span>
                        <span className="text-xs text-slate-300">⏱ {data.time}</span>
                      </div>
                    </div>
                  ) : null}
                </div>
              )}

              {step < 2 ? (
                <button
                  type="button"
                  onClick={advance}
                  className="absolute right-5 bottom-5 rounded-full border border-white/12 bg-white/8 px-5 py-2 text-sm font-semibold text-slate-100 transition-colors hover:bg-white/14"
                >
                  다음
                </button>
              ) : null}
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
