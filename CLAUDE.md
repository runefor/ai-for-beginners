# AI for Beginners - Presentation Project

## Overview
Interactive presentation introducing AI concepts for beginners, built with Next.js and Reveal.js.

## Tech Stack
- **Framework**: Next.js 15 (App Router, TypeScript, Turbopack)
- **Styling**: Tailwind CSS v4 + shadcn/ui
- **Presentation**: Reveal.js
- **Import Alias**: `@/*` maps to `src/*`

## Project Structure
```
src/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main presentation page
│   └── globals.css         # Global styles + Reveal.js overrides
├── components/
│   ├── ui/                 # shadcn/ui components (button, card, badge, tabs, separator)
│   ├── presentation/       # Reveal.js wrappers (RevealPresentation, Slide)
│   └── slides/             # Individual slide components (v0.dev generated)
└── lib/
    └── utils.ts            # shadcn/ui utility (cn function)
```

## v0.dev Integration Workflow
1. Design slide components in v0.dev
2. Copy generated code to `src/components/slides/` directory
3. Import and wrap with `<Slide>` component in `page.tsx`
4. Use `@/` import alias for all internal imports
5. Verify any shadcn/ui dependencies are installed

## Component Naming
- PascalCase for all component files (e.g., `TitleSlide.tsx`, `AgendaSlide.tsx`)
- Each slide component is a self-contained React component

## Reveal.js Slide Structure
- `<RevealPresentation>` wraps all slides (handles Reveal.js initialization)
- `<Slide>` wraps each individual slide as a `<section>` element
- Nested `<Slide>` components create vertical slide stacks
- Props: `dataBackground`, `dataBackgroundColor`, `dataTransition`

## Development Commands
```bash
npm run dev      # Start dev server (Turbopack) at http://localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
```

## Git Commit Convention (LLM-Optimized)

커밋 메시지는 사람이 아닌 LLM이 프로젝트 히스토리에서 맥락을 복원할 수 있도록 작성한다.

### Format
```
<type>(<scope>): <summary>

[context]: <왜 이 변경이 필요했는지, 어떤 문제를 해결하는지>
[change]: <구체적으로 무엇이 달라졌는지>
[affect]: <이 변경이 영향을 미치는 범위 — 파일, 컴포넌트, 동작>
[decision]: <선택지가 있었다면, 왜 이 방식을 택했는지> (optional)
```

### Type 분류
| Type | 의미 | 사용 시점 |
|------|------|-----------|
| `feat` | 새로운 기능/컴포넌트 추가 | 이전에 없던 것이 생김 |
| `modify` | 기존 기능/컴포넌트 변경 | 있던 것의 동작이나 외형이 달라짐 |
| `fix` | 버그 수정 | 의도와 다르게 동작하던 것을 고침 |
| `refactor` | 동작 변경 없이 구조 개선 | 코드 정리, 추상화, 분리 |
| `config` | 설정/환경/빌드 변경 | gitignore, tsconfig, 의존성 등 |
| `docs` | 문서 변경 | CLAUDE.md, README 등 |

### Scope 규칙
- 이 프로젝트의 디렉토리 구조에 맞는 스코프를 사용: `slides`, `presentation`, `ui`, `app`, `config`
- 여러 스코프에 걸치면 가장 핵심적인 하나를 선택하고, `[affect]`에서 나머지를 명시

### 작성 원칙
1. **summary**: 명령형, 50자 이내, "무엇을 했는지"가 아니라 "결과 상태"를 기술
2. **[context]**: LLM이 "왜?"를 이해할 수 있는 배경. 이슈 번호, 사용자 요청, 기술적 제약 등
3. **[change]**: diff를 읽지 않아도 변경 내용을 파악할 수 있는 수준의 구체성
4. **[affect]**: 변경의 파급 범위. 다른 컴포넌트나 기능에 미치는 영향
5. **[decision]**: 대안이 있었을 때만 작성. "A 대신 B를 선택한 이유"

### 예시
```
feat(slides): AI 윤리 슬라이드 추가

[context]: 발표 피드백에서 윤리적 고려사항 섹션이 빠져있다는 지적
[change]: EthicsSlide.tsx 신규 생성, page.tsx에 22번째 슬라이드로 삽입
[affect]: page.tsx 슬라이드 순서 변경, 전체 슬라이드 수 22→23
```

```
config(config): bkit 관련 파일 gitignore에 추가

[context]: .bkit/, docs 내 bkit 상태 파일이 git에 불필요하게 추적됨
[change]: .gitignore에 .bkit/, docs/.pdca-status.json, docs/.bkit-memory.json 추가
[affect]: git tracking에서 bkit 도구 상태 파일 제외
```
