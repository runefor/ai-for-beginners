'use client';

import { useState, useCallback } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import TypingEffect from '@/components/interactive/TypingEffect';

type TabId = 'hallucination' | 'bias' | 'outdated';

export default function AILimitationsShowcase() {
  const [activeTab, setActiveTab] = useState<TabId>('hallucination');
  const [steps, setSteps] = useState<Record<TabId, number>>({
    hallucination: 0,
    bias: 0,
    outdated: 0,
  });
  const [typingDone, setTypingDone] = useState(false);

  const currentStep = steps[activeTab];
  const maxSteps: Record<TabId, number> = {
    hallucination: 2,
    bias: 2,
    outdated: 2,
  };

  const advance = () => {
    if (currentStep < maxSteps[activeTab]) {
      setSteps((prev) => ({ ...prev, [activeTab]: prev[activeTab] + 1 }));
    }
  };

  const handleTypingComplete = useCallback(() => {
    setTypingDone(true);
  }, []);

  const aiResponse =
    '네, "Martinez v. Delta Airlines (2019)" 판례에 따르면 항공사는 승객에게 보상금을 지급해야 합니다. 또한 "Johnson v. United (2021)" 판례도 참고하시면...';

  return (
    <Tabs
      value={activeTab}
      onValueChange={(value) => setActiveTab(value as TabId)}
      className="mx-auto flex w-full max-w-5xl flex-col gap-4"
    >
      <TabsList className="mx-auto w-fit rounded-full border border-white/10 bg-white/6 p-2">
        <TabsTrigger value="hallucination" className="rounded-full px-4 py-2 text-slate-400 data-[state=active]:bg-white/10 data-[state=active]:text-white">
          🤥 환각
        </TabsTrigger>
        <TabsTrigger value="bias" className="rounded-full px-4 py-2 text-slate-400 data-[state=active]:bg-white/10 data-[state=active]:text-white">
          ⚖️ 편향
        </TabsTrigger>
        <TabsTrigger value="outdated" className="rounded-full px-4 py-2 text-slate-400 data-[state=active]:bg-white/10 data-[state=active]:text-white">
          📅 최신정보
        </TabsTrigger>
      </TabsList>

      <TabsContent value="hallucination" className="mt-0">
        <div className="relative min-h-[430px] rounded-[1.8rem] border border-white/10 bg-white/4 p-6">
          <h3 className="mb-1 text-2xl font-semibold text-rose-300">환각 (Hallucination)</h3>
          <p className="mb-5 text-base text-slate-500">
            가짜 판례 제출 사건이 대표 사례입니다.
          </p>
          <div className="space-y-4">
            <div className="flex justify-end">
              <div className="max-w-[70%] rounded-[1.6rem] rounded-br-sm bg-cyan-600/90 px-5 py-3 text-lg text-white">
                이 법적 판례에 대해 알려줘
              </div>
            </div>

            {steps.hallucination >= 1 ? (
              <div className="flex justify-start">
                <div className="max-w-[82%] rounded-[1.6rem] rounded-bl-sm bg-white/8 px-5 py-3 text-lg text-slate-200">
                  {typingDone ? (
                    <span>{aiResponse}</span>
                  ) : (
                    <TypingEffect text={aiResponse} speed={25} onComplete={handleTypingComplete} />
                  )}
                  <div className="mt-4 flex items-center gap-2">
                    <span className="text-xs text-slate-500">자신감</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-emerald-400 transition-all duration-1000" style={{ width: '95%' }} />
                    </div>
                    <span className="text-xs font-bold text-emerald-300">95%</span>
                  </div>
                </div>
              </div>
            ) : null}
          </div>

          {steps.hallucination >= 2 ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-stamp -rotate-12 rounded-[1.5rem] border-4 border-rose-500 bg-rose-950/92 px-8 py-5 text-center">
                <p className="text-4xl font-black text-rose-400">FAKE</p>
                <p className="mt-1 text-xl font-bold text-rose-200">가짜 판례 6건 전부 허구</p>
                <p className="mt-2 text-sm text-slate-300">유창해도 허구일 수 있습니다.</p>
              </div>
            </div>
          ) : null}

          {currentStep < maxSteps.hallucination && activeTab === 'hallucination' ? (
            <button
              type="button"
              onClick={advance}
              className="absolute right-5 bottom-5 rounded-full border border-white/12 bg-white/8 px-5 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/14"
            >
              다음
            </button>
          ) : null}
        </div>
      </TabsContent>

      <TabsContent value="bias" className="mt-0">
        <div className="relative min-h-[430px] rounded-[1.8rem] border border-white/10 bg-white/4 p-6">
          <h3 className="mb-1 text-2xl font-semibold text-rose-300">편향 (Bias)</h3>
          <p className="mb-6 text-base text-slate-500">
            Amazon 채용 도구 사례가 가장 유명합니다.
          </p>

          <div className="mx-auto max-w-2xl space-y-8">
            <h4 className="text-center text-xl font-medium text-slate-300">AI 채용 점수 비교</h4>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-lg text-cyan-200">남성 지원자</span>
                {steps.bias >= 1 ? <span className="text-lg font-bold text-cyan-200">85점</span> : null}
              </div>
              <div className="h-11 overflow-hidden rounded-full bg-white/8">
                <div
                  className="flex h-full items-center rounded-full bg-cyan-500/85 px-4 transition-all duration-1000"
                  style={{ width: steps.bias >= 1 ? '85%' : '0%' }}
                >
                  {steps.bias >= 1 ? <span className="text-sm font-bold text-white">85 / 100</span> : null}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-lg text-amber-200">여성 지원자</span>
                {steps.bias >= 1 ? <span className="text-lg font-bold text-amber-200">50점</span> : null}
              </div>
              <div className="h-11 overflow-hidden rounded-full bg-white/8">
                <div
                  className="flex h-full items-center rounded-full bg-amber-500/85 px-4 transition-all duration-1000"
                  style={{ width: steps.bias >= 1 ? '50%' : '0%' }}
                >
                  {steps.bias >= 1 ? <span className="text-sm font-bold text-white">50 / 100</span> : null}
                </div>
              </div>
            </div>

            {steps.bias >= 2 ? (
              <div className="flex flex-col items-center gap-2 rounded-[1.4rem] border border-rose-400/18 bg-rose-950/20 p-5">
                <div className="text-3xl font-black text-rose-300">35점 차이</div>
                <p className="text-center text-lg text-slate-200">같은 실력이어도 기준이 흔들렸습니다.</p>
                <p className="text-sm text-slate-500">Amazon은 이 시스템을 폐기했습니다.</p>
              </div>
            ) : null}
          </div>

          {currentStep < maxSteps.bias && activeTab === 'bias' ? (
            <button
              type="button"
              onClick={advance}
              className="absolute right-5 bottom-5 rounded-full border border-white/12 bg-white/8 px-5 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/14"
            >
              다음
            </button>
          ) : null}
        </div>
      </TabsContent>

      <TabsContent value="outdated" className="mt-0">
        <div className="relative min-h-[430px] rounded-[1.8rem] border border-white/10 bg-white/4 p-6">
          <h3 className="mb-1 text-2xl font-semibold text-rose-300">최신 정보 부족</h3>
          <p className="mb-6 text-base text-slate-500">AI는 학습이 끝난 시점 이후의 정보를 기본적으로 모릅니다.</p>

          <div className="mx-auto max-w-3xl">
            <div className="relative flex items-center justify-between">
              <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 bg-slate-700" />

              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-950 text-2xl ring-2 ring-cyan-400">📚</div>
                <span className="text-sm font-medium text-cyan-200">학습 시작</span>
                <span className="text-xs text-slate-500">데이터 수집</span>
              </div>

              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-cyan-950 text-2xl ring-2 ring-cyan-400">🧠</div>
                <span className="text-sm font-medium text-cyan-200">학습 완료</span>
                <span className="text-xs text-slate-500">패턴 습득</span>
              </div>

              {steps.outdated >= 1 ? (
                <div className="relative z-20 flex flex-col items-center gap-2">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rose-950 text-2xl ring-4 ring-rose-400">🛑</div>
                  <span className="text-sm font-bold text-rose-200">학습 마감</span>
                  <span className="text-xs text-rose-300">여기까지만 앎</span>
                </div>
              ) : null}

              {steps.outdated >= 1 ? (
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-dashed border-rose-700 bg-rose-950/15 text-2xl">?</div>
                  <span className="text-sm font-medium text-rose-200">모르는 영역</span>
                  <span className="text-xs text-slate-500">최신 정보 부재</span>
                </div>
              ) : null}
            </div>

            {steps.outdated >= 1 ? (
              <div className="mx-auto mt-4 h-10 w-px border-l-2 border-dashed border-rose-400/50" />
            ) : null}

            {steps.outdated >= 2 ? (
              <div className="mt-4 space-y-3">
                <div className="flex justify-end">
                  <div className="max-w-[70%] rounded-[1.4rem] rounded-br-sm bg-cyan-600/90 px-4 py-2 text-base text-white">
                    2024 올림픽 금메달 수 1위 국가는?
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-[70%] rounded-[1.4rem] rounded-bl-sm bg-rose-950/30 px-4 py-2 text-base text-slate-200">
                    <span className="text-rose-300">주의 </span>
                    제 학습 데이터에는 2024 올림픽 결과가 포함되어 있지 않습니다.
                  </div>
                </div>
                <p className="text-center text-sm text-slate-500">최신 정보는 검색과 연결이 있어야 잡힙니다.</p>
              </div>
            ) : null}
          </div>

          {currentStep < maxSteps.outdated && activeTab === 'outdated' ? (
            <button
              type="button"
              onClick={advance}
              className="absolute right-5 bottom-5 rounded-full border border-white/12 bg-white/8 px-5 py-2 text-sm font-semibold text-slate-100 transition hover:bg-white/14"
            >
              다음
            </button>
          ) : null}
        </div>
      </TabsContent>
    </Tabs>
  );
}
