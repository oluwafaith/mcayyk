import Image from "next/image";
import heroImg from "@/assets/images/hero-placeholder.jpg";
import { site, telHref } from "@/lib/site";
import { ArrowRightIcon, PhoneIcon } from "./Icons";
import { Logo } from "./Logo";
import { VerifiedBadge } from "./VerifiedBadge";

export function Hero() {
  return (
    <section id="top" aria-labelledby="hero-title" className="bg-surface-gold relative overflow-hidden pt-28 pb-20 sm:pt-32 lg:pt-36 lg:pb-28">
      {/* soft gold glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 right-[-10%] size-[42rem] rounded-full bg-[radial-gradient(closest-side,rgb(201_162_64/0.28),transparent)] blur-2xl"
      />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10">
        {/* Copy */}
        <div>
          <div className="animate-fade-up text-[2rem] sm:text-[2.4rem]">
            <Logo />
          </div>

          <h1
            id="hero-title"
            className="mt-5 animate-fade-up font-display text-[clamp(3.2rem,11vw,6.6rem)] leading-[0.92] font-extrabold tracking-[-0.045em] [animation-delay:120ms]"
          >
            <span className="sr-only">MC AYYK, </span>
            <span className="text-gold-gradient block pb-1">Master Of</span>
            <span className="text-gold-gradient block pb-2">Ceremonies</span>
          </h1>

          <p className="mt-6 max-w-xl animate-fade-up text-lg leading-relaxed text-ink-soft [animation-delay:240ms] sm:text-xl">
            Now booking for <strong className="font-semibold text-ink">Parties</strong>,{" "}
            <strong className="font-semibold text-ink">Weddings</strong> and{" "}
            <strong className="font-semibold text-ink">Corporate Events</strong>.
          </p>

          <div className="mt-9 flex animate-fade-up flex-col gap-3 [animation-delay:360ms] sm:flex-row sm:flex-wrap">
            <a href={telHref(site.phones[0])} className="btn btn-gold px-7 text-base">
              <PhoneIcon />
              Call to Book
            </a>
            <a href="#contact" className="btn btn-outline px-7 text-base">
              Send an Enquiry
              <ArrowRightIcon className="icon-nudge" />
            </a>
          </div>

          <p className="mt-6 animate-fade-up text-sm text-ink-muted [animation-delay:480ms]">
            Or call{" "}
            <a href={telHref(site.phones[1])} className="font-semibold text-gold-700 underline-offset-4 hover:underline">
              {site.phones[1].display}
            </a>
          </p>
        </div>

        {/* Visual */}
        <div className="relative mx-auto w-full max-w-md animate-fade-up [animation-delay:200ms] lg:max-w-none">
          <div className="absolute -inset-3 rotate-3 rounded-[2.4rem] bg-gradient-to-br from-gold-300/60 via-gold-500/30 to-bronze/40" aria-hidden="true" />
          <figure className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border-4 border-white shadow-2xl shadow-black/20">
            {/* REPLACE: swap hero-placeholder.jpg for a high-res portrait of MC AYYK */}
            <Image
              src={heroImg}
              alt="A professional microphone on stage, ready for MC AYYK"
              fill
              priority
              placeholder="blur"
              sizes="(min-width: 1024px) 40vw, (min-width: 640px) 28rem, 92vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" aria-hidden="true" />
          </figure>

          {/* Verified name badge (from flyer) */}
          <div className="absolute top-8 -right-2 flex animate-float items-center gap-2 rounded-xl bg-white px-4 py-2.5 shadow-xl shadow-black/10 sm:-right-6">
            <span className="font-display text-lg font-extrabold tracking-tight text-gold-700">MC AYYK</span>
            <VerifiedBadge className="size-7" title="Verified" />
          </div>

          {/* "Package" card (from flyer) */}
          <div className="absolute -bottom-8 left-1/2 w-[88%] -translate-x-1/2 rounded-2xl bg-white/95 p-5 shadow-2xl shadow-black/15 backdrop-blur sm:-left-8 sm:w-auto sm:translate-x-0">
            <p className="text-center font-display text-base font-bold text-gold-700 sm:text-left">Package</p>
            <ul className="mt-2 grid gap-1 font-display text-[1.05rem] font-bold text-ink">
              {site.services.map((s) => (
                <li key={s.id} className="flex items-center gap-2">
                  <span className="text-gold-600" aria-hidden="true">+</span>
                  {s.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
