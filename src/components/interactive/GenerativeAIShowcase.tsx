"use client";

import { useState, useCallback } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import TypingEffect from "@/components/interactive/TypingEffect";

type TabId = "text" | "image" | "video" | "code" | "music";

const tabConfig: { id: TabId; icon: string; label: string }[] = [
  { id: "text", icon: "\u270D\uFE0F", label: "글" },
  { id: "image", icon: "\uD83C\uDFA8", label: "그림" },
  { id: "video", icon: "\uD83C\uDFAC", label: "영상" },
  { id: "code", icon: "\uD83D\uDCBB", label: "코드" },
  { id: "music", icon: "\uD83C\uDFB5", label: "음악" },
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
  text: {
    description: "AI가 글을 써줍니다",
    prompt: "서울의 가을을 주제로 감성적인 시 한 편 써줘",
    tool: "ChatGPT",
    toolColor: "bg-green-600",
    time: "~5초",
  },
  image: {
    description: "AI가 그림을 그려줍니다",
    prompt: "우주를 떠다니는 고양이 우주비행사, 디지털 아트",
    tool: "DALL-E",
    toolColor: "bg-purple-600",
    time: "~15초",
  },
  video: {
    description: "AI가 영상을 만들어줍니다",
    prompt: "석양 속 도쿄 거리를 걷는 여성",
    tool: "Sora",
    toolColor: "bg-rose-600",
    time: "~1분",
  },
  code: {
    description: "AI가 코드를 작성합니다",
    prompt: "소수 판별 Python 함수 만들어줘",
    tool: "Copilot",
    toolColor: "bg-blue-600",
    time: "~3초",
  },
  music: {
    description: "AI가 음악을 만들어줍니다",
    prompt: "공부할 때 듣기 좋은 lo-fi 비트 만들어줘",
    tool: "Suno",
    toolColor: "bg-amber-600",
    time: "~30초",
  },
};

const WAVE_DELAYS = Array.from({ length: 24 }, (_, index) => index * 0.08);

export default function GenerativeAIShowcase() {
  const [activeTab, setActiveTab] = useState<TabId>("text");
  const [steps, setSteps] = useState<Record<TabId, number>>({
    text: 0,
    image: 0,
    video: 0,
    code: 0,
    music: 0,
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

  const handleTabChange = (v: string) => {
    setActiveTab(v as TabId);
    setTypingDone(false);
  };

  const handleTypingComplete = useCallback(() => {
    setTypingDone(true);
  }, []);

  const renderResult = (tabId: TabId) => {
    switch (tabId) {
      case "text":
        return (
          <div className="animate-fade-slide-up rounded-xl bg-white/5 p-5 text-left">
            <p className="text-lg leading-relaxed text-gray-200 italic">
              서울의 가을은 말없이 찾아와
              <br />
              은행잎 사이로 햇살이 부서지고
              <br />
              차가운 바람 한 줄기에
              <br />
              커피 한 잔의 온기가 번진다
              <br />
              <br />
              광화문 돌담길을 걸으며
              <br />
              가을이 건네는 인사를 받는다
            </p>
          </div>
        );

      case "image":
        return (
          <div className="animate-fade-slide-up flex flex-col items-center gap-3">
            {/* CSS art: space cat astronaut */}
            <div
              className="flex h-48 w-72 items-center justify-center overflow-hidden rounded-xl"
              style={{
                background:
                  "linear-gradient(135deg, #0c0033 0%, #1a0a4a 30%, #2d1b69 50%, #1a0a4a 70%, #0c0033 100%)",
              }}
            >
              <div className="relative flex flex-col items-center">
                {/* Stars */}
                <div className="absolute -top-4 -left-16 text-xs text-white/60">
                  &#x2728;
                </div>
                <div className="absolute -top-2 left-20 text-xs text-white/40">
                  &#x2B50;
                </div>
                <div className="absolute top-8 -left-20 text-xs text-white/50">
                  &#x2728;
                </div>
                <div className="absolute top-12 left-24 text-xs text-white/30">
                  &#x2B50;
                </div>
                {/* Cat astronaut */}
                <div className="text-7xl">&#x1F431;&#x200D;&#x1F680;</div>
                <div className="mt-1 text-xs text-purple-300/80">
                  AI Generated Art
                </div>
              </div>
            </div>
          </div>
        );

      case "video":
        return (
          <div className="animate-fade-slide-up">
            <div className="overflow-hidden rounded-xl">
              <video
                width="560"
                height="215"
                controls
                muted
                autoPlay
                loop
                playsInline
                className="w-full rounded-xl"
              >
                <source
                  src="/images/showcase/sora-tokyo-walk.mp4"
                  type="video/mp4"
                />
              </video>
            </div>
          </div>
        );

      case "code":
        return (
          <pre className="animate-fade-slide-up overflow-x-auto rounded-xl bg-[#1e1e2e] p-5 text-left text-sm leading-relaxed">
            <code>
              <span style={{ color: "#c678dd" }}>def </span>
              <span style={{ color: "#61afef" }}>is_prime</span>
              <span style={{ color: "#abb2bf" }}>(</span>
              <span style={{ color: "#e06c75" }}>n</span>
              <span style={{ color: "#abb2bf" }}>):</span>
              {"\n"}
              <span style={{ color: "#abb2bf" }}>{"    "}</span>
              <span style={{ color: "#c678dd" }}>if </span>
              <span style={{ color: "#e06c75" }}>n</span>
              <span style={{ color: "#abb2bf" }}> &lt; </span>
              <span style={{ color: "#d19a66" }}>2</span>
              <span style={{ color: "#abb2bf" }}>:</span>
              {"\n"}
              <span style={{ color: "#abb2bf" }}>{"        "}</span>
              <span style={{ color: "#c678dd" }}>return </span>
              <span style={{ color: "#d19a66" }}>False</span>
              {"\n"}
              <span style={{ color: "#abb2bf" }}>{"    "}</span>
              <span style={{ color: "#c678dd" }}>for </span>
              <span style={{ color: "#e06c75" }}>i</span>
              <span style={{ color: "#c678dd" }}> in </span>
              <span style={{ color: "#61afef" }}>range</span>
              <span style={{ color: "#abb2bf" }}>(</span>
              <span style={{ color: "#d19a66" }}>2</span>
              <span style={{ color: "#abb2bf" }}>, </span>
              <span style={{ color: "#61afef" }}>int</span>
              <span style={{ color: "#abb2bf" }}>(</span>
              <span style={{ color: "#e06c75" }}>n</span>
              <span style={{ color: "#abb2bf" }}>**</span>
              <span style={{ color: "#d19a66" }}>0.5</span>
              <span style={{ color: "#abb2bf" }}>) + </span>
              <span style={{ color: "#d19a66" }}>1</span>
              <span style={{ color: "#abb2bf" }}>):</span>
              {"\n"}
              <span style={{ color: "#abb2bf" }}>{"        "}</span>
              <span style={{ color: "#c678dd" }}>if </span>
              <span style={{ color: "#e06c75" }}>n</span>
              <span style={{ color: "#abb2bf" }}> % </span>
              <span style={{ color: "#e06c75" }}>i</span>
              <span style={{ color: "#abb2bf" }}> == </span>
              <span style={{ color: "#d19a66" }}>0</span>
              <span style={{ color: "#abb2bf" }}>:</span>
              {"\n"}
              <span style={{ color: "#abb2bf" }}>{"            "}</span>
              <span style={{ color: "#c678dd" }}>return </span>
              <span style={{ color: "#d19a66" }}>False</span>
              {"\n"}
              <span style={{ color: "#abb2bf" }}>{"    "}</span>
              <span style={{ color: "#c678dd" }}>return </span>
              <span style={{ color: "#d19a66" }}>True</span>
            </code>
          </pre>
        );

      case "music":
        return (
          <div className="animate-fade-slide-up flex flex-col items-center gap-4 rounded-xl bg-white/5 p-5">
            {/* Waveform visualization */}
            <div className="flex h-20 items-end gap-1">
              {WAVE_DELAYS.map((delay) => (
                <div
                  key={`wave-${delay}`}
                  className="w-2 rounded-full bg-amber-400/80 animate-waveform"
                  style={{
                    animationDelay: `${delay}s`,
                    height: "30%",
                  }}
                />
              ))}
            </div>
            <p className="text-base text-gray-300">
              Lo-fi 비트 생성 중... &#x1F3B6;
            </p>
            <p className="text-sm text-gray-500">
              BPM: 85 | Key: C minor | 분위기: 잔잔한 카페
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange}
      className="mx-auto w-full max-w-4xl"
    >
      <TabsList className="mx-auto w-fit bg-white/10">
        {tabConfig.map((tab) => (
          <TabsTrigger
            key={tab.id}
            value={tab.id}
            className="text-gray-400 data-[state=active]:bg-white/15 data-[state=active]:text-white"
          >
            <span className="mr-1.5">{tab.icon}</span> {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      {tabConfig.map((tab) => {
        const data = tabData[tab.id];
        const step = steps[tab.id];

        return (
          <TabsContent key={tab.id} value={tab.id} className="mt-4">
            <div className="relative min-h-[380px] rounded-xl bg-white/5 p-6">
              {/* Step 0: Category intro */}
              {step === 0 && (
                <div className="flex h-[320px] flex-col items-center justify-center gap-4">
                  <span className="text-6xl">{tab.icon}</span>
                  <h3 className="text-2xl font-semibold text-white">
                    {data.description}
                  </h3>
                  <p className="text-base text-gray-500">
                    &ldquo;다음&rdquo;을 눌러 프롬프트를 입력해보세요
                  </p>
                </div>
              )}

              {/* Step 1+: Prompt bubble */}
              {step >= 1 && (
                <div className="space-y-4">
                  {/* User prompt bubble */}
                  <div className="flex justify-end">
                    <div className="max-w-[75%] rounded-2xl rounded-br-sm bg-blue-600 px-5 py-3 text-lg text-white">
                      {step === 1 && !typingDone ? (
                        <TypingEffect
                          text={data.prompt}
                          speed={30}
                          onComplete={handleTypingComplete}
                        />
                      ) : (
                        data.prompt
                      )}
                    </div>
                  </div>

                  {/* Step 2: AI result */}
                  {step >= 2 && (
                    <div className="space-y-3">
                      {/* AI label */}
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-sm">
                          &#x1F916;
                        </div>
                        <span className="text-sm text-gray-400">AI</span>
                      </div>

                      {/* Result content */}
                      {renderResult(tab.id)}

                      {/* Tool & time banner */}
                      <div className="flex items-center justify-center gap-3">
                        <span
                          className={`rounded-full ${data.toolColor} px-3 py-1 text-xs font-medium text-white`}
                        >
                          {data.tool}
                        </span>
                        <span className="text-xs text-gray-500">
                          &#x23F1; {data.time}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Next button */}
              {step < 2 && activeTab === tab.id && (
                <button
                  type="button"
                  onClick={advance}
                  className="absolute right-4 bottom-4 rounded-lg bg-white/10 px-4 py-2 text-sm text-gray-300 transition-colors hover:bg-white/20"
                >
                  다음 &rarr;
                </button>
              )}
            </div>
          </TabsContent>
        );
      })}
    </Tabs>
  );
}
