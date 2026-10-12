"use client";

import { useEffect, useRef, useState } from "react";
import { navLinks, site, telHref } from "@/lib/site";
import { CloseIcon, MenuIcon, PhoneIcon } from "./Icons";
import { Logo } from "./Logo";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Elevate the bar once the user scrolls.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Mobile menu: lock scroll, close on Escape, close when resizing to desktop.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    panelRef.current?.querySelector<HTMLElement>("a")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const mq = window.matchMedia("(min-width: 1024px)");
    const onMq = () => mq.matches && setOpen(false);

    window.addEventListener("keydown", onKey);
    mq.addEventListener("change", onMq);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
      mq.removeEventListener("change", onMq);
    };
  }, [open]);

  const close = () => setOpen(false);
  const elevated = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        elevated
          ? "border-b border-black/5 bg-white/85 shadow-[0_8px_30px_-12px_rgb(0_0_0/0.15)] backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <a
        href="#main"
        className="sr-only z-[60] rounded-full bg-ink px-4 py-2 text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
      >
        Skip to content
      </a>

      <nav aria-label="Main" className="container-x flex h-[4.5rem] items-center justify-between gap-4">
        <a href="#top" className="text-[1.45rem] transition-opacity hover:opacity-80" aria-label="MC AYYK, back to top">
          <Logo />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="group relative rounded-full px-4 py-2 text-[0.95rem] font-medium text-ink-soft transition-colors hover:text-ink"
              >
                {l.label}
                <span className="absolute inset-x-4 -bottom-0.5 h-[2px] origin-left scale-x-0 rounded-full bg-gold-500 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href={telHref(site.phones[0])} className="btn btn-outline hidden min-h-11! px-4! md:inline-flex lg:hidden xl:inline-flex">
            <PhoneIcon />
            <span>{site.phones[0].display}</span>
          </a>
          <a href="#contact" className="btn btn-gold hidden min-h-11! sm:inline-flex">
            Book Now
          </a>
          <button
            ref={toggleRef}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-black/10 bg-white/70 text-ink transition hover:border-gold-500 hover:text-gold-700 lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        ref={panelRef}
        hidden={!open}
        className="bg-surface-gold h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-black/5 lg:hidden"
      >
        <div className="container-x flex flex-col gap-8 py-8">
          <ul className="flex flex-col">
            {navLinks.map((l, i) => (
              <li key={l.href} className="animate-fade-up" style={{ animationDelay: `${i * 50}ms` }}>
                <a
                  href={l.href}
                  onClick={close}
                  className="flex items-center justify-between border-b border-black/10 py-4 font-display text-3xl font-extrabold tracking-tight text-ink transition-colors hover:text-gold-700"
                >
                  {l.label}
                  <span aria-hidden="true" className="text-gold-500">→</span>
                </a>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3">
            <a href="#contact" onClick={close} className="btn btn-gold w-full">
              Book Now
            </a>
            {site.phones.map((p) => (
              <a key={p.e164} href={telHref(p)} className="btn btn-outline w-full">
                <PhoneIcon />
                {p.display}
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
