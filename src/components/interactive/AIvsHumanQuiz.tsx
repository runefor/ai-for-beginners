'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

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
      'Midjourney로 생성된 AI 이미지입니다. 2023년 전 세계를 속인 대표적인 딥페이크 사례입니다.',
  },
  {
    label: '사진',
    type: 'image',
    description: '해변의 플라밍고, AI가 그린 걸까요?',
    mediaUrl: '/images/quiz/real-photo.jpg',
    answer: 'human',
    explanation:
      '실제 사진입니다. 사진작가 Miles Astray의 작품으로, AI 사진 대회에서 수상했지만 실제 사진이었습니다.',
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

  const item = items[current];

  function resetQuiz() {
    setCurrent(0);
    setSelected(null);
  }

  function goToNextSlide() {
    window.dispatchEvent(new CustomEvent('presentation:next-slide'));
  }

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#/12') {
        resetQuiz();
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  function handleAnswer(answer: 'ai' | 'human') {
    if (selected !== null) return;
    setSelected(answer);
  }

  function handleNext() {
    if (current + 1 >= items.length) {
      goToNextSlide();
    } else {
      setCurrent((value) => value + 1);
      setSelected(null);
    }
  }

  const isMedia = item.type === 'image' || item.type === 'video';

  return (
    <div className="flex w-full max-w-6xl flex-col items-center gap-5">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="deck-pill">{current + 1} / {items.length}</span>
          <span className="deck-chip">{item.label}</span>
        </div>
        <p className="text-lg text-slate-400">직감보다 근거를 먼저 생각해보세요</p>
      </div>

      {item.type === 'text' ? (
        <div className="w-full rounded-[1.8rem] border border-white/10 bg-white/4 p-10 text-center text-[2rem] leading-relaxed text-white">
          {item.description}
        </div>
      ) : null}

      {item.type === 'image' ? (
        <div className="flex w-full flex-col items-center gap-4">
          <div className="w-full rounded-[1.8rem] bg-black/25 p-3">
            <Image
              src={item.mediaUrl as string}
              alt={`${item.label}: ${item.description}`}
              width={1200}
              height={900}
              priority
              className="mx-auto block h-auto max-w-full rounded-[1.3rem] object-contain"
              sizes="(max-width: 768px) 92vw, 960px"
              style={{
                maxHeight: selected ? '420px' : '560px',
                maxWidth: 'min(82vw, 940px)',
                transition: 'max-height 0.3s ease, max-width 0.3s ease',
              }}
            />
          </div>
          <p className="text-xl text-slate-400">{item.description}</p>
        </div>
      ) : null}

      {item.type === 'video' ? (
        <div className="flex w-full flex-col items-center gap-4">
          <div className="w-full rounded-[1.8rem] bg-black/25 p-3">
            <iframe
              src={`https://www.youtube.com/embed/${item.mediaUrl}`}
              title={item.label}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              className={`mx-auto aspect-video w-full ${selected ? 'max-w-[780px]' : 'max-w-[1100px]'}`}
              style={{
                borderRadius: '1.3rem',
                border: 'none',
                transition: 'max-width 0.3s ease',
              }}
            />
          </div>
          <p className="text-xl text-slate-400">{item.description}</p>
        </div>
      ) : null}

      <div className={`grid w-full max-w-3xl grid-cols-2 gap-4 ${isMedia ? 'mt-1' : 'mt-4'}`}>
        <button
          type="button"
          onClick={() => handleAnswer('ai')}
          disabled={selected !== null}
          className={`rounded-[1.4rem] border px-8 py-5 text-2xl font-semibold transition ${
            selected === null
              ? 'border-cyan-400/25 bg-cyan-950/24 text-white hover:bg-cyan-950/34'
              : selected === 'ai'
                ? item.answer === 'ai'
                  ? 'border-emerald-400/30 bg-emerald-950/40 text-white'
                  : 'border-rose-400/30 bg-rose-950/40 text-white'
                : 'border-white/10 bg-white/5 text-slate-500'
          }`}
        >
          🤖 AI가 만듦
        </button>
        <button
          type="button"
          onClick={() => handleAnswer('human')}
          disabled={selected !== null}
          className={`rounded-[1.4rem] border px-8 py-5 text-2xl font-semibold transition ${
            selected === null
              ? 'border-amber-400/25 bg-amber-950/24 text-white hover:bg-amber-950/34'
              : selected === 'human'
                ? item.answer === 'human'
                  ? 'border-emerald-400/30 bg-emerald-950/40 text-white'
                  : 'border-rose-400/30 bg-rose-950/40 text-white'
                : 'border-white/10 bg-white/5 text-slate-500'
          }`}
        >
          🧑 사람이 만듦
        </button>
      </div>

      {selected !== null ? (
        <div className="mt-2 flex flex-col items-center gap-3">
          <div className={`text-2xl font-semibold ${selected === item.answer ? 'text-emerald-300' : 'text-rose-300'}`}>
            {selected === item.answer ? '정답입니다' : '생각보다 더 어려워졌습니다'}
          </div>
          <p className="max-w-4xl text-center text-xl leading-relaxed text-slate-300">
            {item.explanation}
          </p>
          <button
            type="button"
            onClick={handleNext}
            className="rounded-full border border-cyan-400/20 bg-cyan-950/35 px-7 py-3 text-xl font-semibold text-white transition hover:bg-cyan-950/55"
          >
            {current + 1 < items.length ? '다음 문제' : '다음 슬라이드'}
          </button>
        </div>
      ) : null}
    </div>
  );
}
