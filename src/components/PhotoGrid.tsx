import Image from "next/image";
import { GalleryImage } from "@/lib/types";

export function PhotoGrid({
  photos,
  columns = 3,
}: {
  photos: GalleryImage[];
  columns?: 2 | 3;
}) {
  const anyPlaceholder = photos.some((p) => p.isPlaceholder);

  return (
    <div>
      {anyPlaceholder ? (
        <p className="mb-8 inline-block border border-flame-gold/40 bg-flame-gold/10 px-4 py-2 text-xs text-flame-gold">
          Placeholder photos shown for layout purposes only — replace with
          real photography before launch.
        </p>
      ) : null}

      <div
        className={`grid gap-6 ${
          columns === 2 ? "sm:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {photos.map((photo) => (
          <figure key={photo.id} className="border border-hairline">
            <div className="relative aspect-[4/3] overflow-hidden bg-charcoal-ink-2">
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                className="object-cover"
              />
            </div>
            {photo.caption ? (
              <figcaption className="border-t border-hairline px-4 py-3 text-sm text-ash-cream/75">
                {photo.caption}
              </figcaption>
            ) : null}
          </figure>
        ))}
      </div>
    </div>
  );
}
