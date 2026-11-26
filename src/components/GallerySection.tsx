import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X, ZoomIn, ZoomOut } from 'lucide-react';
import {
  GALLERY_ITEMS,
  GalleryCategory,
  GalleryItem,
} from '@/src/data/kicksData';

const CATEGORIES: GalleryCategory[] = [
  'Todas',
  'Exterior',
  'Detalhes',
  'Interior',
  'Porta-malas',
];

export function GallerySection() {
  const [category, setCategory] = useState<GalleryCategory>('Todas');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  const filteredItems =
    category === 'Todas'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === category);

  const currentIndex = lightboxItem
    ? filteredItems.findIndex((i) => i.id === lightboxItem.id)
    : -1;

  const goNext = () => {
    if (filteredItems.length === 0 || currentIndex === -1) return;
    setZoomed(false);
    setLightboxItem(filteredItems[(currentIndex + 1) % filteredItems.length]);
  };

  const goPrev = () => {
    if (filteredItems.length === 0 || currentIndex === -1) return;
    setZoomed(false);
    setLightboxItem(
      filteredItems[
        (currentIndex - 1 + filteredItems.length) % filteredItems.length
      ]
    );
  };

  useEffect(() => {
    if (!lightboxItem) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setLightboxItem(null);
        setZoomed(false);
      } else if (e.key === 'ArrowRight') {
        goNext();
      } else if (e.key === 'ArrowLeft') {
        goPrev();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartXRef.current;
    if (Math.abs(delta) > 48) {
      if (delta < 0) goNext();
      else goPrev();
    }
    touchStartXRef.current = null;
  };

  return (
    <section
      id="galeria"
      className="border-t border-white/10 bg-[#181818] py-20 text-white lg:py-28"
    >
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
        {/* Header & Category Filter */}
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C3002F]">
              Galeria Imersiva
            </p>
            <h2 className="mt-3 font-display text-3xl font-bold tracking-tight text-white text-balance sm:text-4xl lg:text-5xl">
              Todos os ângulos oficiais do Exclusive 2024.
            </h2>
            <p className="mt-3 text-sm text-[#A7ADB4]">
              Clique em qualquer fotografia para ampliar em tela cheia, navegar
              por gestos ou inspecionar detalhes com zoom.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filtrar galeria"
            className="flex flex-wrap gap-1.5"
          >
            {CATEGORIES.map((cat) => {
              const active = cat === category;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 text-xs font-semibold tracking-[0.06em] uppercase transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#C3002F] text-white'
                      : 'border border-white/15 bg-[#080808] text-[#A7ADB4] hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Multi-Angle Photo Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setZoomed(false);
                setLightboxItem(item);
              }}
              className="group flex flex-col border border-white/10 bg-[#080808] text-left transition-colors hover:border-[#C3002F] cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C3002F]"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#121214]">
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  style={
                    item.objectPosition
                      ? {
                          objectPosition: item.objectPosition,
                          transform: 'scale(1.45)',
                          transformOrigin: item.objectPosition,
                        }
                      : undefined
                  }
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center bg-[#080808]/80 text-white opacity-0 transition-opacity group-hover:opacity-100">
                  <Maximize2 className="h-4 w-4" aria-hidden="true" />
                </div>
              </div>

              <div className="flex flex-1 flex-col justify-between p-5">
                <div>
                  <div className="flex items-center gap-2 text-xs text-[#A7ADB4]">
                    <span className="text-[#C3002F]">{item.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="truncate">{item.angleLabel}</span>
                  </div>
                  <h3 className="mt-1.5 font-display text-lg font-bold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-[#A7ADB4]">
                    {item.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox with Zoom & Swipe Navigation */}
      {lightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.title}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="fixed inset-0 z-50 flex flex-col justify-between bg-[#080808]/96 p-4 backdrop-blur-md sm:p-8"
        >
          {/* Lightbox Header */}
          <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-medium text-[#C3002F]">
                {lightboxItem.angleLabel}
              </p>
              <h3 className="truncate font-display text-lg font-bold text-white sm:text-xl">
                {lightboxItem.title}
              </h3>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setZoomed((z) => !z)}
                aria-label={zoomed ? 'Reduzir zoom' : 'Ampliar fotografia'}
                className="inline-flex h-10 items-center gap-2 border border-white/20 bg-[#181818] px-3.5 text-xs font-semibold text-white hover:border-[#C3002F] cursor-pointer"
              >
                {zoomed ? (
                  <>
                    <ZoomOut className="h-4 w-4" aria-hidden="true" />
                    <span className="hidden sm:inline">Reduzir</span>
                  </>
                ) : (
                  <>
                    <ZoomIn className="h-4 w-4" aria-hidden="true" />
                    <span className="hidden sm:inline">Ampliar</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setLightboxItem(null);
                  setZoomed(false);
                }}
                aria-label="Fechar galeria em tela cheia"
                className="inline-flex h-10 w-10 items-center justify-center border border-white/20 bg-[#181818] text-white hover:border-[#C3002F] cursor-pointer"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Lightbox Main Image */}
          <div className="relative mx-auto my-4 flex w-full max-w-[1280px] flex-1 items-center justify-center overflow-hidden">
            <button
              type="button"
              onClick={goPrev}
              aria-label="Fotografia anterior"
              className="absolute left-2 z-20 flex h-11 w-11 items-center justify-center border border-white/20 bg-[#080808]/80 text-white hover:border-[#C3002F] cursor-pointer"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>

            <div
              onClick={() => setZoomed((z) => !z)}
              className="flex h-full max-h-[72vh] w-full items-center justify-center overflow-auto cursor-zoom-in"
            >
              <img
                src={lightboxItem.image}
                alt={lightboxItem.title}
                referrerPolicy="no-referrer"
                className={`max-h-[70vh] w-auto object-contain transition-transform duration-300 ${
                  zoomed ? 'scale-150 cursor-zoom-out' : 'scale-100'
                }`}
              />
            </div>

            <button
              type="button"
              onClick={goNext}
              aria-label="Próxima fotografia"
              className="absolute right-2 z-20 flex h-11 w-11 items-center justify-center border border-white/20 bg-[#080808]/80 text-white hover:border-[#C3002F] cursor-pointer"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Lightbox Footer Counter */}
          <div className="mx-auto flex w-full max-w-[1440px] items-center justify-between text-xs text-[#A7ADB4]">
            <p className="max-w-2xl truncate">{lightboxItem.description}</p>
            <span className="font-mono tabular-nums text-white shrink-0">
              {currentIndex + 1} / {filteredItems.length}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
