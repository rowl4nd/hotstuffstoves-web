import Link from "next/link";
import { Hero } from "@/components/Hero";
import { TrustStrip } from "@/components/TrustStrip";
import { Section, SectionHeading } from "@/components/Section";
import { PhotoGrid } from "@/components/PhotoGrid";
import { GalleryTeaser } from "@/components/GalleryTeaser";
import { BrochureTeaser } from "@/components/BrochureTeaser";
import { Reviews } from "@/components/Reviews";
import { ChimneyServicesList } from "@/components/ChimneyServicesList";
import { rangePhotos, installationPhotos, showroomPhotos } from "@/lib/content/gallery";
import { brochures } from "@/lib/content/brochures";
import { chimneyServices, chimneyServicesIntro } from "@/lib/content/chimney-services";
import { siteInfo } from "@/lib/content/site";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TrustStrip />

      <Section>
        <SectionHeading
          title="The Esse range"
          lede="Hand-built stoves, fitted properly by a HETAS and Gas Safe registered installer."
        />
        <div className="mt-14">
          <PhotoGrid photos={rangePhotos.slice(0, 3)} />
        </div>
        <div className="mt-4">
          <Link
            href="/stoves"
            className="text-sm font-medium text-flame-gold hover:text-flame-gold/80"
          >
            View the full range and brochure &rarr;
          </Link>
        </div>
      </Section>

      <Section tone="ink-2">
        <SectionHeading
          title="See it for yourself"
          lede="Recent jobs, and the showroom where you can see the range fitted and running before you commit to anything."
        />
        <div className="mt-12 grid gap-8 sm:grid-cols-2">
          <GalleryTeaser
            photo={installationPhotos[0]}
            title="Our installations"
            description="A look at stoves and chimney work fitted across Wirral and beyond."
            href="/installations"
            linkLabel="See more installations"
          />
          <GalleryTeaser
            photo={showroomPhotos[0]}
            title="Our showroom"
            description="Visit us at 92 Market St, Hoylake, to see the range in person."
            href="/showroom"
            linkLabel="See the showroom"
          />
        </div>
      </Section>

      <Section>
        <SectionHeading title="Brochures" />
        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {brochures.map((brochure) => (
            <BrochureTeaser
              key={brochure.id}
              title={brochure.title}
              description={brochure.description}
            />
          ))}
        </div>
      </Section>

      <Section tone="ink-2">
        <SectionHeading title="What people say" />
        <div className="mt-12">
          <Reviews />
        </div>
      </Section>

      <Section>
        <SectionHeading title="Chimney services" lede={chimneyServicesIntro} />
        <div className="mt-12">
          <ChimneyServicesList services={chimneyServices.slice(0, 5)} />
        </div>
        <div className="mt-8">
          <Link
            href="/chimney-services"
            className="text-sm font-medium text-flame-gold hover:text-flame-gold/80"
          >
            More on chimney services &rarr;
          </Link>
        </div>
      </Section>

      <Section tone="ink-2" divider={false}>
        <div className="grid gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-display text-3xl text-ash-cream sm:text-4xl">
              Talk to us about your room
            </h2>
            <p className="mt-4 max-w-md text-base leading-relaxed text-ash-cream/75">
              Every installation starts with a proper survey. Get in touch and
              we&apos;ll talk through what suits your chimney, your room, and
              your fuel.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="border border-ember-red bg-ember-red px-6 py-3 text-sm font-medium text-ash-cream transition-colors hover:bg-ember-red-bright hover:border-ember-red-bright"
              >
                Enquire now
              </Link>
              <a
                href={siteInfo.phoneHref}
                className="border border-hairline-strong px-6 py-3 text-sm font-medium text-ash-cream transition-colors hover:border-flame-gold hover:text-flame-gold"
              >
                Call {siteInfo.phone}
              </a>
            </div>
          </div>
          <div className="border border-hairline p-6 text-sm leading-relaxed text-ash-cream/75">
            <p className="font-medium text-ash-cream">{siteInfo.businessName}</p>
            <p className="mt-2">
              {siteInfo.addressLines.join(", ")}, {siteInfo.postcode}
            </p>
            <p className="mt-2">
              <a href={siteInfo.phoneHref} className="hover:text-flame-gold">
                {siteInfo.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${siteInfo.email}`}
                className="hover:text-flame-gold"
              >
                {siteInfo.email}
              </a>
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
