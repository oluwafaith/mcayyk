import { QuoteIcon } from "./Icons";
import { Placeholder, SectionHeading } from "./ui";

/* Replace each entry with a real client review. */
const testimonials = [
  { quote: "[ADD TESTIMONIAL HERE]", name: "[CLIENT NAME]", event: "[EVENT TYPE]" },
  { quote: "[ADD TESTIMONIAL HERE]", name: "[CLIENT NAME]", event: "[EVENT TYPE]" },
  { quote: "[ADD TESTIMONIAL HERE]", name: "[CLIENT NAME]", event: "[EVENT TYPE]" },
];

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" id="reviews" className="bg-paper-light pb-24 sm:pb-32">
      <div className="container-x">
        <SectionHeading
          id="testimonials-title"
          eyebrow="Reviews"
          align="center"
          title={
            <>
              What clients <span className="text-gold-gradient">say</span>
            </>
          }
        />

        <ul className="mt-14 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <li key={i} data-reveal={String(i + 1)}>
              <figure className="card card-hover flex h-full flex-col p-8">
                <QuoteIcon className="size-9 text-gold-400" />
                <blockquote className="mt-5 flex-1 text-lg leading-relaxed text-ink-soft">
                  <p>
                    <Placeholder>{t.quote}</Placeholder>
                  </p>
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3 border-t border-black/5 pt-6">
                  <span
                    aria-hidden="true"
                    className="inline-flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-gold-400 to-gold-700 font-display font-bold text-white"
                  >
                    ★
                  </span>
                  <span className="flex flex-col gap-1 text-sm">
                    <Placeholder>{t.name}</Placeholder>
                    <span className="text-ink-muted">
                      <Placeholder>{t.event}</Placeholder>
                    </span>
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
