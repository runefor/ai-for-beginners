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
      onValueChange={(v) => setActiveTab(v as TabId)}
      className="mx-auto w-full max-w-4xl"
    >
      <TabsList className="mx-auto w-fit bg-white/10">
        <TabsTrigger
          value="hallucination"
          className="text-gray-400 data-[state=active]:bg-white/15 data-[state=active]:text-white"
        >
          <span className="mr-1.5">&#x1F925;</span> 환각
        </TabsTrigger>
        <TabsTrigger
          value="bias"
          className="text-gray-400 data-[state=active]:bg-white/15 data-[state=active]:text-white"
        >
          <span className="mr-1.5">&#x2696;&#xFE0F;</span> 편향
        </TabsTrigger>
        <TabsTrigger
          value="outdated"
          className="text-gray-400 data-[state=active]:bg-white/15 data-[state=active]:text-white"
        >
          <span className="mr-1.5">&#x1F4C5;</span> 최신정보
        </TabsTrigger>
      </TabsList>

      {/* Tab 1: Hallucination - Mock Chatbot UI */}
      <TabsContent value="hallucination" className="mt-4">
        <div className="relative min-h-[420px] rounded-xl bg-white/5 p-6">
          <h3 className="mb-1 text-xl font-semibold text-red-400">
            환각 (Hallucination)
          </h3>
          <p className="mb-4 text-sm text-gray-500">
            실제 사례: 2023년 미국 변호사 Steven Schwartz, ChatGPT가 만든 가짜 판례 6건을 법원에 제출
          </p>

          {/* Chat bubbles */}
          <div className="space-y-4">
            {/* User bubble */}
            <div className="flex justify-end">
              <div className="max-w-[70%] rounded-2xl rounded-br-sm bg-blue-600 px-5 py-3 text-lg text-white">
                이 법적 판례에 대해 알려줘
              </div>
            </div>

            {/* AI bubble - appears at step >= 1 */}
            {steps.hallucination >= 1 && (
              <div className="flex justify-start">
                <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-white/10 px-5 py-3 text-lg text-gray-200">
                  {typingDone ? (
                    <span>{aiResponse}</span>
                  ) : (
                    <TypingEffect
                      text={aiResponse}
                      speed={25}
                      onComplete={handleTypingComplete}
                    />
                  )}

                  {/* Confidence bar */}
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-xs text-gray-500">자신감</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                      <div
                        className="h-full rounded-full bg-green-500 transition-all duration-1000"
                        style={{ width: '95%' }}
                      />
                    </div>
                    <span className="text-xs font-bold text-green-400">95%</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Fake stamp overlay - appears at step 2 */}
          {steps.hallucination >= 2 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-stamp -rotate-12 rounded-xl border-4 border-red-500 bg-red-950/90 px-8 py-4 text-center">
                <p className="text-3xl font-black text-red-500">
                  FAKE
                </p>
                <p className="mt-1 text-lg font-bold text-red-400">
                  가짜 판례 6건 전부 허구!
                </p>
                <p className="mt-2 text-sm text-gray-400">
                  변호사는 법원으로부터 $5,000 벌금 부과
                </p>
              </div>
            </div>
          )}

          {/* Next button */}
          {currentStep < maxSteps.hallucination && activeTab === 'hallucination' && (
            <button
              onClick={advance}
              className="absolute bottom-4 right-4 rounded-lg bg-white/10 px-4 py-2 text-sm text-gray-300 transition-colors hover:bg-white/20"
            >
              다음 &rarr;
            </button>
          )}
        </div>
      </TabsContent>

      {/* Tab 2: Bias - Horizontal Bar Chart */}
      <TabsContent value="bias" className="mt-4">
        <div className="relative min-h-[420px] rounded-xl bg-white/5 p-6">
          <h3 className="mb-1 text-xl font-semibold text-red-400">
            편향 (Bias)
          </h3>
          <p className="mb-6 text-sm text-gray-500">
            실제 사례: Amazon AI 채용 도구가 여성 지원자를 체계적으로 낮게 평가 (2018, Reuters 보도)
          </p>

          <div className="mx-auto max-w-xl space-y-8">
            <h4 className="text-center text-lg font-medium text-gray-300">
              AI 채용 점수 비교
            </h4>

            {/* Male bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-lg text-blue-400">남성 지원자</span>
                {steps.bias >= 1 && (
                  <span className="text-lg font-bold text-blue-400">85점</span>
                )}
              </div>
              <div className="h-10 overflow-hidden rounded-lg bg-white/10">
                <div
                  className="flex h-full items-center rounded-lg bg-blue-500/80 px-3 transition-all duration-1000"
                  style={{ width: steps.bias >= 1 ? '85%' : '0%' }}
                >
                  {steps.bias >= 1 && (
                    <span className="text-sm font-bold text-white">85/100</span>
                  )}
                </div>
              </div>
            </div>

            {/* Female bar */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-lg text-pink-400">여성 지원자</span>
                {steps.bias >= 1 && (
                  <span className="text-lg font-bold text-pink-400">50점</span>
                )}
              </div>
              <div className="h-10 overflow-hidden rounded-lg bg-white/10">
                <div
                  className="flex h-full items-center rounded-lg bg-pink-500/80 px-3 transition-all duration-1000"
                  style={{ width: steps.bias >= 1 ? '50%' : '0%' }}
                >
                  {steps.bias >= 1 && (
                    <span className="text-sm font-bold text-white">50/100</span>
                  )}
                </div>
              </div>
            </div>

            {/* Gap indicator - step 2 */}
            {steps.bias >= 2 && (
              <div className="flex flex-col items-center gap-2 rounded-xl bg-red-900/30 p-4">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-black text-red-400">35점 차이!</span>
                </div>
                <p className="text-center text-base text-gray-300">
                  동일 능력의 지원자인데도 성별에 따라 점수가 달랐습니다
                </p>
                <p className="text-sm text-gray-500">
                  Amazon은 이 시스템을 폐기했습니다 (2018)
                </p>
              </div>
            )}
          </div>

          {/* Next button */}
          {currentStep < maxSteps.bias && activeTab === 'bias' && (
            <button
              onClick={advance}
              className="absolute bottom-4 right-4 rounded-lg bg-white/10 px-4 py-2 text-sm text-gray-300 transition-colors hover:bg-white/20"
            >
              다음 &rarr;
            </button>
          )}
        </div>
      </TabsContent>

      {/* Tab 3: Outdated - Timeline */}
      <TabsContent value="outdated" className="mt-4">
        <div className="relative min-h-[420px] rounded-xl bg-white/5 p-6">
          <h3 className="mb-1 text-xl font-semibold text-red-400">
            최신 정보 부족
          </h3>
          <p className="mb-6 text-sm text-gray-500">
            AI는 학습 마감일 이후의 정보를 알 수 없습니다
          </p>

          {/* Timeline */}
          <div className="mx-auto max-w-2xl">
            <div className="relative flex items-center justify-between">
              {/* Timeline line */}
              <div className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 bg-gray-700" />

              {/* Learned period */}
              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-900 text-2xl ring-2 ring-cyan-500">
                  &#x1F4DA;
                </div>
                <span className="text-sm font-medium text-cyan-400">학습 시작</span>
                <span className="text-xs text-gray-500">수십억 개 데이터</span>
              </div>

              <div className="relative z-10 flex flex-col items-center gap-2">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-900 text-2xl ring-2 ring-cyan-500">
                  &#x1F9E0;
                </div>
                <span className="text-sm font-medium text-cyan-400">학습 완료</span>
                <span className="text-xs text-gray-500">패턴 습득</span>
              </div>

              {/* Cutoff wall - appears at step >= 1 */}
              {steps.outdated >= 1 && (
                <div className="relative z-20 flex flex-col items-center gap-2">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-900 text-2xl ring-4 ring-red-500">
                    &#x1F6D1;
                  </div>
                  <span className="text-sm font-bold text-red-400">학습 마감!</span>
                  <span className="text-xs text-red-300">여기까지만 앎</span>
                </div>
              )}

              {/* Unknown area */}
              {steps.outdated >= 1 && (
                <div className="relative z-10 flex flex-col items-center gap-2">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-dashed border-red-800 bg-red-900/20 text-2xl">
                    &#x2753;
                  </div>
                  <span className="text-sm font-medium text-red-400">모르는 영역</span>
                  <span className="text-xs text-gray-500">최신 정보 부재</span>
                </div>
              )}
            </div>

            {/* Cutoff wall vertical indicator */}
            {steps.outdated >= 1 && (
              <div className="mx-auto mt-4 w-px border-l-2 border-dashed border-red-500/50" style={{ height: 40 }} />
            )}

            {/* Example Q&A - step 2 */}
            {steps.outdated >= 2 && (
              <div className="mt-4 space-y-3">
                <div className="flex justify-end">
                  <div className="max-w-[70%] rounded-2xl rounded-br-sm bg-blue-600 px-4 py-2 text-base text-white">
                    2024 올림픽 금메달 수 1위 국가는?
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-[70%] rounded-2xl rounded-bl-sm bg-red-900/40 px-4 py-2 text-base text-gray-300">
                    <span className="text-red-400">&#x26A0; </span>
                    죄송합니다. 제 학습 데이터에는 2024 올림픽 결과가 포함되어 있지 않습니다.
                  </div>
                </div>
                <p className="text-center text-sm text-gray-500">
                  AI는 학습 마감일(knowledge cutoff) 이후의 사건을 모릅니다
                </p>
              </div>
            )}
          </div>

          {/* Next button */}
          {currentStep < maxSteps.outdated && activeTab === 'outdated' && (
            <button
              onClick={advance}
              className="absolute bottom-4 right-4 rounded-lg bg-white/10 px-4 py-2 text-sm text-gray-300 transition-colors hover:bg-white/20"
            >
              다음 &rarr;
            </button>
          )}
        </div>
      </TabsContent>
    </Tabs>
  );
}
