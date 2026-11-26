import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Eye,
  EyeOff,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  X,
} from 'lucide-react';
import {
  EXTERNAL_HOTSPOTS_360,
  ExternalHotspot360,
  getStudioFrameUrl,
  INTERNAL_HOTSPOTS_360,
  InternalHotspot360,
  ShowroomMode,
  STUDIO_ANGLE_FRAMES,
  StudioAngleFrame,
  VEHICLE_COLORS_360,
} from '@/src/data/showroom360Data';

interface Showroom360SectionProps {
  reducedMotion: boolean;
}

function normalizeDeg(deg: number): number {
  return ((deg % 360) + 360) % 360;
}

function angularDistance(a: number, b: number): number {
  const diff = Math.abs(normalizeDeg(a) - normalizeDeg(b));
  return Math.min(diff, 360 - diff);
}

function findNearestFrame(azimuth: number): StudioAngleFrame {
  let best = STUDIO_ANGLE_FRAMES[0];
  let bestDist = Infinity;
  for (const frame of STUDIO_ANGLE_FRAMES) {
    const d = angularDistance(azimuth, frame.azimuthDeg);
    if (d < bestDist) {
      bestDist = d;
      best = frame;
    }
  }
  return best;
}

export function Showroom360Section({ reducedMotion }: Showroom360SectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stageWrapperRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<ShowroomMode>('exterior');
  const [selectedColorId, setSelectedColorId] = useState<string>(
    VEHICLE_COLORS_360[0].id
  );

  // Continuous azimuth 0..359 deg (starts at 315° front-left 3/4)
  const azimuthRef = useRef<number>(315);
  const targetAzimuthRef = useRef<number | null>(null);
  const velocityRef = useRef<number>(0);
  const isDraggingRef = useRef<boolean>(false);
  const lastPointerXRef = useRef<number>(0);
  const lastInteractionTimeRef = useRef<number>(Date.now());

  const [displayAzimuth, setDisplayAzimuth] = useState<number>(315);
  const [zoom, setZoom] = useState<number>(1);
  const zoomRef = useRef<number>(1);
  const [wheelZoomEnabled, setWheelZoomEnabled] = useState<boolean>(false);

  const [autoRotate, setAutoRotate] = useState<boolean>(false);
  const autoRotateRef = useRef<boolean>(false);

  const [showDetails, setShowDetails] = useState<boolean>(true);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const [activeExtHotspot, setActiveExtHotspot] =
    useState<ExternalHotspot360 | null>(null);
  const [activeIntHotspot, setActiveIntHotspot] =
    useState<InternalHotspot360 | null>(null);

  // Image cache for 60fps canvas rendering & adjacent preloading
  const imageCacheRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const [loadedFrameKeys, setLoadedFrameKeys] = useState<Set<string>>(
    () => new Set()
  );

  const currentColor = useMemo(
    () =>
      VEHICLE_COLORS_360.find((c) => c.id === selectedColorId) ??
      VEHICLE_COLORS_360[0],
    [selectedColorId]
  );

  const activeFrame = useMemo(
    () => findNearestFrame(displayAzimuth),
    [displayAzimuth]
  );

  useEffect(() => {
    zoomRef.current = zoom;
  }, [zoom]);

  useEffect(() => {
    autoRotateRef.current = autoRotate;
  }, [autoRotate]);

  // Progressive preloading of active + adjacent angle frames
  const preloadFrame = useCallback((colorFolder: string, fileIndex: string) => {
    const url = getStudioFrameUrl(colorFolder, fileIndex);
    if (imageCacheRef.current.has(url)) return;
    const img = new Image();
    img.decoding = 'async';
    img.onload = () => {
      imageCacheRef.current.set(url, img);
      setLoadedFrameKeys((prev) => {
        if (prev.has(url)) return prev;
        const next = new Set(prev);
        next.add(url);
        return next;
      });
    };
    img.src = url;
    imageCacheRef.current.set(url, img);
  }, []);

  useEffect(() => {
    const idx = STUDIO_ANGLE_FRAMES.findIndex((f) => f.id === activeFrame.id);
    const total = STUDIO_ANGLE_FRAMES.length;
    const prevFrame = STUDIO_ANGLE_FRAMES[(idx - 1 + total) % total];
    const nextFrame = STUDIO_ANGLE_FRAMES[(idx + 1) % total];

    // Priority preload current + adjacent, then remaining frames
    preloadFrame(currentColor.folder, activeFrame.fileIndex);
    preloadFrame(currentColor.folder, prevFrame.fileIndex);
    preloadFrame(currentColor.folder, nextFrame.fileIndex);
    STUDIO_ANGLE_FRAMES.forEach((f) =>
      preloadFrame(currentColor.folder, f.fileIndex)
    );
  }, [activeFrame.id, activeFrame.fileIndex, currentColor.folder, preloadFrame]);

  // Draw current exterior studio stage to HTML5 Canvas
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    if (width === 0 || height === 0) return;

    const dpr = Math.min(window.devicePixelRatio || 1, reducedMotion ? 1.25 : 2);
    if (canvas.width !== Math.round(width * dpr) || canvas.height !== Math.round(height * dpr)) {
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);

    // 1. Premium dark automotive studio backdrop (graphite -> obsidian)
    const bgGrad = ctx.createRadialGradient(
      width * 0.5,
      height * 0.42,
      width * 0.06,
      width * 0.5,
      height * 0.55,
      width * 0.72
    );
    bgGrad.addColorStop(0, '#26272B');
    bgGrad.addColorStop(0.55, '#141416');
    bgGrad.addColorStop(1, '#080808');
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, width, height);

    // 2. Subtle lateral studio rim lights
    const rimLeft = ctx.createLinearGradient(0, 0, width * 0.4, 0);
    rimLeft.addColorStop(0, 'rgba(195, 0, 47, 0.08)');
    rimLeft.addColorStop(1, 'rgba(195, 0, 47, 0)');
    ctx.fillStyle = rimLeft;
    ctx.fillRect(0, 0, width * 0.4, height);

    // 3. Dark studio floor horizon & turntable ring
    const floorY = height * 0.78;
    const floorGrad = ctx.createLinearGradient(0, floorY, 0, height);
    floorGrad.addColorStop(0, 'rgba(8, 8, 8, 0.2)');
    floorGrad.addColorStop(1, '#050506');
    ctx.fillStyle = floorGrad;
    ctx.fillRect(0, floorY, width, height - floorY);

    ctx.save();
    ctx.beginPath();
    ctx.ellipse(width * 0.5, height * 0.76, width * 0.36 * zoomRef.current, height * 0.065 * zoomRef.current, 0, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();

    // 4. Vehicle image & grounded contact shadow
    const frame = findNearestFrame(azimuthRef.current);
    const url = getStudioFrameUrl(currentColor.folder, frame.fileIndex);
    const img = imageCacheRef.current.get(url);

    if (img && img.complete && img.naturalWidth > 0) {
      const aspect = img.naturalWidth / img.naturalHeight;
      let drawW = width * 0.88;
      let drawH = drawW / aspect;
      if (drawH > height * 0.82) {
        drawH = height * 0.82;
        drawW = drawH * aspect;
      }

      drawW *= zoomRef.current;
      drawH *= zoomRef.current;

      const dx = (width - drawW) / 2;
      const dy = (height - drawH) / 2 + height * 0.02;

      // Grounded contact shadow under tires
      ctx.save();
      const shadowGrad = ctx.createRadialGradient(
        width * 0.5,
        dy + drawH * 0.77,
        drawW * 0.05,
        width * 0.5,
        dy + drawH * 0.77,
        drawW * 0.42
      );
      shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0.82)');
      shadowGrad.addColorStop(0.6, 'rgba(0, 0, 0, 0.35)');
      shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = shadowGrad;
      ctx.beginPath();
      ctx.ellipse(width * 0.5, dy + drawH * 0.77, drawW * 0.4, drawH * 0.09, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      ctx.drawImage(img, dx, dy, drawW, drawH);
    }
  }, [currentColor.folder, reducedMotion]);

  // 60 FPS animation loop for inertia, damping, target snap, and optional auto-rotate
  useEffect(() => {
    if (mode !== 'exterior') return;

    let rafId = 0;

    const tick = () => {
      const now = Date.now();
      let changed = false;

      if (!isDraggingRef.current) {
        // Smooth snap toward hotspot target azimuth if set
        if (targetAzimuthRef.current !== null) {
          const target = targetAzimuthRef.current;
          let diff = normalizeDeg(target) - normalizeDeg(azimuthRef.current);
          if (diff > 180) diff -= 360;
          if (diff < -180) diff += 360;

          if (Math.abs(diff) < 0.35 || reducedMotion) {
            azimuthRef.current = normalizeDeg(target);
            targetAzimuthRef.current = null;
          } else {
            azimuthRef.current = normalizeDeg(azimuthRef.current + diff * 0.14);
          }
          changed = true;
        } else if (Math.abs(velocityRef.current) > 0.05) {
          // Exponential damping inertia after release
          azimuthRef.current = normalizeDeg(azimuthRef.current + velocityRef.current);
          velocityRef.current *= reducedMotion ? 0 : 0.91;
          changed = true;
        } else if (
          autoRotateRef.current &&
          !reducedMotion &&
          !activeExtHotspot &&
          now - lastInteractionTimeRef.current > 4500
        ) {
          // Resume gentle auto-rotation after inactivity
          azimuthRef.current = normalizeDeg(azimuthRef.current + 0.35);
          changed = true;
        }
      }

      if (changed) {
        const rounded = Math.round(azimuthRef.current);
        setDisplayAzimuth((prev) => (prev === rounded ? prev : rounded));
      }

      drawCanvas();
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [mode, reducedMotion, activeExtHotspot, drawCanvas, loadedFrameKeys]);

  // Pointer drag handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (mode !== 'exterior') return;
    if ((e.target as HTMLElement).closest('button')) return;

    isDraggingRef.current = true;
    targetAzimuthRef.current = null;
    velocityRef.current = 0;
    lastPointerXRef.current = e.clientX;
    lastInteractionTimeRef.current = Date.now();

    // Pause auto-rotation during interaction
    if (autoRotate) setAutoRotate(false);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current || mode !== 'exterior') return;
    const dx = e.clientX - lastPointerXRef.current;
    lastPointerXRef.current = e.clientX;
    lastInteractionTimeRef.current = Date.now();

    const sensitivity = 0.45;
    const deltaDeg = dx * sensitivity;
    velocityRef.current = deltaDeg;
    azimuthRef.current = normalizeDeg(azimuthRef.current + deltaDeg);
    setDisplayAzimuth(Math.round(azimuthRef.current));
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    lastInteractionTimeRef.current = Date.now();
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // ignore if capture already released
    }
  };

  // Controlled mouse wheel zoom (never hijacks natural page scroll unless Ctrl+Wheel or user locks wheel zoom)
  const handleWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    if (!wheelZoomEnabled && !e.ctrlKey && !e.metaKey) return;
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.14 : -0.14;
    setZoom((prev) => Math.min(2.2, Math.max(1, Number((prev + delta).toFixed(2)))));
  };

  const handleRestoreView = useCallback(() => {
    setZoom(1);
    setActiveExtHotspot(null);
    setActiveIntHotspot(null);
    targetAzimuthRef.current = 315;
    velocityRef.current = 0;
    lastInteractionTimeRef.current = Date.now();
  }, []);

  const handleSelectExternalHotspot = (hotspot: ExternalHotspot360) => {
    setAutoRotate(false);
    setActiveExtHotspot(hotspot);
    targetAzimuthRef.current = hotspot.targetAzimuth;
    setZoom(1.22);
    lastInteractionTimeRef.current = Date.now();
  };

  const handleSelectInternalHotspot = (hotspot: InternalHotspot360) => {
    setActiveIntHotspot(hotspot);
    setZoom(1.45);
  };

  const handleToggleFullscreen = async () => {
    const el = containerRef.current;
    if (!el) return;
    try {
      if (!document.fullscreenElement) {
        await el.requestFullscreen();
        setIsFullscreen(true);
      } else {
        await document.exitFullscreen();
        setIsFullscreen(false);
      }
    } catch {
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFsChange = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  // Exterior hotspots visible on the current real studio angle
  const visibleExternalHotspots = useMemo(() => {
    if (!showDetails) return [];
    return EXTERNAL_HOTSPOTS_360.filter(
      (h) => Boolean(h.positionsByFrame[activeFrame.fileIndex])
    );
  }, [activeFrame.fileIndex, showDetails]);

  return (
    <section
      id="showroom-360"
      ref={containerRef}
      className="border-t border-white/10 bg-[#080808] py-16 text-white lg:py-24"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Compact Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C3002F]">
              Showroom Interativo 360° · Exclusive 1.6 CVT
            </p>
            <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
              Explore o veículo em estúdio.
            </h2>
          </div>

          {/* Minimalist Mode & Color Controls */}
          <div className="flex flex-wrap items-center gap-4">
            {/* Exterior / Interior Switch */}
            <div
              role="tablist"
              aria-label="Modalidade do showroom"
              className="inline-flex border border-white/15 bg-[#181818] p-1"
            >
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'exterior'}
                onClick={() => {
                  setMode('exterior');
                  setActiveIntHotspot(null);
                  setZoom(1);
                }}
                className={`px-4 py-2 text-xs font-semibold tracking-[0.06em] uppercase transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  mode === 'exterior'
                    ? 'bg-[#C3002F] text-white'
                    : 'text-[#A7ADB4] hover:text-white'
                }`}
              >
                Exterior
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={mode === 'interior'}
                onClick={() => {
                  setMode('interior');
                  setAutoRotate(false);
                  setActiveExtHotspot(null);
                  setZoom(1);
                }}
                className={`px-4 py-2 text-xs font-semibold tracking-[0.06em] uppercase transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  mode === 'interior'
                    ? 'bg-[#C3002F] text-white'
                    : 'text-[#A7ADB4] hover:text-white'
                }`}
              >
                Interior
              </button>
            </div>

            {/* Bi-tone Color Selector (Exterior only) */}
            {mode === 'exterior' && (
              <div className="flex items-center gap-2.5 border border-white/15 bg-[#181818] px-3 py-1.5">
                {VEHICLE_COLORS_360.map((color) => {
                  const selected = color.id === currentColor.id;
                  return (
                    <button
                      key={color.id}
                      type="button"
                      onClick={() => setSelectedColorId(color.id)}
                      aria-label={color.name}
                      title={color.name}
                      className={`h-6 w-6 rounded-full border-2 transition-transform cursor-pointer ${
                        selected
                          ? 'scale-110 border-[#C3002F]'
                          : 'border-white/30 hover:scale-105'
                      }`}
                      style={{
                        background: `linear-gradient(180deg, ${color.roofHex} 38%, ${color.swatchHex} 38%)`,
                      }}
                    />
                  );
                })}
                <span className="hidden sm:inline text-xs text-[#A7ADB4] pl-1">
                  {currentColor.name}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Main Viewport Stage */}
        <div
          ref={stageWrapperRef}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onDoubleClick={handleRestoreView}
          onWheel={handleWheel}
          className={`relative mt-6 overflow-hidden border border-white/10 bg-[#121214] select-none ${
            mode === 'exterior' ? 'cursor-grab active:cursor-grabbing' : ''
          }`}
        >
          {mode === 'exterior' ? (
            <div className="relative aspect-[16/9] min-h-[380px] w-full">
              <canvas
                ref={canvasRef}
                aria-label={`Visualização externa do Nissan Kicks 2024 Exclusive ${currentColor.name} no ângulo ${activeFrame.label}`}
                className="block h-full w-full"
              />

              {/* Smart External Hotspots anchored to the current real frame */}
              {visibleExternalHotspots.map((spot) => {
                const pos = spot.positionsByFrame[activeFrame.fileIndex];
                if (!pos) return null;
                const isSelected = activeExtHotspot?.id === spot.id;

                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => handleSelectExternalHotspot(spot)}
                    aria-label={`Detalhar ${spot.title}`}
                    aria-pressed={isSelected}
                    style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
                    className={`group absolute -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                      isSelected ? 'scale-110 z-30' : 'hover:scale-110 z-20'
                    }`}
                  >
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full border-2 transition-colors ${
                        isSelected
                          ? 'border-white bg-[#C3002F] text-white shadow-lg'
                          : 'border-white/85 bg-[#080808]/85 text-white group-hover:border-[#C3002F] group-hover:bg-[#C3002F]'
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    </span>
                  </button>
                );
              })}

              {/* Top-left subtle orientation prompt & active angle */}
              <div className="pointer-events-none absolute left-5 top-5 z-20 flex flex-col gap-1">
                <span className="text-xs font-medium text-white/90">
                  Arraste para explorar cada ângulo.
                </span>
                <span className="font-mono text-[11px] text-[#A7ADB4] tabular-nums">
                  {activeFrame.label} · {displayAzimuth}° (6 ângulos oficiais)
                </span>
              </div>

              {/* Top-right Circular 0°–360° Orientation Dial */}
              <div className="absolute right-5 top-5 z-20 flex items-center gap-3 bg-[#080808]/80 px-3 py-2 backdrop-blur-sm border border-white/10">
                <svg
                  viewBox="0 0 64 64"
                  className="h-11 w-11 shrink-0"
                  aria-hidden="true"
                >
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    fill="none"
                    stroke="rgba(255,255,255,0.16)"
                    strokeWidth="1.5"
                  />
                  {/* Real camera ticks on the 360 ring */}
                  {STUDIO_ANGLE_FRAMES.map((frame) => {
                    const rad = ((frame.azimuthDeg - 90) * Math.PI) / 180;
                    const tx = 32 + Math.cos(rad) * 26;
                    const ty = 32 + Math.sin(rad) * 26;
                    const isCurrent = frame.id === activeFrame.id;
                    return (
                      <circle
                        key={frame.id}
                        cx={tx}
                        cy={ty}
                        r={isCurrent ? 3 : 1.75}
                        fill={isCurrent ? '#C3002F' : '#A7ADB4'}
                      />
                    );
                  })}
                  {/* Orientation needle */}
                  <line
                    x1="32"
                    y1="32"
                    x2={
                      32 +
                      Math.cos(((displayAzimuth - 90) * Math.PI) / 180) * 19
                    }
                    y2={
                      32 +
                      Math.sin(((displayAzimuth - 90) * Math.PI) / 180) * 19
                    }
                    stroke="#C3002F"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                  <circle cx="32" cy="32" r="2.5" fill="#FFFFFF" />
                </svg>

                <div className="text-right">
                  <p className="font-mono text-sm font-semibold text-white tabular-nums">
                    {displayAzimuth}°
                  </p>
                  <p className="text-[10px] uppercase tracking-wider text-[#A7ADB4]">
                    Orientação
                  </p>
                </div>
              </div>
            </div>
          ) : (
            /* Interior Interactive Gallery Mode (Explicitly Identified) */
            <div className="relative aspect-[16/9] min-h-[380px] w-full overflow-hidden bg-[#080808]">
              <img
                src="/assets/vehicle/interior/exclusive_acabamento_premium.webp"
                alt="Galeria interativa do interior do Nissan Kicks 2024 Exclusive 1.6 CVT"
                referrerPolicy="no-referrer"
                className={`h-full w-full object-cover ${
                  reducedMotion ? '' : 'transition-transform duration-500 ease-out'
                }`}
                style={{
                  transformOrigin: activeIntHotspot?.zoomOrigin ?? '50% 50%',
                  transform: `scale(${zoom})`,
                }}
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080808]/65 via-transparent to-[#080808]/40"
              />

              {/* Top-left Explicit Identification of Interior Gallery Mode */}
              <div className="pointer-events-none absolute left-5 top-5 z-20 max-w-md">
                <span className="text-xs font-medium text-white">
                  Galeria Interativa do Interior · 7 Pontos Inteligentes
                </span>
                <p className="mt-0.5 text-[11px] text-[#A7ADB4]">
                  Panorama equiretangular 360° indisponível na fonte oficial;
                  selecione um componente para ampliar.
                </p>
              </div>

              {showDetails &&
                INTERNAL_HOTSPOTS_360.map((spot) => {
                  const isSelected = activeIntHotspot?.id === spot.id;
                  return (
                    <button
                      key={spot.id}
                      type="button"
                      onClick={() => handleSelectInternalHotspot(spot)}
                      aria-label={`Detalhar ${spot.title}`}
                      aria-pressed={isSelected}
                      style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                      className={`group absolute -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                        isSelected ? 'scale-110 z-30' : 'hover:scale-110 z-20'
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full border-2 transition-colors ${
                          isSelected
                            ? 'border-white bg-[#C3002F] text-white shadow-lg'
                            : 'border-white/85 bg-[#080808]/85 text-white group-hover:border-[#C3002F] group-hover:bg-[#C3002F]'
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      </span>
                    </button>
                  );
                })}
            </div>
          )}

          {/* Selected Component Overlay Card (Exterior or Interior) */}
          {(activeExtHotspot || activeIntHotspot) && (
            <div className="absolute bottom-4 left-4 right-4 z-30 border border-white/15 bg-[#080808]/94 p-4 backdrop-blur-md sm:left-5 sm:right-auto sm:w-[390px] sm:p-5">
              {(() => {
                const item = activeExtHotspot ?? activeIntHotspot!;
                return (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#C3002F]">
                          {item.category}
                        </p>
                        <h3 className="mt-1 font-display text-lg font-bold text-white">
                          {item.title}
                        </h3>
                      </div>
                      <button
                        type="button"
                        onClick={handleRestoreView}
                        aria-label="Fechar detalhe"
                        className="flex h-8 w-8 items-center justify-center border border-white/15 text-[#A7ADB4] hover:border-white hover:text-white cursor-pointer"
                      >
                        <X className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </div>

                    <div className="aspect-[16/9] w-full overflow-hidden border border-white/10 bg-[#181818]">
                      <img
                        src={item.detailImage}
                        alt={item.title}
                        referrerPolicy="no-referrer"
                        className="h-full w-full object-cover"
                      />
                    </div>

                    <p className="text-xs leading-relaxed text-[#A7ADB4]">
                      {item.description}
                    </p>

                    <button
                      type="button"
                      onClick={handleRestoreView}
                      className="inline-flex w-full items-center justify-center gap-2 border border-white/20 bg-[#181818] px-4 py-2 text-xs font-semibold uppercase tracking-[0.06em] text-white hover:border-[#C3002F] cursor-pointer"
                    >
                      <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                      Voltar à visão geral
                    </button>
                  </div>
                );
              })()}
            </div>
          )}
        </div>

        {/* Minimalist Control Dock Below Stage */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border border-white/10 bg-[#181818] px-4 py-3">
          {/* Quick Angle Snap Buttons (Exterior) or Hotspot Pills (Interior) */}
          {mode === 'exterior' ? (
            <div className="flex flex-wrap items-center gap-1.5">
              {STUDIO_ANGLE_FRAMES.map((frame) => {
                const isCurrent = frame.id === activeFrame.id;
                return (
                  <button
                    key={frame.id}
                    type="button"
                    onClick={() => {
                      setAutoRotate(false);
                      setActiveExtHotspot(null);
                      targetAzimuthRef.current = frame.azimuthDeg;
                    }}
                    className={`px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isCurrent
                        ? 'bg-[#C3002F] text-white'
                        : 'bg-[#080808] text-[#A7ADB4] hover:text-white'
                    }`}
                  >
                    {frame.label}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-1.5">
              {INTERNAL_HOTSPOTS_360.map((spot) => {
                const isSelected = activeIntHotspot?.id === spot.id;
                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => handleSelectInternalHotspot(spot)}
                    className={`px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      isSelected
                        ? 'bg-[#C3002F] text-white'
                        : 'bg-[#080808] text-[#A7ADB4] hover:text-white'
                    }`}
                  >
                    {spot.title}
                  </button>
                );
              })}
            </div>
          )}

          {/* Showroom Action Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {mode === 'exterior' && (
              <button
                type="button"
                onClick={() => {
                  setActiveExtHotspot(null);
                  lastInteractionTimeRef.current = 0;
                  setAutoRotate((prev) => !prev);
                }}
                disabled={reducedMotion}
                className={`inline-flex items-center gap-1.5 border px-3 py-1.5 text-xs font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-40 ${
                  autoRotate
                    ? 'border-[#C3002F] bg-[#C3002F] text-white'
                    : 'border-white/15 bg-[#080808] text-white hover:border-white/40'
                }`}
              >
                {autoRotate ? (
                  <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                ) : (
                  <Play className="h-3.5 w-3.5" aria-hidden="true" />
                )}
                Rotação automática
              </button>
            )}

            {/* Zoom Controls */}
            <div className="inline-flex items-center border border-white/15 bg-[#080808]">
              <button
                type="button"
                aria-label="Reduzir zoom"
                onClick={() =>
                  setZoom((z) => Math.max(1, Number((z - 0.2).toFixed(2))))
                }
                className="p-1.5 text-[#A7ADB4] hover:text-white cursor-pointer"
              >
                <ZoomOut className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => setWheelZoomEnabled((w) => !w)}
                title="Ativar ou desativar zoom pela roda do mouse dentro do visualizador"
                className={`px-2 py-1 font-mono text-[11px] tabular-nums cursor-pointer ${
                  wheelZoomEnabled ? 'text-[#C3002F]' : 'text-white'
                }`}
              >
                {Math.round(zoom * 100)}%
              </button>
              <button
                type="button"
                aria-label="Aumentar zoom"
                onClick={() =>
                  setZoom((z) => Math.min(2.2, Number((z + 0.2).toFixed(2))))
                }
                className="p-1.5 text-[#A7ADB4] hover:text-white cursor-pointer"
              >
                <ZoomIn className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>

            <button
              type="button"
              onClick={() => setShowDetails((s) => !s)}
              className="inline-flex items-center gap-1.5 border border-white/15 bg-[#080808] px-3 py-1.5 text-xs font-medium text-white hover:border-white/40 whitespace-nowrap shrink-0 cursor-pointer"
            >
              {showDetails ? (
                <EyeOff className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Eye className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              Exibir detalhes
            </button>

            <button
              type="button"
              onClick={handleRestoreView}
              className="inline-flex items-center gap-1.5 border border-white/15 bg-[#080808] px-3 py-1.5 text-xs font-medium text-white hover:border-white/40 whitespace-nowrap shrink-0 cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              Restaurar visualização
            </button>

            <button
              type="button"
              onClick={handleToggleFullscreen}
              className="inline-flex items-center gap-1.5 border border-white/15 bg-[#080808] px-3 py-1.5 text-xs font-medium text-white hover:border-white/40 whitespace-nowrap shrink-0 cursor-pointer"
            >
              {isFullscreen ? (
                <Minimize2 className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              Tela cheia
            </button>
          </div>
        </div>

        {/* Honest Transparency Caption about Official 360° Asset Coverage */}
        <p className="mt-3 text-xs text-[#A7ADB4]">
          Nota de fidelidade: o visualizador 360° utiliza os 6 ângulos oficiais em
          estúdio divulgados pela Nissan Brasil para a linha Kicks MY24 (sem
          modelo GLB público ou sequência completa de 36/72 quadros). Clique no
          percentual de zoom para alternar o zoom pela roda do mouse sem
          bloquear a rolagem da página.
        </p>
      </div>
    </section>
  );
}
