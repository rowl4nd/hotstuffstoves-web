import { Stove } from "@/lib/types";

/**
 * Esse range — v1 scope. Real product copy supplied by the client.
 *
 * Image note: `image.src` filenames match hotstuffstoves.com/assets/cards/
 * exactly on purpose, so real product photography can be dropped into
 * public/images/stoves/ under the same name with no code changes. The
 * files currently at that path are generated placeholders — see README.md.
 */
export const stoves: Stove[] = [
  {
    slug: "esse-one-se-multi-fuel",
    name: "Esse One SE Multi Fuel",
    range: "Esse",
    description:
      "An affordable, hand-built stove that burns clean and burns well. The Esse One SE Multi Fuel is the accessible way into the Esse range — a stove that suits almost any room without asking you to compromise on build quality.",
    specs: [{ label: "Multi Fuel" }, { label: "Hand-built" }, { label: "Clean-burning" }],
    finishes: ["Iron Grey", "Bronze", "Gold"],
    image: {
      src: "/images/stoves/esseonesemultifuel-one.jpg",
      alt: "Esse One SE Multi Fuel stove",
    },
    featured: true,
  },
  {
    slug: "esse-500-vista-se",
    name: "Esse 500 Vista SE",
    range: "Esse",
    description:
      "The signature of the Vista line: a wide-glass door that turns the fire itself into the room's focal point. A steel body with cast iron detailing gives the 500 Vista SE its weight and presence without feeling heavy-handed.",
    specs: [{ label: "Wide-glass door" }, { label: "Steel body" }, { label: "Cast iron detail" }],
    image: {
      src: "/images/stoves/esse500vistase-one.jpg",
      alt: "Esse 500 Vista SE stove",
    },
    featured: true,
  },
  {
    slug: "esse-525-se",
    name: "Esse 525 SE",
    range: "Esse",
    description:
      "5kW and a compact footprint make the 525 SE the natural choice for smaller rooms and snugs. Minimalist air controls keep the stove's face clean, so the fire does the talking.",
    specs: [{ label: "5kW" }, { label: "Compact footprint" }, { label: "Minimalist air controls" }],
    image: {
      src: "/images/stoves/esse525se-one.jpg",
      alt: "Esse 525 SE stove",
    },
    featured: true,
  },
  {
    slug: "esse-700-vista-se",
    name: "Esse 700 Vista SE",
    range: "Esse",
    description:
      "At 9kW, the 700 Vista SE is the largest of Esse's traditional models — built for rooms that need real heat and a fire to match. A twin position riddling grate lets it run on wood or mineral fuel.",
    specs: [{ label: "9kW" }, { label: "Twin position riddling grate" }, { label: "Wood or mineral fuel" }],
    image: {
      src: "/images/stoves/esse700-one.jpg",
      alt: "Esse 700 Vista SE stove",
    },
    featured: true,
  },
];

export function getStoveBySlug(slug: string): Stove | undefined {
  return stoves.find((s) => s.slug === slug);
}

export function getFeaturedStoves(): Stove[] {
  return stoves.filter((s) => s.featured);
}
