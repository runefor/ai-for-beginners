'use client';

import { useEffect, useRef, useState } from 'react';
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
    explanation: 'AI가 쓴 글, 이제 문장만으로는 구분이 어렵습니다.',
  },
  {
    label: '시',
    type: 'text',
    description:
      '새벽 네 시의 거리에서\n나는 비로소 자유를 알았다\n아무도 나를 보지 않는\n그 고요 속에서.',
    answer: 'human',
    explanation: '사람이 쓴 시지만, 이제는 AI도 이 결을 따라옵니다.',
  },
  {
    label: '초상화',
    type: 'image',
    description: '이 사람은 실존할까요?',
    mediaUrl: '/images/quiz/ai-face.jpg',
    answer: 'ai',
    explanation: 'AI가 만든 얼굴, 실제 사람처럼 보여도 존재하지 않습니다.',
  },
  {
    label: '사진',
    type: 'image',
    description: '교황 프란치스코의 패딩 사진, 진짜일까요?',
    mediaUrl: '/images/quiz/pope-puffer.jpg',
    answer: 'ai',
    explanation: 'AI 이미지 한 장이 전 세계를 속였던 대표 사례입니다.',
  },
  {
    label: '사진',
    type: 'image',
    description: '해변의 플라밍고, AI가 그린 걸까요?',
    mediaUrl: '/images/quiz/real-photo.jpg',
    answer: 'human',
    explanation: '진짜 사진인데도 AI처럼 보일 만큼 기준이 흔들리고 있습니다.',
  },
  {
    label: '영상',
    type: 'video',
    description: '도쿄 거리를 걷는 여성, 실제 영상일까요?',
    mediaUrl: 'HK6y8DAPN_0',
    answer: 'ai',
    explanation: '이제는 문장 한 줄이 영상 한 편이 됩니다.',
  },
];

export default function AIvsHumanQuiz() {
  const rootRef = useRef<HTMLDivElement>(null);
  const wasPresentRef = useRef(false);
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
    const root = rootRef.current;
    const slide = root?.closest('section');
    if (!slide) return;

    const syncSlideState = () => {
      const isPresent = slide.classList.contains('present');
      if (isPresent && !wasPresentRef.current) {
        resetQuiz();
      }
      wasPresentRef.current = isPresent;
    };

    syncSlideState();

    const observer = new MutationObserver(syncSlideState);
    observer.observe(slide, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
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
  const isAnswered = selected !== null;
  const imageMaxHeight = isAnswered ? '18rem' : '26rem';
  const imageMaxWidth = isAnswered ? 'min(62vw, 680px)' : 'min(78vw, 900px)';
  const videoMaxWidth = isAnswered ? '560px' : '900px';

  return (
    <div ref={rootRef} className="flex h-full min-h-0 w-full max-w-6xl flex-col gap-4 overflow-hidden">
      <div className="flex shrink-0 items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="deck-pill">{current + 1} / {items.length}</span>
          <span className="deck-chip">{item.label}</span>
        </div>
        <p className="text-right text-lg text-slate-400">직감보다 신호를 먼저 보세요</p>
      </div>

      <div className="flex min-h-0 flex-1 flex-col justify-center overflow-hidden">
        {item.type === 'text' ? (
          <div className="flex min-h-0 items-center justify-center">
            <div className="w-full rounded-[1.8rem] border border-white/10 bg-white/4 p-10 text-center text-[2rem] leading-relaxed text-white">
              {item.description}
            </div>
          </div>
        ) : null}

        {item.type === 'image' ? (
          <div className="flex min-h-0 w-full flex-1 flex-col items-center gap-3 overflow-hidden">
            <div className="flex min-h-0 w-full items-center justify-center rounded-[1.8rem] bg-black/25 p-3">
              <Image
                src={item.mediaUrl as string}
                alt={`${item.label}: ${item.description}`}
                width={1200}
                height={900}
                priority
                className="mx-auto block h-auto max-h-full max-w-full rounded-[1.3rem] object-contain"
                sizes="(max-width: 768px) 92vw, 960px"
                style={{
                  maxHeight: imageMaxHeight,
                  maxWidth: imageMaxWidth,
                  transition: 'max-height 0.25s ease, max-width 0.25s ease',
                }}
              />
            </div>
            <p className="shrink-0 text-center text-xl text-slate-400">{item.description}</p>
          </div>
        ) : null}

        {item.type === 'video' ? (
          <div className="flex min-h-0 w-full flex-1 flex-col items-center gap-3 overflow-hidden">
            <div className="flex min-h-0 w-full items-center justify-center rounded-[1.8rem] bg-black/25 p-3">
              <iframe
                src={`https://www.youtube.com/embed/${item.mediaUrl}`}
                title={item.label}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="lazy"
                className="mx-auto aspect-video w-full rounded-[1.3rem] border-0"
                style={{
                  maxWidth: videoMaxWidth,
                  transition: 'max-width 0.25s ease',
                }}
              />
            </div>
            <p className="shrink-0 text-center text-xl text-slate-400">{item.description}</p>
          </div>
        ) : null}
      </div>

      <div className={`mx-auto grid shrink-0 w-full max-w-3xl grid-cols-2 gap-4 ${isMedia ? 'mt-1' : 'mt-2'}`}>
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
        <div className="mx-auto mt-1 flex shrink-0 flex-col items-center gap-2">
          <div className={`text-2xl font-semibold ${selected === item.answer ? 'text-emerald-300' : 'text-rose-300'}`}>
            {selected === item.answer ? '정답입니다' : '이제는 감만으로 어렵습니다'}
          </div>
          <p className="max-w-4xl text-center text-lg leading-relaxed text-slate-300">
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
