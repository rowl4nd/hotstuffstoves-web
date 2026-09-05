import { SiteInfo } from "@/lib/types";

/**
 * Core business info. Real content, supplied directly by the client.
 */
export const siteInfo: SiteInfo = {
  businessName: "Hot Stuff Stoves",
  addressLines: ["92 Market St", "Hoylake, Wirral"],
  postcode: "CH47 3BD",
  phone: "0151 632 1610",
  phoneHref: "tel:+441516321610",
  email: "kate@hotstuffstoves.com",
  mapsEmbedSrc:
    "https://www.google.com/maps?q=92+Market+St,+Hoylake,+Wirral,+CH47+3BD&output=embed",
  mapsLinkHref:
    "https://www.google.com/maps/search/?api=1&query=92+Market+St%2C+Hoylake%2C+Wirral%2C+CH47+3BD",
};

export const trustStripItems: string[] = [
  "HETAS Registered",
  "Gas Safe Registered",
  "20 Years' Experience",
  "Award-Winning Showroom",
];
