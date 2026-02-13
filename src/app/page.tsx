import dynamic from 'next/dynamic';
import Slide from '@/components/presentation/Slide';

const RevealPresentation = dynamic(
  () => import('@/components/presentation/RevealPresentation'),
  { ssr: false }
);

export default function Home() {
  return (
    <RevealPresentation>
      <Slide>
        <h1>AI for Beginners</h1>
        <p>Your first step into Artificial Intelligence</p>
      </Slide>

      <Slide>
        <h2>Welcome</h2>
        <p>This presentation is built with Next.js + Reveal.js</p>
      </Slide>
    </RevealPresentation>
  );
}
