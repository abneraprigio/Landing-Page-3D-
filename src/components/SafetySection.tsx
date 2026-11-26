import { useState } from 'react';
import { KICKS_ASSETS, SAFETY_FEATURES_EXCLUSIVE } from '@/src/data/kicksData';

type CameraZone = 'all' | 'front' | 'left' | 'right' | 'rear';

const CAMERA_ZONES: {
  id: CameraZone;
  label: string;
  angleTitle: string;
  description: string;
}[] = [
  {
    id: 'all',
    label: 'Visão 360°',
    angleTitle: 'Composição aérea de 4 câmeras + MOD',
    description:
      'Combina imagens das câmeras frontal, laterais e traseira para gerar visão periférica superior com Detector de Objetos em Movimento (MOD).',
  },
  {
    id: 'front',
    label: 'Frontal',
    angleTitle: 'Câmera instalada na grade V-Motion',
    description:
      'Auxilia na aproximação de meios-fios, vagas estreitas e saídas de garagem com baixa visibilidade lateral.',
  },
  {
    id: 'left',
    label: 'Lateral Esq.',
    angleTitle: 'Câmera sob o retrovisor esquerdo',
    description:
      'Projeta o alinhamento da roda dianteira esquerda e guias paralelas para balizas precisas.',
  },
  {
    id: 'right',
    label: 'Lateral Dir.',
    angleTitle: 'Câmera sob o retrovisor direito',
    description:
      'Permite visualizar guias de calçada e obstáculos próximos ao lado direito sem risco às rodas de 17".',
  },
  {
    id: 'rear',
    label: 'Traseira',
    angleTitle: 'Câmera traseira + sensores',
    description:
      'Linhas dinâmicas de trajetória somadas ao sensor de estacionamento traseiro de série.',
  },
];

export function SafetySection() {
  const [activeZone, setActiveZone] = useState<CameraZone>('all');

  const currentZone =
    CAMERA_ZONES.find((z) => z.id === activeZone) ?? CAMERA_ZONES[0];

  const isZoneActive = (zone: Exclude<CameraZone, 'all'>) =>
    activeZone === 'all' || activeZone === zone;

  return (
    <section
      id="seguranca"
      className="border-t border-white/10 bg-[#181818] py-20 text-white lg:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C3002F]">
              Tecnologia e Segurança · Série Exclusive 1.6 CVT
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
              Controle de chassi, seis airbags e Visão 360° Inteligente.
            </h2>
          </div>

          <p className="max-w-md text-sm leading-relaxed text-[#A7ADB4]">
            Recursos originais de série da versão 1.6 Exclusive CVT (sem itens
            exclusivos do pacote opcional Pack Tech).
          </p>
        </div>

        {/* Visual Evidence + Interactive 360 Camera Demonstration */}
        <div className="mt-10 grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
          {/* Real Photo of Nissan Connect 360 + MOD Display */}
          <div className="flex flex-col justify-between border border-white/10 bg-[#080808] p-6 lg:col-span-6 lg:p-8">
            <div>
              <div className="overflow-hidden border border-white/10 bg-[#181818]">
                <img
                  src={KICKS_ASSETS.cameraTraseira}
                  alt="Tela real Nissan Connect de 8 polegadas exibindo Visão 360 graus inteligente e Detector de Objetos em Movimento (MOD)"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="aspect-[1200/937] w-full object-cover"
                />
              </div>
              <div className="mt-5 flex items-center justify-between text-xs text-[#A7ADB4]">
                <span>Fotografia real do display Nissan Connect 8"</span>
                <span className="font-mono text-white">MOD Ativo</span>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#A7ADB4]">
                O sistema combina quatro câmeras externas em tempo real na tela
                central e emite alerta visual e sonoro caso detecte movimento ao
                redor do veículo durante manobras.
              </p>
            </div>
          </div>

          {/* Illustrative Camera Perimeter Demonstration */}
          <div className="flex flex-col justify-between border border-white/10 bg-[#080808] p-6 lg:col-span-6 lg:p-8">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-xs font-semibold tracking-[0.14em] uppercase text-[#C3002F]">
                  Demonstração Ilustrativa · Visão 360°
                </span>
                <span className="text-xs text-[#A7ADB4]">
                  Representação esquemática de funcionamento
                </span>
              </div>

              {/* Camera Zone Controls */}
              <div
                role="tablist"
                aria-label="Selecionar câmera para demonstração ilustrativa"
                className="mt-5 flex flex-wrap gap-1.5"
              >
                {CAMERA_ZONES.map((zone) => {
                  const active = zone.id === activeZone;
                  return (
                    <button
                      key={zone.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => setActiveZone(zone.id)}
                      className={`px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                        active
                          ? 'bg-[#C3002F] text-white'
                          : 'border border-white/15 bg-[#181818] text-[#A7ADB4] hover:text-white'
                      }`}
                    >
                      {zone.label}
                    </button>
                  );
                })}
              </div>

              {/* Technical Top-Down Camera Cone Diagram (Explicitly Labeled Illustration) */}
              <div className="mt-6 flex items-center justify-center border border-white/10 bg-[#121214] p-6">
                <svg
                  viewBox="0 0 360 240"
                  role="img"
                  aria-label="Diagrama ilustrativo de demonstração das quatro câmeras ao redor do veículo"
                  className="h-56 w-full max-w-[340px]"
                >
                  {/* Subtle calibrated grid */}
                  <defs>
                    <pattern
                      id="camGrid"
                      width="20"
                      height="20"
                      patternUnits="userSpaceOnUse"
                    >
                      <path
                        d="M 20 0 L 0 0 0 20"
                        fill="none"
                        stroke="rgba(255,255,255,0.05)"
                        strokeWidth="1"
                      />
                    </pattern>
                  </defs>
                  <rect width="360" height="240" fill="url(#camGrid)" />

                  {/* Front Camera Field */}
                  <path
                    d="M 180 76 L 125 14 L 235 14 Z"
                    fill={
                      isZoneActive('front')
                        ? 'rgba(195, 0, 47, 0.28)'
                        : 'rgba(255, 255, 255, 0.04)'
                    }
                    stroke={
                      isZoneActive('front')
                        ? '#C3002F'
                        : 'rgba(255, 255, 255, 0.12)'
                    }
                    strokeWidth="1"
                  />

                  {/* Rear Camera Field */}
                  <path
                    d="M 180 164 L 125 226 L 235 226 Z"
                    fill={
                      isZoneActive('rear')
                        ? 'rgba(195, 0, 47, 0.28)'
                        : 'rgba(255, 255, 255, 0.04)'
                    }
                    stroke={
                      isZoneActive('rear')
                        ? '#C3002F'
                        : 'rgba(255, 255, 255, 0.12)'
                    }
                    strokeWidth="1"
                  />

                  {/* Left Camera Field */}
                  <path
                    d="M 148 112 L 42 52 L 42 188 Z"
                    fill={
                      isZoneActive('left')
                        ? 'rgba(195, 0, 47, 0.24)'
                        : 'rgba(255, 255, 255, 0.04)'
                    }
                    stroke={
                      isZoneActive('left')
                        ? '#C3002F'
                        : 'rgba(255, 255, 255, 0.12)'
                    }
                    strokeWidth="1"
                  />

                  {/* Right Camera Field */}
                  <path
                    d="M 212 112 L 318 52 L 318 188 Z"
                    fill={
                      isZoneActive('right')
                        ? 'rgba(195, 0, 47, 0.24)'
                        : 'rgba(255, 255, 255, 0.04)'
                    }
                    stroke={
                      isZoneActive('right')
                        ? '#C3002F'
                        : 'rgba(255, 255, 255, 0.12)'
                    }
                    strokeWidth="1"
                  />

                  {/* Schematic Top-Down Vehicle Silhouette */}
                  <rect
                    x="150"
                    y="76"
                    width="60"
                    height="88"
                    rx="12"
                    fill="#181818"
                    stroke="#A7ADB4"
                    strokeWidth="1.5"
                  />
                  <rect
                    x="157"
                    y="92"
                    width="46"
                    height="56"
                    rx="5"
                    fill="#080808"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="1"
                  />
                  <text
                    x="180"
                    y="124"
                    textAnchor="middle"
                    fill="#FFFFFF"
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    360°
                  </text>

                  {/* Camera Nodes */}
                  <circle
                    cx="180"
                    cy="76"
                    r="3.5"
                    fill={isZoneActive('front') ? '#C3002F' : '#A7ADB4'}
                  />
                  <circle
                    cx="180"
                    cy="164"
                    r="3.5"
                    fill={isZoneActive('rear') ? '#C3002F' : '#A7ADB4'}
                  />
                  <circle
                    cx="148"
                    cy="112"
                    r="3.5"
                    fill={isZoneActive('left') ? '#C3002F' : '#A7ADB4'}
                  />
                  <circle
                    cx="212"
                    cy="112"
                    r="3.5"
                    fill={isZoneActive('right') ? '#C3002F' : '#A7ADB4'}
                  />
                </svg>
              </div>
            </div>

            <div className="mt-5 border-t border-white/10 pt-4">
              <h3 className="font-display text-lg font-semibold text-white">
                {currentZone.angleTitle}
              </h3>
              <p className="mt-1.5 text-sm leading-relaxed text-[#A7ADB4]">
                {currentZone.description}
              </p>
            </div>
          </div>
        </div>

        {/* Standard Exclusive 1.6 CVT Safety & Chassis Controls List */}
        <div className="mt-10 grid grid-cols-1 gap-px border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-5">
          {SAFETY_FEATURES_EXCLUSIVE.map((item) => (
            <div key={item.id} className="bg-[#080808] p-6">
              <p className="text-xs font-medium tracking-[0.12em] uppercase text-[#C3002F]">
                {item.code}
              </p>
              <h3 className="mt-2 font-display text-lg font-bold text-white">
                {item.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-[#A7ADB4]">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
