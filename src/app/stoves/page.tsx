import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import { PhotoGrid } from "@/components/PhotoGrid";
import { BrochureTeaser } from "@/components/BrochureTeaser";
import { rangePhotos } from "@/lib/content/gallery";
import { brochures } from "@/lib/content/brochures";

export const metadata: Metadata = {
  title: "The Esse Range",
  description:
    "Hot Stuff Stoves fits the Esse range across Wirral and beyond. Enquiry only — no online prices. Browse the range brochure or get in touch.",
};

const rangeBrochure = brochures.find((b) => b.id === "esse-range")!;

export default function StovesPage() {
  return (
    <Section divider={false} className="pt-16">
      <SectionHeading
        title="The Esse range"
        lede="We fit the full Esse range — hand-built stoves, surveyed and installed by a HETAS and Gas Safe registered installer. This is enquiry only; get in touch for pricing."
      />
      <div className="mt-14">
        <PhotoGrid photos={rangePhotos} columns={2} />
      </div>

      <div className="mt-14">
        <BrochureTeaser title={rangeBrochure.title} description={rangeBrochure.description} />
      </div>

      <div className="mt-12 border border-hairline p-8">
        <p className="text-base leading-relaxed text-ash-cream/80">
          Not sure which model suits your room? That&apos;s what the survey
          is for.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-block border border-ember-red px-6 py-3 text-sm font-medium text-ash-cream transition-colors hover:bg-ember-red"
        >
          Enquire about a stove
        </Link>
      </div>
    </Section>
  );
}
