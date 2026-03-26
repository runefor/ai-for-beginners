'use client';

export interface AgentMilestone {
  date: string;
  title: string;
  cardTitle: string;
  productName: string;
  detail: string;
  takeaway: string;
  videoTitle: string;
  videoCaption: string;
  videoEmbedUrl: string;
  videoWatchUrl: string;
  videoSourceLabel: string;
  icon: string;
  tag: string;
  tagClassName: string;
}

export const agentMilestones: AgentMilestone[] = [
  {
    date: '2025.01.23',
    title: 'OpenAI가 Operator를 리서치 프리뷰로 공개',
    cardTitle: '웹을 대신 움직이는 AI',
    productName: 'Operator',
    detail: 'AI가 브라우저 화면을 보고 클릭하고 스크롤하며, 사람이 하던 웹 작업을 대신 수행하기 시작한 사례입니다.',
    takeaway: '이때부터 AI는 답만 하는 도구를 넘어, 웹에서 직접 클릭하고 작업하는 단계로 넘어갔습니다.',
    videoTitle: 'OpenAI Operator Demo',
    videoCaption: '시작부터 Operator 화면과 실제 요청 예시가 바로 보여서, 브라우저를 대신 움직이는 AI라는 점을 이해시키기에 더 적합한 시연 영상입니다.',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/WMMxD0Z2IeE?rel=0&modestbranding=1&playsinline=1',
    videoWatchUrl: 'https://www.youtube.com/watch?v=WMMxD0Z2IeE',
    videoSourceLabel: 'Weiran Ye',
    icon: '🌐',
    tag: 'OpenAI',
    tagClassName: 'bg-emerald-500/15 text-emerald-300',
  },
  {
    date: '2025.02.02',
    title: 'OpenAI가 deep research를 공개',
    cardTitle: '조사를 대신 해주는 AI',
    productName: 'deep research',
    detail: '복잡한 질문을 여러 단계로 조사하고, 출처를 정리해 보고서 형태의 결과물까지 만드는 흐름을 보여준 제품입니다.',
    takeaway: '이제 AI는 한 번 답하고 끝나는 것이 아니라, 자료를 찾아 정리해 결과물까지 만들어줍니다.',
    videoTitle: 'OpenAI deep research in practice.',
    videoCaption: 'OpenAI 공식 실사용 데모로, 질문을 이해하고 자료를 찾아 근거 있는 결과를 정리하는 흐름을 짧게 보여줍니다.',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/zm6F0vo2E64?start=39&rel=0&modestbranding=1&playsinline=1',
    videoWatchUrl: 'https://www.youtube.com/watch?v=zm6F0vo2E64&t=39s',
    videoSourceLabel: 'OpenAI',
    icon: '🔎',
    tag: 'OpenAI',
    tagClassName: 'bg-sky-500/15 text-sky-300',
  },
  {
    date: '2025.07.17',
    title: 'OpenAI가 ChatGPT agent를 공식 출시',
    cardTitle: '조사하고 실행하는 AI',
    productName: 'ChatGPT agent',
    detail: '조사 기능과 웹 실행 기능이 합쳐지면서, 요청을 이해하고 실제 작업까지 이어지는 흐름이 한 화면에 담기기 시작했습니다.',
    takeaway: 'AI가 답변 도구를 넘어, 일을 끝까지 처리하는 작업 파트너로 바뀌는 흐름을 보여줍니다.',
    videoTitle: 'Delegate work to ChatGPT agent',
    videoCaption: 'OpenAI 공식 데모로, 조사부터 스프레드시트 정리와 후속 온라인 작업까지 한 번에 이어지는 흐름을 보여줍니다.',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/AGr_Xolg0Ps?start=7&rel=0&modestbranding=1&playsinline=1',
    videoWatchUrl: 'https://www.youtube.com/watch?v=AGr_Xolg0Ps&t=7s',
    videoSourceLabel: 'OpenAI',
    icon: '🤖',
    tag: 'Agent',
    tagClassName: 'bg-violet-500/15 text-violet-300',
  },
  {
    date: '2026.01.30',
    title: 'Anthropic이 Cowork 시연으로 AI 동료 개념을 보여줌',
    cardTitle: '업무 화면에서 함께 일하는 AI',
    productName: 'Cowork',
    detail: '채팅창 밖의 실제 업무 환경에서 AI가 자료를 읽고 정리하며 다음 작업까지 이어가는 모습을 보여준 시연입니다.',
    takeaway: '앞으로는 AI를 따로 부르는 것이 아니라, 일하는 화면 안에서 함께 쓰게 될 가능성이 큽니다.',
    videoTitle: 'The Future of AI at Work: Introducing Cowork',
    videoCaption: 'Anthropic 공식 웨비나의 약 22분 지점부터 Cowork 작업 패널, 진행 상태, 작업 폴더와 컨텍스트가 한 화면에 보여서 업무 동료형 AI의 형태를 가장 직관적으로 이해시키기 좋습니다.',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/zfWfczd6keE?start=1320&rel=0&modestbranding=1&playsinline=1',
    videoWatchUrl: 'https://www.youtube.com/watch?v=zfWfczd6keE&t=1320s',
    videoSourceLabel: 'Claude',
    icon: '🧑‍💻',
    tag: 'Anthropic',
    tagClassName: 'bg-cyan-500/15 text-cyan-300',
  },
  {
    date: '2026.03.13',
    title: 'ChatGPT 앱 연동에 write actions 기능이 추가',
    cardTitle: '앱에 결과를 직접 반영하는 AI',
    productName: 'Write actions',
    detail: '메일, 문서, 일정 같은 연결된 서비스에 AI가 실제 결과를 작성하거나 반영할 수 있게 된 업데이트입니다.',
    takeaway: '이제 AI는 답을 보여주는 데서 끝나지 않고, 다른 앱에 결과를 직접 남길 수 있습니다.',
    videoTitle: 'Apps in ChatGPT',
    videoCaption: 'OpenAI 공식 소개 영상으로, ChatGPT 안에서 외부 앱과 연결해 결과를 주고받는 경험을 가장 직접적으로 보여줍니다.',
    videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/2C4Cs6503gw?rel=0&modestbranding=1&playsinline=1',
    videoWatchUrl: 'https://www.youtube.com/watch?v=2C4Cs6503gw',
    videoSourceLabel: 'OpenAI',
    icon: '🔗',
    tag: 'Apps',
    tagClassName: 'bg-pink-500/15 text-pink-300',
  },
];

export const claudeCoworkSpotlight = {
  label: "This Year's Direction",
  serviceName: 'Claude Cowork',
  shortDescription: '채팅창 밖 실제 업무 화면에서 함께 일하는 업무 동료형 AI',
  definition:
    '파일, 브라우저, 커넥터가 연결된 실제 업무 환경에서 AI가 읽고 정리하고 다음 작업까지 이어가는 경험을 보여주는 서비스입니다.',
  whyNow:
    '답변만 잘하는 AI가 아니라, 실제 도구 안으로 들어와 사람의 업무 흐름을 따라가는 방향을 가장 직관적으로 보여줍니다.',
  strengths: [
    '문서와 파일을 읽고 요약한 뒤 다음 작업 제안까지 이어집니다.',
    '브라우저와 연결된 실제 업무 맥락에서 움직이는 화면이 강조됩니다.',
    '사람은 검토와 승인에 집중하고, AI는 정리와 초안 작업을 맡는 그림을 이해시키기 쉽습니다.',
  ],
  workflow: [
    '폴더와 문서를 읽어 핵심 내용을 추립니다.',
    '요약과 보고서 초안을 작성합니다.',
    '브라우저나 연결된 앱에서 후속 작업을 이어갑니다.',
    '사람이 마지막 판단과 승인만 담당합니다.',
  ],
  moments: [
    '파일 정리',
    '리포트 초안',
    '커넥터 연동',
    '브라우저 작업',
  ],
  videoTitle: 'Claude Cowork: The AI That Actually Does Your Work',
  videoCaption:
    '지저분한 다운로드 폴더를 실제로 정리하는 데모부터 시작해, Cowork가 파일에 접근하고 작업을 이어가는 방식을 가장 빠르게 보여줍니다.',
  videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/pXR_bShli10?start=121&rel=0&modestbranding=1&playsinline=1',
  videoWatchUrl: 'https://www.youtube.com/watch?v=pXR_bShli10&t=121s',
  videoSourceLabel: 'The Tech Girl',
};
