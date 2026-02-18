'use client';

import { useState } from 'react';

interface QuizItem {
  label: string;
  type: 'text' | 'image' | 'video';
  description: string;
  mediaUrl?: string;
  answer: 'ai' | 'human';
  explanation: string;
}

const items: QuizItem[] = [
  {
    label: '글',
    type: 'text',
    description:
      '벚꽃이 흩날리는 봄날, 오래된 카페에 앉아 창밖을 바라보며 지난 시간을 떠올렸다. 커피 향이 기억 속 그 사람의 향기와 겹쳐졌다.',
    answer: 'ai',
    explanation: 'ChatGPT가 작성한 글입니다. AI는 이미 자연스러운 문장을 만들어냅니다.',
  },
  {
    label: '시',
    type: 'text',
    description:
      '새벽 네 시의 거리에서\n나는 비로소 자유를 알았다\n아무도 나를 보지 않는\n그 고요 속에서.',
    answer: 'human',
    explanation: '사람이 쓴 시입니다. 하지만 AI도 비슷한 수준의 시를 쓸 수 있습니다.',
  },
  {
    label: '초상화',
    type: 'image',
    description: '이 사람은 실존할까요?',
    mediaUrl: '/images/quiz/ai-face.jpg',
    answer: 'ai',
    explanation:
      'AI(StyleGAN)가 생성한 얼굴입니다. thispersondoesnotexist.com에서 만들어진, 실존하지 않는 사람입니다.',
  },
  {
    label: '사진',
    type: 'image',
    description: '교황 프란치스코의 패딩 사진, 진짜일까요?',
    mediaUrl: '/images/quiz/pope-puffer.jpg',
    answer: 'ai',
    explanation:
      'Midjourney로 생성된 AI 이미지입니다. 2023년 전 세계를 속인 대표적인 AI 딥페이크 사례입니다.',
  },
  {
    label: '사진',
    type: 'image',
    description: '해변의 플라밍고, AI가 그린 걸까요?',
    mediaUrl: '/images/quiz/real-photo.jpg',
    answer: 'human',
    explanation:
      '실제 사진입니다! 사진작가 Miles Astray가 촬영한 "FLAMINGONE"으로, AI 사진 대회에서 수상했지만 실제 사진이었습니다.',
  },
  {
    label: '영상',
    type: 'video',
    description: '도쿄 거리를 걷는 여성, 실제 영상일까요?',
    mediaUrl: 'HK6y8DAPN_0',
    answer: 'ai',
    explanation:
      'OpenAI Sora가 생성한 AI 영상입니다. 텍스트 한 줄로 이런 영상을 만들 수 있는 시대가 왔습니다.',
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
          {score >= 4
            ? '대단해요! 감별사 수준이네요'
            : 'AI와 사람의 경계가 이렇게 모호합니다'}
        </h2>
        <div className="text-6xl font-bold text-cyan-400">
          {score} / {items.length}
        </div>
        <p className="text-2xl text-gray-300">
          이미 AI가 만든 콘텐츠는 사람과 구분하기 어려운 수준입니다.
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

  const isMedia = item.type === 'image' || item.type === 'video';

  return (
    <div className="flex flex-col items-center gap-3">
      {/* 상단: 진행 + 라벨 */}
      <div className="flex items-center gap-4">
        <span className="text-xl text-gray-400">
          {current + 1} / {items.length}
        </span>
        <span className="rounded-full bg-white/10 px-5 py-1 text-lg text-cyan-300">
          {item.label}
        </span>
      </div>

      {/* 콘텐츠 영역 */}
      {item.type === 'text' && (
        <div className="max-w-4xl whitespace-pre-line rounded-2xl bg-white/5 p-8 text-center text-2xl leading-relaxed text-gray-200">
          {item.description}
        </div>
      )}

      {item.type === 'image' && (
        <div className="flex flex-col items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.mediaUrl}
            alt={item.label}
            loading="eager"
            style={{
              maxHeight: selected ? '250px' : '350px',
              width: 'auto',
              borderRadius: '1rem',
              objectFit: 'contain',
              background: 'none',
              border: 'none',
              boxShadow: 'none',
              margin: '0 auto',
              display: 'block',
              transition: 'max-height 0.3s ease',
            }}
          />
          <p className="text-lg text-gray-400">{item.description}</p>
        </div>
      )}

      {item.type === 'video' && (
        <div className="flex flex-col items-center gap-2">
          <iframe
            width={selected ? '420' : '520'}
            height={selected ? '236' : '293'}
            src={`https://www.youtube.com/embed/${item.mediaUrl}`}
            title={item.label}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{
              borderRadius: '1rem',
              border: 'none',
              transition: 'all 0.3s ease',
            }}
          />
          <p className="text-lg text-gray-400">{item.description}</p>
        </div>
      )}

      {/* 버튼 */}
      <div className={`flex gap-4 ${isMedia ? 'mt-1' : 'mt-4'}`}>
        <button
          onClick={() => handleAnswer('ai')}
          disabled={selected !== null}
          className={`rounded-2xl px-8 py-3 text-xl font-bold transition ${
            selected === null
              ? 'bg-purple-600 text-white hover:bg-purple-500'
              : selected === 'ai'
                ? item.answer === 'ai'
                  ? 'bg-green-600 text-white'
                  : 'bg-red-600 text-white'
                : 'bg-white/10 text-gray-500'
          }`}
        >
          🤖 AI가 만듦
        </button>
        <button
          onClick={() => handleAnswer('human')}
          disabled={selected !== null}
          className={`rounded-2xl px-8 py-3 text-xl font-bold transition ${
            selected === null
              ? 'bg-amber-600 text-white hover:bg-amber-500'
              : selected === 'human'
                ? item.answer === 'human'
                  ? 'bg-green-600 text-white'
                  : 'bg-red-600 text-white'
                : 'bg-white/10 text-gray-500'
          }`}
        >
          🧑 사람이 만듦
        </button>
      </div>

      {/* 피드백 */}
      {selected !== null && (
        <div className="flex flex-col items-center gap-2">
          <div
            className={`text-xl font-bold ${selected === item.answer ? 'text-green-400' : 'text-red-400'}`}
          >
            {selected === item.answer ? '✅ 정답!' : '❌ 오답!'}
          </div>
          <p className="max-w-3xl text-center text-lg text-gray-300">
            {item.explanation}
          </p>
          <button
            onClick={handleNext}
            className="rounded-xl bg-cyan-600 px-6 py-2 text-xl text-white transition hover:bg-cyan-500"
          >
            {current + 1 < items.length ? '다음 →' : '최종 결과 보기'}
          </button>
        </div>
      )}
    </div>
  );
}
