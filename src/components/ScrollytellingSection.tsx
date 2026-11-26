import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SCROLLYTELLING_CHAPTERS } from '@/src/data/kicksData';

gsap.registerPlugin(ScrollTrigger);

interface ScrollytellingSectionProps {
  reducedMotion: boolean;
}

export function ScrollytellingSection({ reducedMotion }: ScrollytellingSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (reducedMotion) return;

    const triggerEl = triggerRef.current;
    if (!triggerEl) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: triggerEl,
        start: 'top top',
        end: '+=280%',
        pin: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const total = SCROLLYTELLING_CHAPTERS.length;
          const idx = Math.min(total - 1, Math.floor(self.progress * total));
          setActiveIndex(idx);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const activeChapter = SCROLLYTELLING_CHAPTERS[activeIndex];

  // Accessible fallback for reduced motion or low-power devices
  if (reducedMotion) {
    return (
      <section
        id="narrativa"
        className="border-t border-white/10 bg-[#080808] py-20 lg:py-28"
      >
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="mb-12 max-w-2xl">
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#C3002F]">
              Narrativa Visual
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl">
              Da postura urbana ao refinamento de cabine.
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
            {SCROLLYTELLING_CHAPTERS.map((chapter) => (
              <article
                key={chapter.id}
                className="border border-white/10 bg-[#181818]"
              >
                <div className="aspect-video w-full overflow-hidden bg-[#080808]">
                  <img
                    src={chapter.image}
                    alt={chapter.imageAlt}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-6 lg:p-8">
                  <div className="flex items-center gap-2 text-xs font-medium text-[#A7ADB4]">
                    <span className="font-mono text-[#C3002F]">{chapter.index}</span>
                    <span aria-hidden="true">·</span>
                    <span>{chapter.kicker}</span>
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-bold text-white">
                    {chapter.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-[#A7ADB4]">
                    {chapter.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="narrativa"
      ref={containerRef}
      className="relative border-t border-white/10 bg-[#080808]"
    >
      <div
        ref={triggerRef}
        className="relative flex min-h-screen w-full items-center overflow-hidden bg-[#080808] py-16 lg:py-20"
      >
        {/* Dynamic Studio Ambient Lighting per Chapter */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-all duration-700"
          style={{ background: activeChapter.ambientGlow }}
        />

        <div className="relative z-10 mx-auto grid w-full max-w-[1440px] grid-cols-1 items-center gap-10 px-6 lg:grid-cols-12 lg:gap-12 lg:px-12">
          {/* Editorial Story Column */}
          <div className="lg:col-span-5">
            <div className="mb-8 flex items-center gap-3">
              {SCROLLYTELLING_CHAPTERS.map((ch, idx) => (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  aria-label={`Capítulo ${ch.index}: ${ch.title}`}
                  className={`h-1 flex-1 transition-all duration-300 cursor-pointer ${
                    idx === activeIndex
                      ? 'bg-[#C3002F]'
                      : idx < activeIndex
                      ? 'bg-white/50'
                      : 'bg-white/15 hover:bg-white/30'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2 text-xs font-medium tracking-[0.18em] uppercase text-[#A7ADB4]">
              <span className="font-mono text-[#C3002F] tabular-nums">
                {activeChapter.index}.
              </span>
              <span>{activeChapter.kicker}</span>
            </div>

            <h2 className="mt-4 font-display text-3xl font-bold leading-[1.08] tracking-tight text-white text-balance sm:text-4xl lg:text-[2.75rem]">
              {activeChapter.title}
            </h2>

            <p className="mt-5 max-w-md text-base leading-relaxed text-[#A7ADB4]">
              {activeChapter.description}
            </p>

            <div className="mt-8 border-t border-white/10 pt-5">
              <p className="font-mono text-xs tracking-wide text-white/90 tabular-nums">
                {activeChapter.specHighlight}
              </p>
            </div>

            {/* Chapter Quick Selector */}
            <div className="mt-8 flex flex-col gap-2">
              {SCROLLYTELLING_CHAPTERS.map((ch, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <button
                    key={ch.id}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`flex items-center justify-between border-b border-white/10 py-2.5 text-left text-sm transition-colors cursor-pointer ${
                      isActive
                        ? 'text-white font-semibold'
                        : 'text-[#A7ADB4] hover:text-white'
                    }`}
                  >
                    <span>
                      <span className="mr-3 font-mono text-xs text-[#C3002F] tabular-nums">
                        {ch.index}
                      </span>
                      {ch.kicker}
                    </span>
                    <span
                      className={`h-1.5 w-1.5 transition-opacity ${
                        isActive ? 'bg-[#C3002F] opacity-100' : 'opacity-0'
                      }`}
                    />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cinematic Photographic Stage (Strict aspect ratio preservation, zero deformation) */}
          <div className="lg:col-span-7">
            <div className="relative aspect-[16/9] w-full overflow-hidden border border-white/10 bg-[#181818]">
              {SCROLLYTELLING_CHAPTERS.map((ch, idx) => {
                const isActive = idx === activeIndex;
                return (
                  <div
                    key={ch.id}
                    className={`absolute inset-0 transition-all duration-700 ease-out ${
                      isActive
                        ? 'opacity-100 z-10'
                        : 'opacity-0 z-0 pointer-events-none'
                    }`}
                  >
                    <img
                      src={ch.image}
                      alt={ch.imageAlt}
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-1000 ease-out"
                      style={{
                        transform: isActive
                          ? `scale(${ch.focalTransform.scale}) translate3d(${ch.focalTransform.xPercent}%, ${ch.focalTransform.yPercent}%, 0)`
                          : 'scale(1.02) translate3d(0, 0, 0)',
                      }}
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080808]/65 via-transparent to-transparent"
                    />
                  </div>
                );
              })}

              <div className="absolute bottom-4 left-5 right-5 z-20 flex items-center justify-between text-xs text-white/85">
                <span className="font-medium">{activeChapter.title}</span>
                <span className="font-mono tabular-nums text-[#A7ADB4]">
                  {activeChapter.index} / 0{SCROLLYTELLING_CHAPTERS.length}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
