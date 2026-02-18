'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import * as tf from '@tensorflow/tfjs';

export interface PredictionResult {
  probabilities: number[];
  predictedDigit: number;
}

export function useMNISTModel() {
  const [model, setModel] = useState<tf.LayersModel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const modelRef = useRef<tf.LayersModel | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        await tf.ready();
        const loaded = await tf.loadLayersModel('/models/mnist/model.json');
        if (!cancelled) {
          modelRef.current = loaded;
          setModel(loaded);
          setLoading(false);
        }
      } catch (e) {
        if (!cancelled) {
          setError('모델을 불러올 수 없습니다');
          setLoading(false);
        }
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  const predict = useCallback((canvas: HTMLCanvasElement): PredictionResult | null => {
    const m = modelRef.current;
    if (!m) return null;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const { data, width, height } = imageData;

    // Find bounding box of drawn content (white on black)
    let minX = width, minY = height, maxX = 0, maxY = 0;
    let hasContent = false;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4;
        if (data[idx] > 10) {
          hasContent = true;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }
    }

    if (!hasContent) return null;

    // Add padding around bounding box
    const padAmount = Math.max((maxX - minX), (maxY - minY)) * 0.15;
    minX = Math.max(0, minX - padAmount);
    minY = Math.max(0, minY - padAmount);
    maxX = Math.min(width - 1, maxX + padAmount);
    maxY = Math.min(height - 1, maxY + padAmount);

    // Make it square (MNIST expects square input)
    const bw = maxX - minX;
    const bh = maxY - minY;
    const size = Math.max(bw, bh);
    const cx = (minX + maxX) / 2;
    const cy = (minY + maxY) / 2;
    const squareMinX = Math.max(0, cx - size / 2);
    const squareMinY = Math.max(0, cy - size / 2);

    // Create a temporary canvas to crop and resize
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = 28;
    tempCanvas.height = 28;
    const tempCtx = tempCanvas.getContext('2d')!;

    // Fill with black background
    tempCtx.fillStyle = 'black';
    tempCtx.fillRect(0, 0, 28, 28);

    // Draw the cropped area into 20x20 centered in 28x28 (MNIST convention)
    tempCtx.drawImage(
      canvas,
      squareMinX, squareMinY, size, size,
      4, 4, 20, 20
    );

    // Get pixel data and normalize
    const resizedData = tempCtx.getImageData(0, 0, 28, 28);
    const input = new Float32Array(28 * 28);
    for (let i = 0; i < 28 * 28; i++) {
      input[i] = resizedData.data[i * 4] / 255.0;
    }

    // Run inference inside tf.tidy for tensor cleanup
    const probabilities = tf.tidy(() => {
      const tensor = tf.tensor4d(input, [1, 28, 28, 1]);
      const prediction = m.predict(tensor) as tf.Tensor;
      return Array.from(prediction.dataSync());
    });
    const predictedDigit = probabilities.indexOf(Math.max(...probabilities));

    return { probabilities, predictedDigit };
  }, []);

  return { model, loading, error, predict };
}
