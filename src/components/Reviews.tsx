import { testimonials } from "@/lib/content/testimonials";

export function Reviews() {
  const anyPlaceholder = testimonials.some((t) => t.isPlaceholder);

  return (
    <div>
      {anyPlaceholder ? (
        <p className="mb-8 inline-block border border-flame-gold/40 bg-flame-gold/10 px-4 py-2 text-xs text-flame-gold">
          Placeholder reviews shown for layout purposes only — not real
          customer feedback. Replace before launch.
        </p>
      ) : null}

      <div className="grid gap-8 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure key={t.id} className="border border-hairline p-6">
            {t.rating ? (
              <div className="mb-3 text-flame-gold" aria-hidden="true">
                {"★".repeat(t.rating)}
                {"☆".repeat(5 - t.rating)}
              </div>
            ) : null}
            <blockquote className="text-sm leading-relaxed text-ash-cream/85">
              &ldquo;{t.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-4 text-sm text-ash-cream/60">
              {t.author}
              {t.location ? `, ${t.location}` : ""}
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
