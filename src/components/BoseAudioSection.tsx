import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { KICKS_ASSETS } from '@/src/data/kicksData';

interface BoseAudioSectionProps {
  reducedMotion: boolean;
}

export function BoseAudioSection({ reducedMotion }: BoseAudioSectionProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [audioActive, setAudioActive] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  // Subtle acoustic wave propagation over the driver headrest speaker
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let time = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      ctx.clearRect(0, 0, width, height);

      // Origin centered on the BOSE Personal Space headrest speaker (~37% X, ~53% Y)
      const cx = width * 0.37;
      const cy = height * 0.53;
      const ringCount = 5;
      const maxRadius = Math.max(width, height) * 0.45;
      const speed = audioActive ? 0.014 : 0.006;

      if (!reducedMotion) {
        time += speed;
      }

      for (let i = 0; i < ringCount; i++) {
        const progress = ((time + i / ringCount) % 1);
        const radius = 16 + progress * maxRadius;
        const alpha = (1 - progress) * (audioActive ? 0.42 : 0.2);

        ctx.beginPath();
        ctx.arc(cx, cy, radius, -Math.PI * 0.72, Math.PI * 0.72);
        ctx.strokeStyle =
          i % 2 === 0
            ? `rgba(195, 0, 47, ${alpha})`
            : `rgba(255, 255, 255, ${alpha * 0.75})`;
        ctx.lineWidth = audioActive ? 1.8 : 1.1;
        ctx.stroke();
      }

      if (!reducedMotion) {
        animId = requestAnimationFrame(draw);
      }
    };

    draw();
    return () => {
      window.removeEventListener('resize', resize);
      if (animId) cancelAnimationFrame(animId);
    };
  }, [reducedMotion, audioActive]);

  // Clean Web Audio API spatial acoustic demonstration
  const toggleSpatialDemo = () => {
    if (audioActive) {
      if (gainRef.current && audioCtxRef.current) {
        gainRef.current.gain.exponentialRampToValueAtTime(
          0.0001,
          audioCtxRef.current.currentTime + 0.35
        );
        setTimeout(() => {
          audioCtxRef.current?.close();
          audioCtxRef.current = null;
          gainRef.current = null;
        }, 380);
      }
      setAudioActive(false);
      return;
    }

    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      const ctx = new AudioContextClass();
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.001, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.07, ctx.currentTime + 0.6);
      masterGain.connect(ctx.destination);

      const panner = ctx.createStereoPanner();
      panner.connect(masterGain);

      const freqs = [220, 277.18, 329.63, 440];
      freqs.forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const voiceGain = ctx.createGain();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(f, ctx.currentTime);
        voiceGain.gain.setValueAtTime(0.22 / freqs.length, ctx.currentTime);
        osc.connect(voiceGain);
        voiceGain.connect(panner);
        osc.start();
      });

      // Gentle left-right headrest PersonalSpace sweep
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.setValueAtTime(0.25, ctx.currentTime);
      lfoGain.gain.setValueAtTime(0.65, ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(panner.pan);
      lfo.start();

      audioCtxRef.current = ctx;
      gainRef.current = masterGain;
      setAudioActive(true);
    } catch {
      setAudioActive(false);
    }
  };

  useEffect(() => {
    return () => {
      audioCtxRef.current?.close();
    };
  }, []);

  return (
    <section
      id="audio-bose"
      className="relative overflow-hidden border-t border-white/10 bg-[#080808] py-20 text-white lg:py-28"
    >
      {/* Subtle acoustic studio spotlight */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 70% 50%, rgba(195,0,47,0.14) 0%, rgba(24,24,24,0.35) 38%, rgba(8,8,8,1) 74%)',
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-12 px-6 lg:grid-cols-12 lg:px-12">
        {/* Copy Column */}
        <div className="lg:col-span-5">
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#C3002F]">
            BOSE® Personal Plus
          </p>

          <h2 className="mt-4 font-display text-3xl font-bold leading-[1.08] tracking-tight text-white text-balance sm:text-4xl lg:text-[2.75rem]">
            Uma experiência sonora que acompanha você.
          </h2>

          <p className="mt-5 text-base leading-relaxed text-[#A7ADB4] sm:text-lg">
            Sistema premium BOSE Personal Plus, com alto-falantes integrados ao
            encosto de cabeça do motorista.
          </p>

          {/* Verified System Architecture Breakdown */}
          <div className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
            <div>
              <p className="font-mono text-2xl font-semibold text-white tabular-nums">
                8
              </p>
              <p className="mt-1 text-xs text-[#A7ADB4]">
                Alto-falantes distribuídos pela cabine
              </p>
            </div>
            <div>
              <p className="font-mono text-2xl font-semibold text-white tabular-nums">
                2
              </p>
              <p className="mt-1 text-xs text-[#A7ADB4]">
                Canais BOSE® Personal Space™ no encosto + 2 tweeters
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={toggleSpatialDemo}
              className={`inline-flex items-center gap-2.5 border px-5 py-3 text-xs font-semibold tracking-[0.06em] uppercase transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C3002F] ${
                audioActive
                  ? 'border-[#C3002F] bg-[#C3002F] text-white'
                  : 'border-white/25 bg-[#181818] text-white hover:border-white'
              }`}
            >
              {audioActive ? (
                <>
                  <VolumeX className="h-4 w-4" aria-hidden="true" />
                  Parar demonstração sonora
                </>
              ) : (
                <>
                  <Volume2 className="h-4 w-4" aria-hidden="true" />
                  Simular campo sonoro
                </>
              )}
            </button>
            <span className="text-xs text-[#A7ADB4]">
              Síntese demonstrativa Web Audio
            </span>
          </div>
        </div>

        {/* Real Headrest Photography + Animated Sound Wave Canvas */}
        <div className="lg:col-span-7">
          <div className="relative overflow-hidden border border-white/10 bg-[#181818]">
            <div className="relative aspect-[1200/937] w-full">
              <img
                src={KICKS_ASSETS.bancoBosePersonalSound}
                alt="Encosto de cabeça do motorista do Nissan Kicks 2024 Exclusive com alto-falantes integrados BOSE Personal Plus"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover"
              />
              <canvas
                ref={canvasRef}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#080808]/60 via-transparent to-transparent"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
