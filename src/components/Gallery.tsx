import Image, { type StaticImageData } from "next/image";
import corporate from "@/assets/images/gallery-corporate.jpg";
import party from "@/assets/images/gallery-party.jpg";
import wedding from "@/assets/images/gallery-wedding.jpg";
import mic from "@/assets/images/hero-placeholder.jpg";
import { SectionHeading } from "./ui";

/* REPLACE: these are stand-in images. Swap them for real photos of MC AYYK hosting. */
const photos: { src: StaticImageData; alt: string; caption: string; className: string }[] = [
  {
    src: wedding,
    alt: "Wedding reception hall with gold chairs, white linens and floral centrepieces",
    caption: "Wedding",
    className: "sm:col-span-2 sm:row-span-2",
  },
  {
    src: party,
    alt: "Guests dancing under gold confetti at a lively party",
    caption: "Parties",
    className: "",
  },
  {
    src: corporate,
    alt: "Audience facing a lit stage and lectern at a corporate event",
    caption: "Corporate Events",
    className: "",
  },
  {
    src: mic,
    alt: "Wireless microphone on a stage with warm golden chandelier lighting",
    caption: "On the mic",
    className: "sm:col-span-3 lg:col-span-1",
  },
];

export function Gallery() {
  return (
    <section aria-labelledby="gallery-title" id="gallery" className="bg-paper-light py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            id="gallery-title"
            eyebrow="Gallery"
            title={
              <>
                Moments on the <span className="text-gold-gradient">mic</span>
              </>
            }
          />
          <a href="#contact" className="btn btn-gold self-start md:self-auto" data-reveal>
            Book for your event
          </a>
        </div>

        <ul className="mt-14 grid auto-rows-[15rem] gap-4 sm:grid-cols-3 sm:auto-rows-[13rem] lg:grid-cols-4 lg:auto-rows-[14rem]">
          {photos.map((p, i) => (
            <li
              key={p.caption}
              data-reveal={String((i % 3) + 1)}
              className={`group relative overflow-hidden rounded-3xl bg-paper ${p.className} ${i === 3 ? "lg:col-start-4 lg:row-start-1 lg:row-span-2" : ""}`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                placeholder="blur"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 92vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100"
                aria-hidden="true"
              />
              <p className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3.5 py-1.5 text-sm font-bold text-ink shadow-lg backdrop-blur">
                {p.caption}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
