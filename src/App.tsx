import { useMemo } from 'react';

type FloatingHeart = {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  rotateEnd: number;
};

type FallingPetal = {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  spin: number;
  hue: string;
};

function Flower({ className, size, delay }: { className: string; size: number; delay: number }) {
  return (
    <div
      className={`absolute animate-sway select-none ${className}`}
      style={{ fontSize: `${size}px`, animationDelay: `${delay}s`, animationDuration: `${5 + delay}s` }}
      aria-hidden="true"
    >
      🌸
    </div>
  );
}

function App() {
  const hearts = useMemo<FloatingHeart[]>(() => {
    return Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 12 + Math.random() * 18,
      duration: 9 + Math.random() * 8,
      delay: Math.random() * 12,
      rotateEnd: -20 + Math.random() * 40,
    }));
  }, []);

  const petals = useMemo<FallingPetal[]>(() => {
    const hues = ['#ffb7c5', '#ffc8dd', '#ffd6e0', '#f8c8dc', '#f4a8bf'];
    return Array.from({ length: 16 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 10 + Math.random() * 14,
      duration: 10 + Math.random() * 10,
      delay: Math.random() * 14,
      drift: -80 + Math.random() * 160,
      spin: 180 + Math.random() * 360,
      hue: hues[i % hues.length],
    }));
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden">
      {/* ---------- Floating Hearts ---------- */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {hearts.map((h) => (
          <span
            key={h.id}
            className="animate-float-up absolute bottom-0 text-rose-400/70"
            style={
              {
                left: h.left,
                fontSize: `${h.size}px`,
                animationDuration: `${h.duration}s`,
                animationDelay: `${h.delay}s`,
                '--rotate-end': `${h.rotateEnd}deg`,
              } as React.CSSProperties
            }
            aria-hidden="true"
          >
            ❤
          </span>
        ))}
      </div>

      {/* ---------- Falling Petals ---------- */}
      <div className="pointer-events-none absolute inset-0 z-10">
        {petals.map((p) => (
          <span
            key={p.id}
            className="animate-petal-fall absolute top-0 block rounded-full"
            style={
              {
                left: p.left,
                width: `${p.size}px`,
                height: `${p.size * 0.7}px`,
                background: `radial-gradient(ellipse at 30% 30%, ${p.hue}, ${p.hue}88 60%, transparent 100%)`,
                animationDuration: `${p.duration}s`,
                animationDelay: `${p.delay}s`,
                '--drift': `${p.drift}px`,
                '--spin': `${p.spin}deg`,
              } as React.CSSProperties
            }
            aria-hidden="true"
          />
        ))}
      </div>

      {/* ---------- Decorative Flowers ---------- */}
      <Flower className="top-[12%] left-[8%] opacity-80" size={38} delay={0.4} />
      <Flower className="top-[18%] right-[10%] opacity-75" size={32} delay={1.2} />
      <Flower className="bottom-[16%] left-[12%] opacity-70" size={34} delay={0.8} />
      <Flower className="bottom-[14%] right-[8%] opacity-80" size={40} delay={1.6} />
      <Flower className="top-[45%] left-[4%] opacity-50 hidden sm:block" size={26} delay={2} />
      <Flower className="top-[50%] right-[4%] opacity-50 hidden sm:block" size={28} delay={1.4} />

      {/* ---------- Soft Radial Glow Behind Message ---------- */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 h-[60vh] w-[60vh] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(255,200,215,0.35) 0%, rgba(255,220,230,0.12) 50%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* ---------- Main Message ---------- */}
      <section className="relative z-20 flex min-h-screen flex-col items-center justify-center px-6 py-16 text-center">
        <div
          className="animate-fade-in-up"
          style={{ animationDuration: '1.4s', animationDelay: '0.2s' }}
        >
          {/* Small flower accent on top */}
          <div
            className="animate-fade-in-up mb-6 text-2xl opacity-80 sm:text-3xl"
            style={{ animationDuration: '1.2s', animationDelay: '0.6s' }}
            aria-hidden="true"
          >
            🌸
          </div>

          <p className="font-script text-2xl leading-relaxed text-rose-400/90 sm:text-3xl md:text-4xl">
            We didn't talk for a while,
          </p>

          <p className="font-script text-2xl leading-relaxed text-rose-400/90 sm:text-3xl md:text-4xl">
            but I didn't forget your birthday.
          </p>

          <div className="my-6 flex items-center justify-center gap-3 sm:my-8 sm:gap-4">
            <span className="font-script text-xl text-rose-400/70 sm:text-2xl">So,</span>
            <span
              className="animate-heart-glow inline-block text-4xl sm:text-5xl md:text-6xl"
              style={{ animationDuration: '3s' }}
              aria-hidden="true"
            >
              ❤️
            </span>
          </div>

          <h1 className="font-vibes text-5xl leading-tight text-shimmer sm:text-6xl md:text-7xl">
            Happy Birthday
          </h1>

          {/* Small flower accent on bottom */}
          <div
            className="animate-fade-in-up mt-6 text-2xl opacity-80 sm:text-3xl"
            style={{ animationDuration: '1.2s', animationDelay: '1s' }}
            aria-hidden="true"
          >
            🌸
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
