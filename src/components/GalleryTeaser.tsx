import Image from "next/image";
import Link from "next/link";
import { GalleryImage } from "@/lib/types";

export function GalleryTeaser({
  photo,
  title,
  description,
  href,
  linkLabel,
}: {
  photo: GalleryImage;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
}) {
  return (
    <Link href={href} className="group block border border-hairline">
      <div className="relative aspect-[4/3] overflow-hidden bg-charcoal-ink-2">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes="(min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="border-t border-hairline p-6">
        <h3 className="font-display text-xl text-ash-cream">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-ash-cream/70">
          {description}
        </p>
        <span className="mt-4 inline-block text-sm font-medium text-flame-gold group-hover:text-flame-gold/80">
          {linkLabel} &rarr;
        </span>
      </div>
    </Link>
  );
}
