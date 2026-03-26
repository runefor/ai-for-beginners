'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import DrawingCanvas from './mnist/DrawingCanvas';
import NetworkVisualization from './mnist/NetworkVisualization';
import PredictionChart from './mnist/PredictionChart';
import { useMNISTModel, type PredictionResult } from './mnist/useMNISTModel';
import type { NetworkState } from './mnist/NetworkVisualization';

export default function MNISTDemo() {
  const rootRef = useRef<HTMLDivElement>(null);
  const predictionTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [shouldLoadModel, setShouldLoadModel] = useState(false);
  const { loading, error, predict } = useMNISTModel(shouldLoadModel);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [networkState, setNetworkState] = useState<NetworkState>('idle');

  useEffect(() => {
    if (shouldLoadModel) return;

    const root = rootRef.current;
    const slide = root?.closest('section');
    if (!slide) return;

    const syncSlideState = () => {
      if (slide.classList.contains('present')) {
        setShouldLoadModel(true);
      }
    };

    syncSlideState();

    const observer = new MutationObserver(syncSlideState);
    observer.observe(slide, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, [shouldLoadModel]);

  useEffect(() => {
    return () => {
      if (predictionTimerRef.current) {
        clearTimeout(predictionTimerRef.current);
      }
    };
  }, []);

  const handleDraw = useCallback((canvas: HTMLCanvasElement) => {
    if (predictionTimerRef.current) {
      clearTimeout(predictionTimerRef.current);
    }

    setNetworkState('processing');

    predictionTimerRef.current = setTimeout(() => {
      const result = predict(canvas);
      setPrediction(result);
      setNetworkState(result ? 'result' : 'idle');
      predictionTimerRef.current = null;
    }, 600);
  }, [predict]);

  const handleClear = useCallback(() => {
    if (predictionTimerRef.current) {
      clearTimeout(predictionTimerRef.current);
      predictionTimerRef.current = null;
    }

    setPrediction(null);
    setNetworkState('idle');
  }, []);

  if (!shouldLoadModel) {
    return (
      <div ref={rootRef} className="flex flex-col items-center gap-4 py-12">
        <div className="h-10 w-10 rounded-full border-2 border-white/12 border-t-cyan-300/70" />
        <p className="text-xl text-slate-300">슬라이드가 열리면 바로 준비합니다.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div ref={rootRef} className="flex flex-col items-center gap-4 py-12">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-cyan-300 border-t-transparent" />
        <p className="text-xl text-slate-300">모델 로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div ref={rootRef} className="flex flex-col items-center gap-4 py-12">
        <p className="text-lg text-rose-300">{error}</p>
        <p className="text-sm text-slate-500">모델 파일이 `public/models/mnist/` 에 있는지 확인하세요.</p>
      </div>
    );
  }

  return (
    <div ref={rootRef} className="grid w-full max-w-6xl grid-cols-[1fr_0.9fr_1fr] items-center gap-6">
      <div className="deck-card min-h-[22rem] items-center justify-center bg-black/20">
        <DrawingCanvas onDraw={handleDraw} onClear={handleClear} />
      </div>

      <div className="flex flex-col items-center gap-4">
        <span className="deck-pill">Pattern Flow</span>
        <div className="deck-card min-h-[22rem] items-center justify-center bg-cyan-950/12">
          <NetworkVisualization
            state={networkState}
            predictedDigit={prediction?.predictedDigit ?? null}
          />
        </div>
      </div>

      <div className="deck-card min-h-[22rem] justify-center bg-black/20">
        <PredictionChart
          probabilities={prediction?.probabilities ?? null}
          predictedDigit={prediction?.predictedDigit ?? null}
        />
      </div>
    </div>
  );
}
