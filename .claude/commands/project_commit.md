git commit을 수행한다. CLAUDE.md의 "Git Commit Convention (LLM-Optimized)" 규칙을 반드시 따른다.

## 절차

1. `git status`와 `git diff --staged`를 실행하여 현재 상태를 파악한다.
2. 스테이징된 변경이 없으면, 변경된 파일을 분석하여 관련 파일만 `git add`한다.
   - .env, credentials, secrets 파일은 절대 추가하지 않는다.
   - 관련 없는 파일이 섞여 있으면 사용자에게 확인한다.
3. 변경 내용을 분석하여 아래를 결정한다:
   - **type**: feat / modify / fix / refactor / config / docs 중 택 1
   - **scope**: 변경의 핵심 영역 (slides, presentation, ui, app, config)
   - **summary**: 결과 상태를 명령형으로 기술
4. 커밋 메시지 본문을 구성한다:
   - `[context]`: 이 변경이 필요한 배경 — 대화 맥락에서 추출
   - `[change]`: 파일 단위의 구체적 변경 내용
   - `[affect]`: 영향 범위 — 다른 컴포넌트/기능에 미치는 파급
   - `[decision]`: 선택의 근거 (대안이 있었을 경우에만)
5. 커밋을 생성한다.

## 메시지 품질 체크리스트

- [ ] summary가 50자 이내인가
- [ ] type이 변경의 성격을 정확히 반영하는가
- [ ] [context]만 읽어도 "왜"를 알 수 있는가
- [ ] [change]만 읽어도 diff 없이 변경 내용을 파악할 수 있는가
- [ ] [affect]가 파급 범위를 빠짐없이 기술하는가

## 인자

- `$ARGUMENTS`: 사용자가 추가로 전달한 메모나 지시 (커밋 맥락에 반영)
