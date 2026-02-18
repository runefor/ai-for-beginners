'use client';

import { useState } from 'react';

interface QuizItem {
  label: string;
  description: string;
  answer: 'ai' | 'human';
  explanation: string;
}

const items: QuizItem[] = [
  {
    label: '글',
    description:
      '벚꽃이 흩날리는 봄날, 오래된 카페에 앉아 창밖을 바라보며 지난 시간을 떠올렸다. 커피 향이 기억 속 그 사람의 향기와 겹쳐졌다.',
    answer: 'ai',
    explanation: 'ChatGPT가 작성한 글입니다. AI는 이미 자연스러운 문장을 만들어냅니다.',
  },
  {
    label: '시',
    description:
      '새벽 네 시의 거리에서\n나는 비로소 자유를 알았다\n아무도 나를 보지 않는\n그 고요 속에서.',
    answer: 'human',
    explanation: '사람이 쓴 시입니다. 하지만 AI도 비슷한 수준의 시를 쓸 수 있습니다.',
  },
  {
    label: '뉴스 기사',
    description:
      '서울시는 오늘 AI 기반 교통 관리 시스템을 도입한다고 발표했다. 이 시스템은 실시간 교통 데이터를 분석해 신호등 주기를 자동으로 최적화한다.',
    answer: 'ai',
    explanation: 'AI가 작성한 기사입니다. 이미 많은 뉴스가 AI로 자동 생성되고 있습니다.',
  },
  {
    label: '이메일',
    description:
      '안녕하세요 김 부장님, 지난 회의에서 말씀드린 3분기 보고서 첨부드립니다. 매출이 전년 대비 12% 상승했으며, 자세한 내용은 5페이지를 참고해 주세요.',
    answer: 'human',
    explanation: '사람이 작성한 이메일입니다. 하지만 곧 AI가 이런 이메일을 대신 써줄 겁니다.',
  },
];

export default function AIvsHumanQuiz() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<'ai' | 'human' | null>(null);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const item = items[current];

  function handleAnswer(answer: 'ai' | 'human') {
    if (selected !== null) return;
    setSelected(answer);
    if (answer === item.answer) {
      setScore((s) => s + 1);
    }
  }

  function handleNext() {
    if (current + 1 >= items.length) {
      setFinished(true);
    } else {
      setCurrent((c) => c + 1);
      setSelected(null);
    }
  }

  function handleReset() {
    setCurrent(0);
    setScore(0);
    setSelected(null);
    setFinished(false);
  }

  if (finished) {
    return (
      <div className="flex flex-col items-center gap-6">
        <h2 className="text-4xl font-bold text-white">
          {score >= 3
            ? '대단해요! 감별사 수준이네요'
            : 'AI와 사람의 경계가 이렇게 모호합니다'}
        </h2>
        <div className="text-6xl font-bold text-cyan-400">
          {score} / {items.length}
        </div>
        <p className="text-2xl text-gray-300">
          이미 AI의 글은 사람과 구분하기 어려운 수준입니다.
        </p>
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
      <div className="text-2xl text-gray-400">
        {current + 1} / {items.length}
      </div>

      <div className="mb-2 inline-block rounded-full bg-white/10 px-6 py-2 text-xl text-cyan-300">
        {item.label}
      </div>

      <div className="max-w-4xl whitespace-pre-line rounded-2xl bg-white/5 p-8 text-center text-2xl leading-relaxed text-gray-200">
        {item.description}
      </div>

      <div className="mt-4 flex gap-6">
        <button
          onClick={() => handleAnswer('ai')}
          disabled={selected !== null}
          className={`rounded-2xl px-10 py-5 text-2xl font-bold transition ${
            selected === null
              ? 'bg-purple-600 text-white hover:bg-purple-500'
              : selected === 'ai'
                ? item.answer === 'ai'
                  ? 'bg-green-600 text-white'
                  : 'bg-red-600 text-white'
                : 'bg-white/10 text-gray-500'
          }`}
        >
          AI가 만듦
        </button>
        <button
          onClick={() => handleAnswer('human')}
          disabled={selected !== null}
          className={`rounded-2xl px-10 py-5 text-2xl font-bold transition ${
            selected === null
              ? 'bg-amber-600 text-white hover:bg-amber-500'
              : selected === 'human'
                ? item.answer === 'human'
                  ? 'bg-green-600 text-white'
                  : 'bg-red-600 text-white'
                : 'bg-white/10 text-gray-500'
          }`}
        >
          사람이 만듦
        </button>
      </div>

      {selected !== null && (
        <div className="mt-4 flex flex-col items-center gap-3">
          <div
            className={`text-2xl font-bold ${selected === item.answer ? 'text-green-400' : 'text-red-400'}`}
          >
            {selected === item.answer ? '정답!' : '오답!'}
          </div>
          <p className="max-w-3xl text-center text-2xl text-gray-300">
            {item.explanation}
          </p>
          <button
            onClick={handleNext}
            className="mt-2 rounded-xl bg-cyan-600 px-8 py-3 text-2xl text-white transition hover:bg-cyan-500"
          >
            {current + 1 < items.length ? '다음' : '최종 결과'}
          </button>
        </div>
      )}
    </div>
  );
}
