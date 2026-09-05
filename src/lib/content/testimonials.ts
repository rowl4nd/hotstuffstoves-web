import { Testimonial } from "@/lib/types";

/**
 * PLACEHOLDER CONTENT — for layout purposes only.
 *
 * None of these reviews are real. They exist so the reviews section can be
 * designed and laid out correctly. Every entry is flagged
 * `isPlaceholder: true` at the data layer specifically so it can't be
 * mistaken for genuine feedback further up the stack.
 *
 * Before launch: replace this entire array with real, genuinely solicited
 * customer reviews. See README.md.
 */
export const testimonials: Testimonial[] = [
  {
    id: "placeholder-1",
    quote:
      "Placeholder review text — replace with a real, genuinely solicited customer quote before launch.",
    author: "Placeholder Customer",
    location: "Hoylake",
    rating: 5,
    isPlaceholder: true,
  },
  {
    id: "placeholder-2",
    quote:
      "Placeholder review text — replace with a real, genuinely solicited customer quote before launch.",
    author: "Placeholder Customer",
    location: "West Kirby",
    rating: 5,
    isPlaceholder: true,
  },
  {
    id: "placeholder-3",
    quote:
      "Placeholder review text — replace with a real, genuinely solicited customer quote before launch.",
    author: "Placeholder Customer",
    location: "Heswall",
    rating: 5,
    isPlaceholder: true,
  },
];
