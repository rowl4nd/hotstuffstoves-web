import type { Metadata } from "next";
import { Suspense } from "react";
import { Section, SectionHeading } from "@/components/Section";
import { ContactForm } from "@/components/ContactForm";
import { siteInfo } from "@/lib/content/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Hot Stuff Stoves in Hoylake, Wirral — HETAS and Gas Safe registered Esse stove installers.",
};

export default function ContactPage() {
  return (
    <Section divider={false} className="pt-16">
      <SectionHeading
        title="Get in touch"
        lede="Tell us about your room and we'll get back to you to talk through the right stove and installation."
      />

      <div className="mt-14 grid gap-14 md:grid-cols-[1fr_1fr]">
        <div>
          <Suspense fallback={<ContactFormFallback />}>
            <ContactForm />
          </Suspense>
        </div>

        <div>
          <div className="border border-hairline p-6 text-sm leading-relaxed">
            <p className="font-medium text-ash-cream">{siteInfo.businessName}</p>
            <address className="mt-3 not-italic text-ash-cream/75">
              {siteInfo.addressLines.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
              <span className="block">{siteInfo.postcode}</span>
            </address>
            <p className="mt-4">
              <a href={siteInfo.phoneHref} className="text-ash-cream/90 hover:text-flame-gold">
                {siteInfo.phone}
              </a>
            </p>
            <p>
              <a
                href={`mailto:${siteInfo.email}`}
                className="text-ash-cream/90 hover:text-flame-gold"
              >
                {siteInfo.email}
              </a>
            </p>
          </div>

          <div className="mt-6 aspect-[4/3] w-full overflow-hidden border border-hairline">
            <iframe
              title="Map showing Hot Stuff Stoves, 92 Market St, Hoylake, Wirral"
              src={siteInfo.mapsEmbedSrc}
              className="h-full w-full grayscale"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}

function ContactFormFallback() {
  return (
    <div className="animate-pulse space-y-6" aria-hidden="true">
      <div className="h-12 border border-hairline bg-charcoal-ink-2" />
      <div className="h-12 border border-hairline bg-charcoal-ink-2" />
      <div className="h-32 border border-hairline bg-charcoal-ink-2" />
    </div>
  );
}
