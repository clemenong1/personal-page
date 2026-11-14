import { useMemo } from 'react';

export interface Quality {
  low: boolean;
  dpr: [number, number];
  earthSegments: number;
  textureSize: number;
  stars: number;
  shadows: boolean;
  reducedMotion: boolean;
}

/** Picks a detail tier once at startup: phones and weak devices get the lighter scene. */
export function useQuality(): Quality {
  return useMemo(() => {
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    const small = Math.min(window.innerWidth, window.innerHeight) < 700;
    const weakCpu = (navigator.hardwareConcurrency ?? 8) <= 4;
    const low = coarse || small || weakCpu;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    return {
      low,
      dpr: low ? [1, 1.5] : [1, 2],
      earthSegments: low ? 128 : 256,
      textureSize: low ? 1024 : 2048,
      stars: low ? 1500 : 4500,
      shadows: !low,
      reducedMotion,
    };
  }, []);
}
