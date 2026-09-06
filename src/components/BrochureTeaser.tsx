/**
 * Styled placeholder only — deliberately not wired up to a real brochure
 * embed yet. One of these renders per interactive brochure the client
 * wants on the site (e.g. the Esse range, chimney services).
 *
 * TODO(brochure): once PDF brochure files are supplied, replace the button
 * below with a FlippingBook or Publitas embed (whichever the client
 * prefers). Both offer a simple iframe/script embed per brochure.
 */
export function BrochureTeaser({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex flex-col items-center gap-8 border border-hairline px-6 py-14 text-center sm:flex-row sm:items-center sm:gap-10 sm:text-left">
      <div aria-hidden="true" className="relative h-32 w-24 shrink-0">
        <div className="absolute inset-0 translate-x-2 translate-y-2 border border-oak-brown bg-charcoal-ink-2" />
        <div className="absolute inset-0 translate-x-1 translate-y-1 border border-oak-brown bg-charcoal-ink-2" />
        <div className="absolute inset-0 flex items-center justify-center border border-hairline-strong bg-smoke-grey">
          <span className="font-display text-2xl text-flame-gold">
            HSS
          </span>
        </div>
      </div>

      <div>
        <h3 className="font-display text-2xl text-ash-cream">{title}</h3>
        <p className="mt-2 max-w-md text-sm leading-relaxed text-ash-cream/70">
          {description}
        </p>
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="mt-5 inline-block cursor-not-allowed border border-hairline-strong px-5 py-2.5 text-sm font-medium text-ash-cream/50"
        >
          Open brochure — coming soon
        </button>
      </div>
    </div>
  );
}
