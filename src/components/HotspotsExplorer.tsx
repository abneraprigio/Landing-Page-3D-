import { useState } from 'react';
import { Maximize2, RotateCcw } from 'lucide-react';
import {
  EXTERIOR_HOTSPOTS,
  ExteriorHotspot,
  ExteriorViewKey,
  KICKS_ASSETS,
} from '@/src/data/kicksData';

interface HotspotsExplorerProps {
  reducedMotion: boolean;
}

export function HotspotsExplorer({ reducedMotion }: HotspotsExplorerProps) {
  const [selectedId, setSelectedId] = useState<string>(EXTERIOR_HOTSPOTS[0].id);
  const [zoomed, setZoomed] = useState<boolean>(false);

  const activeHotspot: ExteriorHotspot =
    EXTERIOR_HOTSPOTS.find((h) => h.id === selectedId) ?? EXTERIOR_HOTSPOTS[0];
  const activeView: ExteriorViewKey = activeHotspot.view;

  const viewImage =
    activeView === 'frontal'
      ? KICKS_ASSETS.detalheGrade
      : KICKS_ASSETS.detalheTraseira;

  const viewAlt =
    activeView === 'frontal'
      ? 'Nissan Kicks 2024 Exclusive vista dianteira em estúdio claro mostrando grade V-Motion, faróis Full LED, retrovisores e rodas 17"'
      : 'Nissan Kicks 2024 Exclusive vista traseira em estúdio claro mostrando lanternas em LED e linhas traseiras';

  const visibleHotspots = EXTERIOR_HOTSPOTS.filter((h) => h.view === activeView);

  const handleSelectHotspot = (hotspot: ExteriorHotspot) => {
    setSelectedId(hotspot.id);
    setZoomed(true);
  };

  const handleSwitchView = (view: ExteriorViewKey) => {
    const firstInView = EXTERIOR_HOTSPOTS.find((h) => h.view === view);
    if (firstInView) {
      setSelectedId(firstInView.id);
      setZoomed(false);
    }
  };

  return (
    <section
      id="detalhes"
      className="bg-[#F5F5F5] py-20 text-[#080808] lg:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-black/10 pb-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C3002F]">
              Explore Cada Detalhe
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-[#080808] text-balance sm:text-4xl lg:text-5xl">
              Design exterior pensado em cada linha.
            </h2>
          </div>

          {/* Interactive Angle Tabs */}
          <div
            role="tablist"
            aria-label="Ângulo exterior do veículo"
            className="inline-flex border border-black/15 bg-white p-1 self-start lg:self-auto"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeView === 'frontal'}
              onClick={() => handleSwitchView('frontal')}
              className={`px-4 py-2 text-xs font-semibold tracking-[0.06em] uppercase transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeView === 'frontal'
                  ? 'bg-[#080808] text-white'
                  : 'text-[#52565B] hover:text-[#080808]'
              }`}
            >
              Vista Dianteira
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeView === 'traseira'}
              onClick={() => handleSwitchView('traseira')}
              className={`px-4 py-2 text-xs font-semibold tracking-[0.06em] uppercase transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeView === 'traseira'
                  ? 'bg-[#080808] text-white'
                  : 'text-[#52565B] hover:text-[#080808]'
              }`}
            >
              Vista Traseira
            </button>
          </div>
        </div>

        {/* Main Interactive Studio Stage + Component Detail Panel */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          {/* Interactive High-Res Photo with Optical Zoom & Hotspots */}
          <div className="relative overflow-hidden border border-black/10 bg-[#ECECEC] lg:col-span-8">
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <div
                className={`relative h-full w-full ${
                  reducedMotion ? '' : 'transition-transform duration-700 ease-out'
                }`}
                style={{
                  transformOrigin: `${activeHotspot.originX}% ${activeHotspot.originY}%`,
                  transform: zoomed
                    ? `scale(${activeHotspot.zoomScale})`
                    : 'scale(1)',
                }}
              >
                <img
                  src={viewImage}
                  alt={viewAlt}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />

                {/* Clickable Hotspot Markers */}
                {visibleHotspots.map((spot) => {
                  const isActive = spot.id === activeHotspot.id;
                  return (
                    <button
                      key={spot.id}
                      type="button"
                      onClick={() => handleSelectHotspot(spot)}
                      aria-label={`Inspecionar ${spot.title}`}
                      aria-pressed={isActive}
                      style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                      className={`group absolute -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C3002F] ${
                        isActive ? 'scale-110 z-20' : 'hover:scale-110 z-10'
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 items-center justify-center rounded-full border-2 transition-colors ${
                          isActive
                            ? 'border-white bg-[#C3002F] text-white shadow-lg'
                            : 'border-[#080808] bg-white/95 text-[#080808] group-hover:border-[#C3002F] group-hover:bg-[#C3002F] group-hover:text-white'
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Zoom State Controls */}
              <div className="absolute bottom-4 right-4 z-30 flex items-center gap-2">
                {zoomed ? (
                  <button
                    type="button"
                    onClick={() => setZoomed(false)}
                    className="inline-flex items-center gap-2 border border-black/20 bg-white/95 px-3.5 py-2 text-xs font-semibold text-[#080808] shadow-sm transition-colors hover:bg-[#080808] hover:text-white whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    Visão completa
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setZoomed(true)}
                    className="inline-flex items-center gap-2 border border-black/20 bg-white/95 px-3.5 py-2 text-xs font-semibold text-[#080808] shadow-sm transition-colors hover:bg-[#C3002F] hover:border-[#C3002F] hover:text-white whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                    Aproximar detalhe
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Detail Inspection Card */}
          <div className="flex flex-col justify-between border border-black/10 bg-white p-6 lg:col-span-4 lg:p-8">
            <div>
              <div className="aspect-[16/9] w-full overflow-hidden border border-black/10 bg-[#ECECEC]">
                <img
                  src={activeHotspot.image}
                  alt={`Aproximação de ${activeHotspot.title} do Nissan Kicks 2024 Exclusive`}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                  style={{
                    objectPosition: activeHotspot.cropPosition,
                    transform: 'scale(1.55)',
                    transformOrigin: activeHotspot.cropPosition,
                  }}
                />
              </div>

              <p className="mt-6 text-xs font-medium tracking-[0.12em] uppercase text-[#C3002F]">
                {activeHotspot.subtitle}
              </p>

              <h3 className="mt-2 font-display text-2xl font-bold text-[#080808]">
                {activeHotspot.title}
              </h3>

              <p className="mt-3 text-base leading-relaxed text-[#181818]">
                {activeHotspot.description}
              </p>

              <p className="mt-3 text-sm leading-relaxed text-[#52565B]">
                {activeHotspot.technicalNote}
              </p>
            </div>

            {/* Component Selector List (All 5 Hotspots) */}
            <div className="mt-8 border-t border-black/10 pt-5">
              <p className="mb-3 text-xs font-semibold tracking-[0.14em] uppercase text-[#52565B]">
                Selecionar ponto
              </p>
              <div className="flex flex-col gap-1.5">
                {EXTERIOR_HOTSPOTS.map((spot) => {
                  const isActive = spot.id === activeHotspot.id;
                  return (
                    <button
                      key={spot.id}
                      type="button"
                      onClick={() => handleSelectHotspot(spot)}
                      className={`flex items-center justify-between px-3 py-2 text-left text-sm transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-[#080808] text-white font-semibold'
                          : 'text-[#181818] hover:bg-black/5'
                      }`}
                    >
                      <span className="truncate">{spot.title}</span>
                      <span
                        className={`text-xs ${
                          isActive ? 'text-[#C3002F]' : 'text-[#52565B]'
                        }`}
                      >
                        {spot.view === 'frontal' ? 'Dianteira' : 'Traseira'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
