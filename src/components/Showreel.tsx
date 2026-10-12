"use client";

import { useState } from "react";
import Image from "next/image";
import heroImg from "@/assets/images/hero-placeholder.jpg";
import { site } from "@/lib/site";
import { Placeholder, SectionHeading } from "./ui";

export function Showreel() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section aria-labelledby="showreel-title" id="showreel" className="relative bg-night py-24 text-white sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 size-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgb(196_154_28/0.18),transparent)] blur-3xl"
      />

      <div className="container-x relative">
        <SectionHeading
          id="showreel-title"
          eyebrow="Showreel"
          align="center"
          dark
          title={
            <>
              Watch <span className="text-gold-gradient-light">MC AYYK</span> in action
            </>
          }
          intro="Experience the energy, stage presence, and seamless event flow MC AYYK brings to every occasion."
        />

        <div className="mt-14 overflow-hidden rounded-3xl border border-white/10 bg-night-soft shadow-2xl" data-reveal="2">
          {site.showreelUrl && isPlaying ? (
            <div className="relative aspect-video w-full">
              <iframe
                src={site.showreelUrl}
                title="MC AYYK Event Hosting Showreel"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="size-full border-0"
              />
            </div>
          ) : (
            <div className="group relative aspect-video w-full cursor-pointer overflow-hidden" onClick={() => setIsPlaying(true)}>
              <Image
                src={heroImg}
                alt="MC AYYK stage performance preview"
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 70vw, 95vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

              {/* Play button indicator */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-center">
                <button
                  type="button"
                  aria-label="Play showreel video"
                  className="inline-flex size-20 items-center justify-center rounded-full bg-gold-500/90 text-white shadow-2xl shadow-gold-500/50 backdrop-blur transition-all duration-300 group-hover:scale-110 group-hover:bg-gold-400"
                >
                  <svg className="ml-1 size-8 fill-current" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
                <p className="font-display text-xl font-bold tracking-tight text-white">
                  Watch Event Highlights
                </p>
                {!site.showreelUrl && (
                  <Placeholder dark>[ADD YOUTUBE / VIMEO EMBED URL IN src/lib/site.ts]</Placeholder>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
