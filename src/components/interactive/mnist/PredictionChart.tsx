'use client';

interface PredictionChartProps {
  probabilities: number[] | null;
  predictedDigit: number | null;
}

export default function PredictionChart({ probabilities, predictedDigit }: PredictionChartProps) {
  if (!probabilities) {
    return (
      <div className="flex h-full w-full flex-col justify-center gap-4">
        <span className="deck-pill w-fit">Output</span>
        <p className="text-4xl font-semibold text-white">예측 결과</p>
        <p className="text-xl leading-relaxed text-slate-400">
          숫자를 그리면 각 숫자에 대한 확률과 가장 가능성이 높은 결과가 이곳에 표시됩니다.
        </p>
      </div>
    );
  }

  const maxProb = Math.max(...probabilities);

  return (
    <div className="flex w-full flex-col gap-3">
      <span className="deck-pill w-fit">Output</span>
      <div className="flex items-end justify-between">
        <p className="text-4xl font-semibold text-white">예측 결과</p>
        <p className="text-lg text-cyan-200">가장 높은 값: {predictedDigit}</p>
      </div>
      <div className="mt-3 space-y-3">
        {probabilities.map((prob, digit) => {
          const isMax = digit === predictedDigit && prob === maxProb;
          const widthPct = Math.max(prob * 100, 1);
          return (
            <div key={digit} className="grid grid-cols-[3rem_1fr_4rem] items-center gap-3">
              <span className={`text-right text-xl font-semibold ${isMax ? 'text-cyan-200' : 'text-slate-500'}`}>
                {digit}
              </span>
              <div className="relative h-5 overflow-hidden rounded-full bg-white/8">
                <div
                  className={`absolute inset-y-0 left-0 rounded-full transition-all duration-500 ${
                    isMax ? 'bg-linear-to-r from-cyan-300 to-blue-400' : 'bg-white/20'
                  }`}
                  style={{ width: `${widthPct}%` }}
                />
              </div>
              <span className={`text-right text-lg ${isMax ? 'font-semibold text-cyan-100' : 'text-slate-500'}`}>
                {(prob * 100).toFixed(0)}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
