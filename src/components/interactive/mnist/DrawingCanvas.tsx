"use client";

import { useRef, useEffect, useCallback, useState } from "react";

interface DrawingCanvasProps {
  onDraw: (canvas: HTMLCanvasElement) => void;
  onClear: () => void;
}

export default function DrawingCanvas({ onDraw, onClear }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const isDrawingRef = useRef(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastRectRef = useRef<DOMRect | null>(null);
  const hasDrawnRef = useRef(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  const fillCanvasBackground = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = contextRef.current;
    if (!canvas || !ctx) return;
    ctx.fillStyle = "#020617";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const clearCanvas = useCallback(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
      debounceRef.current = null;
    }

    fillCanvasBackground();
    hasDrawnRef.current = false;
    lastRectRef.current = null;
    isDrawingRef.current = false;
    setHasDrawn(false);
    onClear();
  }, [fillCanvasBackground, onClear]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    contextRef.current = ctx;
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 18;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    fillCanvasBackground();

    return () => {
      contextRef.current = null;
    };
  }, [fillCanvasBackground]);

  useEffect(() => {
    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, []);

  const getPos = useCallback(
    (e: MouseEvent | TouchEvent): { x: number; y: number } | null => {
      const canvas = canvasRef.current;
      if (!canvas) return null;
      const rect = lastRectRef.current ?? canvas.getBoundingClientRect();
      const scaleX = canvas.width / rect.width;
      const scaleY = canvas.height / rect.height;

      if ("touches" in e) {
        const touch = e.touches[0];
        if (!touch) return null;
        return {
          x: (touch.clientX - rect.left) * scaleX,
          y: (touch.clientY - rect.top) * scaleY,
        };
      }
      return {
        x: (e.clientX - rect.left) * scaleX,
        y: (e.clientY - rect.top) * scaleY,
      };
    },
    [],
  );

  const triggerPrediction = useCallback(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      const canvas = canvasRef.current;
      if (canvas) onDraw(canvas);
    }, 300);
  }, [onDraw]);

  const startDraw = useCallback(
    (e: MouseEvent | TouchEvent) => {
      e.stopPropagation();
      e.preventDefault();

      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
        debounceRef.current = null;
      }

      isDrawingRef.current = true;
      lastRectRef.current = canvasRef.current?.getBoundingClientRect() ?? null;
      const pos = getPos(e);
      if (!pos) return;
      const ctx = contextRef.current;
      if (!ctx) return;
      ctx.beginPath();
      ctx.moveTo(pos.x, pos.y);
    },
    [getPos],
  );

  const draw = useCallback(
    (e: MouseEvent | TouchEvent) => {
      e.stopPropagation();
      e.preventDefault();
      if (!isDrawingRef.current) return;
      const pos = getPos(e);
      if (!pos) return;
      const ctx = contextRef.current;
      if (!ctx) return;
      ctx.lineTo(pos.x, pos.y);
      ctx.stroke();

      if (!hasDrawnRef.current) {
        hasDrawnRef.current = true;
        setHasDrawn(true);
      }
    },
    [getPos],
  );

  const endDraw = useCallback(
    (e: MouseEvent | TouchEvent) => {
      e.stopPropagation();
      if (isDrawingRef.current) {
        isDrawingRef.current = false;
        lastRectRef.current = null;
        triggerPrediction();
      }
    },
    [triggerPrediction],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const opts = { passive: false } as const;
    canvas.addEventListener("mousedown", startDraw, opts);
    canvas.addEventListener("mousemove", draw, opts);
    canvas.addEventListener("mouseup", endDraw);
    canvas.addEventListener("mouseleave", endDraw);
    canvas.addEventListener("touchstart", startDraw, opts);
    canvas.addEventListener("touchmove", draw, opts);
    canvas.addEventListener("touchend", endDraw);
    canvas.addEventListener("touchcancel", endDraw);

    return () => {
      canvas.removeEventListener("mousedown", startDraw);
      canvas.removeEventListener("mousemove", draw);
      canvas.removeEventListener("mouseup", endDraw);
      canvas.removeEventListener("mouseleave", endDraw);
      canvas.removeEventListener("touchstart", startDraw);
      canvas.removeEventListener("touchmove", draw);
      canvas.removeEventListener("touchend", endDraw);
      canvas.removeEventListener("touchcancel", endDraw);
    };
  }, [startDraw, draw, endDraw]);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex w-full items-center justify-between">
        <span className="deck-pill">Input</span>
        <span className="text-sm text-slate-500">손가락이나 마우스로 그리기</span>
      </div>
      <div className="relative">
        <canvas
          ref={canvasRef}
          width={320}
          height={320}
          className="cursor-crosshair rounded-[1.6rem] border border-white/14 shadow-[0_18px_50px_rgba(0,0,0,0.28)]"
          style={{ width: 240, height: 240, touchAction: "none" }}
        />
        {!hasDrawn && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <p className="text-center text-base leading-relaxed text-slate-500">
              여기에 숫자를
              <br />
              그려주세요
            </p>
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={clearCanvas}
        className="rounded-full border border-white/12 bg-white/6 px-5 py-2 text-sm font-semibold text-slate-200 transition hover:bg-white/12"
      >
        다시 그리기
      </button>
    </div>
  );
}
