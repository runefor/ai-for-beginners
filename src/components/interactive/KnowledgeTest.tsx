'use client';

import { useState } from 'react';

interface Question {
  question: string;
  answer: boolean;
  explanation: string;
}

const questions: Question[] = [
  {
    question: 'ChatGPT는 2022년에 처음 공개되었다',
    answer: true,
    explanation: '2022년 11월 30일, OpenAI가 ChatGPT를 공개했습니다.',
  },
  {
    question: 'AI는 스스로 생각하고 판단할 수 있다',
    answer: false,
    explanation: 'AI는 데이터의 패턴을 학습할 뿐, 진짜 생각을 하지는 않습니다.',
  },
  {
    question: '넷플릭스의 영화 추천은 AI 기술이다',
    answer: true,
    explanation: '넷플릭스는 추천 알고리즘에 머신러닝을 사용합니다.',
  },
  {
    question: 'AI가 만든 그림으로 미술 대회에서 1등을 한 적이 있다',
    answer: true,
    explanation: '2022년 Midjourney로 만든 그림이 콜로라도 주 미술대회에서 1등을 했습니다.',
  },
  {
    question: 'AI는 항상 정확한 정보를 제공한다',
    answer: false,
    explanation: '환각 현상 때문에 그럴듯하지만 틀린 답을 만들기도 합니다.',
  },
];

export default function KnowledgeTest() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<boolean | null>(null);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);

  const q = questions[current];
  const progress = ((current + (completed ? 1 : 0)) / questions.length) * 100;

  function handleAnswer(answer: boolean) {
    if (selected !== null || completed) return;
    setSelected(answer);
    if (answer === q.answer) {
      setScore((prev) => prev + 1);
    }
  }

  function handleNext() {
    if (current + 1 >= questions.length) {
      setCompleted(true);
      return;
    }

    setCurrent((value) => value + 1);
    setSelected(null);
  }

  if (completed) {
    return (
      <div className="flex w-full max-w-4xl flex-col items-center gap-6 text-center">
        <div className="deck-pill deck-pill-lg">{score} / {questions.length}</div>
        <p className="text-5xl font-semibold text-white">기본 감각은 이미 충분합니다</p>
        <p className="max-w-3xl text-2xl leading-relaxed text-slate-300">
          틀린 문항이 있었다면 오히려 좋습니다. 그 지점이 오늘 발표에서 가장 먼저 정리해야 할 오해였다는 뜻입니다.
        </p>
      </div>
    );
  }

  return (
    <div className="flex w-full max-w-4xl flex-col items-center gap-6">
      <div className="w-full rounded-full bg-white/8 p-1">
        <div
          className="h-2.5 rounded-full bg-linear-to-r from-cyan-400 to-blue-400 transition-all duration-500"
          style={{ width: `${Math.max(progress, 8)}%` }}
        />
      </div>

      <div className="flex w-full items-center justify-between text-lg text-slate-400">
        <span>{current + 1} / {questions.length}</span>
        <span>현재 점수 {score}점</span>
      </div>

      <div className="rounded-[1.8rem] border border-white/10 bg-white/4 px-8 py-10 text-center">
        <p className="text-[2.2rem] font-semibold leading-relaxed text-white">
          &ldquo;{q.question}&rdquo;
        </p>
      </div>

      <div className="mt-2 grid w-full gap-4 md:grid-cols-2">
        <button
          type="button"
          onClick={() => handleAnswer(true)}
          disabled={selected !== null}
          className={`rounded-[1.6rem] border px-8 py-8 text-5xl font-semibold transition-all duration-200 ${
            selected === null
              ? 'border-cyan-400/25 bg-cyan-950/22 text-white hover:-translate-y-1 hover:border-cyan-300/80 hover:bg-cyan-400/22 hover:text-cyan-50 hover:shadow-[0_20px_50px_rgba(34,211,238,0.24)]'
              : selected === true
                ? q.answer
                  ? 'border-emerald-400/30 bg-emerald-950/40 text-white'
                  : 'border-rose-400/30 bg-rose-950/40 text-white'
                : 'border-white/10 bg-white/5 text-slate-500'
          }`}
        >
          O
        </button>
        <button
          type="button"
          onClick={() => handleAnswer(false)}
          disabled={selected !== null}
          className={`rounded-[1.6rem] border px-8 py-8 text-5xl font-semibold transition-all duration-200 ${
            selected === null
              ? 'border-amber-400/25 bg-amber-950/22 text-white hover:-translate-y-1 hover:border-amber-300/80 hover:bg-amber-400/22 hover:text-amber-50 hover:shadow-[0_20px_50px_rgba(251,191,36,0.22)]'
              : selected === false
                ? !q.answer
                  ? 'border-emerald-400/30 bg-emerald-950/40 text-white'
                  : 'border-rose-400/30 bg-rose-950/40 text-white'
                : 'border-white/10 bg-white/5 text-slate-500'
          }`}
        >
          X
        </button>
      </div>

      {selected !== null ? (
        <div className="mt-2 flex flex-col items-center gap-4">
          <div className={`text-3xl font-semibold ${selected === q.answer ? 'text-emerald-300' : 'text-rose-300'}`}>
            {selected === q.answer ? '정답입니다' : '여기서 가장 많이 헷갈립니다'}
          </div>
          <p className="max-w-3xl text-center text-2xl leading-relaxed text-slate-300">
            {q.explanation}
          </p>
          <button
            type="button"
            onClick={handleNext}
            className="rounded-full border border-cyan-400/20 bg-cyan-950/35 px-7 py-3 text-xl font-semibold text-white transition hover:bg-cyan-950/55"
          >
            {current + 1 < questions.length ? '다음 문제' : '결과 보기'}
          </button>
        </div>
      ) : null}
    </div>
  );
}
