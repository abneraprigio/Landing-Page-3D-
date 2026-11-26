export type ShowroomMode = 'exterior' | 'interior';

export interface VehicleColorOption {
  id: string;
  name: string;
  swatchHex: string;
  roofHex: string;
  folder: string;
}

export interface StudioAngleFrame {
  id: string;
  fileIndex: string; // '01' .. '06'
  azimuthDeg: number; // 0 = Front, 90 = Right Side, 180 = Rear, 270 = Left Side
  label: string;
  shortLabel: string;
}

export interface ExternalHotspot360 {
  id: string;
  title: string;
  category: string;
  description: string;
  detailImage: string;
  targetAzimuth: number;
  positionsByFrame: Record<string, { x: number; y: number }>;
}

export interface InternalHotspot360 {
  id: string;
  title: string;
  category: string;
  description: string;
  detailImage: string;
  x: number;
  y: number;
  zoomOrigin: string;
}

export const VEHICLE_COLORS_360: VehicleColorOption[] = [
  {
    id: 'vermelho-teto-preto',
    name: 'Vermelho Malbec c/ Teto Preto',
    swatchHex: '#C3002F',
    roofHex: '#0E0E10',
    folder: 'vermelho-teto-preto',
  },
  {
    id: 'cinza-grafite-teto-preto',
    name: 'Cinza Grafite c/ Teto Preto',
    swatchHex: '#5A5E63',
    roofHex: '#0E0E10',
    folder: 'cinza-grafite-teto-preto',
  },
  {
    id: 'branco-teto-preto',
    name: 'Branco Diamond c/ Teto Preto',
    swatchHex: '#EBECEF',
    roofHex: '#0E0E10',
    folder: 'branco-teto-preto',
  },
];

/**
 * Ângulos reais oficiais da Nissan Brasil (linha Kicks MY24).
 * Ordenados em sentido horário de 0° a 359° para navegação contínua por arraste.
 */
export const STUDIO_ANGLE_FRAMES: StudioAngleFrame[] = [
  {
    id: 'front',
    fileIndex: '02',
    azimuthDeg: 0,
    label: 'Dianteira',
    shortLabel: '0°',
  },
  {
    id: 'right-side',
    fileIndex: '03',
    azimuthDeg: 90,
    label: 'Lateral direita',
    shortLabel: '90°',
  },
  {
    id: 'rear',
    fileIndex: '04',
    azimuthDeg: 180,
    label: 'Traseira',
    shortLabel: '180°',
  },
  {
    id: 'rear-left-34',
    fileIndex: '05',
    azimuthDeg: 225,
    label: 'Traseira em perspectiva',
    shortLabel: '225°',
  },
  {
    id: 'left-side',
    fileIndex: '06',
    azimuthDeg: 270,
    label: 'Lateral esquerda',
    shortLabel: '270°',
  },
  {
    id: 'front-left-34',
    fileIndex: '01',
    azimuthDeg: 315,
    label: 'Dianteira em perspectiva',
    shortLabel: '315°',
  },
];

export const EXTERNAL_HOTSPOTS_360: ExternalHotspot360[] = [
  {
    id: 'farois-full-led',
    title: 'Faróis Full LED',
    category: 'Iluminação Frontal',
    description:
      'Faróis dianteiros em LED com acendimento inteligente, regulagem elétrica de altura, sistema Follow me Home, luzes diurnas DTRL e faróis de neblina em LED.',
    detailImage: '/assets/vehicle/details/detalhe_grade.webp',
    targetAzimuth: 315,
    positionsByFrame: {
      '02': { x: 36, y: 40 },
      '03': { x: 88, y: 48 },
      '06': { x: 11, y: 48 },
      '01': { x: 42, y: 42 },
    },
  },
  {
    id: 'grade-vmotion',
    title: 'Grade V-Motion',
    category: 'Identidade Nissan',
    description:
      'Grade frontal com acabamento cromado e black piano que define a identidade visual da linha 2024 e abriga a câmera frontal do sistema Visão 360°.',
    detailImage: '/assets/vehicle/details/detalhe_grade.webp',
    targetAzimuth: 0,
    positionsByFrame: {
      '02': { x: 50, y: 51 },
      '01': { x: 24, y: 52 },
    },
  },
  {
    id: 'rodas-liga-leve',
    title: 'Rodas de liga leve',
    category: 'Aro 17" · 205/55 R17',
    description:
      'Rodas de liga leve de 17 polegadas com acabamento diamantado, equipadas com pneus 205/55 R17 e monitoramento da pressão dos pneus (TPMS).',
    detailImage: '/assets/vehicle/exterior/ambientada_traseira.webp',
    targetAzimuth: 270,
    positionsByFrame: {
      '03': { x: 78, y: 66 },
      '05': { x: 54, y: 65 },
      '06': { x: 22, y: 66 },
      '01': { x: 51, y: 65 },
    },
  },
  {
    id: 'retrovisores',
    title: 'Retrovisores',
    category: 'Integração e Câmeras',
    description:
      'Retrovisores externos com regulagem elétrica, rebatimento automático, indicadores de direção em LED, câmeras laterais integradas e acabamento Preto Premium nas versões com teto colorido.',
    detailImage: '/assets/vehicle/exterior/ambientada_frontal.webp',
    targetAzimuth: 315,
    positionsByFrame: {
      '02': { x: 69, y: 35 },
      '03': { x: 66, y: 38 },
      '04': { x: 67, y: 35 },
      '05': { x: 28, y: 37 },
      '06': { x: 34, y: 38 },
      '01': { x: 58, y: 37 },
    },
  },
  {
    id: 'lanternas-traseiras',
    title: 'Lanternas traseiras',
    category: 'Assinatura Traseira LED',
    description:
      'Lanternas traseiras em LED conectadas ao longo da tampa traseira, complementadas pela luz de freio elevada em LED e aerofólio integrado na cor do veículo.',
    detailImage: '/assets/vehicle/details/detalhe_traseira.webp',
    targetAzimuth: 225,
    positionsByFrame: {
      '03': { x: 13, y: 42 },
      '04': { x: 37, y: 40 },
      '05': { x: 62, y: 43 },
      '06': { x: 86, y: 42 },
    },
  },
  {
    id: 'porta-malas',
    title: 'Porta-malas',
    category: 'Capacidade de 432 Litros',
    description:
      'Compartimento traseiro de 432 litros com iluminação interna, travamento central automático em movimento e banco traseiro bipartido 60/40 rebatível.',
    detailImage: '/assets/vehicle/details/porta_mala.webp',
    targetAzimuth: 180,
    positionsByFrame: {
      '04': { x: 50, y: 52 },
      '05': { x: 78, y: 51 },
    },
  },
];

export const INTERNAL_HOTSPOTS_360: InternalHotspot360[] = [
  {
    id: 'painel-7',
    title: 'Painel de 7 polegadas',
    category: 'Instrumentos TFT HD',
    description:
      'Painel de instrumentos multifuncional de 7 polegadas em alta definição com leitura configurável do computador de bordo, áudio, telefone e assistências.',
    detailImage: '/assets/vehicle/interior/entretenimento_painel.webp',
    x: 66,
    y: 28,
    zoomOrigin: '66% 28%',
  },
  {
    id: 'multimidia-8',
    title: 'Central multimídia de 8 polegadas',
    category: 'Nissan Connect · CarPlay & Android Auto',
    description:
      'Tela sensível ao toque de 8 polegadas compatível com Apple CarPlay e Android Auto, além de exibir a Visão 360° Inteligente durante manobras.',
    detailImage: '/assets/vehicle/details/camera_traseira.webp',
    x: 86,
    y: 34,
    zoomOrigin: '86% 34%',
  },
  {
    id: 'sistema-bose',
    title: 'Sistema BOSE Personal Plus',
    category: '8 Alto-falantes · Personal Space',
    description:
      'Sistema de áudio premium BOSE® Personal Plus com 8 alto-falantes, incluindo 2 alto-falantes integrados ao encosto de cabeça do motorista e 2 tweeters.',
    detailImage: '/assets/vehicle/interior/banco_bose_personal_sound.webp',
    x: 9,
    y: 44,
    zoomOrigin: '14% 44%',
  },
  {
    id: 'bancos-zero-gravity',
    title: 'Bancos Zero Gravity',
    category: 'Ergonomia Dianteira',
    description:
      'Bancos dianteiros com tecnologia Zero Gravity® desenvolvidos para distribuir a pressão corporal e reduzir a fadiga em viagens longas.',
    detailImage: '/assets/vehicle/interior/conforto_assentos_zero_gravidade.webp',
    x: 52,
    y: 84,
    zoomOrigin: '52% 80%',
  },
  {
    id: 'acabamento-premium',
    title: 'Acabamento premium',
    category: 'Revestimento & Costuras',
    description:
      'Revestimento sintético de acabamento premium nos bancos, volante, painel frontal e apoio de braço central com porta-objetos e duas portas USB tipo A.',
    detailImage: '/assets/vehicle/interior/conforto_apoio_de_braco.webp',
    x: 39,
    y: 66,
    zoomOrigin: '39% 66%',
  },
  {
    id: 'volante-multifuncional',
    title: 'Volante multifuncional',
    category: 'Três Raios · Ajuste Altura/Profundidade',
    description:
      'Volante de três raios com acabamento premium, regulagem de altura e profundidade e comandos integrados para piloto automático, áudio, telefone e computador de bordo.',
    detailImage: '/assets/vehicle/interior/entretenimento_painel.webp',
    x: 61,
    y: 39,
    zoomOrigin: '61% 39%',
  },
  {
    id: 'push-start',
    title: 'Botão Push Start',
    category: 'Ignição Eletrônica & I-Key',
    description:
      'Sistema eletrônico de ignição por botão Push Start combinado à chave inteligente presencial I-Key para destravamento e partida sem tirar a chave do bolso.',
    detailImage: '/assets/vehicle/interior/conforto_ar_condicionado.webp',
    x: 77,
    y: 71,
    zoomOrigin: '77% 71%',
  },
];

export function getStudioFrameUrl(colorFolder: string, fileIndex: string): string {
  return `/assets/vehicle/360/${colorFolder}/${fileIndex}.webp`;
}
