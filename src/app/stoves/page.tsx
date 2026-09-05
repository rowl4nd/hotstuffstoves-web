import type { Metadata } from "next";
import { Section, SectionHeading } from "@/components/Section";
import { StoveListing } from "@/components/StoveListing";
import { stoves } from "@/lib/content/stoves";

export const metadata: Metadata = {
  title: "The Esse Range",
  description:
    "The Esse stove range fitted by Hot Stuff Stoves: One SE Multi Fuel, 500 Vista SE, 525 SE, and 700 Vista SE. Enquiry only — no online prices.",
};

export default function StovesPage() {
  return (
    <Section divider={false} className="pt-16">
      <SectionHeading
        title="The Esse range"
        lede="Four Esse models, each hand-built and fitted by a HETAS and Gas Safe registered installer. This is an enquiry-only listing — get in touch for pricing and a survey."
      />
      <div className="mt-14">
        <StoveListing stoves={stoves} />
      </div>
    </Section>
  );
}
