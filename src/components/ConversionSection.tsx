import { useState, FormEvent } from 'react';
import { Calendar, CheckCircle2, MessageSquare, FileText, Phone } from 'lucide-react';
import { vehicleConfig } from '@/src/config/vehicleConfig';
import { KICKS_ASSETS } from '@/src/data/kicksData';

type LeadIntent = 'proposta' | 'test-drive' | 'consultor';

interface ConversionSectionProps {
  reducedMotion: boolean;
  manualLightweight: boolean;
  onToggleLightweight: () => void;
}

export function ConversionSection({
  reducedMotion,
  manualLightweight,
  onToggleLightweight,
}: ConversionSectionProps) {
  const [intent, setIntent] = useState<LeadIntent>('proposta');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [unit, setUnit] = useState(vehicleConfig.showroomUnits[0]);
  const [preferredDate, setPreferredDate] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const trimmedName = name.trim();
    const trimmedEmail = email.trim();
    const digitsPhone = phone.replace(/\D/g, '');

    if (trimmedName.length < 2) {
      setErrorMsg('Informe seu nome completo para continuar.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setErrorMsg('Informe um e-mail válido.');
      return;
    }

    if (digitsPhone.length < 10) {
      setErrorMsg('Informe um telefone ou WhatsApp com DDD.');
      return;
    }

    setSubmitted(true);
  };

  const intentLabelMap: Record<LeadIntent, string> = {
    proposta: 'Solicitação de proposta comercial',
    'test-drive': 'Agendamento de test drive',
    consultor: 'Contato com consultor',
  };

  return (
    <>
      <section
        id="conversao"
        className="relative overflow-hidden border-t border-white/10 bg-[#080808] py-20 text-white lg:py-28"
      >
        {/* Cinematic Real Car Backdrop with Measured Contrast Scrim */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <img
            src={KICKS_ASSETS.ambientadaFrontal}
            alt=""
            loading="lazy"
            referrerPolicy="no-referrer"
            className="h-full w-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-[#080808]/92 to-[#080808]/80" />
        </div>

        <div className="relative z-10 mx-auto grid max-w-[1440px] grid-cols-1 gap-12 px-6 lg:grid-cols-12 lg:px-12">
          {/* Left Commercial Summary & CTAs */}
          <div className="flex flex-col justify-between lg:col-span-6">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C3002F]">
                Showroom Digital · {vehicleConfig.modelName}{' '}
                {vehicleConfig.trimName} {vehicleConfig.modelYear}
              </p>

              <h2 className="mt-4 font-display text-3xl font-bold leading-[1.06] tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
                Seu próximo destino começa aqui.
              </h2>

              <p className="mt-5 max-w-lg text-base leading-relaxed text-[#A7ADB4]">
                Escolha como prefere avançar no atendimento: solicite uma
                proposta personalizada, agende um test drive ou fale
                diretamente com um consultor.
              </p>

              {/* 3 Required Conversion Intent Buttons */}
              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIntent('proposta');
                    setSubmitted(false);
                  }}
                  className={`inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.06em] uppercase transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    intent === 'proposta'
                      ? 'bg-[#C3002F] text-white'
                      : 'border border-white/25 bg-[#181818]/90 text-white hover:border-white'
                  }`}
                >
                  <FileText className="h-4 w-4" aria-hidden="true" />
                  Solicitar proposta
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIntent('test-drive');
                    setSubmitted(false);
                  }}
                  className={`inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.06em] uppercase transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    intent === 'test-drive'
                      ? 'bg-[#C3002F] text-white'
                      : 'border border-white/25 bg-[#181818]/90 text-white hover:border-white'
                  }`}
                >
                  <Calendar className="h-4 w-4" aria-hidden="true" />
                  Agendar test drive
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIntent('consultor');
                    setSubmitted(false);
                  }}
                  className={`inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.06em] uppercase transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    intent === 'consultor'
                      ? 'bg-[#C3002F] text-white'
                      : 'border border-white/25 bg-[#181818]/90 text-white hover:border-white'
                  }`}
                >
                  <MessageSquare className="h-4 w-4" aria-hidden="true" />
                  Falar com um consultor
                </button>
              </div>
            </div>

            {/* Editable Commercial Reference Block */}
            <div className="mt-10 border border-white/15 bg-[#181818]/90 p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-white/10 pb-4">
                <div>
                  <p className="text-xs text-[#A7ADB4]">
                    Preço público sugerido de referência
                  </p>
                  <p className="mt-1 font-mono text-2xl font-semibold text-white tabular-nums sm:text-3xl">
                    {vehicleConfig.referencePriceFormatted}
                  </p>
                </div>
                <div className="text-left sm:text-right text-xs text-[#A7ADB4] tabular-nums">
                  <p>{vehicleConfig.mileage} · {vehicleConfig.modelYear}</p>
                  <p className="mt-0.5">{vehicleConfig.warranty}</p>
                </div>
              </div>

              <p className="mt-4 text-xs leading-relaxed text-[#A7ADB4]">
                {vehicleConfig.referencePriceNote}
              </p>

              <ul className="mt-4 space-y-1.5 text-xs text-[#F5F5F5]/85">
                {vehicleConfig.commercialConditions.map((cond) => (
                  <li key={cond}>· {cond}</li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap items-center gap-4 border-t border-white/10 pt-4 text-xs">
                <a
                  href={vehicleConfig.contactPhoneHref}
                  className="inline-flex items-center gap-2 font-mono text-white hover:text-[#C3002F] transition-colors"
                >
                  <Phone className="h-3.5 w-3.5 text-[#C3002F]" aria-hidden="true" />
                  {vehicleConfig.contactPhoneDisplay}
                </a>
              </div>
            </div>
          </div>

          {/* Right Demonstration Lead Capture Form */}
          <div className="border border-white/15 bg-[#080808]/95 p-6 lg:col-span-6 lg:p-10">
            <div className="border-b border-white/10 pb-5">
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#C3002F]">
                Formulário de Interesse (Demonstração)
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold text-white">
                {intentLabelMap[intent]}
              </h3>
            </div>

            {submitted ? (
              <div className="py-10">
                <div className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 h-6 w-6 shrink-0 text-[#C3002F]"
                    aria-hidden="true"
                  />
                  <div>
                    <h4 className="font-display text-xl font-bold text-white">
                      Registro de demonstração concluído
                    </h4>
                    <p className="mt-2 text-sm leading-relaxed text-[#A7ADB4]">
                      Obrigado, <strong className="text-white">{name}</strong>.
                      Sua simulação de{' '}
                      <span className="text-white">
                        {intentLabelMap[intent].toLowerCase()}
                      </span>{' '}
                      para o Nissan Kicks 2024 Exclusive 1.6 CVT ({unit}) foi
                      validada localmente neste navegador.
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-[#A7ADB4]">
                      {vehicleConfig.demonstrationNotice}
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitted(false);
                        setName('');
                        setEmail('');
                        setPhone('');
                        setNotes('');
                      }}
                      className="mt-6 border border-white/25 px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.06em] text-white hover:border-[#C3002F] cursor-pointer"
                    >
                      Realizar nova simulação
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
                <div>
                  <label
                    htmlFor="lead-name"
                    className="block text-xs font-medium text-[#A7ADB4]"
                  >
                    Nome completo
                  </label>
                  <input
                    id="lead-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome completo"
                    className="mt-1.5 w-full border border-white/15 bg-[#181818] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#C3002F] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="lead-email"
                      className="block text-xs font-medium text-[#A7ADB4]"
                    >
                      E-mail
                    </label>
                    <input
                      id="lead-email"
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="voce@exemplo.com.br"
                      className="mt-1.5 w-full border border-white/15 bg-[#181818] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#C3002F] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lead-phone"
                      className="block text-xs font-medium text-[#A7ADB4]"
                    >
                      Telefone / WhatsApp
                    </label>
                    <input
                      id="lead-phone"
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(11) 99999-9999"
                      className="mt-1.5 w-full border border-white/15 bg-[#181818] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#C3002F] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="lead-unit"
                      className="block text-xs font-medium text-[#A7ADB4]"
                    >
                      Unidade de referência
                    </label>
                    <select
                      id="lead-unit"
                      value={unit}
                      onChange={(e) => setUnit(e.target.value)}
                      className="mt-1.5 w-full border border-white/15 bg-[#181818] px-4 py-3 text-sm text-white focus:border-[#C3002F] focus:outline-none"
                    >
                      {vehicleConfig.showroomUnits.map((u) => (
                        <option key={u} value={u}>
                          {u}
                        </option>
                      ))}
                    </select>
                  </div>

                  {intent === 'test-drive' && (
                    <div>
                      <label
                        htmlFor="lead-date"
                        className="block text-xs font-medium text-[#A7ADB4]"
                      >
                        Data pretendida
                      </label>
                      <input
                        id="lead-date"
                        type="date"
                        value={preferredDate}
                        onChange={(e) => setPreferredDate(e.target.value)}
                        className="mt-1.5 w-full border border-white/15 bg-[#181818] px-4 py-3 text-sm text-white focus:border-[#C3002F] focus:outline-none"
                      />
                    </div>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lead-notes"
                    className="block text-xs font-medium text-[#A7ADB4]"
                  >
                    Observações ou preferência de cor
                  </label>
                  <textarea
                    id="lead-notes"
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ex.: Interesse na configuração Vermelho Malbec com teto preto"
                    className="mt-1.5 w-full border border-white/15 bg-[#181818] px-4 py-3 text-sm text-white placeholder:text-white/30 focus:border-[#C3002F] focus:outline-none"
                  />
                </div>

                {errorMsg && (
                  <p role="alert" className="text-xs font-medium text-[#ff4d6d]">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  className="w-full bg-[#C3002F] px-6 py-4 text-xs font-semibold tracking-[0.1em] uppercase text-white transition-colors hover:bg-[#a60027] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  Enviar {intentLabelMap[intent].toLowerCase()}
                </button>

                <p className="text-[11px] leading-relaxed text-[#A7ADB4]">
                  {vehicleConfig.demonstrationNotice}
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Quiet Editorial Footer with Accessibility Toggle & Official Disclaimer */}
      <footer className="border-t border-white/10 bg-[#080808] py-10 text-xs text-[#A7ADB4]">
        <div className="mx-auto flex max-w-[1440px] flex-col justify-between gap-6 px-6 lg:flex-row lg:items-center lg:px-12">
          <div className="max-w-2xl space-y-1.5">
            <p className="font-display text-sm font-semibold text-white">
              Showroom Digital Demonstrativo · Nissan Kicks 2024 Exclusive 1.6 CVT
            </p>
            <p className="leading-relaxed">
              Este projeto é uma experiência digital demonstrativa independente e
              não constitui um site oficial da Nissan do Brasil. Especificações
              técnicas e fotografias baseadas na documentação pública da linha
              Kicks MY24.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={onToggleLightweight}
              aria-pressed={manualLightweight}
              className="border border-white/15 bg-[#181818] px-4 py-2 text-xs font-medium text-white transition-colors hover:border-[#C3002F] cursor-pointer"
            >
              {reducedMotion
                ? 'Modo movimento reduzido: Ativo'
                : 'Ativar modo leve (sem animações)'}
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
