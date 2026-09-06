import { GalleryImage } from "@/lib/types";

/**
 * Photos of the Esse range fitted, on top of the range brochure — deliberately
 * not individual product listings. Filenames match hotstuffstoves.com/assets/
 * cards/ exactly on purpose, so real photography can drop into
 * public/images/stoves/ under the same name with no code changes. The files
 * currently at that path are generated placeholders — see README.md.
 */
export const rangePhotos: GalleryImage[] = [
  {
    id: "range-1",
    src: "/images/stoves/esseonesemultifuel-one.jpg",
    alt: "Esse One SE Multi Fuel stove",
    isPlaceholder: true,
  },
  {
    id: "range-2",
    src: "/images/stoves/esse500vistase-one.jpg",
    alt: "Esse 500 Vista SE stove",
    isPlaceholder: true,
  },
  {
    id: "range-3",
    src: "/images/stoves/esse525se-one.jpg",
    alt: "Esse 525 SE stove",
    isPlaceholder: true,
  },
  {
    id: "range-4",
    src: "/images/stoves/esse700-one.jpg",
    alt: "Esse 700 Vista SE stove",
    isPlaceholder: true,
  },
];

/**
 * PLACEHOLDER CONTENT — generated illustrations, not real job photos.
 * This build environment can't reach hotstuffstoves.com to pull the real
 * installation photography. Replace every entry with real photos of
 * completed jobs before launch. See README.md.
 */
export const installationPhotos: GalleryImage[] = [
  {
    id: "installation-1",
    src: "/images/installations/installation-1.jpg",
    alt: "Wood burning stove installed in a living room",
    isPlaceholder: true,
  },
  {
    id: "installation-2",
    src: "/images/installations/installation-2.jpg",
    alt: "Stove installation with exposed brick chimney breast",
    isPlaceholder: true,
  },
  {
    id: "installation-3",
    src: "/images/installations/installation-3.jpg",
    alt: "Multi fuel stove fitted into an inglenook fireplace",
    isPlaceholder: true,
  },
  {
    id: "installation-4",
    src: "/images/installations/installation-4.jpg",
    alt: "Twin wall flue system installation",
    isPlaceholder: true,
  },
];

/**
 * PLACEHOLDER CONTENT — generated illustrations, not real showroom photos.
 * Replace every entry with real photos of the Hoylake showroom before
 * launch. See README.md.
 */
export const showroomPhotos: GalleryImage[] = [
  {
    id: "showroom-1",
    src: "/images/showroom/showroom-1.jpg",
    alt: "Hot Stuff Stoves showroom floor with stoves on display",
    isPlaceholder: true,
  },
  {
    id: "showroom-2",
    src: "/images/showroom/showroom-2.jpg",
    alt: "Showroom display of the Esse range",
    isPlaceholder: true,
  },
  {
    id: "showroom-3",
    src: "/images/showroom/showroom-3.jpg",
    alt: "Fuel, logs, and fireside accessories on display in the showroom",
    isPlaceholder: true,
  },
];
