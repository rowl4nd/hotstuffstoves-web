/**
 * Shared content types.
 *
 * These are structured as plain TypeScript interfaces + typed data objects
 * (see src/lib/content/*.ts) rather than hardcoded JSX so that swapping the
 * data source for a headless CMS (e.g. Sanity) later is a matter of
 * replacing the content-fetching functions, not rebuilding the pages.
 */

export interface StoveSpecTag {
  label: string;
}

export interface Stove {
  slug: string;
  name: string;
  range: "Esse";
  description: string;
  specs: StoveSpecTag[];
  finishes?: string[];
  image: {
    src: string;
    alt: string;
  };
  featured?: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  location?: string;
  rating?: number; // out of 5
  /**
   * Placeholder testimonials must be flagged so it's obvious, at the data
   * layer, that they need to be swapped for genuinely solicited reviews
   * before this ships to production. See README.md.
   */
  isPlaceholder: boolean;
}

export interface ChimneyService {
  slug: string;
  name: string;
  description: string;
}

export interface SiteInfo {
  businessName: string;
  addressLines: string[];
  postcode: string;
  phone: string;
  phoneHref: string;
  email: string;
  mapsEmbedSrc: string;
  mapsLinkHref: string;
}
