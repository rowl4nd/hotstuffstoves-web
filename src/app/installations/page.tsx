import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import { PhotoGrid } from "@/components/PhotoGrid";
import { installationPhotos } from "@/lib/content/gallery";

export const metadata: Metadata = {
  title: "Installations",
  description:
    "A look at stoves and chimney work fitted by Hot Stuff Stoves, HETAS and Gas Safe registered installers in Hoylake, Wirral.",
};

export default function InstallationsPage() {
  return (
    <Section divider={false} className="pt-16">
      <SectionHeading
        title="Our installations"
        lede="A look at the work itself — stoves fitted, chimneys opened up and lined, done properly from survey to finish."
      />
      <div className="mt-14">
        <PhotoGrid photos={installationPhotos} />
      </div>
      <div className="mt-12 border border-hairline p-8">
        <p className="text-base leading-relaxed text-ash-cream/80">
          Thinking about a stove for your own room? Get in touch and
          we&apos;ll talk through what&apos;s possible.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-block border border-ember-red px-6 py-3 text-sm font-medium text-ash-cream transition-colors hover:bg-ember-red"
        >
          Enquire now
        </Link>
      </div>
    </Section>
  );
}
