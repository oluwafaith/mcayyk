import { mailHref, navLinks, site, telHref } from "@/lib/site";
import { MailIcon, PhoneIcon, socialIcons } from "./Icons";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-night-gradient bg-night pt-20 pb-28 text-white/70 md:pb-12">
      <div className="container-x grid gap-12 md:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <a href="#top" className="inline-block text-[2rem]" aria-label="MC AYYK, back to top">
            <Logo tone="light" />
          </a>
          <p className="mt-4 max-w-xs font-display text-lg font-bold text-white">Master Of Ceremonies</p>
          <p className="mt-1 text-sm">Parties · Wedding · Corporate Events</p>

          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Social media">
            {site.socials.map(({ label, url }) => {
              const Icon = socialIcons[label];
              const cls =
                "inline-flex size-11 items-center justify-center rounded-full border border-white/15 transition-all duration-300";
              return (
                <li key={label}>
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`MC AYYK on ${label}`}
                      className={`${cls} text-white hover:-translate-y-0.5 hover:border-gold-400 hover:bg-gold-400 hover:text-night`}
                    >
                      <Icon className="size-5" />
                    </a>
                  ) : (
                    <span
                      className={`${cls} border-dashed border-gold-300/40 text-white/40`}
                      title={`[ADD ${label.toUpperCase()} URL in src/lib/site.ts]`}
                    >
                      <Icon className="size-5" />
                      <span className="sr-only">{label} link coming soon</span>
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
          {site.socials.every((s) => !s.url) && (
            <p className="mt-3">
              <span className="placeholder-tag-dark">[ADD SOCIAL HANDLES]</span>
            </p>
          )}
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-bold tracking-[0.2em] text-gold-300 uppercase">Explore</h2>
          <ul className="mt-5 grid gap-3">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors hover:text-gold-200">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-bold tracking-[0.2em] text-gold-300 uppercase">Book Now</h2>
          <ul className="mt-5 grid gap-3">
            {site.phones.map((p) => (
              <li key={p.e164}>
                <a href={telHref(p)} className="inline-flex items-center gap-2.5 transition-colors hover:text-gold-200">
                  <PhoneIcon className="size-4 text-gold-400" />
                  {p.display}
                </a>
              </li>
            ))}
            <li>
              <a href={mailHref("Booking enquiry")} className="inline-flex items-center gap-2.5 break-all transition-colors hover:text-gold-200">
                <MailIcon className="size-4 shrink-0 text-gold-400" />
                {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-x mt-16 flex flex-col gap-2 border-t border-white/10 pt-8 text-sm sm:flex-row sm:justify-between">
        <p>
          © {site.copyrightYear} {site.name}. All rights reserved.
        </p>
        <a href="#top" className="transition-colors hover:text-gold-200">
          Back to top ↑
        </a>
      </div>
    </footer>
  );
}
