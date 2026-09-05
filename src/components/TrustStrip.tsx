import { trustStripItems } from "@/lib/content/site";

export function TrustStrip() {
  return (
    <div className="hairline-divider bg-charcoal-ink-2">
      <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-5 px-5 py-8 text-sm text-ash-cream/85 sm:px-8 md:grid-cols-4 md:gap-8">
        {trustStripItems.map((item) => (
          <li key={item} className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-flame-gold"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
