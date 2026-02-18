'use client';

import { useEffect, useState } from 'react';

export type NetworkState = 'idle' | 'processing' | 'result';

interface NetworkVisualizationProps {
  state: NetworkState;
  predictedDigit: number | null;
}

const LAYERS = [
  { label: 'Input', nodes: 4, y: [30, 55, 80, 105] },
  { label: 'Conv', nodes: 5, y: [20, 42, 64, 86, 108] },
  { label: 'Dense', nodes: 4, y: [30, 55, 80, 105] },
  { label: 'Output', nodes: 5, y: [15, 40, 65, 90, 115] },
];

const LAYER_X = [30, 90, 150, 210];
const OUTPUT_LABELS = ['0', '2', '5', '7', '9'];

export default function NetworkVisualization({ state, predictedDigit }: NetworkVisualizationProps) {
  const [animProgress, setAnimProgress] = useState(0);

  useEffect(() => {
    if (state === 'processing') {
      setAnimProgress(0);
      const interval = setInterval(() => {
        setAnimProgress((p) => {
          if (p >= 1) { clearInterval(interval); return 1; }
          return p + 0.05;
        });
      }, 30);
      return () => clearInterval(interval);
    }
    if (state === 'idle') setAnimProgress(0);
    if (state === 'result') setAnimProgress(1);
  }, [state]);

  const getNodeColor = (layerIdx: number, nodeIdx: number) => {
    if (state === 'idle') return '#374151';
    if (state === 'processing') {
      const layerProgress = animProgress * 3 - layerIdx;
      if (layerProgress > 0) return '#22d3ee';
      return '#374151';
    }
    // result state
    if (layerIdx === 3) {
      // Highlight the predicted digit's approximate position
      const digitMap: Record<number, number> = { 0: 0, 1: 0, 2: 1, 3: 1, 4: 2, 5: 2, 6: 3, 7: 3, 8: 4, 9: 4 };
      if (predictedDigit !== null && digitMap[predictedDigit] === nodeIdx) {
        return '#22d3ee';
      }
      return '#374151';
    }
    return '#0e7490';
  };

  const getEdgeColor = (fromLayer: number) => {
    if (state === 'idle') return '#1f2937';
    if (state === 'processing') {
      const layerProgress = animProgress * 3 - fromLayer;
      if (layerProgress > 0) return 'rgba(34, 211, 238, 0.3)';
      return '#1f2937';
    }
    return 'rgba(14, 116, 144, 0.4)';
  };

  return (
    <div className="flex flex-col items-center gap-1">
      <svg width="240" height="140" viewBox="0 0 240 140" className="drop-shadow-lg">
        {/* Edges */}
        {LAYERS.slice(0, -1).map((layer, li) => {
          const nextLayer = LAYERS[li + 1];
          return layer.y.map((fromY, fi) =>
            nextLayer.y.map((toY, ti) => (
              <line
                key={`e-${li}-${fi}-${ti}`}
                x1={LAYER_X[li] + 10}
                y1={fromY}
                x2={LAYER_X[li + 1] - 10}
                y2={toY}
                stroke={getEdgeColor(li)}
                strokeWidth={0.8}
                className="transition-all duration-300"
              />
            ))
          );
        })}

        {/* Nodes */}
        {LAYERS.map((layer, li) =>
          layer.y.map((y, ni) => (
            <g key={`n-${li}-${ni}`}>
              <circle
                cx={LAYER_X[li]}
                cy={y}
                r={7}
                fill={getNodeColor(li, ni)}
                className="transition-all duration-300"
              />
              {li === 3 && (
                <text
                  x={LAYER_X[li] + 14}
                  y={y + 3.5}
                  fontSize="9"
                  fill={getNodeColor(li, ni) === '#22d3ee' ? '#22d3ee' : '#6b7280'}
                  fontWeight={getNodeColor(li, ni) === '#22d3ee' ? 'bold' : 'normal'}
                  className="transition-all duration-300"
                >
                  {OUTPUT_LABELS[ni]}
                </text>
              )}
            </g>
          ))
        )}

        {/* Layer labels */}
        {LAYERS.map((layer, li) => (
          <text
            key={`l-${li}`}
            x={LAYER_X[li]}
            y={130}
            textAnchor="middle"
            fontSize="8"
            fill="#6b7280"
          >
            {layer.label}
          </text>
        ))}

        {/* Processing animation dot */}
        {state === 'processing' && animProgress < 1 && (
          <circle
            cx={30 + animProgress * 180}
            cy={65}
            r={4}
            fill="#22d3ee"
            opacity={0.8}
          >
            <animate
              attributeName="opacity"
              values="0.4;1;0.4"
              dur="0.6s"
              repeatCount="indefinite"
            />
          </circle>
        )}
      </svg>
      <span className="text-xs text-gray-600">Neural Network</span>
    </div>
  );
}
