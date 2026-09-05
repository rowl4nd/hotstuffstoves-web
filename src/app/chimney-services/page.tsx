import type { Metadata } from "next";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/Section";
import { ChimneyServicesList } from "@/components/ChimneyServicesList";
import { chimneyServices, chimneyServicesIntro } from "@/lib/content/chimney-services";

export const metadata: Metadata = {
  title: "Chimney Services",
  description:
    "Flue liners, chimney pots, chimney repairs, cowls, and twin wall flue systems from a HETAS and Gas Safe registered installer in Hoylake, Wirral.",
};

export default function ChimneyServicesPage() {
  return (
    <Section divider={false} className="pt-16">
      <SectionHeading title="Chimney services" lede={chimneyServicesIntro} />
      <div className="mt-14">
        <ChimneyServicesList services={chimneyServices} />
      </div>
      <div className="mt-12 border border-hairline p-8">
        <p className="text-base leading-relaxed text-ash-cream/80">
          Not sure what your chimney needs? We survey every job before
          quoting, so you&apos;re never paying for guesswork.
        </p>
        <Link
          href="/contact"
          className="mt-6 inline-block border border-ember-red px-6 py-3 text-sm font-medium text-ash-cream transition-colors hover:bg-ember-red"
        >
          Book a survey
        </Link>
      </div>
    </Section>
  );
}
