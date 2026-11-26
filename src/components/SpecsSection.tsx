import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SPEC_GROUPS, SPEC_HIGHLIGHTS } from '@/src/data/kicksData';

gsap.registerPlugin(ScrollTrigger);

interface SpecsSectionProps {
  reducedMotion: boolean;
}

export function SpecsSection({ reducedMotion }: SpecsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>(() =>
    Object.fromEntries(SPEC_HIGHLIGHTS.map((h) => [h.id, h.value]))
  );
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (reducedMotion || hasAnimatedRef.current) return;

    const el = sectionRef.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 78%',
        once: true,
        onEnter: () => {
          hasAnimatedRef.current = true;
          const state: Record<string, number> = {};
          SPEC_HIGHLIGHTS.forEach((h) => {
            state[h.id] = 0;
          });

          const targets = Object.fromEntries(
            SPEC_HIGHLIGHTS.map((h) => [h.id, h.value])
          );

          gsap.to(state, {
            ...targets,
            duration: 1.15,
            ease: 'power2.out',
            onUpdate: () => {
              setAnimatedValues({ ...state });
            },
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const formatHighlightValue = (id: string, decimals = 0) => {
    const val = animatedValues[id] ?? 0;
    return val.toLocaleString('pt-BR', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });
  };

  return (
    <section
      id="ficha-tecnica"
      ref={sectionRef}
      className="border-t border-white/10 bg-[#080808] py-20 text-white lg:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Header */}
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C3002F]">
              Ficha Técnica Oficial · Linha 2024
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
              Números do Nissan Kicks Exclusive 1.6 CVT.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs text-[#A7ADB4]">
            <span>Motor 1.6 Flex</span>
            <span aria-hidden="true">·</span>
            <span>Câmbio Xtronic CVT</span>
            <span aria-hidden="true">·</span>
            <span>Tração dianteira</span>
            <span aria-hidden="true">·</span>
            <span>SUV compacto (5 lugares)</span>
          </div>
        </div>

        {/* Animated Tabular KPI Highlights */}
        <div className="mt-10 grid grid-cols-1 gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
          {SPEC_HIGHLIGHTS.map((metric) => (
            <div key={metric.id} className="bg-[#080808] p-7 lg:p-9">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-4xl font-semibold tracking-tight text-white tabular-nums sm:text-5xl">
                  {formatHighlightValue(metric.id, metric.decimals ?? 0)}
                </span>
                <span className="font-mono text-sm font-medium text-[#C3002F]">
                  {metric.unit}
                </span>
              </div>
              <p className="mt-3 font-display text-base font-semibold text-white">
                {metric.label}
              </p>
              <p className="mt-1 text-xs text-[#A7ADB4] tabular-nums">
                {metric.sublabel}
              </p>
            </div>
          ))}
        </div>

        {/* Detailed Official Specification Tables */}
        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {SPEC_GROUPS.map((group) => (
            <div
              key={group.category}
              className="border border-white/10 bg-[#181818] p-6 lg:p-7"
            >
              <h3 className="border-b border-white/10 pb-4 font-display text-lg font-bold text-white">
                {group.category}
              </h3>

              <dl className="mt-4 divide-y divide-white/10">
                {group.rows.map((row) => (
                  <div key={row.label} className="py-3.5">
                    <dt className="text-xs font-medium text-[#A7ADB4]">
                      {row.label}
                    </dt>
                    <dd className="mt-1 text-sm font-medium text-white tabular-nums">
                      {row.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
