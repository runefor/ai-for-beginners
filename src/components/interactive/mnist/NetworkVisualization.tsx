"use client";

import { useEffect, useState } from "react";

export type NetworkState = "idle" | "processing" | "result";

interface NetworkVisualizationProps {
  state: NetworkState;
  predictedDigit: number | null;
}

const LAYERS = [
  { label: "Input", y: [32, 58, 84, 110] },
  { label: "Conv", y: [20, 42, 64, 86, 108, 130] },
  { label: "Dense", y: [32, 58, 84, 110] },
  { label: "Output", y: [16, 44, 72, 100, 128] },
];

const LAYER_X = [36, 112, 188, 264];
const OUTPUT_LABELS = ["0", "2", "5", "7", "9"];

export default function NetworkVisualization({
  state,
  predictedDigit,
}: NetworkVisualizationProps) {
  const [animProgress, setAnimProgress] = useState(0);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    const timer = setTimeout(() => {
      if (state === "processing") {
        setAnimProgress(0);
        interval = setInterval(() => {
          setAnimProgress((value) => {
            if (value >= 1) {
              if (interval) clearInterval(interval);
              return 1;
            }
            return value + 0.05;
          });
        }, 30);
        return;
      }

      setAnimProgress(state === "result" ? 1 : 0);
    }, 0);

    return () => {
      clearTimeout(timer);
      if (interval) clearInterval(interval);
    };
  }, [state]);

  const getNodeColor = (layerIdx: number, nodeIdx: number) => {
    if (state === "idle") return "#334155";
    if (state === "processing") {
      const layerProgress = animProgress * 3 - layerIdx;
      if (layerProgress > 0) return "#67e8f9";
      return "#334155";
    }

    if (layerIdx === 3) {
      const digitMap: Record<number, number> = {
        0: 0,
        1: 0,
        2: 1,
        3: 1,
        4: 2,
        5: 2,
        6: 3,
        7: 3,
        8: 4,
        9: 4,
      };
      if (predictedDigit !== null && digitMap[predictedDigit] === nodeIdx) {
        return "#67e8f9";
      }
      return "#334155";
    }

    return "#0e7490";
  };

  const getEdgeColor = (fromLayer: number) => {
    if (state === "idle") return "#1e293b";
    if (state === "processing") {
      const layerProgress = animProgress * 3 - fromLayer;
      if (layerProgress > 0) return "rgba(103, 232, 249, 0.35)";
      return "#1e293b";
    }
    return "rgba(14, 116, 144, 0.4)";
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <svg width="300" height="160" viewBox="0 0 300 160" className="drop-shadow-lg">
        <title>Digit recognition network visualization</title>
        {LAYERS.slice(0, -1).map((layer, li) => {
          const nextLayer = LAYERS[li + 1];
          return layer.y.map((fromY) =>
            nextLayer.y.map((toY) => (
              <line
                key={`e-${layer.label}-${fromY}-${nextLayer.label}-${toY}`}
                x1={LAYER_X[li] + 12}
                y1={fromY}
                x2={LAYER_X[li + 1] - 12}
                y2={toY}
                stroke={getEdgeColor(li)}
                strokeWidth={1}
                className="transition-all duration-300"
              />
            )),
          );
        })}

        {LAYERS.map((layer, li) =>
          layer.y.map((y, ni) => (
            <g key={`n-${layer.label}-${y}`}>
              <circle
                cx={LAYER_X[li]}
                cy={y}
                r={8}
                fill={getNodeColor(li, ni)}
                className="transition-all duration-300"
              />
              {li === 3 ? (
                <text
                  x={LAYER_X[li] + 16}
                  y={y + 4}
                  fontSize="11"
                  fill={getNodeColor(li, ni) === "#67e8f9" ? "#67e8f9" : "#64748b"}
                  fontWeight={getNodeColor(li, ni) === "#67e8f9" ? "bold" : "normal"}
                >
                  {OUTPUT_LABELS[ni]}
                </text>
              ) : null}
            </g>
          )),
        )}

        {LAYERS.map((layer, li) => (
          <text
            key={`l-${layer.label}`}
            x={LAYER_X[li]}
            y={152}
            textAnchor="middle"
            fontSize="10"
            fill="#64748b"
          >
            {layer.label}
          </text>
        ))}

        {state === "processing" && animProgress < 1 ? (
          <circle cx={36 + animProgress * 228} cy={80} r={5} fill="#67e8f9" opacity={0.8}>
            <animate
              attributeName="opacity"
              values="0.4;1;0.4"
              dur="0.6s"
              repeatCount="indefinite"
            />
          </circle>
        ) : null}
      </svg>
      <p className="text-sm tracking-[0.18em] text-slate-500 uppercase">Neural Network</p>
    </div>
  );
}
