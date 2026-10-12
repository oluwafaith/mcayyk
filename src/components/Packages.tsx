import type { ComponentType, SVGProps } from "react";
import { site, type Service } from "@/lib/site";
import { ArrowRightIcon, BriefcaseIcon, PartyIcon, RingsIcon } from "./Icons";
import { Placeholder, SectionHeading } from "./ui";

const icons: Record<Service["id"], ComponentType<SVGProps<SVGSVGElement>>> = {
  parties: PartyIcon,
  wedding: RingsIcon,
  corporate: BriefcaseIcon,
};

export function Packages() {
  return (
    <section aria-labelledby="packages-title" id="packages" className="bg-surface-gold relative py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading
          id="packages-title"
          eyebrow="Package"
          align="center"
          title={
            <>
              Hosting for every <span className="text-gold-gradient">occasion</span>
            </>
          }
          intro="Choose the type of event you're planning and get in touch to book."
        />

        <ul className="mt-16 grid gap-6 md:grid-cols-3">
          {site.services.map((s, i) => {
            const Icon = icons[s.id];
            return (
              <li key={s.id} data-reveal={String(i + 1)} className="card card-hover group relative flex flex-col overflow-hidden p-8">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-gold-700 via-gold-400 to-bronze transition-transform duration-500 group-hover:scale-x-100"
                />
                <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-gradient-to-br from-gold-100 to-gold-50 text-gold-700 ring-1 ring-gold-300/50 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
                  <Icon className="size-7" />
                </span>

                <h3 className="mt-6 font-display text-2xl font-extrabold tracking-tight text-ink">
                  <span className="text-gold-600" aria-hidden="true">+ </span>
                  {s.name}
                </h3>

                <p className="mt-3 flex-1 leading-relaxed text-ink-muted">
                  {s.details ?? <Placeholder>[ADD PACKAGE DETAILS: what&apos;s included, duration]</Placeholder>}
                </p>

                <div className="mt-6 border-t border-black/5 pt-6">
                  <p className="text-sm font-semibold tracking-wide text-ink-muted uppercase">Price</p>
                  <p className="mt-1 font-display text-2xl font-extrabold text-ink">
                    {s.price ?? <Placeholder>[ADD PRICE]</Placeholder>}
                  </p>
                </div>

                <a
                  href="#contact"
                  className="btn btn-outline mt-6 w-full"
                  aria-label={`Book MC AYYK for ${s.name}`}
                >
                  Book Now
                  <ArrowRightIcon className="icon-nudge" />
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
