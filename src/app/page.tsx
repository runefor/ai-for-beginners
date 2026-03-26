import Slide from '@/components/presentation/Slide';
import RevealPresentation from '@/components/presentation/RevealPresentation';
import TypingEffect from '@/components/interactive/TypingEffect';
import KnowledgeTest from '@/components/interactive/KnowledgeTest';
import AIvsHumanQuiz from '@/components/interactive/AIvsHumanQuiz';
import AILimitationsShowcase from '@/components/interactive/AILimitationsShowcase';
import GenerativeAIShowcase from '@/components/interactive/GenerativeAIShowcase';
import AIShiftTimeline from '@/components/interactive/AIShiftTimeline';
import StarterToolkitShowcase from '@/components/interactive/StarterToolkitShowcase';
import ClaudeCoworkSpotlight from '@/components/interactive/ClaudeCoworkSpotlight';
import PromptCraftingDemo from '@/components/interactive/PromptCraftingDemo';
import MNISTDemo from '@/components/interactive/MNISTDemo';

function Eyebrow({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={`deck-eyebrow ${className}`}>{children}</p>;
}

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2 className="deck-title">{title}</h2>
      {description ? <p className="deck-copy max-w-4xl">{description}</p> : null}
    </div>
  );
}

function AccentCard({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={`deck-card ${className}`}>{children}</div>;
}

export default function Home() {
  return (
    <RevealPresentation>
      <Slide dataBackgroundColor="#06101b">
        <div className="deck-shell deck-spotlight flex h-full items-center justify-center">
          <div className="inline-flex max-w-max flex-col rounded-[1.9rem] border border-cyan-400/16 bg-black/22 px-8 py-6 shadow-[0_24px_70px_rgba(0,0,0,0.28)] backdrop-blur-md">
            <div className="flex items-center gap-3 text-[0.75rem] font-semibold tracking-[0.24em] text-slate-400 uppercase">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/85 shadow-[0_0_14px_rgba(251,113,133,0.35)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300/85 shadow-[0_0_14px_rgba(252,211,77,0.28)]" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-300/80 shadow-[0_0_14px_rgba(110,231,183,0.28)]" />
              <span className="ml-3 font-mono tracking-[0.2em] text-cyan-200/72">launch keynote</span>
            </div>
            <h1 className="deck-title deck-title-hero mt-5 max-w-none whitespace-nowrap font-mono tracking-[-0.06em]">
              <span className="mr-4 text-cyan-200/78">&gt;</span>
              <TypingEffect
                text="AI for Beginners"
                speed={72}
                startDelay={280}
                cursorVariant="block"
                keepCursor
                cursorClassName="bg-cyan-100"
              />
            </h1>
          </div>
        </div>
      </Slide>

      <Slide dataBackgroundColor="#081425">
        <div className="deck-shell flex h-full flex-col gap-8">
          <SectionHeader
            eyebrow="Warm-up Quiz"
            title="당신의 AI 상식은 몇 점일까요?"
          />
          <div className="grid flex-1 grid-cols-[0.38fr_0.62fr] gap-6">
            <div className="deck-panel justify-between">
              <div>
                <Eyebrow>BEFORE WE START</Eyebrow>
                <p className="mt-5 text-4xl font-semibold text-white">AI에 대한 흔한 착각</p>
                <div className="mt-6 space-y-4 text-2xl text-slate-300">
                  <p>AI는 스스로 생각한다</p>
                  <p>AI는 항상 최신이고 정확하다</p>
                  <p>AI는 특별한 사람만 쓴다</p>
                </div>
              </div>
              <div className="deck-callout mt-8">
                정답보다 중요한 건 <span className="text-cyan-200">내가 무엇을 헷갈리고 있는지</span>를 아는 것입니다.
              </div>
            </div>
            <div className="deck-panel items-center justify-center">
              <KnowledgeTest />
            </div>
          </div>
        </div>
      </Slide>

      <Slide dataBackgroundColor="#06101b">
        <div className="deck-shell flex h-full flex-col gap-8">
          <SectionHeader
            eyebrow="Everyday AI"
            title="사실, 이미 AI를 쓰고 있습니다"
          />
          <div className="grid grid-cols-3 gap-5">
            {[
              ['🎬', '넷플릭스', '취향을 읽고 다음 영화를 추천합니다', '추천'],
              ['🗣️', '시리 / 빅스비', '음성을 듣고 의도를 분류합니다', '음성'],
              ['🌐', '번역기', '문맥을 보고 자연스러운 문장을 만듭니다', '언어'],
              ['📸', '카메라', '피사체와 배경을 실시간으로 구분합니다', '비전'],
              ['🛒', '쇼핑몰', '클릭 패턴으로 다음 상품을 제안합니다', '예측'],
              ['📧', '이메일', '스팸과 중요 메일을 먼저 걸러냅니다', '분류'],
            ].map(([icon, title, desc, tag]) => (
              <AccentCard key={title} className="min-h-[16rem] justify-between">
                <div className="flex items-start justify-between gap-4">
                  <span className="text-6xl leading-none">{icon}</span>
                  <span className="deck-chip">{tag}</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-4xl font-semibold text-white">{title}</h3>
                  <p className="text-xl leading-relaxed text-slate-300">{desc}</p>
                </div>
              </AccentCard>
            ))}
          </div>
        </div>
      </Slide>

      <Slide dataBackgroundColor="#06101b">
        <div className="deck-shell deck-spotlight flex h-full items-center">
          <div className="grid w-full grid-cols-[1.1fr_0.9fr] gap-8">
            <div className="space-y-8">
              <Eyebrow>Definition</Eyebrow>
              <h2 className="deck-title max-w-4xl">그래서 AI가 뭔가요?</h2>
              <div className="grid grid-cols-3 gap-4">
                <AccentCard>
                  <Eyebrow>INPUT</Eyebrow>
                  <p className="mt-3 text-3xl font-semibold text-white">많은 예시</p>
                </AccentCard>
                <AccentCard>
                  <Eyebrow>PROCESS</Eyebrow>
                  <p className="mt-3 text-3xl font-semibold text-white">패턴 찾기</p>
                </AccentCard>
                <AccentCard>
                  <Eyebrow>OUTPUT</Eyebrow>
                  <p className="mt-3 text-3xl font-semibold text-white">그럴듯한 결과</p>
                </AccentCard>
              </div>
            </div>
            <div className="deck-panel justify-center">
              <p className="text-[2.2rem] leading-[1.45] text-cyan-100">
                <TypingEffect
                  text="사람처럼 보이는 결과를 만들지만, 실제로는 데이터를 보고 규칙과 패턴을 찾아내는 컴퓨터 프로그램"
                  speed={42}
                />
              </p>
              <div className="deck-callout mt-8">
                핵심은 <span className="text-white">이해</span>가 아니라 <span className="text-white">패턴 매칭</span>입니다.
              </div>
            </div>
          </div>
        </div>
      </Slide>

      <Slide dataBackgroundColor="#0a1426">
        <div className="deck-shell flex h-full flex-col justify-center gap-10">
          <Eyebrow>Human vs Machine</Eyebrow>
          <div className="grid grid-cols-[0.96fr_1.04fr] gap-6">
            <div className="deck-panel min-h-[22rem] justify-between">
              <span className="text-7xl">🤔</span>
              <div>
                <p className="text-2xl text-slate-400">겉으로 보이는 인상</p>
                <p className="mt-4 text-[5rem] font-semibold leading-[1.04] text-white">
                  AI는
                  <br />
                  사람처럼
                  <br />
                  생각하는 것 같다
                </p>
              </div>
            </div>
            <div className="deck-panel min-h-[22rem] justify-between border-cyan-400/20 bg-cyan-950/20">
              <span className="text-7xl">🧠</span>
              <div>
                <p className="text-2xl text-cyan-200">실제로 벌어지는 일</p>
                <p className="mt-4 text-[4.1rem] font-semibold leading-[1.08] text-white">
                  많은 데이터를 보고
                  <br />
                  <span className="text-cyan-200">패턴을 찾는 도구</span>입니다
                </p>
              </div>
            </div>
          </div>
          <p className="text-center text-2xl text-slate-400">그 원리를 아주 단순한 숫자 인식 예시로 먼저 보겠습니다.</p>
        </div>
      </Slide>

      <Slide dataBackgroundColor="#06101b">
        <div className="deck-shell flex h-full flex-col gap-8">
          <SectionHeader
            eyebrow="Pattern Learning"
            title="AI는 어떻게 배울까요?"
          />
          <div className="grid flex-1 grid-cols-[0.28fr_0.72fr] gap-6">
            <div className="deck-panel justify-between">
              <div>
                <Eyebrow>TRY IT</Eyebrow>
                <p className="mt-4 text-4xl font-semibold text-white">직접 숫자를 그려보세요</p>
              </div>
              <div className="space-y-4 text-xl leading-relaxed text-slate-300">
                <p>1. 왼쪽에 숫자를 그립니다</p>
                <p>2. 가운데 네트워크가 특징을 읽습니다</p>
                <p>3. 오른쪽에서 가장 높은 확률을 보여줍니다</p>
              </div>
              <div className="deck-callout">보는 순간 이해되는 슬라이드여야 하므로 설명보다 데모를 크게 배치했습니다.</div>
            </div>
            <div className="deck-panel items-center justify-center">
              <MNISTDemo />
            </div>
          </div>
        </div>
      </Slide>

      <Slide dataBackgroundColor="#130b10">
        <div className="deck-shell flex h-full flex-col gap-8">
          <SectionHeader
            eyebrow="Risk Signal"
            title="하지만, AI도 틀립니다"
          />
          <div className="grid flex-1 grid-cols-[0.26fr_0.74fr] gap-6">
            <div className="deck-panel border-red-500/20 bg-red-950/20">
              <Eyebrow className="text-red-200/80">REMEMBER</Eyebrow>
              <p className="mt-5 text-5xl font-semibold leading-tight text-white">AI는 자신감 있게 틀릴 수 있습니다</p>
              <p className="mt-6 text-xl leading-relaxed text-slate-300">답이 매끄럽고 빨라도, 출처 확인과 최종 판단은 여전히 사람의 역할입니다.</p>
              <div className="deck-callout mt-8 border-red-400/20 bg-red-950/40 text-red-100">
                맹신 금지. 특히 법률, 의료, 금융, 뉴스처럼 사실 검증이 중요한 분야는 더 그렇습니다.
              </div>
            </div>
            <div className="deck-panel">
              <AILimitationsShowcase />
            </div>
          </div>
        </div>
      </Slide>

      <Slide dataBackgroundColor="#081425">
        <div className="deck-shell flex h-full flex-col justify-center gap-10">
          <div className="flex flex-col items-center text-center">
            <Eyebrow>Why Now</Eyebrow>
            <h2 className="mt-3 text-[4.55rem] font-semibold leading-[1.08] tracking-[-0.04em] text-white">
              그런데 왜 요즘 AI가
              <br />
              더 화제가 될까요?
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-5">
            <AccentCard>
              <Eyebrow>BEFORE</Eyebrow>
              <p className="mt-4 text-4xl font-semibold text-white">추천하고 분류하던 AI</p>
            </AccentCard>
            <AccentCard className="border-amber-400/20 bg-amber-950/18">
              <Eyebrow className="text-amber-100/80">NOW</Eyebrow>
              <p className="mt-4 text-4xl font-semibold text-white">직접 만들기 시작한 AI</p>
            </AccentCard>
            <AccentCard className="border-cyan-400/20 bg-cyan-950/20">
              <Eyebrow>NEXT</Eyebrow>
              <p className="mt-4 text-4xl font-semibold text-white">조사하고 실행하는 AI</p>
            </AccentCard>
          </div>
        </div>
      </Slide>

      <Slide dataBackgroundColor="#06101b">
        <div className="deck-shell flex h-full flex-col gap-8">
          <SectionHeader
            eyebrow="Three Waves"
            title="AI는 세 단계로 바뀌고 있습니다"
          />
          <div className="grid grid-cols-[0.8fr_0.95fr_1.15fr] gap-5">
            {[
              ['1단계', '예측 AI', '추천, 분류, 번역처럼 여러 선택지 중 가장 그럴듯한 답을 고릅니다.', '01', 'border-cyan-400/20 bg-cyan-950/18'],
              ['2단계', '생성형 AI', '글, 이미지, 영상, 코드 초안을 직접 만들며 창작 과정에 들어왔습니다.', '02', 'border-amber-400/20 bg-amber-950/18'],
              ['3단계', '행동하는 AI', '조사, 정리, 앱 조작까지 이어지며 결과물을 끝까지 밀어붙이기 시작했습니다.', '03', 'border-rose-400/25 bg-rose-950/18'],
            ].map(([step, title, desc, num, tone]) => (
              <div key={step} className={`deck-card min-h-[22rem] justify-between ${tone}`}>
                <div className="flex items-center justify-between">
                  <span className="deck-pill">{step}</span>
                  <span className="text-5xl text-white/70">{num}</span>
                </div>
                <div>
                  <h3 className="text-5xl font-semibold text-white">{title}</h3>
                  <p className="mt-5 text-[1.45rem] leading-relaxed text-slate-300">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Slide>

      <Slide dataBackgroundColor="#06101b">
        <div className="deck-shell flex h-full flex-col gap-8">
          <SectionHeader
            eyebrow="What AI Does Now"
            title="요즘 AI는 이렇게 쓰입니다"
          />
          <div className="deck-panel flex-1">
            <GenerativeAIShowcase />
          </div>
        </div>
      </Slide>

      <Slide dataBackgroundColor="#06101b" className="flex h-full flex-col justify-start pt-5">
        <div className="deck-shell flex h-full flex-col gap-3 !p-5">
          <div className="flex flex-col gap-1.5">
            <Eyebrow>Shift Timeline</Eyebrow>
            <h2 className="text-[3rem] leading-none font-semibold tracking-[-0.04em] text-white">
              2025~2026, AI는 이렇게 바뀌었습니다
            </h2>
          </div>
          <div className="deck-panel min-h-0 flex-1 overflow-hidden px-3 py-3">
            <AIShiftTimeline />
          </div>
        </div>
      </Slide>

      <Slide dataBackgroundColor="#081425">
        <div className="deck-shell flex h-full flex-col items-center justify-center gap-10 text-center">
          <Eyebrow>Can You Tell?</Eyebrow>
          <div className="flex flex-col items-center gap-8">
            <div className="flex flex-col items-center">
              <h2 className="deck-title max-w-4xl">AI가 만든 걸까?</h2>
              <p className="deck-pretty mt-6 max-w-[34ch] text-[1.5rem] leading-[1.55] text-slate-300">
                이제는 사람 눈으로도 글, 사진, 영상의 출처를 구분하기 어려워졌습니다. 감으로 맞히기보다 어떤 신호를 봐야 하는지가 중요합니다.
              </p>
            </div>
            <div className="grid w-full max-w-4xl grid-cols-3 gap-4">
              <AccentCard className="min-h-[12rem] items-center justify-center text-center">
                <span className="text-6xl">📝</span>
                <p className="mt-4 text-3xl font-semibold text-white">문장</p>
              </AccentCard>
              <AccentCard className="min-h-[12rem] items-center justify-center text-center">
                <span className="text-6xl">🖼️</span>
                <p className="mt-4 text-3xl font-semibold text-white">이미지</p>
              </AccentCard>
              <AccentCard className="min-h-[12rem] items-center justify-center text-center">
                <span className="text-6xl">🎬</span>
                <p className="mt-4 text-3xl font-semibold text-white">영상</p>
              </AccentCard>
            </div>
          </div>
        </div>
      </Slide>

      <Slide dataBackgroundColor="#081425">
        <div className="deck-shell flex h-full flex-col justify-center">
          <div className="deck-panel items-center justify-center">
            <AIvsHumanQuiz />
          </div>
        </div>
      </Slide>

      <Slide dataBackgroundColor="#06101b">
        <div className="deck-shell flex h-full flex-col gap-4">
          <SectionHeader
            eyebrow="Prompt Craft"
            title="AI 잘 쓰는 법 = 잘 물어보는 법"
          />
          <div className="-mt-2 grid min-h-0 flex-1 grid-cols-[0.22fr_0.78fr] gap-5">
            <div className="deck-panel min-h-0 justify-between px-5 py-5">
              <div>
                <Eyebrow>CORE PROMPTING</Eyebrow>
                <div className="mt-5 space-y-3 text-[1.65rem] leading-snug text-slate-200">
                  <p><span className="text-cyan-200">목표</span>: 무엇을 얻고 싶은지</p>
                  <p><span className="text-cyan-200">맥락</span>: 어떤 상황과 조건인지</p>
                  <p><span className="text-cyan-200">형식·제약</span>: 어떤 모양과 기준으로 받을지</p>
                </div>
                <p className="mt-5 text-base leading-relaxed text-slate-400">
                  역할은 필요할 때만 추가합니다.
                  <br />
                  톤, 관점, 캐릭터 일관성이 중요할 때만 쓰면 됩니다.
                </p>
              </div>
              <div className="deck-callout px-4 py-3 text-[0.98rem]">좋은 프롬프트는 역할놀이보다 목표, 맥락, 형식과 제약을 먼저 분명히 합니다.</div>
            </div>
            <div className="deck-panel min-h-0 overflow-hidden px-4 py-4">
              <PromptCraftingDemo />
            </div>
          </div>
        </div>
      </Slide>

      <Slide dataBackgroundColor="#06101b">
        <div className="deck-shell flex h-full flex-col gap-6">
          <SectionHeader
            eyebrow="Starter Toolkit"
            title="초보자라면 여기서 시작하세요"
          />
          <StarterToolkitShowcase />
        </div>
      </Slide>

      <Slide dataBackgroundColor="#06101b">
        <div className="deck-shell flex h-full flex-col gap-6">
          <SectionHeader
            eyebrow="Creative Surface"
            title="AI가 만드는 세상"
          />
          <div className="grid min-h-0 flex-1 grid-cols-[0.42fr_0.58fr] gap-6">
            <div className="deck-panel justify-between border-white/10 bg-linear-to-b from-slate-900/92 to-[#08111b] px-7 py-7">
              <div>
                <Eyebrow>ONE PROMPT, MANY FORMATS</Eyebrow>
                <p className="mt-5 text-[3rem] font-semibold leading-[1.08] tracking-[-0.04em] text-white">
                  이제 AI는
                  <br />
                  한 가지 답이 아니라
                  <br />
                  <span className="text-cyan-200">여러 형태의 초안</span>을 만듭니다
                </p>
                <div className="mt-8 space-y-3">
                  {[
                    ['이미지', '포스터, 썸네일, 키비주얼'],
                    ['영상', '짧은 콘티, 샷 아이디어'],
                    ['음성', '나레이션, 더빙 샘플'],
                    ['앱', '화면 시안, 프로토타입'],
                  ].map(([label, desc]) => (
                    <div
                      key={label}
                      className="flex items-center justify-between rounded-[1.15rem] border border-white/8 bg-black/16 px-4 py-3"
                    >
                      <span className="text-[1.02rem] font-semibold tracking-[0.16em] text-slate-400 uppercase">{label}</span>
                      <span className="text-[1.02rem] text-slate-200">{desc}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="deck-callout mt-6">
                중요한 건 완성본 자체보다, <span className="text-white">시작 속도와 비교 가능한 초안</span>을 빠르게 확보하는 점입니다.
              </div>
            </div>

            <div className="deck-panel min-h-0 overflow-hidden border-cyan-400/14 bg-linear-to-br from-[#101827] via-[#09111c] to-[#050913] p-5">
              <div className="flex h-full flex-col justify-center rounded-[1.8rem] border border-white/8 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.08),transparent_34%),linear-gradient(180deg,rgba(2,6,23,0.76),rgba(2,6,23,0.96))] px-7 py-7">
                <div className="mx-auto w-full max-w-[34rem] rounded-[1.5rem] border border-cyan-300/16 bg-cyan-950/18 px-5 py-5 shadow-[0_18px_60px_rgba(8,145,178,0.08)]">
                  <p className="text-[0.76rem] font-semibold tracking-[0.24em] text-cyan-100/78 uppercase">Starting Point</p>
                  <p className="mt-3 text-[1.45rem] leading-[1.45] text-white">
                    &quot;신제품 런칭 아이디어를 빠르게 시안으로 보고 싶다&quot;
                  </p>
                </div>

                <div className="mx-auto h-10 w-px bg-linear-to-b from-cyan-300/55 to-transparent" />

                <div className="grid grid-cols-2 gap-4">
                  {[
                    ['이미지', '포스터 / 썸네일'],
                    ['영상', '짧은 콘티 / 샷'],
                    ['음성', '나레이션 / 더빙'],
                    ['앱', '화면 시안 / 프로토타입'],
                  ].map(([title, desc], index) => (
                    <div
                      key={title}
                      className={`rounded-[1.35rem] border px-5 py-5 ${
                        index === 0
                          ? 'border-amber-300/18 bg-amber-950/14'
                          : index === 1
                            ? 'border-cyan-300/18 bg-cyan-950/14'
                            : index === 2
                              ? 'border-slate-300/12 bg-slate-900/42'
                              : 'border-rose-300/18 bg-rose-950/12'
                      }`}
                    >
                      <p className="text-[0.76rem] font-semibold tracking-[0.2em] text-slate-400 uppercase">Output</p>
                      <p className="mt-3 text-[1.7rem] font-semibold text-white">{title}</p>
                      <p className="mt-2 text-[1.02rem] leading-relaxed text-slate-300">{desc}</p>
                    </div>
                  ))}
                </div>

                <p className="mt-6 text-center text-[1rem] leading-relaxed text-slate-300">
                  핵심은 한 번에 잘 만드는 것이 아니라, <span className="text-cyan-200">여러 초안을 빠르게 비교</span>하면서 방향을 잡는 것입니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Slide>

      <Slide dataBackgroundColor="#081425" className="flex h-full flex-col justify-start pt-4">
        <div className="deck-shell flex h-full flex-col gap-3 !p-5">
          <div className="flex flex-col gap-1.5">
            <Eyebrow>This Year&apos;s Direction</Eyebrow>
            <h2 className="text-[2.8rem] leading-none font-semibold tracking-[-0.04em] text-white">
              올해는 이런 서비스가 더 강화될 것 같습니다
            </h2>
          </div>
          <div className="min-h-0 flex-1">
            <ClaudeCoworkSpotlight />
          </div>
        </div>
      </Slide>

      <Slide dataBackgroundColor="#0a1426">
        <div className="deck-shell flex h-full flex-col items-center justify-center gap-10 text-center">
          <Eyebrow>Before You Use It</Eyebrow>
          <h2 className="deck-title max-w-5xl">써보기 전에 이것만은 기억하세요</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['개인정보', '틀린 정보', '권한 남용', '저작권'].map((item) => (
              <span key={item} className="deck-pill deck-pill-lg">
                {item}
              </span>
            ))}
          </div>
          <p className="deck-pretty max-w-[34ch] text-[1.55rem] leading-[1.55] text-slate-300">
            AI는 편리한 도구지만, 민감한 정보와 사실 검증, 권한 범위, 콘텐츠 출처 문제는 사용자가 직접 책임지고 관리해야 합니다.
          </p>
        </div>
      </Slide>

      <Slide dataBackgroundColor="#06101b">
        <div className="deck-shell flex h-full flex-col gap-8">
          <SectionHeader
            eyebrow="Safety Board"
            title="알아둬야 할 것들"
          />
          <div className="grid grid-cols-2 gap-5">
            {[
              ['⚖️', '편향과 차별', '학습 데이터가 치우치면 결과도 치우칩니다.', 'AI의 판단처럼 보여도 기준은 결국 데이터입니다.'],
              ['🔒', '개인정보', '민감한 정보는 입력 순간부터 리스크가 생깁니다.', '이름, 번호, 계약서, 내부 자료는 기본적으로 빼고 넣는 쪽이 안전합니다.'],
              ['🧷', '권한 관리', '에이전트에게 준 권한은 행동 범위가 됩니다.', '메일, 캘린더, 드라이브 권한은 최소 범위부터 시작해야 합니다.'],
              ['🎭', '딥페이크', '진짜처럼 보이는 가짜가 더 쉬워졌습니다.', '강한 감정 유도형 영상과 음성은 항상 출처를 먼저 확인해야 합니다.'],
            ].map(([icon, title, short, tip]) => (
              <AccentCard key={title} className="min-h-[18rem]">
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{icon}</span>
                  <div>
                    <p className="text-[2rem] font-semibold text-white">{title}</p>
                    <p className="mt-2 text-[1.12rem] text-slate-300">{short}</p>
                  </div>
                </div>
                <div className="deck-callout mt-auto">{tip}</div>
              </AccentCard>
            ))}
          </div>
        </div>
      </Slide>

      <Slide dataBackgroundColor="#06101b">
        <div className="deck-shell flex h-full flex-col gap-8">
          <SectionHeader
            eyebrow="Work Anxiety"
            title="AI가 내 일자리를 뺏을까?"
          />
          <div className="grid flex-1 grid-cols-[0.9fr_1.1fr] gap-6">
            <div className="deck-panel items-center justify-center border-rose-400/20 bg-rose-950/18 text-center">
              <Eyebrow className="text-rose-100/80">흔한 걱정</Eyebrow>
              <p className="mt-6 text-[3.45rem] font-semibold leading-[1.1] text-white">
                “AI가 발전하면
                <br />
                <span className="whitespace-nowrap">사람은 필요 없어지는</span>
                <br />
                거 아닌가?”
              </p>
            </div>
            <div className="deck-panel items-center border-emerald-400/20 bg-emerald-950/18 text-center">
              <Eyebrow className="text-emerald-100/80">현실</Eyebrow>
              <p className="deck-balance mt-6 max-w-[32ch] text-[1.82rem] leading-[1.45] text-white">
                반복적인 정리와 초안 작업은 자동화되지만, <span className="text-emerald-200">문제 정의, 최종 판단, 책임</span>을 지는 사람의 역할은 더 중요해집니다.
              </p>
              <div className="mt-8 grid w-full grid-cols-3 gap-4">
                <AccentCard className="min-h-[10rem] bg-black/20">
                  <Eyebrow>LESS</Eyebrow>
                  <p className="mt-3 text-2xl text-white">반복 입력</p>
                </AccentCard>
                <AccentCard className="min-h-[10rem] bg-black/20">
                  <Eyebrow>MORE</Eyebrow>
                  <p className="mt-3 text-2xl text-white">검토와 판단</p>
                </AccentCard>
                <AccentCard className="min-h-[10rem] bg-black/20">
                  <Eyebrow>KEY</Eyebrow>
                  <p className="mt-3 text-2xl text-white">도구를 쓰는 전문성</p>
                </AccentCard>
              </div>
            </div>
          </div>
        </div>
      </Slide>

      <Slide dataBackgroundColor="#06101b">
        <div className="deck-shell flex h-full flex-col gap-8">
          <SectionHeader
            eyebrow="How To Prepare"
            title="AI 시대, 어떻게 준비할까?"
          />
          <div className="grid grid-cols-2 gap-5">
            {[
              ['Start', '무료 도구부터 시작', '써보기 전에는 감이 안 옵니다. 일단 작은 문제 하나를 맡겨보세요.'],
              ['Context', '내 자료를 붙여서 물어보기', '문서형 AI는 일반 질문보다 훨씬 정확한 답을 줍니다.'],
              ['Review', '자동 실행 전에는 검토', '빠른 것과 책임지는 것은 별개입니다. 마지막 확인은 사람 몫입니다.'],
              ['Edge', '전문성 + AI 조합 만들기', '결국 강한 사람은 AI를 쓰는 전문가이지 AI만 잘 아는 사람이 아닙니다.'],
            ].map(([tag, label, desc], index) => (
              <AccentCard key={label} className="min-h-[15rem]">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-6xl font-semibold text-white/75">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="deck-chip">{tag}</span>
                </div>
                <div className="mt-5">
                  <p className="text-[2rem] font-semibold text-white">{label}</p>
                  <p className="mt-4 text-[1.16rem] leading-relaxed text-slate-300">{desc}</p>
                </div>
              </AccentCard>
            ))}
          </div>
        </div>
      </Slide>

      <Slide dataBackgroundColor="#06101b">
        <div className="deck-shell flex h-full flex-col gap-2 !px-8 !pt-5 !pb-6">
          <div className="-mt-1 flex flex-col gap-1">
            <Eyebrow>Take Action Tonight</Eyebrow>
            <h2 className="text-[4.15rem] font-semibold leading-[1.02] tracking-[-0.05em] text-white">
              오늘 집에 가서 해보세요
            </h2>
            <p className="text-[1.14rem] leading-[1.45] text-slate-300">
              가장 쉬운 것 하나만 해봐도 AI를 보는 감각이 달라집니다.
            </p>
          </div>
          <div className="-mt-6 grid flex-1 grid-cols-2 gap-4">
            {[
              ['Claude', '5 min', '아무 주제로 3문장 요약해보기', '가장 쉬운 시작', '예: 기사, 유튜브 영상, 발표 메모', '생각보다 얼마나 자연스럽게 답하는지 감을 잡는 첫 연습'],
              ['Perplexity', '7 min', '궁금한 주제 하나 조사해보기', '출처 같이 보기', '예: AI 에이전트, 금리, 전기차', '답만 보지 말고 출처까지 함께 확인하는 습관 만들기'],
              ['NotebookLM', '10 min', 'PDF 한 개 올리고 질문해보기', '내 자료 붙이기', '예: 수업자료, 기사 PDF, 회의 문서', '내 자료를 붙였을 때 정확도가 달라지는 경험 만들기'],
              ['Gamma', '8 min', '발표 주제로 초안 한 번 만들어보기', '빈 화면 깨기', '예: 자기소개, 기획안, 수업 발표', '처음 시작하는 시간을 줄이는 감각 익히기'],
            ].map(([tool, time, action, tag, example, note], index) => (
              <AccentCard
                key={tool}
                className={`min-h-[14.6rem] gap-4 bg-linear-to-br from-slate-900/88 via-[#07111d] to-cyan-950/18 ${
                  index === 0
                    ? 'border-amber-300/24 bg-linear-to-br from-[#16110a] via-[#0b1520] to-cyan-950/16 shadow-[0_18px_54px_rgba(245,158,11,0.08)]'
                    : 'border-cyan-400/14'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className={`flex h-12 w-12 items-center justify-center rounded-2xl border text-lg font-semibold ${
                      index === 0
                        ? 'border-amber-300/28 bg-amber-950/30 text-amber-100'
                        : 'border-cyan-400/18 bg-cyan-950/26 text-cyan-100'
                    }`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className="flex items-center gap-3">
                      <p className="text-[1.75rem] font-semibold text-white">{tool}</p>
                      <span className={`rounded-full px-3 py-1 text-[0.76rem] font-semibold tracking-[0.08em] ${
                        index === 0
                          ? 'border border-amber-300/20 bg-amber-950/24 text-amber-100'
                          : 'border border-white/10 bg-white/5 text-slate-300'
                      }`}>
                        {tag}
                      </span>
                    </div>
                  </div>
                  <span className="rounded-full border border-cyan-400/18 bg-cyan-950/30 px-3.5 py-1.5 text-[0.9rem] font-semibold text-cyan-100">
                    {time}
                  </span>
                </div>

                <div className="grid grid-cols-[1.18fr_0.82fr] items-start gap-4 pt-1">
                  <div className="flex min-h-0 items-start pt-6">
                    <p className="deck-balance max-w-[14ch] text-[2.22rem] font-semibold leading-[1.16] text-cyan-50">
                      {action}
                    </p>
                  </div>

                  <div
                    className={`flex min-h-[10.6rem] flex-col justify-between rounded-[1.2rem] border px-4 py-3.5 ${
                      index === 0
                        ? 'border-amber-300/14 bg-amber-950/10'
                        : 'border-white/8 bg-black/16'
                    }`}
                  >
                    <div>
                      <p className="text-[0.82rem] font-semibold tracking-[0.08em] text-slate-400">
                        이렇게 시작
                      </p>
                      <p className="mt-2.5 text-[1.02rem] leading-[1.48] text-slate-200">
                        {example}
                      </p>
                    </div>

                    <div className="mt-3.5 border-t border-white/8 pt-3.5">
                      <p className="text-[0.82rem] font-semibold tracking-[0.08em] text-slate-400">
                        이걸 느껴보세요
                      </p>
                      <p className="mt-2.5 text-[1.02rem] leading-[1.48] text-slate-100">
                        {note}
                      </p>
                    </div>
                  </div>
                </div>
              </AccentCard>
            ))}
          </div>
        </div>
      </Slide>

      <section>
        <Slide dataBackgroundColor="#06101b" dataTransition="fade">
          <div className="deck-shell deck-spotlight flex h-full items-center justify-center">
            <div className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 text-center">
              <Eyebrow>Summary</Eyebrow>
              <h2 className="deck-title">오늘의 핵심</h2>
              <div className="flex flex-col items-center gap-3">
                <p className="text-[1.55rem] text-slate-300">AI는 이미 우리 일상 안에서 작동하고 있습니다</p>
                <div className="h-px w-28 bg-linear-to-r from-transparent via-cyan-300/60 to-transparent" />
                <p className="text-[1.55rem] text-slate-300">완벽하지 않지만, 매우 강력한 생산성 도구입니다</p>
              </div>
            </div>
          </div>
        </Slide>
        <Slide dataBackgroundColor="#06101b" dataTransition="fade">
          <div className="deck-shell deck-spotlight flex h-full items-center justify-center">
            <div className="deck-panel mx-auto w-full max-w-5xl items-center border-cyan-400/25 bg-cyan-950/25 px-10 py-14 text-center shadow-[0_24px_80px_rgba(8,145,178,0.16)]">
              <Eyebrow>ONE LINE TO REMEMBER</Eyebrow>
              <p className="mt-6 text-[4.35rem] font-semibold leading-[1.08] tracking-[-0.05em] text-white">
                <span className="whitespace-nowrap">먼저 써본 사람이</span>
                <br />
                <span className="whitespace-nowrap">더 빨리 이해합니다</span>
              </p>
            </div>
          </div>
        </Slide>
      </section>

      <Slide dataBackgroundColor="#081425">
        <div className="deck-shell flex h-full flex-col justify-center gap-10">
          <Eyebrow>Open Floor</Eyebrow>
          <div className="grid items-center grid-cols-[1.2fr_0.8fr] gap-8">
            <div className="flex flex-col items-center text-center">
              <h2 className="deck-title">Q&A</h2>
              <p className="deck-pretty mt-6 max-w-[48ch] text-[1.32rem] leading-[1.52] text-slate-300">
                가장 궁금한 것부터 질문해 주세요. 도구 추천, 실무 활용, 프롬프트 작성, 위험성까지 무엇이든 괜찮습니다.
              </p>
            </div>
            <div className="deck-panel items-center justify-center text-center">
              <div className="text-8xl">💬</div>
              <p className="mt-6 text-3xl text-slate-200">궁금한 점이 있으신가요?</p>
            </div>
          </div>
        </div>
      </Slide>

      <Slide dataBackgroundColor="#06101b">
        <div className="deck-shell deck-spotlight flex h-full flex-col justify-center gap-10">
          <Eyebrow>Thank You</Eyebrow>
          <div className="grid items-end grid-cols-[1.24fr_0.76fr] gap-8">
            <div className="flex flex-col items-center text-center">
              <h2 className="deck-title">감사합니다</h2>
              <p className="deck-pretty mt-6 max-w-[46ch] text-[1.34rem] leading-[1.55] text-slate-300">
                AI와 함께 일하는 시대는 이미 시작됐습니다. 오늘의 목표는 어렵게 배우는 것이 아니라, 직접 써보고 검토하는 감각을 만드는 것이었습니다.
              </p>
            </div>
            <div className="deck-panel gap-5">
              <Eyebrow>Presenter</Eyebrow>
              <p className="text-4xl font-semibold text-white">발표자 이름</p>
              <p className="text-xl text-slate-400">AI for Beginners Session</p>
              <div className="deck-callout">email@example.com</div>
            </div>
          </div>
        </div>
      </Slide>
    </RevealPresentation>
  );
}
