import Link from "next/link";

/**
 * Recreated from the client's existing hotstuffstoves.com logo (a black
 * stove-and-flame mark beside a stacked "HOT STUFF / STOVES" wordmark),
 * redrawn as SVG and recoloured for this site's dark theme rather than
 * copied pixel-for-pixel — see project notes for why.
 */
export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`group flex items-center gap-3 text-ash-cream ${className}`}
      aria-label="Hot Stuff Stoves — home"
    >
      <StoveMark className="h-10 w-10 shrink-0 text-ash-cream transition-colors group-hover:text-flame-gold sm:h-12 sm:w-12" />
      <span className="flex flex-col">
        <span className="h-px w-full bg-hairline-strong" aria-hidden="true" />
        <span className="font-display mt-1 text-[0.6rem] tracking-[0.34em] text-ash-cream/80 sm:text-[0.65rem]">
          HOT STUFF
        </span>
        <span className="font-display text-xl leading-none tracking-[0.04em] text-ash-cream transition-colors group-hover:text-flame-gold sm:text-2xl">
          STOVES
        </span>
        <span className="mt-1.5 h-px w-full bg-hairline-strong" aria-hidden="true" />
      </span>
    </Link>
  );
}

export function StoveMark({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="hss-flame" x1="0" y1="1" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--ember-red)" />
          <stop offset="100%" stopColor="var(--flame-gold)" />
        </linearGradient>
      </defs>

      {/* chimney */}
      <rect x="13" y="4" width="9" height="13" fill="currentColor" />

      {/* body */}
      <rect x="7" y="15" width="50" height="37" rx="4" fill="currentColor" />

      {/* window opening */}
      <path d="M19 47 V29 a13 13 0 0 1 26 0 V47 Z" fill="var(--charcoal-ink-2)" />

      {/* flame */}
      <path
        d="M32 45.5c-7 0-12-4.8-12-10.4 0-4.6 2.7-8.2 5.3-11.8.6 3 2.5 4.6 4.5 4.6-1-5 2.2-9.4 6.4-11.9-1.6 3.4 0 6 2.6 8.4 2.6 2.4 4.7 5.8 4.7 9.3 0 6.5-5.7 11.8-11.5 11.8Z"
        fill="url(#hss-flame)"
      />

      {/* control knobs */}
      <circle cx="15" cy="42" r="2" fill="var(--charcoal-ink-2)" />
      <circle cx="49" cy="42" r="2" fill="var(--charcoal-ink-2)" />

      {/* plinth + legs */}
      <rect x="3" y="52" width="58" height="5" rx="1.5" fill="currentColor" />
      <rect x="10" y="57" width="4" height="5" fill="currentColor" />
      <rect x="50" y="57" width="4" height="5" fill="currentColor" />
    </svg>
  );
}
