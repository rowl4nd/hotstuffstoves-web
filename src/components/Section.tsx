import { ReactNode } from "react";

export function Section({
  children,
  className = "",
  id,
  divider = true,
  tone = "ink",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  divider?: boolean;
  tone?: "ink" | "ink-2";
}) {
  return (
    <section
      id={id}
      className={`${divider ? "hairline-divider" : ""} ${
        tone === "ink-2" ? "bg-charcoal-ink-2" : "bg-charcoal-ink"
      } ${className}`}
    >
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8">{children}</div>
    </section>
  );
}

export function SectionHeading({
  title,
  lede,
}: {
  title: string;
  lede?: string;
}) {
  return (
    <div className="max-w-2xl">
      <h2 className="font-display text-3xl font-semibold tracking-tight text-ash-cream sm:text-4xl">
        {title}
      </h2>
      {lede ? (
        <p className="mt-4 text-base leading-relaxed text-ash-cream/75">
          {lede}
        </p>
      ) : null}
    </div>
  );
}
