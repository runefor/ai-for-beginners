"use client";

import { useState, useEffect, useCallback } from "react";
import TypingEffect from "./TypingEffect";

type ElementKey = "role" | "context" | "format";

interface ToggleState {
  role: boolean;
  context: boolean;
  format: boolean;
}

const ELEMENTS: {
  key: ElementKey;
  label: string;
  icon: string;
  bgOn: string;
  borderOn: string;
  textOn: string;
}[] = [
  {
    key: "role",
    label: "역할",
    icon: "🎭",
    bgOn: "bg-yellow-900/40",
    borderOn: "border-yellow-500/50",
    textOn: "text-yellow-300",
  },
  {
    key: "context",
    label: "구체적 맥락",
    icon: "📋",
    bgOn: "bg-green-900/40",
    borderOn: "border-green-500/50",
    textOn: "text-green-300",
  },
  {
    key: "format",
    label: "원하는 형식",
    icon: "📐",
    bgOn: "bg-purple-900/40",
    borderOn: "border-purple-500/50",
    textOn: "text-purple-300",
  },
];

const QUALITY_LEVELS = [
  {
    pct: 10,
    color: "bg-red-500",
    textColor: "text-red-400",
    label: "아직 부족해요",
  },
  {
    pct: 40,
    color: "bg-orange-500",
    textColor: "text-orange-300",
    label: "조금 나아졌어요!",
  },
  {
    pct: 70,
    color: "bg-yellow-500",
    textColor: "text-yellow-300",
    label: "거의 다 왔어요!",
  },
  {
    pct: 100,
    color: "bg-cyan-400",
    textColor: "text-cyan-300",
    label: "완벽한 프롬프트!",
  },
];

const AI_RESPONSE = `1. 릴스 챌린지 캠페인
제목: #나의_하루루틴 챌린지
설명: 20대 여성 인플루언서 5명과 협업하여 모닝 스킨케어 루틴 릴스를 제작합니다.
예상 효과: 월 50만 도달, 팔로워 2,000명 증가

2. UGC(사용자 생성 콘텐츠) 이벤트
제목: "내 피부에 딱!" 후기 이벤트
설명: 제품 사용 후기를 인스타 스토리로 공유하면 추첨을 통해 신제품을 증정합니다.
예상 효과: 진정성 있는 후기 200건 확보, 전환율 15% 향상

3. 타겟 광고 + 카드뉴스
제목: 피부 타입별 추천 가이드
설명: 카드뉴스 형식으로 피부 고민별 솔루션을 제시하고, 20대 여성 타겟 광고로 집행합니다.
예상 효과: 클릭당 비용 300원 이하, 월 3,000회 프로필 방문`;

export default function PromptCraftingDemo() {
  const [active, setActive] = useState<ToggleState>({
    role: false,
    context: false,
    format: false,
  });
  const [showResponse, setShowResponse] = useState(false);
  const [typingKey, setTypingKey] = useState(0);

  const activeCount = Object.values(active).filter(Boolean).length;
  const allOn = activeCount === 3;
  const quality = QUALITY_LEVELS[activeCount];

  useEffect(() => {
    if (!allOn) return;

    const timer = setTimeout(() => {
      setShowResponse(true);
      setTypingKey((k) => k + 1);
    }, 500);

    return () => clearTimeout(timer);
  }, [allOn]);

  const toggle = useCallback((key: ElementKey) => {
    setShowResponse(false);
    setActive((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const rolePart = active.role
    ? "너는 10년 경력의 디지털 마케팅 전문가야. "
    : "";
  const mainPart = active.context
    ? "20대 여성을 타겟으로 한 화장품 브랜드의 인스타그램 마케팅 전략을 알려줘. 예산은 월 100만원이야."
    : "마케팅 전략 알려줘";
  const formatPart = active.format
    ? " 3가지 전략을 각각 제목, 설명, 예상 효과로 나눠서 정리해줘."
    : "";

  return (
    <div
      className="mx-auto flex w-full max-w-5xl flex-col gap-4"
      style={{ zoom: 0.78 }}
    >
      {/* Prompt bubble */}
      <div className="rounded-2xl bg-white/5 p-6">
        <div className="mb-2 flex items-center gap-2 text-lg text-gray-500">
          <span>💬</span> 프롬프트 미리보기
        </div>
        <p className="text-xl leading-relaxed text-gray-200">
          {active.role && <span className="text-yellow-300">{rolePart}</span>}
          {active.context ? (
            <span className="text-green-300">{mainPart}</span>
          ) : (
            <span className="text-gray-400">{mainPart}</span>
          )}
          {active.format && (
            <span className="text-purple-300">{formatPart}</span>
          )}
        </p>
      </div>

      {/* Toggle buttons */}
      <div className="flex justify-center gap-4">
        {ELEMENTS.map((el) => {
          const isOn = active[el.key];
          return (
            <button
              key={el.key}
              type="button"
              onClick={() => toggle(el.key)}
              className={`flex items-center gap-2 rounded-xl border-2 px-5 py-3 text-lg font-semibold transition-all duration-300 ${
                isOn
                  ? `${el.bgOn} ${el.borderOn} ${el.textOn}`
                  : "border-white/20 bg-white/10 text-gray-500"
              }`}
            >
              <span>{el.icon}</span>
              {el.label}
            </button>
          );
        })}
      </div>

      {/* Quality meter */}
      <div className="rounded-2xl bg-white/5 px-6 py-4">
        <div className="flex items-center justify-between text-lg">
          <span className="text-gray-400">프롬프트 품질</span>
          <span className={`font-semibold ${quality.textColor}`}>
            {quality.pct}% — {quality.label}
          </span>
        </div>
        <div className="mt-3 h-4 overflow-hidden rounded-full bg-white/10">
          <div
            className={`h-full rounded-full transition-all duration-700 ${quality.color}`}
            style={{ width: `${quality.pct}%` }}
          />
        </div>
      </div>

      {/* AI response */}
      {showResponse && (
        <div className="animate-fade-slide-up rounded-2xl bg-cyan-900/20 p-6">
          <div className="mb-3 flex items-center gap-2 text-lg text-cyan-400">
            <span>🤖</span> AI 응답
          </div>
          <div className="whitespace-pre-line text-lg leading-relaxed text-gray-300">
            <TypingEffect key={typingKey} text={AI_RESPONSE} speed={10} />
          </div>
        </div>
      )}
    </div>
  );
}
