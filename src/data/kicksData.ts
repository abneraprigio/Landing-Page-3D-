import ambientadaFrontal from '@/src/assets/kicks/exterior/ambientada_frontal.webp';
import ambientadaTraseira from '@/src/assets/kicks/exterior/ambientada_traseira.webp';
import exclusiveVermelhoTetoPreto from '@/src/assets/kicks/exterior/exclusive_vermelho_teto_preto.webp';
import exclusiveCvt from '@/src/assets/kicks/exterior/exclusive_cvt.webp';
import brancoTetoPreto from '@/src/assets/kicks/exterior/branco_teto_preto.webp';

import detalheGrade from '@/src/assets/kicks/detalhes/detalhe_grade.webp';
import detalheTraseira from '@/src/assets/kicks/detalhes/detalhe_traseira.webp';
import cameraTraseira from '@/src/assets/kicks/detalhes/camera_traseira.webp';
import portaMala from '@/src/assets/kicks/detalhes/porta_mala.webp';
import confortoPortaMala from '@/src/assets/kicks/detalhes/conforto_porta_mala.webp';

import exclusiveAcabamentoPremium from '@/src/assets/kicks/interior/exclusive_acabamento_premium.webp';
import entretenimentoPainel from '@/src/assets/kicks/interior/entretenimento_painel.webp';
import confortoAssentosZeroGravidade from '@/src/assets/kicks/interior/conforto_assentos_zero_gravidade.webp';
import confortoArCondicionado from '@/src/assets/kicks/interior/conforto_ar_condicionado.webp';
import confortoApoioDeBraco from '@/src/assets/kicks/interior/conforto_apoio_de_braco.webp';
import bancoBosePersonalSound from '@/src/assets/kicks/interior/banco_bose_personal_sound.webp';

export const KICKS_ASSETS = {
  ambientadaFrontal,
  ambientadaTraseira,
  exclusiveVermelhoTetoPreto,
  exclusiveCvt,
  brancoTetoPreto,
  detalheGrade,
  detalheTraseira,
  cameraTraseira,
  portaMala,
  confortoPortaMala,
  exclusiveAcabamentoPremium,
  entretenimentoPainel,
  confortoAssentosZeroGravidade,
  confortoArCondicionado,
  confortoApoioDeBraco,
  bancoBosePersonalSound,
};

export interface ScrollytellingChapter {
  id: string;
  index: string;
  kicker: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  ambientGlow: string;
  focalTransform: {
    scale: number;
    xPercent: number;
    yPercent: number;
  };
  specHighlight: string;
}

export const SCROLLYTELLING_CHAPTERS: ScrollytellingChapter[] = [
  {
    id: 'chapter-presenca',
    index: '01',
    kicker: 'Proporções & Design',
    title: 'Presença urbana com teto flutuante.',
    description:
      'Linhas esculpidas com 4.310 mm de comprimento e 200 mm de altura livre do solo combinam agilidade na cidade com postura firme de SUV.',
    image: ambientadaFrontal,
    imageAlt: 'Nissan Kicks 2024 Exclusive em perspectiva frontal de três quartos em cenário urbano',
    ambientGlow: 'radial-gradient(circle at 60% 45%, rgba(255,255,255,0.09), rgba(8,8,8,0.95) 70%)',
    focalTransform: { scale: 1.0, xPercent: 0, yPercent: 0 },
    specHighlight: '4.310 mm comp. · 200 mm vão livre',
  },
  {
    id: 'chapter-vmotion',
    index: '02',
    kicker: 'Identidade Frontal',
    title: 'Assinatura V-Motion e conjunto Full LED.',
    description:
      'A grade frontal com acabamento cromado e black piano integra-se aos faróis dianteiros em LED com sistema Follow me Home e luzes diurnas DTRL.',
    image: detalheGrade,
    imageAlt: 'Detalhe frontal do Nissan Kicks 2024 evidenciando grade V-Motion e faróis Full LED',
    ambientGlow: 'radial-gradient(circle at 50% 40%, rgba(167,173,180,0.14), rgba(8,8,8,0.96) 72%)',
    focalTransform: { scale: 1.14, xPercent: -3, yPercent: -2 },
    specHighlight: 'Faróis dianteiros e neblina em LED',
  },
  {
    id: 'chapter-traseira',
    index: '03',
    kicker: 'Aerodinâmica & Traseira',
    title: 'Lanternas em LED conectadas de ponta a ponta.',
    description:
      'O aerofólio integrado, a antena estilo barbatana de tubarão e as rodas de liga leve de 17 polegadas completam o equilíbrio visual da carroceria.',
    image: ambientadaTraseira,
    imageAlt: 'Vista traseira em perspectiva do Nissan Kicks 2024 Exclusive com teto preto',
    ambientGlow: 'radial-gradient(circle at 42% 52%, rgba(195,0,47,0.18), rgba(8,8,8,0.95) 70%)',
    focalTransform: { scale: 1.08, xPercent: 2, yPercent: -2 },
    specHighlight: 'Rodas 17" · Pneus 205/55 R17',
  },
  {
    id: 'chapter-cabine',
    index: '04',
    kicker: 'Ergonomia & Acústica',
    title: 'Cabine projetada ao redor do motorista.',
    description:
      'Painel multifuncional de 7", central Nissan Connect de 8", bancos Zero Gravity com acabamento premium e áudio BOSE Personal Plus no encosto de cabeça.',
    image: exclusiveAcabamentoPremium,
    imageAlt: 'Interior do Nissan Kicks 2024 Exclusive com volante multifuncional, painel e acabamento premium',
    ambientGlow: 'radial-gradient(circle at 68% 42%, rgba(195,0,47,0.14), rgba(8,8,8,0.97) 72%)',
    focalTransform: { scale: 1.05, xPercent: -2, yPercent: 0 },
    specHighlight: 'BOSE Personal Plus · Bancos Zero Gravity',
  },
];

export type ExteriorViewKey = 'frontal' | 'traseira';

export interface ExteriorHotspot {
  id: string;
  view: ExteriorViewKey;
  title: string;
  subtitle: string;
  description: string;
  technicalNote: string;
  x: number; // percentage on image
  y: number; // percentage on image
  zoomScale: number;
  originX: number; // percentage transform-origin
  originY: number;
  image: string;
  cropPosition: string;
}

export const EXTERIOR_HOTSPOTS: ExteriorHotspot[] = [
  {
    id: 'farois-full-led',
    view: 'frontal',
    title: 'Faróis Full LED',
    subtitle: 'Iluminação frontal + DTRL + Neblina LED',
    description:
      'Iluminação moderna que valoriza o design e contribui para a visibilidade.',
    technicalNote:
      'Inclui acendimento inteligente dos faróis, regulagem elétrica de altura e sistema Follow me Home.',
    x: 29,
    y: 37,
    zoomScale: 2.15,
    originX: 28,
    originY: 36,
    image: detalheGrade,
    cropPosition: '28% 36%',
  },
  {
    id: 'grade-vmotion',
    view: 'frontal',
    title: 'Grade dianteira V-Motion',
    subtitle: 'Acabamento cromado & black piano',
    description: 'Identidade visual marcante da Nissan.',
    technicalNote:
      'Moldura em V característica da geração MY24 com integração direta ao conjunto óptico e câmera frontal do sistema 360°.',
    x: 61,
    y: 44,
    zoomScale: 1.9,
    originX: 61,
    originY: 44,
    image: detalheGrade,
    cropPosition: '61% 44%',
  },
  {
    id: 'rodas-17',
    view: 'frontal',
    title: 'Rodas de liga leve de 17 polegadas',
    subtitle: 'Pneus 205/55 R17 · Acabamento diamantado',
    description: 'Design que complementa a personalidade do SUV.',
    technicalNote:
      'Equipada com Sistema de Monitoramento da Pressão dos Pneus (TPMS) e suspensão dianteira independente.',
    x: 21,
    y: 78,
    zoomScale: 2.1,
    originX: 20,
    originY: 78,
    image: detalheGrade,
    cropPosition: '20% 78%',
  },
  {
    id: 'retrovisores',
    view: 'frontal',
    title: 'Retrovisores',
    subtitle: 'Rebatimento automático & repetidor em LED',
    description: 'Detalhes de acabamento e integração visual com a carroceria.',
    technicalNote:
      'Regulagem elétrica, indicadores de direção em LED, câmeras laterais integradas e acabamento Preto Premium nas versões com teto colorido.',
    x: 11,
    y: 15,
    zoomScale: 2.35,
    originX: 11,
    originY: 16,
    image: detalheGrade,
    cropPosition: '11% 16%',
  },
  {
    id: 'lanternas-traseiras',
    view: 'traseira',
    title: 'Lanternas traseiras',
    subtitle: 'Assinatura contínua em LED',
    description: 'Design característico da linha Kicks 2024.',
    technicalNote:
      'Lanternas traseiras em LED interligadas por faixa visual na tampa do porta-malas e luz de freio elevada em LED.',
    x: 42,
    y: 38,
    zoomScale: 2.05,
    originX: 43,
    originY: 38,
    image: detalheTraseira,
    cropPosition: '43% 38%',
  },
];

export interface InteriorHotspot {
  id: string;
  title: string;
  badge: string;
  description: string;
  detailImage: string;
  x: number;
  y: number;
}

export const INTERIOR_HOTSPOTS: InteriorHotspot[] = [
  {
    id: 'painel-7',
    title: 'Painel multifuncional de 7"',
    badge: 'Display TFT de alta resolução',
    description:
      'Exibe informações do computador de bordo, áudio, telefone, status do veículo e assistências de condução com leitura clara em qualquer luminosidade.',
    detailImage: entretenimentoPainel,
    x: 66,
    y: 28,
  },
  {
    id: 'nissan-connect',
    title: 'Central Nissan Connect de 8"',
    badge: 'Apple CarPlay & Android Auto',
    description:
      'Tela sensível ao toque de 8 polegadas com integração para Apple CarPlay e Android Auto, comandos de mídia e exibição da Visão 360° Inteligente.',
    detailImage: cameraTraseira,
    x: 86,
    y: 34,
  },
  {
    id: 'volante',
    title: 'Volante multifuncional',
    badge: 'Três raios · Acabamento premium',
    description:
      'Regulagem de altura e profundidade com comandos integrados para computador de bordo, áudio, telefone e piloto automático.',
    detailImage: entretenimentoPainel,
    x: 61,
    y: 39,
  },
  {
    id: 'ikey-push-start',
    title: 'I-Key e botão Push Start',
    badge: 'Chave presencial & ignição eletrônica',
    description:
      'Permite destravar portas com a chave no bolso (além de abertura/fechamento de vidros no controle) e dar partida com um toque no botão Push Start.',
    detailImage: confortoArCondicionado,
    x: 77,
    y: 71,
  },
  {
    id: 'bancos-zero-gravity',
    title: 'Bancos dianteiros Zero Gravity®',
    badge: 'Acabamento premium & ergonomia',
    description:
      'Inspirados em estudos ergonômicos para reduzir pontos de pressão e fadiga em trajetos longos, com revestimento de acabamento premium e ajuste de altura para o motorista.',
    detailImage: confortoAssentosZeroGravidade,
    x: 52,
    y: 84,
  },
  {
    id: 'console-ar',
    title: 'Ar-condicionado automático digital',
    badge: 'Console central com apoio de braço',
    description:
      'Controle automático digital de temperatura e console central equipado com apoio de braço integrado, 2 portas USB tipo A e tomada 12V.',
    detailImage: confortoApoioDeBraco,
    x: 86,
    y: 52,
  },
];

export interface SafetyFeature {
  id: string;
  title: string;
  code: string;
  description: string;
}

/**
 * Equipamentos de segurança exclusivos de série da versão 1.6 Exclusive CVT 2024.
 * Nota: Não inclui itens exclusivos do Pack Tech (ex.: alerta de mudança de faixa ou farol alto automático).
 */
export const SAFETY_FEATURES_EXCLUSIVE: SafetyFeature[] = [
  {
    id: 'visao-360',
    title: 'Visão 360° Inteligente + MOD',
    code: '4 Câmeras',
    description:
      'Quatro câmeras ao redor do veículo compõem uma visão aérea na tela de 8", com Detector de Objetos em Movimento (MOD) para manobras mais seguras.',
  },
  {
    id: 'seis-airbags',
    title: 'Seis Airbags de série',
    code: 'Proteção 360°',
    description:
      'Airbags duplos frontais, airbags laterais dianteiros e airbags de cortina distribuídos para proteção dos ocupantes.',
  },
  {
    id: 'vdc-hsa',
    title: 'VDC + Partida em Rampa (HSA)',
    code: 'Tração e Estabilidade',
    description:
      'Controle de Tração e Estabilidade (Vehicle Dynamic Control) combinado ao assistente de partida em rampas e freios ABS com EBD e BA.',
  },
  {
    id: 'controle-chassi',
    title: 'Controle Inteligente de Chassi',
    code: 'Dinâmica Ativa',
    description:
      'Reúne Controle Inteligente de Freio Motor (Active Engine Brake), Controle Inteligente em Curvas (Active Trace Control) e Estabilizador de Carroceria (Active Ride Control).',
  },
  {
    id: 'manobras-tpms',
    title: 'Auxílio às manobras e TPMS',
    code: 'Monitoramento',
    description:
      'Sensor de estacionamento traseiro, fixadores ISOFIX para cadeirinhas infantis e Sistema de Monitoramento da Pressão dos Pneus (TPMS).',
  },
];

export interface NumericHighlight {
  id: string;
  value: number;
  decimals?: number;
  unit: string;
  label: string;
  sublabel: string;
}

export const SPEC_HIGHLIGHTS: NumericHighlight[] = [
  {
    id: 'potencia',
    value: 113,
    unit: 'cv',
    label: 'Potência máxima (Etanol)',
    sublabel: '110 cv na gasolina @ 5.600 rpm',
  },
  {
    id: 'torque',
    value: 15.3,
    decimals: 1,
    unit: 'kgfm',
    label: 'Torque máximo (Etanol)',
    sublabel: '15,2 kgfm na gasolina @ 4.000 rpm',
  },
  {
    id: 'porta-malas',
    value: 432,
    unit: 'litros',
    label: 'Capacidade do porta-malas',
    sublabel: 'Banco traseiro bipartido 60/40',
  },
  {
    id: 'vao-livre',
    value: 200,
    unit: 'mm',
    label: 'Altura livre do solo',
    sublabel: 'Ângulo de ataque 18° · saída 28°',
  },
  {
    id: 'consumo-estrada',
    value: 13.9,
    decimals: 1,
    unit: 'km/l',
    label: 'Consumo estrada (Gasolina)',
    sublabel: '11,4 km/l cidade · Etanol: 7,8 / 9,6 km/l',
  },
  {
    id: 'peso',
    value: 1139,
    unit: 'kg',
    label: 'Peso em ordem de marcha',
    sublabel: 'Categoria SUV compacto · 5 lugares',
  },
];

export interface SpecGroup {
  category: string;
  rows: { label: string; value: string }[];
}

export const SPEC_GROUPS: SpecGroup[] = [
  {
    category: 'Motorização e Transmissão',
    rows: [
      { label: 'Motor', value: '1.6L 16V CVVTCS, 4 cilindros em linha, Flex' },
      { label: 'Cilindrada', value: '1.598 cm³ (taxa de compressão 10,7 ± 0,2 : 1)' },
      { label: 'Potência máxima', value: '113 cv (E) / 110 cv (G) @ 5.600 rpm' },
      { label: 'Torque máximo', value: '15,3 kgfm (E) / 15,2 kgfm (G) @ 4.000 rpm' },
      { label: 'Transmissão', value: 'Automática XTRONIC CVT® com função Sport' },
      { label: 'Tração e Injeção', value: 'Dianteira · Digital multiponto semi-sequencial' },
    ],
  },
  {
    category: 'Dimensões e Capacidades',
    rows: [
      { label: 'Comprimento × Largura', value: '4.310 mm × 1.760 mm' },
      { label: 'Altura × Entre-eixos', value: '1.610 mm × 2.620 mm' },
      { label: 'Porta-malas', value: '432 litros (com iluminação interna)' },
      { label: 'Tanque de combustível', value: '41 litros' },
      { label: 'Capacidade', value: '5 lugares · 5 portas · SUV compacto' },
      { label: 'Consumo referência (PBEV)', value: 'Gasolina: 11,4 / 13,9 km/l · Etanol: 7,8 / 9,6 km/l' },
    ],
  },
  {
    category: 'Chassi, Rodas e Direção',
    rows: [
      { label: 'Rodas e Pneus', value: 'Liga leve 17" · Pneus 205/55 R17' },
      { label: 'Direção', value: 'Elétrica com assistência variável' },
      { label: 'Suspensão dianteira', value: 'Independente tipo McPherson' },
      { label: 'Suspensão traseira', value: 'Eixo de torção' },
      { label: 'Freios', value: 'Discos ventilados dianteiros, tambores traseiros, ABS + EBD + BA' },
      { label: 'Revisões e Garantia', value: '10.000 km ou 12 meses · 3 anos sem limite de km' },
    ],
  },
];

export type GalleryCategory = 'Todas' | 'Exterior' | 'Detalhes' | 'Interior' | 'Porta-malas';

export interface GalleryItem {
  id: string;
  title: string;
  category: Exclude<GalleryCategory, 'Todas'>;
  angleLabel: string;
  description: string;
  image: string;
  objectPosition?: string;
}

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-perspectiva',
    title: 'Vista em perspectiva frontal',
    category: 'Exterior',
    angleLabel: 'Perspectiva 3/4 · Branco Diamond c/ Teto Preto',
    description: 'Proporções externas e presença urbana da linha Nissan Kicks 2024 Exclusive.',
    image: ambientadaFrontal,
  },
  {
    id: 'gal-vermelho-studio',
    title: 'Vista frontal estúdio — Vermelho Malbec',
    category: 'Exterior',
    angleLabel: 'Estúdio 3/4 · Vermelho Malbec c/ Teto Preto',
    description: 'Versão Exclusive 1.6 CVT em configuração bi-tom com teto preto e rack prata.',
    image: exclusiveVermelhoTetoPreto,
  },
  {
    id: 'gal-traseira-ambientada',
    title: 'Vista traseira e perfil lateral',
    category: 'Exterior',
    angleLabel: 'Perspectiva Traseira · 3/4 Lateral',
    description: 'Linha de cintura elevada, teto flutuante e rodas de liga leve de 17 polegadas.',
    image: ambientadaTraseira,
  },
  {
    id: 'gal-grade-farois',
    title: 'Vista frontal — Grade V-Motion e Faróis',
    category: 'Detalhes',
    angleLabel: 'Frontal · Full LED & V-Motion',
    description: 'Detalhamento da grade dianteira em V, emblema Nissan, faróis Full LED e neblina em LED.',
    image: detalheGrade,
  },
  {
    id: 'gal-lanternas',
    title: 'Vista traseira — Lanternas em LED',
    category: 'Detalhes',
    angleLabel: 'Traseira · Assinatura em LED',
    description: 'Lanternas traseiras em LED interligadas, para-choque esculpido e sensores traseiros.',
    image: detalheTraseira,
  },
  {
    id: 'gal-rodas',
    title: 'Rodas de liga leve 17" e pneus 205/55 R17',
    category: 'Detalhes',
    angleLabel: 'Detalhe de Roda · Liga Leve 17"',
    description: 'Conjunto diamantado de 17 polegadas com monitoramento de pressão dos pneus (TPMS).',
    image: detalheGrade,
    objectPosition: '15% 82%',
  },
  {
    id: 'gal-interior-completo',
    title: 'Cabine Exclusive com acabamento premium',
    category: 'Interior',
    angleLabel: 'Interior · Posto do Motorista',
    description: 'Visão ampla da cabine com volante multifuncional, painel 7", Nissan Connect 8" e bancos em acabamento premium.',
    image: exclusiveAcabamentoPremium,
  },
  {
    id: 'gal-painel',
    title: 'Painel 7" e Multimídia Nissan Connect 8"',
    category: 'Interior',
    angleLabel: 'Painel & Conectividade',
    description: 'Painel de instrumentos digital de 7" integrado à central Nissan Connect com Apple CarPlay e Android Auto.',
    image: entretenimentoPainel,
  },
  {
    id: 'gal-bancos',
    title: 'Bancos dianteiros Zero Gravity®',
    category: 'Interior',
    angleLabel: 'Bancos · Tecnologia Zero Gravity',
    description: 'Ergonomia desenhada para longas viagens com revestimento premium e costuras contrastantes.',
    image: confortoAssentosZeroGravidade,
  },
  {
    id: 'gal-bose',
    title: 'Sistema de som BOSE® Personal Plus',
    category: 'Interior',
    angleLabel: 'Áudio · Encosto de Cabeça BOSE',
    description: 'Alto-falantes BOSE Personal Space integrados diretamente ao encosto de cabeça do motorista.',
    image: bancoBosePersonalSound,
  },
  {
    id: 'gal-visao-360',
    title: 'Visão 360° Inteligente com MOD',
    category: 'Detalhes',
    angleLabel: 'Segurança · Tela Nissan Connect',
    description: 'Exibição simultânea das câmeras perimetrais com detector de objetos em movimento.',
    image: cameraTraseira,
  },
  {
    id: 'gal-porta-malas',
    title: 'Porta-malas de 432 litros',
    category: 'Porta-malas',
    angleLabel: 'Capacidade · 432 Litros',
    description: 'Amplo compartimento com iluminação interna e banco traseiro rebatível bipartido 60/40.',
    image: portaMala,
  },
];
