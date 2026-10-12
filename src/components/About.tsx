import { site } from "@/lib/site";
import { ArrowRightIcon } from "./Icons";
import { Placeholder, SectionHeading } from "./ui";

const highlights = [
  { label: "Years of experience", value: "[ADD NUMBER]" },
  { label: "Events hosted", value: "[ADD NUMBER]" },
  { label: "Languages", value: "[ADD LANGUAGES]" },
];

export function About() {
  return (
    <section aria-labelledby="about-title" id="about" className="relative bg-paper-light py-24 sm:py-32">
      <div className="container-x grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div>
          <SectionHeading
            id="about-title"
            eyebrow="About"
            title={
              <>
                Meet <span className="text-gold-gradient">MC AYYK</span>
              </>
            }
          />

          <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink-soft" data-reveal="2">
            <p>
              MC AYYK is a Master Of Ceremonies hosting parties, weddings and corporate events.
            </p>
            <p>
              <Placeholder>[ADD BIO HERE: background, hosting style, notable events, what clients can expect]</Placeholder>
            </p>
          </div>

          <ul className="mt-8 flex flex-wrap gap-2.5" data-reveal="3" aria-label="Event types">
            {site.services.map((s) => (
              <li
                key={s.id}
                className="rounded-full border border-gold-500/40 bg-gold-50 px-4 py-2 text-sm font-semibold text-gold-800"
              >
                {s.name}
              </li>
            ))}
          </ul>

          <a href="#contact" className="btn btn-gold mt-10" data-reveal="3">
            Book MC AYYK
            <ArrowRightIcon className="icon-nudge" />
          </a>
        </div>

        <ul className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
          {highlights.map((h, i) => (
            <li
              key={h.label}
              data-reveal={String(i + 1)}
              className="card card-hover flex flex-col gap-2 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between"
            >
              <span className="text-sm font-semibold tracking-wide text-ink-muted uppercase">{h.label}</span>
              <Placeholder>{h.value}</Placeholder>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
