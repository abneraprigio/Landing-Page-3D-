import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface TopBarProps {
  onNavigate: (sectionId: string) => void;
}

const NAV_LINKS = [
  { id: 'showroom-360', label: 'Showroom 360°' },
  { id: 'narrativa', label: 'Narrativa' },
  { id: 'detalhes', label: 'Detalhes' },
  { id: 'seguranca', label: 'Segurança' },
  { id: 'ficha-tecnica', label: 'Ficha Técnica' },
];

export function TopBar({ onNavigate }: TopBarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-[#080808]/92 backdrop-blur-md border-b border-white/10'
          : 'bg-gradient-to-b from-[#080808]/85 to-transparent'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-8 px-6 lg:px-12">
        {/* Zone 1: Single-line wordmark */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('hero');
          }}
          className="font-display text-base font-bold tracking-[0.14em] text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C3002F]"
        >
          KICKS EXCLUSIVE
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav aria-label="Navegação principal" className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.id);
              }}
              className="group relative py-1 text-sm font-medium text-[#A7ADB4] transition-colors duration-200 hover:text-white whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C3002F]"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-[#C3002F] transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 Primary CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleNavClick('conversao')}
            className="hidden sm:inline-flex items-center justify-center bg-[#C3002F] px-5 py-2.5 text-xs font-semibold tracking-[0.06em] uppercase text-white transition-colors duration-200 hover:bg-[#a60027] whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            Solicitar proposta
          </button>

          <button
            type="button"
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-11 w-11 items-center justify-center text-white lg:hidden cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C3002F]"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer */}
      {mobileOpen && (
        <div className="border-t border-white/10 bg-[#080808]/98 px-6 py-6 lg:hidden">
          <nav aria-label="Navegação mobile" className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id);
                }}
                className="py-1.5 text-base font-medium text-[#F5F5F5] hover:text-[#C3002F] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => handleNavClick('conversao')}
              className="mt-2 w-full bg-[#C3002F] px-5 py-3 text-xs font-semibold tracking-[0.08em] uppercase text-white"
            >
              Solicitar proposta
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}
