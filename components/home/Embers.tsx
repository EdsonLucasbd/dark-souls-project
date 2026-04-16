// Embers são renderizados client-side para evitar hydration mismatch
"use client";

import { useMemo } from "react";

interface Ember {
  left: string;
  bottom: string;
  delay: string;
  duration: string;
  size: string;
  opacity: number;
}

export function Embers({ count = 18 }: { count?: number }) {
  const embers = useMemo<Ember[]>(() => {
    // Seed fixo — sem Math.random() direto no render para evitar diferença SSR/CSR
    return Array.from({ length: count }, (_, i) => ({
      left: `${((i * 37 + 13) % 90) + 5}%`,
      bottom: `${((i * 17 + 7) % 30) + 2}%`,
      delay: `${((i * 1.3) % 4).toFixed(1)}s`,
      duration: `${(2.5 + (i % 3) * 0.8).toFixed(1)}s`,
      size: i % 4 === 0 ? "4px" : "2px",
      opacity: 0.3 + (i % 5) * 0.1,
    }));
  }, [count]);

  return (
    <>
      {embers.map((e, i) => (
        <span
          key={i}
          className="ember"
          style={{
            left: e.left,
            bottom: e.bottom,
            animationDelay: e.delay,
            animationDuration: e.duration,
            width: e.size,
            height: e.size,
            opacity: e.opacity,
          }}
        />
      ))}
    </>
  );
}