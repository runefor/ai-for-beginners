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
    detail: '브라우저를 직접 움직이는 AI가 시작된 장면입니다.',
    takeaway: '답변형 AI가 클릭형 AI로 넘어간 순간입니다.',
    videoTitle: 'OpenAI Operator Demo',
    videoCaption: '브라우저를 대신 움직인다는 점이 바로 보입니다.',
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
    detail: '복잡한 질문을 조사해 보고서까지 만드는 흐름입니다.',
    takeaway: '한 번 답하는 AI에서 끝까지 정리하는 AI로 넘어갔습니다.',
    videoTitle: 'OpenAI deep research in practice.',
    videoCaption: '질문부터 조사 정리까지 한 흐름으로 보입니다.',
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
    detail: '조사와 실행이 한 화면에서 이어지기 시작했습니다.',
    takeaway: 'AI가 답변 도구에서 작업 파트너로 바뀌는 장면입니다.',
    videoTitle: 'Delegate work to ChatGPT agent',
    videoCaption: '조사부터 후속 작업까지 한 번에 이어집니다.',
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
    detail: '업무 화면 안에서 읽고 정리하고 이어가는 시연입니다.',
    takeaway: 'AI는 따로 부르는 도구보다 함께 일하는 화면에 가까워집니다.',
    videoTitle: 'The Future of AI at Work: Introducing Cowork',
    videoCaption: '한 화면에서 맥락과 작업 흐름이 함께 보입니다.',
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
    detail: 'AI가 연결된 앱에 결과를 직접 남기기 시작했습니다.',
    takeaway: '이제 AI는 답을 넘어서 결과를 기록합니다.',
    videoTitle: 'Apps in ChatGPT',
    videoCaption: '앱 연결과 결과 반영이 바로 보입니다.',
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
  shortDescription: '업무 화면 안에서 함께 일하는 AI',
  definition:
    '파일과 브라우저를 읽고 다음 작업까지 잇는 업무형 AI입니다.',
  whyNow:
    '답변보다 실행 흐름을 보여주는 방향이기 때문입니다.',
  strengths: [
    '읽고, 요약하고, 다음 작업까지 이어집니다.',
    '채팅이 아니라 실제 업무 맥락에서 움직입니다.',
    '사람은 검토하고, AI는 초안을 맡는 그림이 선명합니다.',
  ],
  workflow: [
    '폴더와 문서를 읽습니다.',
    '요약과 초안을 만듭니다.',
    '브라우저와 앱으로 이어갑니다.',
    '사람은 마지막 판단만 맡습니다.',
  ],
  moments: [
    '파일 정리',
    '리포트 초안',
    '커넥터 연동',
    '브라우저 작업',
  ],
  videoTitle: 'Claude Cowork: The AI That Actually Does Your Work',
  videoCaption:
    '파일에 접근하고 작업을 이어가는 방식이 바로 보입니다.',
  videoEmbedUrl: 'https://www.youtube-nocookie.com/embed/pXR_bShli10?start=121&rel=0&modestbranding=1&playsinline=1',
  videoWatchUrl: 'https://www.youtube.com/watch?v=pXR_bShli10&t=121s',
  videoSourceLabel: 'The Tech Girl',
};
