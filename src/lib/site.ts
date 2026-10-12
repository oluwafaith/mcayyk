/**
 * Single source of truth for all site content.
 *
 * Everything below marked "FROM FLYER" was transcribed from the original flyer.
 * Anything set to `null` / empty is unknown and renders as a clearly marked
 * [PLACEHOLDER] on the site until you fill it in.
 */

export type Phone = {
  /** Human-friendly format shown on screen */
  display: string;
  /** E.164 format used for tel: links */
  e164: string;
};

export type Service = {
  id: "parties" | "wedding" | "corporate";
  /** FROM FLYER */
  name: string;
  /** [PLACEHOLDER] short package description */
  details: string | null;
  /** [PLACEHOLDER] price or "from" price, e.g. "From ₦___" */
  price: string | null;
};

export type Social = {
  label: "Instagram" | "TikTok" | "Facebook" | "X" | "YouTube";
  /** Full profile URL. Leave empty to show a placeholder. */
  url: string;
};

export const site = {
  /** FROM FLYER */
  name: "MC AYYK",
  /** FROM FLYER */
  title: "Master Of Ceremonies",

  /** Your live domain, used for canonical URLs + Open Graph. Set NEXT_PUBLIC_SITE_URL. */
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",

  description:
    "MC AYYK, Master Of Ceremonies for Parties, Weddings and Corporate Events. Book now on +234 916 983 0753 or +234 904 428 7651.",

  /** FROM FLYER */
  phones: [
    { display: "+234 916 983 0753", e164: "+2349169830753" },
    { display: "+234 904 428 7651", e164: "+2349044287651" },
  ] satisfies Phone[],

  /** FROM FLYER */
  email: "poniayoyinka@gmail.com",

  /**
   * [PLACEHOLDER] WhatsApp number in E.164 without "+", e.g. "2349169830753".
   * Leave null to hide WhatsApp buttons.
   */
  whatsapp: null as string | null,

  /** [PLACEHOLDER] City / service area, e.g. "Lagos, Nigeria · Available nationwide" */
  serviceArea: null as string | null,

  /** FROM FLYER (names). Details + prices are placeholders. */
  services: [
    { id: "parties", name: "Parties", details: null, price: null },
    { id: "wedding", name: "Wedding", details: null, price: null },
    { id: "corporate", name: "Corporate Events", details: null, price: null },
  ] satisfies Service[],

  /** [PLACEHOLDER] Paste full profile URLs. */
  socials: [
    { label: "Instagram", url: "" },
    { label: "TikTok", url: "" },
    { label: "Facebook", url: "" },
    { label: "X", url: "" },
  ] satisfies Social[],

  /**
   * Web3Forms access key (free & instant delivery to your email): https://web3forms.com
   * Enter your access key in NEXT_PUBLIC_WEB3FORMS_KEY.
   */
  web3formsKey: process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "",

  /**
   * Formspree / custom form endpoint. Set NEXT_PUBLIC_FORM_ENDPOINT,
   * e.g. https://formspree.io/f/abcdwxyz.
   */
  formEndpoint: process.env.NEXT_PUBLIC_FORM_ENDPOINT || "",

  /** [PLACEHOLDER] YouTube/Vimeo embed URL or video file URL for event showreel */
  showreelUrl: null as string | null,

  /** Frequently asked questions for event booking */
  faqs: [
    {
      q: "What types of events does MC AYYK host?",
      a: "MC AYYK specializes in Weddings, Private Parties (birthdays, anniversaries, galas), and Corporate Events (award ceremonies, product launches, conferences).",
    },
    {
      q: "Does MC AYYK travel for events outside his primary location?",
      a: "Yes! MC AYYK is available for destination weddings and corporate engagements across Nigeria and internationally.",
    },
    {
      q: "How far in advance should I book?",
      a: "It is recommended to book as early as possible—typically 2 to 6 months in advance for weddings and major corporate dates.",
    },
    {
      q: "What is included in MC AYYK's hosting package?",
      a: "Packages include event coordination on the day, timeline management, pre-event consultation, crowd engagement, and professional stage hosting. Custom requirements can be discussed during booking.",
    },
  ],

  /** Static year avoids non-deterministic Date() during prerendering. Update yearly. */
  copyrightYear: 2026,
};

export const telHref = (p: Phone) => `tel:${p.e164}`;
export const mailHref = (subject?: string) =>
  `mailto:${site.email}${subject ? `?subject=${encodeURIComponent(subject)}` : ""}`;
export const whatsappHref = (text = "Hello MC AYYK, I'd like to book you for my event.") =>
  site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}` : null;
export const mapsHref = () =>
  site.serviceArea
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(site.serviceArea)}`
    : null;

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#packages", label: "Packages" },
  { href: "#showreel", label: "Showreel" },
  { href: "#gallery", label: "Gallery" },
  { href: "#reviews", label: "Reviews" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Contact" },
] as const;
