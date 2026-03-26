"use client";

import { useState, useEffect, useCallback } from "react";
import TypingEffect from "./TypingEffect";

type ElementKey = "goal" | "context" | "format" | "role";

interface ToggleState {
  goal: boolean;
  context: boolean;
  format: boolean;
  role: boolean;
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
    key: "goal",
    label: "목표",
    icon: "🎯",
    bgOn: "bg-fuchsia-950/28",
    borderOn: "border-fuchsia-400/30",
    textOn: "text-fuchsia-200",
  },
  {
    key: "context",
    label: "필요한 맥락",
    icon: "📋",
    bgOn: "bg-emerald-950/28",
    borderOn: "border-emerald-400/30",
    textOn: "text-emerald-200",
  },
  {
    key: "format",
    label: "형식·제약",
    icon: "📐",
    bgOn: "bg-cyan-950/28",
    borderOn: "border-cyan-400/30",
    textOn: "text-cyan-200",
  },
  {
    key: "role",
    label: "역할(선택)",
    icon: "🎭",
    bgOn: "bg-amber-950/28",
    borderOn: "border-amber-400/30",
    textOn: "text-amber-200",
  },
];

const QUALITY_LEVELS = [
  { pct: 8, color: "bg-rose-400", textColor: "text-rose-300", label: "아직 흐립니다" },
  { pct: 34, color: "bg-amber-400", textColor: "text-amber-200", label: "목표가 보입니다" },
  { pct: 67, color: "bg-cyan-300", textColor: "text-cyan-200", label: "조건이 잡혔습니다" },
  { pct: 100, color: "bg-emerald-300", textColor: "text-emerald-200", label: "바로 쓸 수 있습니다" },
  { pct: 100, color: "bg-amber-300", textColor: "text-amber-200", label: "톤까지 선명합니다" },
];

const BASE_RESPONSE = `1. 전략명: 출근 전 15초 루틴 릴스
핵심 아이디어: 바쁜 아침에도 바로 바를 수 있다는 점을 짧은 전후 비교 영상으로 보여줍니다.
예상 효과: 저장과 공유를 늘려 첫 달 도달을 빠르게 확보할 수 있습니다.
실행 포인트: 3초 안에 제품명과 효능이 보이도록 구성합니다.

2. 전략명: 피부 컨디션 자가진단 스토리
핵심 아이디어: 스토리 투표로 피부 고민을 고르게 한 뒤, 결과별로 세럼 사용 장면을 이어서 제시합니다.
예상 효과: 프로필 방문과 링크 클릭을 동시에 끌어올리기 좋습니다.
실행 포인트: 건조함, 푸석함, 화장 밀림처럼 즉시 공감되는 문항으로 설계합니다.

3. 전략명: 일주일 사용 변화 카드 포스트
핵심 아이디어: 7일 사용 기록을 슬라이드형 이미지로 정리해 신뢰감을 만듭니다.
예상 효과: 광고 집행 시 클릭 효율이 안정적으로 나오기 좋습니다.
실행 포인트: 각 장마다 변화 포인트를 한 문장으로 고정해 읽는 부담을 줄입니다.`;

const ROLE_RESPONSE = `1. 전략명: 출근 전 15초 루틴 릴스
핵심 아이디어: "바쁘지만 피부는 챙기고 싶다"는 타깃 심리를 정조준해 초반 3초에 효능과 사용 장면을 함께 노출합니다.
예상 효과: 인지도 확보와 저장 증가를 동시에 노릴 수 있습니다.
실행 포인트: 릴스 첫 문구를 "출근 전에 이 정도면 충분"처럼 생활 맥락 중심으로 설계합니다.

2. 전략명: 피부 컨디션 자가진단 스토리
핵심 아이디어: 스토리 투표로 참여를 유도한 뒤, 결과 화면에서 세럼 추천 이유를 바로 연결합니다.
예상 효과: 프로필 방문률과 제품 관심도를 함께 끌어올릴 수 있습니다.
실행 포인트: 답변별 크리에이티브를 3종으로 나눠 후속 광고 리타게팅에도 활용합니다.

3. 전략명: 일주일 사용 변화 카드 포스트
핵심 아이디어: 후기형 카드 포스트로 광고 효율과 신뢰도를 동시에 확보합니다.
예상 효과: 월 100만원 예산에서도 안정적인 클릭 흐름을 만들기 좋습니다.
실행 포인트: 카드 마지막 장에는 구매 유도보다 프로필 방문 유도를 먼저 배치합니다.`;

export default function PromptCraftingDemo() {
  const [active, setActive] = useState<ToggleState>({
    goal: false,
    context: false,
    format: false,
    role: false,
  });
  const [showResponse, setShowResponse] = useState(false);
  const [typingKey, setTypingKey] = useState(0);

  const coreCount = [active.goal, active.context, active.format].filter(Boolean).length;
  const promptReady = coreCount === 3;
  const qualityIndex = promptReady && active.role ? 4 : coreCount;
  const quality = QUALITY_LEVELS[qualityIndex];
  const aiResponse = active.role ? ROLE_RESPONSE : BASE_RESPONSE;

  useEffect(() => {
    if (!promptReady) return;

    const timer = setTimeout(() => {
      setShowResponse(true);
      setTypingKey((value) => value + 1);
    }, 450);

    return () => clearTimeout(timer);
  }, [promptReady, active.role]);

  const toggle = useCallback((key: ElementKey) => {
    setShowResponse(false);
    setActive((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const promptLines = [
    {
      key: "goal",
      label: "목표",
      active: active.goal,
      className: "text-fuchsia-200",
      text: active.goal
        ? "신제품 세럼 런칭을 위한 인스타그램 마케팅 아이디어 3개를 제안해줘."
        : "먼저 목표를 씁니다.",
    },
    {
      key: "context",
      label: "맥락",
      active: active.context,
      className: "text-emerald-200",
      text: active.context
        ? "브랜드는 비건 스킨케어이고, 타깃은 20대 직장인 여성이다. 목표는 첫 달 인지도 확보와 프로필 방문 증가이며, 월 예산은 100만원이다."
        : "상황과 조건을 붙입니다.",
    },
    {
      key: "format",
      label: "형식·제약",
      active: active.format,
      className: "text-cyan-200",
      text: active.format
        ? "결과는 3개 전략으로 정리하고, 각 전략마다 전략명, 핵심 아이디어, 예상 효과, 실행 포인트를 포함해줘. 각 항목은 두 문장 이내로 쓰고 모호한 표현은 피해줘."
        : "출력 모양을 정합니다.",
    },
  ];

  const optionalRoleLine = {
    label: "역할(선택)",
    active: active.role,
    className: "text-amber-200",
    text: active.role
      ? "너는 D2C 뷰티 브랜드를 담당하는 그로스 마케터야."
      : "역할은 필요할 때만 붙입니다.",
  };

  return (
    <div className="mx-auto flex h-full min-h-0 w-full max-w-5xl flex-col gap-2.5">
      <div className="rounded-[1.6rem] border border-white/10 bg-white/4 p-4">
        <div className="mb-2 flex items-center gap-2 text-sm text-slate-500">
          <span>💬</span> 프롬프트 한 줄 설계
        </div>
        <div className="space-y-2 text-[0.92rem] leading-relaxed">
          {promptLines.map((line) => (
            <p key={line.key} className={line.active ? "text-slate-200" : "text-slate-500"}>
              <span className={`font-semibold ${line.active ? line.className : "text-slate-400"}`}>
                {line.label}
              </span>
              : {line.text}
            </p>
          ))}
          <div className="mt-3 border-t border-white/8 pt-2.5">
            <p className={optionalRoleLine.active ? "text-slate-200" : "text-slate-500"}>
              <span
                className={`font-semibold ${
                  optionalRoleLine.active ? optionalRoleLine.className : "text-slate-400"
                }`}
              >
                {optionalRoleLine.label}
              </span>
              : {optionalRoleLine.text}
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-2">
        {ELEMENTS.map((element) => {
          const isOn = active[element.key];
          return (
            <button
              key={element.key}
              type="button"
              onClick={() => toggle(element.key)}
              className={`flex items-center gap-2 rounded-full border px-3.5 py-2 text-sm font-semibold transition-all duration-300 ${
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

      <div className="rounded-[1.6rem] border border-white/10 bg-white/4 px-4 py-3.5">
        <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
          <span className="text-slate-300">프롬프트 품질</span>
          <span className={`font-semibold ${quality.textColor}`}>
            {quality.pct}% - {quality.label}
          </span>
        </div>
        <div className="mt-2.5 h-3.5 overflow-hidden rounded-full bg-white/8">
          <div
            className={`h-full rounded-full transition-all duration-700 ${quality.color}`}
            style={{ width: `${quality.pct}%` }}
          />
        </div>
      </div>

      {showResponse ? (
        <div className="animate-fade-slide-up flex max-h-[15.5rem] min-h-0 flex-1 flex-col overflow-hidden rounded-[1.6rem] border border-cyan-400/16 bg-[linear-gradient(180deg,rgba(7,30,43,0.96),rgba(4,19,31,0.9))] shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <div className="flex items-center justify-between border-b border-cyan-400/10 px-4 py-3">
            <div className="flex items-center gap-2 text-sm text-cyan-300">
              <span>🤖</span> 응답 초안
            </div>
            <div className="rounded-full border border-cyan-400/14 bg-cyan-950/40 px-2.5 py-1 text-[0.7rem] font-semibold tracking-[0.18em] text-cyan-100/75">
              RESULT VIEW
            </div>
          </div>
          <div className="relative min-h-0 flex-1">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6 bg-linear-to-b from-[#071e2b] to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 flex h-10 items-end bg-linear-to-t from-[#04131f] via-[#04131f]/85 to-transparent px-4 pb-2">
              <span className="text-[0.72rem] tracking-[0.12em] text-cyan-100/45">아래로 더 이어집니다</span>
            </div>
            <div className="prompt-scrollbar h-full min-h-0 overflow-y-auto overflow-x-hidden whitespace-pre-line px-4 pb-8 pt-3 text-[0.92rem] leading-relaxed text-slate-200">
              <TypingEffect key={typingKey} text={aiResponse} speed={10} />
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
