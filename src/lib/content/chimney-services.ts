import { ChimneyService } from "@/lib/types";

/**
 * Chimney services copy is drawn directly from the client's brief and
 * expanded around it — flagged in README.md as copy to have the client
 * sign off on before launch (it is not verbatim from an existing page).
 */
export const chimneyServicesIntro =
  "As HETAS and Gas Safe registered installers, we handle every part of the chimney that keeps a stove safe — flue liners, chimney pots, repairs, cowls — surveyed and quoted alongside the stove installation itself.";

export const chimneyServices: ChimneyService[] = [
  {
    slug: "flue-liners",
    name: "Flue Liners",
    description:
      "A correctly specified flue liner is what makes a stove installation safe, not just legal. We survey every chimney before quoting, and fit liners sized to the stove going in beneath them.",
  },
  {
    slug: "chimney-pots",
    name: "Chimney Pots",
    description:
      "From straightforward replacements to pots chosen to suit a period property, we supply and fit chimney pots as part of the wider installation or as a standalone job.",
  },
  {
    slug: "chimney-repairs",
    name: "Chimney Repairs",
    description:
      "Repointing, stack rebuilds, and structural repairs — we'll tell you honestly what a chimney needs before any stove goes near it.",
  },
  {
    slug: "cowls",
    name: "Cowls",
    description:
      "Anti-downdraught, bird guard, or rain cowls fitted to suit the chimney and the property, addressing draw problems at the source rather than masking them.",
  },
  {
    slug: "twin-wall-flue-systems",
    name: "Twin Wall Flue Systems",
    description:
      "For installations without a suitable existing chimney, we design and fit twin wall flue systems that route safely through the building and out above the roofline.",
  },
];
