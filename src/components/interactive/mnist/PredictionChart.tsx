'use client';

interface PredictionChartProps {
  probabilities: number[] | null;
  predictedDigit: number | null;
}

export default function PredictionChart({ probabilities, predictedDigit }: PredictionChartProps) {
  if (!probabilities) {
    return (
      <div className="flex h-full w-56 flex-col items-center justify-center rounded-xl bg-white/5 p-4">
        <p className="text-center text-sm text-gray-500">
          숫자를 그려보세요
        </p>
      </div>
    );
  }

  const maxProb = Math.max(...probabilities);

  return (
    <div className="flex w-56 flex-col gap-1.5 rounded-xl bg-white/5 p-4">
      <h4 className="mb-1 text-center text-xs font-semibold text-gray-400">예측 결과</h4>
      {probabilities.map((prob, digit) => {
        const isMax = digit === predictedDigit && prob === maxProb;
        const widthPct = Math.max(prob * 100, 1);
        return (
          <div key={digit} className="flex items-center gap-2">
            <span className={`w-4 text-right text-xs font-mono ${isMax ? 'text-cyan-400 font-bold' : 'text-gray-500'}`}>
              {digit}
            </span>
            <div className="relative h-3.5 flex-1 overflow-hidden rounded bg-white/5">
              <div
                className={`absolute inset-y-0 left-0 rounded transition-all duration-500 ${isMax ? 'bg-cyan-400' : 'bg-white/20'}`}
                style={{ width: `${widthPct}%` }}
              />
            </div>
            <span className={`w-10 text-right text-xs font-mono ${isMax ? 'text-cyan-400 font-bold' : 'text-gray-600'}`}>
              {(prob * 100).toFixed(0)}%
            </span>
          </div>
        );
      })}
    </div>
  );
}
