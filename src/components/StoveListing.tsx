import Image from "next/image";
import Link from "next/link";
import { Stove } from "@/lib/types";

/**
 * Alternating editorial layout: image and text swap sides down the list.
 * Deliberately not a repeated card grid.
 */
export function StoveListing({ stoves }: { stoves: Stove[] }) {
  return (
    <div>
      {stoves.map((stove, index) => (
        <StoveRow key={stove.slug} stove={stove} reversed={index % 2 === 1} />
      ))}
    </div>
  );
}

function StoveRow({ stove, reversed }: { stove: Stove; reversed: boolean }) {
  return (
    <article className="grid items-center gap-10 border-b border-hairline py-14 first:pt-0 last:border-b-0 last:pb-0 md:grid-cols-2 md:gap-16">
      <div className={reversed ? "md:order-2" : ""}>
        <div className="relative aspect-[4/3] overflow-hidden bg-charcoal-ink-2">
          <Image
            src={stove.image.src}
            alt={stove.image.alt}
            fill
            sizes="(min-width: 768px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className={reversed ? "md:order-1" : ""}>
        <h3 className="font-display text-2xl font-semibold tracking-tight text-ash-cream sm:text-3xl">
          {stove.name}
        </h3>
        <p className="mt-4 text-base leading-relaxed text-ash-cream/75">
          {stove.description}
        </p>

        <ul className="mt-6 flex flex-wrap gap-2">
          {stove.specs.map((spec) => (
            <li
              key={spec.label}
              className="border border-hairline px-3 py-1 text-xs text-ash-cream/80"
            >
              {spec.label}
            </li>
          ))}
        </ul>

        {stove.finishes && stove.finishes.length > 0 ? (
          <p className="mt-4 text-sm text-ash-cream/60">
            Available in {stove.finishes.join(", ")}
          </p>
        ) : null}

        <div className="mt-8">
          <Link
            href={`/contact?stove=${encodeURIComponent(stove.name)}`}
            className="inline-block border border-ember-red px-5 py-2.5 text-sm font-medium text-ash-cream transition-colors hover:bg-ember-red"
          >
            Enquire about this stove
          </Link>
        </div>
      </div>
    </article>
  );
}
