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

    // Small delay to show animation
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
      <div className="flex flex-col items-center gap-4 py-8">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
        <p className="text-lg text-gray-400">모델 로딩 중...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center gap-4 py-8">
        <p className="text-lg text-red-400">{error}</p>
        <p className="text-sm text-gray-500">
          모델 파일이 public/models/mnist/ 에 있는지 확인하세요
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center gap-6">
      <DrawingCanvas onDraw={handleDraw} onClear={handleClear} />

      <div className="flex flex-col items-center gap-2">
        <span className="text-2xl text-cyan-400">→</span>
        <NetworkVisualization state={networkState} predictedDigit={prediction?.predictedDigit ?? null} />
        <span className="text-2xl text-cyan-400">→</span>
      </div>

      <PredictionChart
        probabilities={prediction?.probabilities ?? null}
        predictedDigit={prediction?.predictedDigit ?? null}
      />
    </div>
  );
}
