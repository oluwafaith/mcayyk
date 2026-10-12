import { About } from "@/components/About";
import { Contact } from "@/components/Contact";
import { CtaBand } from "@/components/CtaBand";
import { Faq } from "@/components/Faq";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Hero } from "@/components/Hero";
import { MobileCtaBar } from "@/components/MobileCtaBar";
import { Navbar } from "@/components/Navbar";
import { Packages } from "@/components/Packages";
import { Showreel } from "@/components/Showreel";
import { Testimonials } from "@/components/Testimonials";
import { site } from "@/lib/site";

// Structured data for search engines, using only facts from the flyer.
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: `${site.name}, ${site.title}`,
  description: site.description,
  url: site.url,
  email: `mailto:${site.email}`,
  telephone: site.phones.map((p) => p.e164),
  ...(site.serviceArea ? { areaServed: site.serviceArea } : {}),
  sameAs: site.socials.map((s) => s.url).filter(Boolean),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Package",
    itemListElement: site.services.map((s) => ({
      "@type": "Offer",
      itemOffered: { "@type": "Service", name: `MC for ${s.name}` },
    })),
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Packages />
        <Showreel />
        <Gallery />
        <Testimonials />
        <Faq />
        <CtaBand />
        <Contact />
      </main>
      <Footer />
      <MobileCtaBar />
    </>
  );
}
