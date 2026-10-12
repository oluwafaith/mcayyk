import { mailHref, mapsHref, site, telHref, whatsappHref } from "@/lib/site";
import { ContactForm } from "./ContactForm";
import { MailIcon, MapPinIcon, PhoneIcon, WhatsAppIcon } from "./Icons";
import { Placeholder, SectionHeading } from "./ui";

export function Contact() {
  const wa = whatsappHref();
  const maps = mapsHref();

  return (
    <section aria-labelledby="contact-title" id="contact" className="bg-surface-gold py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <SectionHeading
            id="contact-title"
            eyebrow="Book Now"
            title={
              <>
                Book <span className="text-gold-gradient">MC AYYK</span>
              </>
            }
            intro="Call, email, or send the form with your event details."
          />

          <ul className="mt-10 grid gap-4" data-reveal="2">
            <li className="card flex gap-4 p-5">
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gold-50 text-gold-700 ring-1 ring-gold-300/50">
                <PhoneIcon className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold tracking-wide text-ink-muted uppercase">Call</p>
                <ul className="mt-1 space-y-1">
                  {site.phones.map((p) => (
                    <li key={p.e164}>
                      <a href={telHref(p)} className="font-display text-lg font-bold text-ink transition-colors hover:text-gold-700">
                        {p.display}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </li>

            <li className="card flex gap-4 p-5">
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gold-50 text-gold-700 ring-1 ring-gold-300/50">
                <MailIcon className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold tracking-wide text-ink-muted uppercase">Email</p>
                <a
                  href={mailHref("Booking enquiry")}
                  className="mt-1 block font-display text-lg font-bold break-all text-ink transition-colors hover:text-gold-700"
                >
                  {site.email}
                </a>
              </div>
            </li>

            <li className="card flex gap-4 p-5">
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-2xl bg-gold-50 text-gold-700 ring-1 ring-gold-300/50">
                <MapPinIcon className="size-5" />
              </span>
              <div>
                <p className="text-sm font-semibold tracking-wide text-ink-muted uppercase">Location</p>
                {site.serviceArea && maps ? (
                  <a
                    href={maps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1 block font-display text-lg font-bold text-ink transition-colors hover:text-gold-700"
                  >
                    {site.serviceArea}
                    <span className="sr-only"> (opens Google Maps in a new tab)</span>
                  </a>
                ) : (
                  <p className="mt-1.5">
                    <Placeholder>[ADD CITY / SERVICE AREA]</Placeholder>
                  </p>
                )}
              </div>
            </li>
          </ul>

          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" className="btn btn-outline mt-6 w-full sm:w-auto" data-reveal="3">
              <WhatsAppIcon className="text-[#1f8f4e]" />
              Chat on WhatsApp
            </a>
          )}
        </div>

        <div data-reveal="2">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
