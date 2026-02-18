'use client';

import dynamic from 'next/dynamic';
import Slide from '@/components/presentation/Slide';

const RevealPresentation = dynamic(
  () => import('@/components/presentation/RevealPresentation'),
  { ssr: false }
);
const TypingEffect = dynamic(
  () => import('@/components/interactive/TypingEffect'),
  { ssr: false }
);
const KnowledgeTest = dynamic(
  () => import('@/components/interactive/KnowledgeTest'),
  { ssr: false }
);
const FlipCard = dynamic(
  () => import('@/components/interactive/FlipCard'),
  { ssr: false }
);
const AIvsHumanQuiz = dynamic(
  () => import('@/components/interactive/AIvsHumanQuiz'),
  { ssr: false }
);
const MNISTDemo = dynamic(
  () => import('@/components/interactive/MNISTDemo'),
  { ssr: false }
);

export default function Home() {
  return (
    <RevealPresentation>
      {/* ========== Part 1: AI란? ========== */}

      {/* 1. 타이틀 */}
      <Slide dataBackgroundColor="#0a0a0a">
        <div className="flex flex-col items-center gap-8">
          <h1 className="text-7xl font-bold text-white">
            <TypingEffect text="AI for Beginners" speed={80} />
          </h1>
          <p className="text-3xl text-gray-400">
            인공지능, 어렵지 않습니다
          </p>
          <div className="mt-8 text-2xl text-gray-600">
            화살표 키(← →)로 이동하세요
          </div>
        </div>
      </Slide>

      {/* 2. AI 상식 테스트 */}
      <Slide dataBackgroundColor="#0f172a">
        <div className="flex flex-col items-center gap-6">
          <h2 className="mb-4 text-5xl font-bold text-white">
            당신의 AI 상식은 몇 점?
          </h2>
          <p className="mb-6 text-2xl text-gray-400">
            O 또는 X를 클릭하세요
          </p>
          <KnowledgeTest />
        </div>
      </Slide>

      {/* 3. 일상 속 AI */}
      <Slide dataBackgroundColor="#0a0a0a">
        <h2 className="mb-12 text-5xl font-bold text-white">
          사실, 이미 AI를 쓰고 있습니다
        </h2>
        <div className="mx-auto grid max-w-5xl grid-cols-3 gap-8">
          {[
            { icon: '🎬', title: '넷플릭스', desc: '"이 영화 어때요?" 추천' },
            { icon: '🗣️', title: '시리 / 빅스비', desc: '"오늘 날씨 알려줘"' },
            { icon: '🌐', title: '번역기', desc: '실시간 언어 번역' },
            { icon: '📸', title: '카메라', desc: '인물모드 배경 흐림' },
            { icon: '🛒', title: '쇼핑몰', desc: '"이 상품도 좋아하실걸요?"' },
            { icon: '📧', title: '이메일', desc: '스팸 자동 분류' },
          ].map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center gap-3 rounded-2xl bg-white/5 p-6"
            >
              <span className="text-5xl">{item.icon}</span>
              <h3 className="whitespace-nowrap text-2xl font-semibold text-white">{item.title}</h3>
              <p className="text-xl text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </Slide>

      {/* 4. AI의 정의 */}
      <Slide dataBackgroundColor="#0a0a0a">
        <div className="flex flex-col items-center gap-10">
          <h2 className="text-5xl font-bold text-white">그래서 AI가 뭔가요?</h2>
          <div className="max-w-4xl rounded-2xl bg-white/5 p-12">
            <p className="text-4xl leading-relaxed text-cyan-300">
              <TypingEffect
                text="사람처럼 보고, 듣고, 판단하도록 만든 컴퓨터 프로그램"
                speed={60}
              />
            </p>
          </div>
          <p className="mt-4 text-2xl text-gray-400">
            핵심은 &ldquo;패턴을 학습&rdquo;한다는 것
          </p>
        </div>
      </Slide>

      {/* 5. AI 역사 하이라이트 */}
      <Slide dataBackgroundColor="#0a0a0a">
        <h2 className="mb-12 text-5xl font-bold text-white">
          AI, 이런 일이 있었습니다
        </h2>
        <div className="mx-auto grid max-w-7xl grid-cols-4 gap-6">
          {[
            {
              year: '2016',
              title: '알파고\nvs\n이세돌',
              desc: 'AI가 바둑\n최강을 이기다',
              highlight: true,
            },
            {
              year: '2022',
              title: 'ChatGPT\n등장',
              desc: '2달 만에\n1억 명 돌파',
              highlight: true,
            },
            {
              year: '2023',
              title: 'AI\n미술대회 우승',
              desc: 'Midjourney\n작품 1등',
              highlight: false,
            },
            {
              year: '2025~',
              title: 'AI\n에이전트 시대',
              desc: 'AI가 직접\n컴퓨터 조작',
              highlight: true,
            },
          ].map((item) => (
            <div
              key={item.year}
              className={`flex h-[360px] flex-col items-center rounded-2xl px-6 py-8 ${
                item.highlight ? 'bg-cyan-900/50' : 'bg-white/5'
              }`}
            >
              <span className="text-xl font-bold text-cyan-400">{item.year}</span>
              <div className="flex flex-1 items-center">
                <h3 className="whitespace-pre-line text-center text-xl font-semibold leading-tight text-white">{item.title}</h3>
              </div>
              <p className="whitespace-pre-line text-center text-lg leading-tight text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </Slide>

      {/* ========== Part 2: AI 기본 이해 ========== */}

      {/* 6. AI의 학습 — MNIST 인터랙티브 데모 */}
      <Slide dataBackgroundColor="#0a0a0a">
        <h2 className="mb-4 text-5xl font-bold text-white">
          AI는 어떻게 배울까?
        </h2>
        <p className="mb-6 text-2xl text-gray-400">
          직접 숫자를 그려보세요 — AI가 실시간으로 인식합니다
        </p>
        <MNISTDemo />
      </Slide>

      {/* 7. AI도 틀린다 */}
      <Slide dataBackgroundColor="#1a0a0a">
        <h2 className="mb-10 text-5xl font-bold text-white">
          하지만, AI도 틀립니다
        </h2>
        <div className="mx-auto max-w-4xl space-y-8">
          {[
            {
              icon: '🤥',
              title: '환각 (Hallucination)',
              desc: '그럴듯하지만 완전히 틀린 답을 자신있게 말함',
            },
            {
              icon: '⚖️',
              title: '편향 (Bias)',
              desc: '학습 데이터에 편향이 있으면 AI 결과도 편향됨',
            },
            {
              icon: '📅',
              title: '최신 정보 부족',
              desc: '학습 시점 이후의 정보는 모를 수 있음',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-6 rounded-xl bg-white/5 p-6"
            >
              <span className="text-4xl">{item.icon}</span>
              <div>
                <h3 className="text-2xl font-semibold text-red-400">
                  {item.title}
                </h3>
                <p className="text-xl text-gray-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-8 text-3xl font-semibold text-yellow-300">
          AI는 도구입니다. 맹신하지 마세요!
        </p>
      </Slide>

      {/* ========== Part 3: AI vs 사람 퀴즈 ========== */}

      {/* 8. AI vs 사람 인트로 */}
      <Slide dataBackgroundColor="#0f172a">
        <div className="flex flex-col items-center gap-8">
          <h2 className="text-5xl font-bold text-white">AI가 만든 걸까?</h2>
          <p className="text-3xl text-gray-400">
            다음 글을 읽고, AI가 쓴 건지 사람이 쓴 건지 맞춰보세요
          </p>
          <div className="mt-6 text-8xl">🤔</div>
        </div>
      </Slide>

      {/* 9. AI vs 사람 퀴즈 */}
      <Slide dataBackgroundColor="#0f172a">
        <AIvsHumanQuiz />
      </Slide>

      {/* ========== Part 4: 생성형 AI ========== */}

      {/* 10. 생성형 AI란 */}
      <Slide dataBackgroundColor="#0a0a0a">
        <h2 className="mb-10 text-5xl font-bold text-white">생성형 AI의 시대</h2>
        <div className="mx-auto flex max-w-5xl items-center gap-12">
          <div className="flex-1 rounded-2xl bg-white/5 p-8 text-center">
            <h3 className="mb-4 text-3xl font-semibold text-gray-400">
              과거의 AI
            </h3>
            <p className="text-2xl text-gray-300">찾아주는 AI</p>
            <p className="mt-2 text-xl text-gray-500">검색, 분류, 추천</p>
          </div>
          <span className="text-5xl text-cyan-400">→</span>
          <div className="flex-1 rounded-2xl bg-cyan-900/40 p-8 text-center">
            <h3 className="mb-4 text-3xl font-semibold text-cyan-300">
              지금의 AI
            </h3>
            <p className="text-2xl text-white">만들어주는 AI</p>
            <p className="mt-2 text-xl text-gray-400">
              글, 그림, 영상, 코드, 음악
            </p>
          </div>
        </div>
      </Slide>

      {/* 11. ChatGPT가 바꾼 세상 */}
      <Slide dataBackgroundColor="#0a0a0a">
        <h2 className="mb-10 text-5xl font-bold text-white">
          ChatGPT가 바꾼 세상
        </h2>
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8">
          {[
            { number: '1억 명', desc: '2달 만에 달성한 사용자 수', sub: '역대 최빠 기록' },
            { number: '1억 8천만', desc: 'ChatGPT 주간 활성 사용자', sub: '2025년 기준' },
            { number: '92%', desc: 'Fortune 500 기업 도입률', sub: '비즈니스 필수 도구로' },
            { number: '300+', desc: '생성형 AI 서비스 수', sub: '매달 새로운 도구 등장' },
          ].map((item) => (
            <div
              key={item.desc}
              className="rounded-2xl bg-white/5 p-8 text-center"
            >
              <div className="text-4xl font-bold text-cyan-400">{item.number}</div>
              <p className="mt-2 text-2xl text-white">{item.desc}</p>
              <p className="mt-1 text-xl text-gray-500">{item.sub}</p>
            </div>
          ))}
        </div>
      </Slide>

      {/* 12. 프롬프트 = 대화법 */}
      <Slide dataBackgroundColor="#0a0a0a">
        <h2 className="mb-10 text-5xl font-bold text-white">
          AI 잘 쓰는 법 = 잘 물어보는 법
        </h2>
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="rounded-2xl bg-red-900/30 p-6">
            <span className="text-2xl font-bold text-red-400">나쁜 예 ❌</span>
            <p className="mt-2 text-2xl text-gray-300">
              &ldquo;마케팅 전략 알려줘&rdquo;
            </p>
          </div>
          <div className="rounded-2xl bg-green-900/30 p-6">
            <span className="text-2xl font-bold text-green-400">좋은 예 ✅</span>
            <p className="mt-2 text-2xl text-gray-300">
              &ldquo;20대 여성을 타겟으로 한 화장품 브랜드의 인스타그램 마케팅 전략을 3가지 제안해줘. 예산은 월 100만원이야.&rdquo;
            </p>
          </div>
          <div className="mt-8 rounded-2xl bg-white/5 p-6">
            <h3 className="text-2xl font-semibold text-cyan-300">핵심 공식</h3>
            <p className="mt-3 text-2xl text-gray-300">
              <span className="text-yellow-300">역할</span> +{' '}
              <span className="text-green-300">구체적 맥락</span> +{' '}
              <span className="text-purple-300">원하는 형식</span> ={' '}
              <span className="text-cyan-300">좋은 프롬프트</span>
            </p>
          </div>
        </div>
      </Slide>

      {/* ========== Part 5: AI 도구 소개 ========== */}

      {/* 13. 무료 AI 도구 - 카드 뒤집기 */}
      <Slide dataBackgroundColor="#0a0a0a">
        <h2 className="mb-10 text-5xl font-bold text-white">
          지금 바로 써보세요 (무료!)
        </h2>
        <p className="mb-8 text-2xl text-gray-500">카드를 클릭하면 설명이 나옵니다</p>
        <div className="mx-auto grid max-w-6xl grid-cols-3 gap-6">
          <FlipCard
            className="h-72"
            front={
              <>
                <span className="text-5xl">🔍</span>
                <h3 className="mt-3 text-2xl font-bold text-white">Perplexity</h3>
                <p className="text-xl text-gray-400">AI 검색</p>
              </>
            }
            back={
              <>
                <h3 className="text-2xl font-bold text-white">Perplexity</h3>
                <p className="mt-2 text-center text-xl text-gray-300">
                  구글 대신 질문하면 AI가 답을 정리해줌. 출처도 함께 표시.
                </p>
                <p className="mt-3 text-xl text-cyan-300">perplexity.ai</p>
              </>
            }
          />
          <FlipCard
            className="h-72"
            front={
              <>
                <span className="text-5xl">📓</span>
                <h3 className="mt-3 text-2xl font-bold text-white">NotebookLM</h3>
                <p className="text-xl text-gray-400">AI 리서치</p>
              </>
            }
            back={
              <>
                <h3 className="text-2xl font-bold text-white">NotebookLM</h3>
                <p className="mt-2 text-center text-xl text-gray-300">
                  PDF, 문서를 올리면 AI가 요약·분석. 구글 무료 제공.
                </p>
                <p className="mt-3 text-xl text-cyan-300">notebooklm.google.com</p>
              </>
            }
          />
          <FlipCard
            className="h-72"
            front={
              <>
                <span className="text-5xl">📊</span>
                <h3 className="mt-3 text-2xl font-bold text-white">Gamma</h3>
                <p className="text-xl text-gray-400">AI 발표자료</p>
              </>
            }
            back={
              <>
                <h3 className="text-2xl font-bold text-white">Gamma</h3>
                <p className="mt-2 text-center text-xl text-gray-300">
                  주제만 입력하면 PPT 자동 생성. 디자인까지 알아서.
                </p>
                <p className="mt-3 text-xl text-cyan-300">gamma.app</p>
              </>
            }
          />
        </div>
      </Slide>

      {/* 14. AI가 만드는 세상 - 카드 뒤집기 */}
      <Slide dataBackgroundColor="#0a0a0a">
        <h2 className="mb-10 text-5xl font-bold text-white">
          AI가 만드는 세상
        </h2>
        <p className="mb-8 text-2xl text-gray-500">카드를 클릭해보세요</p>
        <div className="mx-auto grid max-w-6xl grid-cols-4 gap-5">
          <FlipCard
            className="h-64"
            front={
              <>
                <span className="text-5xl">🎨</span>
                <h3 className="mt-3 text-2xl font-bold text-white">이미지</h3>
              </>
            }
            back={
              <>
                <h3 className="text-xl font-bold text-white">ChatGPT / Midjourney</h3>
                <p className="mt-2 text-center text-xl text-gray-300">
                  &ldquo;이런 그림 그려줘&rdquo; 한 마디로 이미지 생성
                </p>
              </>
            }
          />
          <FlipCard
            className="h-64"
            front={
              <>
                <span className="text-5xl">🎥</span>
                <h3 className="mt-3 text-2xl font-bold text-white">영상</h3>
              </>
            }
            back={
              <>
                <h3 className="text-xl font-bold text-white">Synthesia</h3>
                <p className="mt-2 text-center text-xl text-gray-300">
                  텍스트만 입력하면 AI 아바타가 말하는 영상 자동 생성
                </p>
              </>
            }
          />
          <FlipCard
            className="h-64"
            front={
              <>
                <span className="text-5xl">🎵</span>
                <h3 className="mt-3 text-2xl font-bold text-white">음성</h3>
              </>
            }
            back={
              <>
                <h3 className="text-xl font-bold text-white">ElevenLabs</h3>
                <p className="mt-2 text-center text-xl text-gray-300">
                  내 목소리를 복제해서 다국어 더빙까지 가능
                </p>
              </>
            }
          />
          <FlipCard
            className="h-64"
            front={
              <>
                <span className="text-5xl">📱</span>
                <h3 className="mt-3 text-2xl font-bold text-white">앱</h3>
              </>
            }
            back={
              <>
                <h3 className="text-xl font-bold text-white">Lovable</h3>
                <p className="mt-2 text-center text-xl text-gray-300">
                  코딩 없이 &ldquo;이런 앱 만들어줘&rdquo;로 앱 완성
                </p>
              </>
            }
          />
        </div>
      </Slide>

      {/* 15. 1%가 쓰는 AI - 카드 뒤집기 */}
      <Slide dataBackgroundColor="#0f172a">
        <h2 className="mb-4 text-5xl font-bold text-white">
          상위 1%가 쓰는 AI 도구
        </h2>
        <p className="mb-8 text-2xl text-gray-400">
          챗봇을 넘어, AI가 직접 일을 합니다
        </p>
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8">
          <FlipCard
            className="h-80"
            front={
              <>
                <span className="text-5xl">🦞</span>
                <h3 className="mt-3 text-3xl font-bold text-white">OpenClaw</h3>
                <p className="mt-2 text-xl text-gray-400">AI 개인 비서</p>
              </>
            }
            back={
              <>
                <h3 className="text-2xl font-bold text-white">OpenClaw (오픈클로)</h3>
                <p className="mt-2 text-center text-xl text-gray-300">
                  이메일, 일정, 파일을 AI가 직접 관리. 메신저로 24시간 지시 가능.
                  Notion, 캘린더 등과 연동.
                </p>
              </>
            }
          />
          <FlipCard
            className="h-80"
            front={
              <>
                <span className="text-5xl">🤖</span>
                <h3 className="mt-3 text-3xl font-bold text-white">Claude Cowork</h3>
                <p className="mt-2 text-xl text-gray-400">AI 업무 자동화</p>
              </>
            }
            back={
              <>
                <h3 className="text-2xl font-bold text-white">Claude Cowork (코워크)</h3>
                <p className="mt-2 text-center text-xl text-gray-300">
                  데스크톱에서 파일 관리, 데이터 분석, 리서치를 AI가 자동 수행.
                  Fortune 500 기업에서 도입 중.
                </p>
              </>
            }
          />
        </div>
      </Slide>

      {/* ========== Part 6: AI와 미래 ========== */}

      {/* 16. AI와 일자리 */}
      <Slide dataBackgroundColor="#0a0a0a">
        <h2 className="mb-10 text-5xl font-bold text-white">AI가 내 일자리를 뺏을까?</h2>
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 rounded-2xl bg-red-900/20 p-8">
            <h3 className="text-3xl font-semibold text-red-400">흔한 걱정</h3>
            <p className="mt-3 text-2xl text-gray-300">
              &ldquo;AI가 발전하면 사람은 필요 없어지는 거 아닌가?&rdquo;
            </p>
          </div>
          <div className="rounded-2xl bg-green-900/20 p-8">
            <h3 className="text-3xl font-semibold text-green-400">현실</h3>
            <p className="mt-3 text-2xl text-gray-300">
              AI가 사람을 <span className="text-yellow-300">대체</span>하는 게 아니라,
              <br />
              AI를 쓰는 사람이 안 쓰는 사람을{' '}
              <span className="text-cyan-300">대체</span>합니다.
            </p>
          </div>
        </div>
      </Slide>

      {/* 17. AI 윤리 */}
      <Slide dataBackgroundColor="#0a0a0a">
        <h2 className="mb-10 text-5xl font-bold text-white">알아둬야 할 것들</h2>
        <div className="mx-auto grid max-w-5xl grid-cols-3 gap-6">
          {[
            {
              icon: '⚖️',
              title: '편향과 차별',
              desc: 'AI가 학습한 데이터에 편향이 있으면 결과도 편향됩니다',
            },
            {
              icon: '🔒',
              title: '개인정보',
              desc: 'AI에게 개인정보를 입력하면 학습 데이터로 쓰일 수 있습니다',
            },
            {
              icon: '©️',
              title: '저작권',
              desc: 'AI가 만든 콘텐츠의 저작권은 아직 법적으로 불명확합니다',
            },
          ].map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-center gap-4 rounded-2xl bg-white/5 p-8 text-center"
            >
              <span className="text-5xl">{item.icon}</span>
              <h3 className="text-2xl font-semibold text-yellow-300">
                {item.title}
              </h3>
              <p className="text-xl text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </Slide>

      {/* 18. AI 시대 생존법 */}
      <Slide dataBackgroundColor="#0a0a0a">
        <h2 className="mb-10 text-5xl font-bold text-white">AI 시대, 어떻게 준비할까?</h2>
        <div className="mx-auto max-w-4xl space-y-6">
          {[
            { num: '1', text: '일단 써보세요 — 무료 도구부터 시작', color: 'text-cyan-400' },
            { num: '2', text: '질문하는 법을 배우세요 — 프롬프트가 곧 실력', color: 'text-green-400' },
            { num: '3', text: '나의 전문성 + AI = 최강 조합', color: 'text-yellow-400' },
            { num: '4', text: '변화를 두려워하지 마세요 — 도구일 뿐입니다', color: 'text-purple-400' },
          ].map((item) => (
            <div key={item.num} className="flex items-center gap-6 rounded-xl bg-white/5 p-6">
              <span className={`text-4xl font-bold ${item.color}`}>{item.num}</span>
              <p className="text-2xl text-gray-200">{item.text}</p>
            </div>
          ))}
        </div>
      </Slide>

      {/* 19. 지금 시작하기 */}
      <Slide dataBackgroundColor="#0a0a0a">
        <h2 className="mb-10 text-5xl font-bold text-white">
          오늘 집에 가서 해보세요
        </h2>
        <div className="mx-auto max-w-4xl space-y-6">
          {[
            { tool: 'ChatGPT', url: 'chat.openai.com', action: '아무거나 물어보기' },
            { tool: 'Perplexity', url: 'perplexity.ai', action: '궁금한 거 검색해보기' },
            { tool: 'NotebookLM', url: 'notebooklm.google.com', action: 'PDF 올려서 요약시키기' },
            { tool: 'Gamma', url: 'gamma.app', action: '발표자료 만들어보기' },
          ].map((item) => (
            <div
              key={item.tool}
              className="flex items-center justify-between rounded-xl bg-white/5 px-8 py-5"
            >
              <div>
                <h3 className="text-2xl font-semibold text-white">{item.tool}</h3>
                <p className="text-xl text-gray-500">{item.url}</p>
              </div>
              <span className="text-2xl text-cyan-300">{item.action}</span>
            </div>
          ))}
        </div>
      </Slide>

      {/* ========== 마무리 ========== */}

      {/* 20. 핵심 요약 */}
      <Slide dataBackgroundColor="#0a0a0a">
        <h2 className="mb-12 text-5xl font-bold text-white">오늘의 핵심</h2>
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="rounded-xl bg-white/5 p-6 text-center text-3xl text-gray-200">
            AI는 이미 우리 일상에 있습니다
          </div>
          <div className="rounded-xl bg-white/5 p-6 text-center text-3xl text-gray-200">
            완벽하지 않지만, 강력한 도구입니다
          </div>
          <div className="rounded-xl bg-cyan-900/40 p-6 text-center text-3xl font-semibold text-cyan-300">
            지금 시작하는 사람이 앞서갑니다
          </div>
        </div>
      </Slide>

      {/* 21. Q&A */}
      <Slide dataBackgroundColor="#0f172a">
        <div className="flex flex-col items-center gap-8">
          <h2 className="text-6xl font-bold text-white">Q&A</h2>
          <div className="text-8xl">💬</div>
          <p className="text-3xl text-gray-400">궁금한 점이 있으신가요?</p>
        </div>
      </Slide>

      {/* 22. 감사합니다 */}
      <Slide dataBackgroundColor="#0a0a0a">
        <div className="flex flex-col items-center gap-8">
          <h2 className="text-6xl font-bold text-white">감사합니다</h2>
          <p className="text-3xl text-gray-400">
            AI와 함께하는 미래, 지금 시작하세요
          </p>
          <div className="mt-8 rounded-2xl bg-white/5 p-8 text-center">
            <p className="text-2xl text-gray-500">
              {/* TODO: 발표자 연락처 */}
              발표자 이름 | email@example.com
            </p>
          </div>
        </div>
      </Slide>
    </RevealPresentation>
  );
}
