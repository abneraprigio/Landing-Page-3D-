import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { KICKS_ASSETS } from '@/src/data/kicksData';

interface HeroSectionProps {
  reducedMotion: boolean;
  onExploreClick: () => void;
  onProposalClick: () => void;
}

export function HeroSection({
  reducedMotion,
  onExploreClick,
  onProposalClick,
}: HeroSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const carStageRef = useRef<HTMLDivElement>(null);
  const backdropTextRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [imgError, setImgError] = useState(false);

  // Cinematic entrance animation
  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        backdropTextRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 1.0 }
      )
        .fromTo(
          carStageRef.current,
          { opacity: 0, x: 48, scale: 0.96 },
          { opacity: 1, x: 0, scale: 1, duration: 1.15 },
          '-=0.75'
        )
        .fromTo(
          contentRef.current?.querySelectorAll('[data-hero-reveal]') ?? [],
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.75, stagger: 0.1 },
          '-=0.85'
        );
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  // Subtle 2.5D cursor parallax without distorting the vehicle
  useEffect(() => {
    if (reducedMotion) return;
    const section = sectionRef.current;
    const carStage = carStageRef.current;
    const backdropText = backdropTextRef.current;
    if (!section || !carStage || !backdropText) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const rect = section.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;

      gsap.to(carStage, {
        x: nx * -18,
        y: ny * -10,
        rotateY: nx * 3.2,
        rotateX: ny * -2.2,
        duration: 0.75,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      gsap.to(backdropText, {
        x: nx * 24,
        y: ny * 12,
        duration: 0.9,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const handlePointerLeave = () => {
      gsap.to([carStage, backdropText], {
        x: 0,
        y: 0,
        rotateX: 0,
        rotateY: 0,
        duration: 0.8,
        ease: 'power3.out',
      });
    };

    section.addEventListener('pointermove', handlePointerMove);
    section.addEventListener('pointerleave', handlePointerLeave);
    return () => {
      section.removeEventListener('pointermove', handlePointerMove);
      section.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [reducedMotion]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex min-h-screen w-full flex-col justify-between overflow-hidden bg-[#080808] pt-20 pb-8 lg:pt-24 lg:pb-10"
    >
      {/* Dramatic dark automotive studio lighting */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 68% 54% at 68% 48%, rgba(255,255,255,0.09) 0%, rgba(195,0,47,0.08) 38%, rgba(8,8,8,1) 76%)',
        }}
      />

      {/* Subtle horizon floor hairline */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-[21%] h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-[1440px] flex-1 grid-cols-1 items-center gap-8 px-6 lg:grid-cols-12 lg:px-12">
        {/* Left Editorial Typography Zone */}
        <div ref={contentRef} className="order-2 lg:order-1 lg:col-span-5">
          <div
            data-hero-reveal
            className="mb-5 flex flex-wrap items-center gap-2 text-xs font-medium tracking-[0.2em] uppercase text-[#A7ADB4]"
          >
            <span className="text-white">EXCLUSIVE 2024</span>
            <span aria-hidden="true" className="text-[#C3002F]">·</span>
            <span>1.6 XTRONIC CVT</span>
          </div>

          <h1
            data-hero-reveal
            className="font-display text-4xl font-bold leading-[1.02] tracking-[-0.03em] text-white text-balance sm:text-5xl lg:text-[3.75rem]"
          >
            ATITUDE EM CADA DETALHE.
          </h1>

          <p
            data-hero-reveal
            className="mt-6 max-w-md text-base leading-relaxed text-[#A7ADB4] sm:text-lg"
          >
            Conheça o Nissan Kicks Exclusive 2024. Design, conforto e tecnologia
            para transformar sua experiência ao dirigir.
          </p>

          <div
            data-hero-reveal
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <button
              type="button"
              onClick={onExploreClick}
              className="inline-flex items-center gap-2.5 bg-[#C3002F] px-7 py-3.5 text-sm font-semibold tracking-[0.04em] text-white transition-colors duration-200 hover:bg-[#a60027] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              Conheça o Kicks
              <ArrowDown className="h-4 w-4" aria-hidden="true" />
            </button>

            <button
              type="button"
              onClick={onProposalClick}
              className="inline-flex items-center gap-2 border border-white/25 bg-transparent px-7 py-3.5 text-sm font-semibold tracking-[0.04em] text-white transition-colors duration-200 hover:border-white hover:bg-white/5 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C3002F]"
            >
              Solicitar proposta
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Right 2.5D Studio Vehicle Stage */}
        <div
          className="relative order-1 flex items-center justify-center lg:order-2 lg:col-span-7"
          style={{ perspective: '1200px' }}
        >
          {/* Giant architectural KICKS studio backdrop behind the vehicle */}
          <div
            ref={backdropTextRef}
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex select-none items-center justify-center overflow-hidden"
          >
            <span className="font-display text-[22vw] font-extrabold leading-none tracking-[-0.05em] text-[#1A1A1D] lg:text-[13.5rem] xl:text-[15.5rem]">
              KICKS
            </span>
          </div>

          {/* Real official 2024 Nissan Kicks Exclusive Vermelho Malbec studio cutout */}
          <div
            ref={carStageRef}
            className="relative z-10 w-full max-w-[780px] will-change-transform"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Subtle overhead studio softbox sheen */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-10 left-1/2 h-24 w-3/4 -translate-x-1/2 rounded-full bg-white/10 blur-3xl"
            />

            {!imgError ? (
              <img
                src={KICKS_ASSETS.exclusiveVermelhoTetoPreto}
                alt="Nissan Kicks 2024 Exclusive 1.6 CVT Vermelho Malbec com teto preto em perspectiva frontal de três quartos"
                referrerPolicy="no-referrer"
                onError={() => setImgError(true)}
                className="relative z-10 mx-auto h-auto w-full object-contain drop-shadow-[0_24px_38px_rgba(0,0,0,0.85)]"
              />
            ) : (
              <div className="flex aspect-[3/2] w-full items-center justify-center border border-white/10 bg-[#181818] p-8 text-center">
                <span className="font-display text-lg text-[#A7ADB4]">
                  Nissan Kicks 2024 Exclusive 1.6 CVT
                </span>
              </div>
            )}

            {/* Grounded studio contact shadow directly under the tires */}
            <div
              aria-hidden="true"
              className="pointer-events-none mx-auto -mt-10 h-10 w-[82%] rounded-full bg-black/90 blur-xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none mx-auto -mt-6 h-4 w-[68%] rounded-full bg-gradient-to-r from-transparent via-[#C3002F]/20 to-transparent blur-md"
            />
          </div>
        </div>
      </div>

      {/* Minimalist Bottom Scroll Indicator & Key Model Signature */}
      <div className="relative z-10 mx-auto flex w-full max-w-[1440px] items-end justify-between px-6 pt-4 lg:px-12">
        <div className="hidden sm:flex items-center gap-6 text-xs text-[#A7ADB4] tabular-nums">
          <span>Motor 1.6L 16V Flex</span>
          <span aria-hidden="true">·</span>
          <span>113 cv (E)</span>
          <span aria-hidden="true">·</span>
          <span>Som BOSE® Personal Plus</span>
        </div>

        <button
          type="button"
          onClick={onExploreClick}
          className="group ml-auto flex items-center gap-3 text-xs font-medium tracking-[0.18em] uppercase text-[#A7ADB4] transition-colors hover:text-white cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C3002F]"
        >
          <span>Role para explorar</span>
          <span className="flex h-7 w-7 items-center justify-center border border-white/20 transition-colors group-hover:border-[#C3002F] group-hover:text-white">
            <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
          </span>
        </button>
      </div>
    </section>
  );
}
