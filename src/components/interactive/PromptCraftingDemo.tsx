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
    bgOn: "bg-amber-950/28",
    borderOn: "border-amber-400/30",
    textOn: "text-amber-200",
  },
  {
    key: "context",
    label: "구체적 맥락",
    icon: "📋",
    bgOn: "bg-emerald-950/28",
    borderOn: "border-emerald-400/30",
    textOn: "text-emerald-200",
  },
  {
    key: "format",
    label: "원하는 형식",
    icon: "📐",
    bgOn: "bg-cyan-950/28",
    borderOn: "border-cyan-400/30",
    textOn: "text-cyan-200",
  },
];

const QUALITY_LEVELS = [
  { pct: 10, color: "bg-rose-400", textColor: "text-rose-300", label: "아직 부족해요" },
  { pct: 40, color: "bg-amber-400", textColor: "text-amber-200", label: "조금 나아졌어요" },
  { pct: 70, color: "bg-cyan-300", textColor: "text-cyan-200", label: "핵심이 보입니다" },
  { pct: 100, color: "bg-emerald-300", textColor: "text-emerald-200", label: "완성된 프롬프트" },
];

const AI_RESPONSE = `1. 릴스 챌린지 캠페인
제목: #나의_하루루틴 챌린지
설명: 20대 여성 인플루언서 5명과 협업하여 모닝 스킨케어 루틴 릴스를 제작합니다.
예상 효과: 월 50만 도달, 팔로워 2,000명 증가

2. UGC 이벤트
제목: "내 피부에 딱!" 후기 이벤트
설명: 제품 사용 후기를 인스타 스토리로 공유하면 추첨을 통해 신제품을 증정합니다.
예상 효과: 후기 200건 확보, 전환율 15% 향상

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
      setTypingKey((value) => value + 1);
    }, 450);

    return () => clearTimeout(timer);
  }, [allOn]);

  const toggle = useCallback((key: ElementKey) => {
    setShowResponse(false);
    setActive((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const rolePart = active.role ? "너는 10년 경력의 디지털 마케팅 전문가야. " : "";
  const mainPart = active.context
    ? "20대 여성을 타겟으로 한 화장품 브랜드의 인스타그램 마케팅 전략을 알려줘. 예산은 월 100만원이야."
    : "마케팅 전략 알려줘";
  const formatPart = active.format
    ? " 3가지 전략을 각각 제목, 설명, 예상 효과로 나눠서 정리해줘."
    : "";

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col gap-5">
      <div className="rounded-[1.8rem] border border-white/10 bg-white/4 p-6">
        <div className="mb-3 flex items-center gap-2 text-lg text-slate-500">
          <span>💬</span> 프롬프트 미리보기
        </div>
        <p className="text-[1.35rem] leading-relaxed text-slate-200">
          {active.role ? <span className="text-amber-200">{rolePart}</span> : null}
          {active.context ? (
            <span className="text-emerald-200">{mainPart}</span>
          ) : (
            <span className="text-slate-400">{mainPart}</span>
          )}
          {active.format ? <span className="text-cyan-200">{formatPart}</span> : null}
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        {ELEMENTS.map((element) => {
          const isOn = active[element.key];
          return (
            <button
              key={element.key}
              type="button"
              onClick={() => toggle(element.key)}
              className={`flex items-center gap-2 rounded-full border px-5 py-3 text-lg font-semibold transition-all duration-300 ${
                isOn
                  ? `${element.bgOn} ${element.borderOn} ${element.textOn}`
                  : "border-white/12 bg-white/6 text-slate-300"
              }`}
            >
              <span>{element.icon}</span>
              {element.label}
            </button>
          );
        })}
      </div>

      <div className="rounded-[1.8rem] border border-white/10 bg-white/4 px-6 py-5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-lg">
          <span className="text-slate-300">프롬프트 품질</span>
          <span className={`font-semibold ${quality.textColor}`}>
            {quality.pct}% - {quality.label}
          </span>
        </div>
        <div className="mt-3 h-4 overflow-hidden rounded-full bg-white/8">
          <div
            className={`h-full rounded-full transition-all duration-700 ${quality.color}`}
            style={{ width: `${quality.pct}%` }}
          />
        </div>
      </div>

      {showResponse ? (
        <div className="animate-fade-slide-up rounded-[1.8rem] border border-cyan-400/14 bg-cyan-950/20 p-6">
          <div className="mb-3 flex items-center gap-2 text-lg text-cyan-300">
            <span>🤖</span> AI 응답
          </div>
          <div className="overflow-x-auto whitespace-pre-line text-lg leading-relaxed text-slate-200">
            <TypingEffect key={typingKey} text={AI_RESPONSE} speed={10} />
          </div>
        </div>
      ) : null}
    </div>
  );
}
