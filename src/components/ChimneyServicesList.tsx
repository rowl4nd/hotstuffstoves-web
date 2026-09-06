import { ChimneyService } from "@/lib/types";

export function ChimneyServicesList({
  services,
}: {
  services: ChimneyService[];
}) {
  return (
    <ul>
      {services.map((service) => (
        <li
          key={service.slug}
          className="grid gap-3 border-b border-hairline py-8 last:border-b-0 last:pb-0 md:grid-cols-[240px_1fr] md:gap-10"
        >
          <h3 className="font-display text-xl text-ash-cream">
            {service.name}
          </h3>
          <p className="text-base leading-relaxed text-ash-cream/75">
            {service.description}
          </p>
        </li>
      ))}
    </ul>
  );
}
