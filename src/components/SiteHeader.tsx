import Link from "next/link";
import { siteInfo } from "@/lib/content/site";
import { Logo } from "@/components/Logo";

const NAV_LINKS = [
  { href: "/stoves", label: "Stoves" },
  { href: "/chimney-services", label: "Chimney Services" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-charcoal-ink/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Logo />

        <nav aria-label="Primary" className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-ash-cream/85 transition-colors hover:text-flame-gold"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={siteInfo.phoneHref}
            className="border border-ember-red px-4 py-2 text-sm text-ash-cream transition-colors hover:bg-ember-red"
          >
            {siteInfo.phone}
          </a>
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}

function MobileNav() {
  return (
    <details className="relative md:hidden">
      <summary
        className="list-none cursor-pointer select-none border border-hairline px-3 py-2 text-sm text-ash-cream"
        aria-label="Open menu"
      >
        Menu
      </summary>
      <div className="absolute right-0 top-[calc(100%+0.5rem)] flex w-56 flex-col gap-1 border border-hairline bg-charcoal-ink-2 p-3 shadow-lg">
        {NAV_LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="px-2 py-2 text-sm text-ash-cream/90 hover:text-flame-gold"
          >
            {link.label}
          </Link>
        ))}
        <a
          href={siteInfo.phoneHref}
          className="mt-1 border-t border-hairline px-2 pt-3 text-sm text-flame-gold"
        >
          {siteInfo.phone}
        </a>
      </div>
    </details>
  );
}
