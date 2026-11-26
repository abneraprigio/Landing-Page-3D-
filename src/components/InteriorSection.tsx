import { useState } from 'react';
import { INTERIOR_HOTSPOTS, KICKS_ASSETS } from '@/src/data/kicksData';

export function InteriorSection() {
  const [selectedId, setSelectedId] = useState<string>(INTERIOR_HOTSPOTS[0].id);

  const activeFeature =
    INTERIOR_HOTSPOTS.find((item) => item.id === selectedId) ??
    INTERIOR_HOTSPOTS[0];

  return (
    <section
      id="interior"
      className="border-t border-white/10 bg-[#080808] py-20 text-white lg:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Editorial Heading */}
        <div className="flex flex-col justify-between gap-6 pb-10 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C3002F]">
              Interior · Conforto e Sofisticação
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
              Acabamento premium e tecnologia intuitiva ao alcance das mãos.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-[#A7ADB4]">
            Selecione os pontos da cabine para explorar o painel de 7", a central
            Nissan Connect de 8", os bancos Zero Gravity® e a partida Push Start
            com chave presencial I-Key.
          </p>
        </div>

        {/* Interactive Panoramic Cabin Stage */}
        <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          <div className="relative overflow-hidden border border-white/10 bg-[#181818] lg:col-span-8">
            <div className="relative aspect-[16/9] w-full">
              <img
                src={KICKS_ASSETS.exclusiveAcabamentoPremium}
                alt="Interior completo do Nissan Kicks 2024 Exclusive com acabamento premium, volante multifuncional, painel 7 polegadas e central Nissan Connect de 8 polegadas"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080808]/60 via-transparent to-transparent"
              />

              {/* Cabin Interactive Hotspots */}
              {INTERIOR_HOTSPOTS.map((spot) => {
                const isActive = spot.id === activeFeature.id;
                return (
                  <button
                    key={spot.id}
                    type="button"
                    onClick={() => setSelectedId(spot.id)}
                    aria-label={`Explorar ${spot.title}`}
                    aria-pressed={isActive}
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    className={`group absolute -translate-x-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full transition-transform duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white ${
                      isActive ? 'scale-110 z-20' : 'hover:scale-110 z-10'
                    }`}
                  >
                    <span
                      className={`flex h-7 w-7 items-center justify-center rounded-full border-2 transition-colors ${
                        isActive
                          ? 'border-white bg-[#C3002F] text-white shadow-lg'
                          : 'border-white/80 bg-[#080808]/85 text-white group-hover:border-[#C3002F] group-hover:bg-[#C3002F]'
                      }`}
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-current" />
                    </span>
                  </button>
                );
              })}

              <div className="absolute bottom-4 left-5 right-5 flex items-center justify-between text-xs text-white/90">
                <span className="font-medium">{activeFeature.title}</span>
                <span className="text-[#A7ADB4]">{activeFeature.badge}</span>
              </div>
            </div>
          </div>

          {/* Right Feature Detail Card + Close-Up Photography */}
          <div className="flex flex-col justify-between border border-white/10 bg-[#181818] p-6 lg:col-span-4 lg:p-8">
            <div>
              <div className="aspect-[3/2] w-full overflow-hidden border border-white/10 bg-[#080808]">
                <img
                  src={activeFeature.detailImage}
                  alt={activeFeature.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover transition-opacity duration-300"
                />
              </div>

              <p className="mt-6 text-xs font-medium tracking-[0.12em] uppercase text-[#C3002F]">
                {activeFeature.badge}
              </p>

              <h3 className="mt-2 font-display text-2xl font-bold text-white">
                {activeFeature.title}
              </h3>

              <p className="mt-3 text-sm leading-relaxed text-[#A7ADB4]">
                {activeFeature.description}
              </p>
            </div>

            <div className="mt-6 border-t border-white/10 pt-4 text-xs text-[#A7ADB4]">
              Compatível com Apple CarPlay e Android Auto · Chave presencial I-Key e
              partida por botão Push Start de série na versão Exclusive.
            </div>
          </div>
        </div>

        {/* Horizontal Interactive Feature Strip */}
        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {INTERIOR_HOTSPOTS.map((spot, idx) => {
            const isActive = spot.id === activeFeature.id;
            return (
              <button
                key={spot.id}
                type="button"
                onClick={() => setSelectedId(spot.id)}
                className={`flex flex-col items-start border p-5 text-left transition-colors cursor-pointer ${
                  isActive
                    ? 'border-[#C3002F] bg-[#181818]'
                    : 'border-white/10 bg-[#080808] hover:border-white/25 hover:bg-[#181818]/60'
                }`}
              >
                <div className="flex w-full items-center justify-between text-xs text-[#A7ADB4]">
                  <span className="font-mono tabular-nums text-[#C3002F]">
                    0{idx + 1}
                  </span>
                  <span>{spot.badge}</span>
                </div>
                <span className="mt-2 font-display text-base font-semibold text-white">
                  {spot.title}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
