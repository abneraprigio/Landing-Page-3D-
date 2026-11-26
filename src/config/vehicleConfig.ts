/**
 * Configuração comercial editável — Nissan Kicks 2024 Exclusive 1.6 CVT.
 * Edite preço de referência, quilometragem, telefone e condições neste arquivo.
 * Nenhum desconto promocional ou condição fictícia deve ser exibido sem confirmação real.
 */
export interface VehicleCommercialConfig {
  modelName: string;
  trimName: string;
  modelYear: string;
  referencePriceFormatted: string;
  referencePriceNote: string;
  mileage: string;
  transmission: string;
  warranty: string;
  contactPhoneDisplay: string;
  contactPhoneHref: string;
  consultantEmail: string;
  commercialConditions: string[];
  showroomUnits: string[];
  demonstrationNotice: string;
}

export const vehicleConfig: VehicleCommercialConfig = {
  modelName: 'Nissan Kicks',
  trimName: 'Exclusive 1.6 CVT',
  modelYear: '2024',
  referencePriceFormatted: 'R$ 153.990',
  referencePriceNote: 'Valor de referência de tabela para a versão 1.6 Exclusive CVT (consulte disponibilidade e frete na concessionária).',
  mileage: '0 km',
  transmission: 'Automática XTRONIC CVT® com função Sport',
  warranty: '3 anos sem limite de quilometragem',
  contactPhoneDisplay: '0800 011 1090 (Referência SAC)',
  contactPhoneHref: 'tel:08000111090',
  consultantEmail: 'atendimento.demonstracao@showroom-exemplo.com.br',
  commercialConditions: [
    'Revisões programadas a cada 10.000 km ou 12 meses',
    'Condições de financiamento, troca com seminovo e faturamento sujeitas à análise da rede autorizada',
    'Consulte disponibilidade de cores sólidas, metálicas e configuração bi-tom (teto preto)',
  ],
  showroomUnits: [
    'Unidade São Paulo — Jardins (Demonstração)',
    'Unidade Rio de Janeiro — Barra (Demonstração)',
    'Unidade Curitiba — Batel (Demonstração)',
    'Atendimento Digital — Consultoria Remota',
  ],
  demonstrationNotice:
    'Projeto demonstrativo independente para apresentação digital do veículo. Este formulário simula a captura de interesse apenas no navegador e não envia dados a concessionárias ou à Nissan do Brasil.',
};
