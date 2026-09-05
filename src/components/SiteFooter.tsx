import Link from "next/link";
import { siteInfo } from "@/lib/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-hairline bg-charcoal-ink-2">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-3">
        <div>
          <p className="font-display text-lg font-semibold text-ash-cream">
            {siteInfo.businessName}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-ash-cream/70">
            HETAS and Gas Safe registered stove installers based in Hoylake,
            Wirral.
          </p>
        </div>

        <div>
          <p className="text-sm font-medium text-ash-cream/90">Visit</p>
          <address className="mt-3 not-italic text-sm leading-relaxed text-ash-cream/70">
            {siteInfo.addressLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <span className="block">{siteInfo.postcode}</span>
          </address>
        </div>

        <div>
          <p className="text-sm font-medium text-ash-cream/90">Get in touch</p>
          <ul className="mt-3 space-y-2 text-sm text-ash-cream/70">
            <li>
              <a href={siteInfo.phoneHref} className="hover:text-flame-gold">
                {siteInfo.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteInfo.email}`}
                className="hover:text-flame-gold"
              >
                {siteInfo.email}
              </a>
            </li>
            <li>
              <Link href="/contact" className="hover:text-flame-gold">
                Enquiry form
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-hairline">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-6 text-xs text-ash-cream/50 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <p>
            &copy; {year} {siteInfo.businessName}. All rights reserved.
          </p>
          <p>HETAS Registered &middot; Gas Safe Registered</p>
        </div>
      </div>
    </footer>
  );
}
