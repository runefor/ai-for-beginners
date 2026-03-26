'use client';

import { useState, useCallback } from 'react';
import DrawingCanvas from './mnist/DrawingCanvas';
import NetworkVisualization from './mnist/NetworkVisualization';
import PredictionChart from './mnist/PredictionChart';
import { useMNISTModel, type PredictionResult } from './mnist/useMNISTModel';
import type { NetworkState } from './mnist/NetworkVisualization';

export default function MNISTDemo() {
  const { loading, error, predict } = useMNISTModel();
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [networkState, setNetworkState] = useState<NetworkState>('idle');

  const handleDraw = useCallback((canvas: HTMLCanvasElement) => {
    setNetworkState('processing');

    setTimeout(() => {
      const result = predict(canvas);
      setPrediction(result);
      setNetworkState(result ? 'result' : 'idle');
    }, 600);
  }, [predict]);

  const handleClear = useCallback(() => {
    setPrediction(null);
    setNetworkState('idle');
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center gap-4 py-12">
        <div className="h-10 w-10 animate-spin rounded-full border-2 border-cyan-300 border-t-transparent" />
        <p className="text-xl text-slate-300">모델 로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-4 py-12">
        <p className="text-lg text-rose-300">{error}</p>
        <p className="text-sm text-slate-500">모델 파일이 `public/models/mnist/` 에 있는지 확인하세요.</p>
      </div>
    );
  }

  return (
    <div className="grid w-full max-w-6xl grid-cols-[1fr_0.9fr_1fr] items-center gap-6">
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
