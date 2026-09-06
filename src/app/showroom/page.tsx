import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/Section";
import { PhotoGrid } from "@/components/PhotoGrid";
import { showroomPhotos } from "@/lib/content/gallery";
import { siteInfo } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Showroom",
  description:
    "Visit the Hot Stuff Stoves showroom at 92 Market St, Hoylake, Wirral — see the Esse range, fuel, and fireside accessories in person.",
};

export default function ShowroomPage() {
  return (
    <Section divider={false} className="pt-16">
      <SectionHeading
        title="Our showroom"
        lede="Stoves lit and running, fuel and fireside accessories on the shelf — come and see the range in person before you commit to anything."
      />
      <div className="mt-14">
        <PhotoGrid photos={showroomPhotos} />
      </div>
      <div className="mt-12 border border-hairline p-8">
        <p className="font-medium text-ash-cream">{siteInfo.businessName}</p>
        <address className="mt-3 not-italic text-base leading-relaxed text-ash-cream/80">
          {siteInfo.addressLines.join(", ")}, {siteInfo.postcode}
        </address>
        <p className="mt-4">
          <a
            href={siteInfo.mapsLinkHref}
            className="text-sm font-medium text-flame-gold hover:text-flame-gold/80"
          >
            Get directions &rarr;
          </a>
        </p>
      </div>
    </Section>
  );
}
