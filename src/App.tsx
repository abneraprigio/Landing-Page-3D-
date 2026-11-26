import { lazy, Suspense, useCallback, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TopBar } from '@/src/components/TopBar';
import { HeroSection } from '@/src/components/HeroSection';
import { Showroom360Section } from '@/src/components/Showroom360Section';
import { ScrollytellingSection } from '@/src/components/ScrollytellingSection';
import { useMotionPreference } from '@/src/hooks/useMotionPreference';

const HotspotsExplorer = lazy(() =>
  import('@/src/components/HotspotsExplorer').then((m) => ({
    default: m.HotspotsExplorer,
  }))
);
const InteriorSection = lazy(() =>
  import('@/src/components/InteriorSection').then((m) => ({
    default: m.InteriorSection,
  }))
);
const BoseAudioSection = lazy(() =>
  import('@/src/components/BoseAudioSection').then((m) => ({
    default: m.BoseAudioSection,
  }))
);
const SafetySection = lazy(() =>
  import('@/src/components/SafetySection').then((m) => ({
    default: m.SafetySection,
  }))
);
const SpecsSection = lazy(() =>
  import('@/src/components/SpecsSection').then((m) => ({
    default: m.SpecsSection,
  }))
);
const GallerySection = lazy(() =>
  import('@/src/components/GallerySection').then((m) => ({
    default: m.GallerySection,
  }))
);
const ConversionSection = lazy(() =>
  import('@/src/components/ConversionSection').then((m) => ({
    default: m.ConversionSection,
  }))
);

gsap.registerPlugin(ScrollTrigger);

function SectionFallback() {
  return (
    <div className="flex min-h-[320px] items-center justify-center border-t border-white/10 bg-[#080808] text-xs tracking-widest uppercase text-[#A7ADB4]">
      Carregando seção...
    </div>
  );
}

export default function App() {
  const { reducedMotion, manualLightweight, toggleLightweightMode } =
    useMotionPreference();

  const scrollToSection = useCallback(
    (sectionId: string) => {
      const target = document.getElementById(sectionId);
      if (!target) return;
      target.scrollIntoView({
        behavior: reducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    },
    [reducedMotion]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 450);
    return () => clearTimeout(timer);
  }, [reducedMotion]);

  return (
    <div className="min-h-screen bg-[#080808] text-white">
      <a
        href="#conteudo-principal"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:bg-[#C3002F] focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-white"
      >
        Ir para o conteúdo principal
      </a>

      <TopBar onNavigate={scrollToSection} />

      <main id="conteudo-principal">
        <HeroSection
          reducedMotion={reducedMotion}
          onExploreClick={() => scrollToSection('showroom-360')}
          onProposalClick={() => scrollToSection('conversao')}
        />

        <Showroom360Section reducedMotion={reducedMotion} />

        <ScrollytellingSection reducedMotion={reducedMotion} />

        <Suspense fallback={<SectionFallback />}>
          <HotspotsExplorer reducedMotion={reducedMotion} />
          <InteriorSection />
          <BoseAudioSection reducedMotion={reducedMotion} />
          <SafetySection />
          <SpecsSection reducedMotion={reducedMotion} />
          <GallerySection />
          <ConversionSection
            reducedMotion={reducedMotion}
            manualLightweight={manualLightweight}
            onToggleLightweight={toggleLightweightMode}
          />
        </Suspense>
      </main>
    </div>
  );
}
