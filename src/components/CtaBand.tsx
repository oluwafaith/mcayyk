import { mailHref, site, telHref } from "@/lib/site";
import { MailIcon, PhoneIcon } from "./Icons";
import { VerifiedBadge } from "./VerifiedBadge";

export function CtaBand() {
  return (
    <section aria-labelledby="cta-title" className="bg-paper-light px-3 pb-24 sm:px-5 sm:pb-32">
      <div
        className="bg-night-gradient relative mx-auto max-w-6xl overflow-hidden rounded-[2.5rem] bg-night px-6 py-16 text-center sm:px-12 sm:py-20"
        data-reveal
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(196_154_28/0.35),transparent)] blur-2xl"
        />
        <div className="relative">
          <p className="inline-flex items-center gap-2 rounded-full border border-gold-400/30 bg-white/5 px-4 py-1.5 text-sm font-semibold text-gold-200">
            <VerifiedBadge className="size-5" />
            MC AYYK
          </p>
          <h2
            id="cta-title"
            className="mx-auto mt-6 max-w-3xl font-display text-[clamp(2.2rem,6vw,4rem)] leading-[1.02] font-extrabold tracking-[-0.035em] text-white"
          >
            Planning a party, wedding or <span className="text-gold-gradient-light">corporate event?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-white/70">Book your Master Of Ceremonies today.</p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
            {site.phones.map((p) => (
              <a key={p.e164} href={telHref(p)} className="btn btn-light w-full px-7 text-base sm:w-auto">
                <PhoneIcon />
                {p.display}
              </a>
            ))}
            <a href={mailHref("Booking enquiry")} className="btn btn-ghost-light w-full px-7 text-base sm:w-auto">
              <MailIcon />
              Email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
