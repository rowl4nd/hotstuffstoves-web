import Link from "next/link";
import styles from "./Hero.module.css";

// Deterministic particle layout (no client JS/randomness needed — this is
// a static decorative pattern, not per-user state).
const EMBERS = [
  { left: "8%", size: 5, duration: 7.5, delay: 0, dx: 24, dx2: -8 },
  { left: "15%", size: 3, duration: 6.2, delay: 1.1, dx: -16, dx2: 30 },
  { left: "22%", size: 6, duration: 8.4, delay: 2.4, dx: 10, dx2: -20 },
  { left: "30%", size: 4, duration: 5.8, delay: 0.6, dx: -22, dx2: 14 },
  { left: "38%", size: 3, duration: 7.1, delay: 3.2, dx: 18, dx2: -10 },
  { left: "46%", size: 5, duration: 6.6, delay: 1.8, dx: -12, dx2: 26 },
  { left: "53%", size: 4, duration: 8.9, delay: 0.2, dx: 26, dx2: -18 },
  { left: "60%", size: 6, duration: 6.0, delay: 2.9, dx: -20, dx2: 8 },
  { left: "67%", size: 3, duration: 7.7, delay: 1.4, dx: 14, dx2: -24 },
  { left: "74%", size: 5, duration: 5.4, delay: 3.6, dx: -16, dx2: 20 },
  { left: "81%", size: 4, duration: 8.1, delay: 0.9, dx: 22, dx2: -12 },
  { left: "88%", size: 3, duration: 6.9, delay: 2.1, dx: -10, dx2: 16 },
  { left: "12%", size: 4, duration: 9.2, delay: 4.1, dx: 8, dx2: -26 },
  { left: "44%", size: 3, duration: 5.9, delay: 4.8, dx: -18, dx2: 10 },
  { left: "70%", size: 5, duration: 7.3, delay: 3.9, dx: 12, dx2: -14 },
];

const SMOKE_WISPS = [
  { left: "18%", size: 90, duration: 13, delay: 0, dx: 40, dx2: 90 },
  { left: "40%", size: 130, duration: 16, delay: 3.5, dx: -50, dx2: -110 },
  { left: "62%", size: 100, duration: 14.5, delay: 1.8, dx: 60, dx2: 100 },
  { left: "78%", size: 80, duration: 12, delay: 5.2, dx: -30, dx2: -70 },
];

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b border-hairline bg-charcoal-ink">
      <div className={styles.heroStage} aria-hidden="true">
        <div className={styles.flameGlow} />
        {SMOKE_WISPS.map((s, i) => (
          <span
            key={`smoke-${i}`}
            className={styles.smoke}
            style={
              {
                left: s.left,
                width: `${s.size}px`,
                height: `${s.size}px`,
                animationDuration: `${s.duration}s`,
                animationDelay: `${s.delay}s`,
                "--drift-x": `${s.dx}px`,
                "--drift-x2": `${s.dx2}px`,
              } as React.CSSProperties
            }
          />
        ))}
        {EMBERS.map((e, i) => (
          <span
            key={`ember-${i}`}
            className={styles.ember}
            style={
              {
                left: e.left,
                width: `${e.size}px`,
                height: `${e.size}px`,
                animationDuration: `${e.duration}s`,
                animationDelay: `${e.delay}s`,
                "--drift-x": `${e.dx}px`,
                "--drift-x2": `${e.dx2}px`,
              } as React.CSSProperties
            }
          />
        ))}
      </div>

      <div className="relative mx-auto max-w-6xl px-5 py-28 sm:px-8 sm:py-36">
        <div className="max-w-2xl">
          <h1 className="font-display text-4xl leading-[1.15] text-ash-cream sm:text-5xl md:text-6xl">
            Twenty years of fires done properly.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ash-cream/80">
            HETAS and Gas Safe registered stove installers based in Hoylake,
            fitting the Esse range across Wirral and beyond — properly
            surveyed, properly fitted, properly finished.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/stoves"
              className="border border-ember-red bg-ember-red px-6 py-3 text-sm font-medium text-ash-cream transition-colors hover:bg-ember-red-bright hover:border-ember-red-bright"
            >
              View the Esse range
            </Link>
            <Link
              href="/contact"
              className="border border-hairline-strong px-6 py-3 text-sm font-medium text-ash-cream transition-colors hover:border-flame-gold hover:text-flame-gold"
            >
              Enquire about an installation
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
