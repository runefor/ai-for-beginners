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
    explanation: 'AI는 데이터의 패턴을 학습할 뿐, 진짜 "생각"을 하지는 않습니다.',
  },
  {
    question: '넷플릭스의 영화 추천은 AI 기술이다',
    answer: true,
    explanation: '넷플릭스는 추천 알고리즘에 머신러닝(AI의 한 분야)을 사용합니다.',
  },
  {
    question: 'AI가 만든 그림으로 미술 대회에서 1등을 한 적이 있다',
    answer: true,
    explanation: '2022년 Midjourney로 만든 그림이 콜로라도 주 미술대회에서 1등을 했습니다.',
  },
  {
    question: 'AI는 항상 정확한 정보를 제공한다',
    answer: false,
    explanation: 'AI는 "환각(hallucination)" 현상으로 그럴듯하지만 틀린 답을 만들어내기도 합니다.',
  },
];

export default function KnowledgeTest() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<boolean | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [finished, setFinished] = useState(false);

  const q = questions[current];

  function handleAnswer(answer: boolean) {
    if (selected !== null) return;
    setSelected(answer);
    setShowResult(true);
    if (answer === q.answer) {
      setScore((s) => s + 1);
    }
  }

  function handleNext() {
    if (current + 1 >= questions.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
      setShowResult(false);
    }
  }

  function handleReset() {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setShowResult(false);
    setFinished(false);
  }

  if (finished) {
    const level =
      score >= 4 ? 'AI 고수' : score >= 2 ? 'AI 중수' : 'AI 입문자';
    const emoji = score >= 4 ? '🏆' : score >= 2 ? '👍' : '🌱';
    const message =
      score >= 4
        ? '이미 AI에 대해 잘 알고 계시네요!'
        : score >= 2
          ? '기본기가 있으시네요! 오늘 더 배워가세요.'
          : '걱정 마세요! 오늘 발표가 끝나면 달라질 거예요.';

    return (
      <div className="flex flex-col items-center gap-8">
        <h2 className="text-4xl font-bold text-white">결과 발표</h2>
        <div className="text-8xl">{emoji}</div>
        <div className="text-6xl font-bold text-cyan-400">
          {score} / {questions.length}
        </div>
        <div className="text-3xl font-semibold text-yellow-300">{level}</div>
        <p className="text-2xl text-gray-300">{message}</p>
        <button
          onClick={handleReset}
          className="mt-4 rounded-xl bg-white/10 px-8 py-3 text-2xl text-white transition hover:bg-white/20"
        >
          다시 도전
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="mb-2 text-2xl text-gray-400">
        {current + 1} / {questions.length}
      </div>

      <h3 className="max-w-4xl text-center text-3xl font-semibold leading-relaxed text-white">
        &ldquo;{q.question}&rdquo;
      </h3>

      <div className="mt-4 flex gap-6">
        <button
          onClick={() => handleAnswer(true)}
          disabled={selected !== null}
          className={`h-24 w-40 rounded-2xl text-4xl font-bold transition ${
            selected === null
              ? 'bg-blue-600 text-white hover:bg-blue-500'
              : selected === true
                ? q.answer === true
                  ? 'bg-green-600 text-white'
                  : 'bg-red-600 text-white'
                : 'bg-white/10 text-gray-500'
          }`}
        >
          O
        </button>
        <button
          onClick={() => handleAnswer(false)}
          disabled={selected !== null}
          className={`h-24 w-40 rounded-2xl text-4xl font-bold transition ${
            selected === null
              ? 'bg-red-600 text-white hover:bg-red-500'
              : selected === false
                ? q.answer === false
                  ? 'bg-green-600 text-white'
                  : 'bg-red-600 text-white'
                : 'bg-white/10 text-gray-500'
          }`}
        >
          X
        </button>
      </div>

      {showResult && (
        <div className="mt-4 flex flex-col items-center gap-4">
          <div
            className={`text-3xl font-bold ${selected === q.answer ? 'text-green-400' : 'text-red-400'}`}
          >
            {selected === q.answer ? '정답!' : '오답!'}
          </div>
          <p className="max-w-3xl text-center text-2xl text-gray-300">
            {q.explanation}
          </p>
          <button
            onClick={handleNext}
            className="mt-2 rounded-xl bg-cyan-600 px-8 py-3 text-2xl text-white transition hover:bg-cyan-500"
          >
            {current + 1 < questions.length ? '다음 문제' : '결과 보기'}
          </button>
        </div>
      )}
    </div>
  );
}
