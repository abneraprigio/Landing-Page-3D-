import { useEffect, useState } from 'react';

export function useMotionPreference() {
  const [systemReduced, setSystemReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  const [manualLightweight, setManualLightweight] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const cores = navigator.hardwareConcurrency || 8;
    const conn = (navigator as unknown as { connection?: { saveData?: boolean } }).connection;
    return Boolean(conn?.saveData) || cores <= 2;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (e: MediaQueryListEvent) => setSystemReduced(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const reducedMotion = systemReduced || manualLightweight;

  useEffect(() => {
    if (reducedMotion) {
      document.documentElement.classList.add('reduced-motion-mode');
    } else {
      document.documentElement.classList.remove('reduced-motion-mode');
    }
  }, [reducedMotion]);

  return {
    reducedMotion,
    systemReduced,
    manualLightweight,
    toggleLightweightMode: () => setManualLightweight((prev) => !prev),
  };
}
