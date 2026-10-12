import type { ReactNode } from "react";

/**
 * Clearly-marked placeholder for content not present on the flyer.
 * Search the codebase for "[ADD" to find every one.
 */
export function Placeholder({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <span className={dark ? "placeholder-tag-dark" : "placeholder-tag"}>{children}</span>;
}

export function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  align = "left",
  dark = false,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  dark?: boolean;
}) {
  const centered = align === "center";
  return (
    <header className={`max-w-2xl ${centered ? "mx-auto text-center" : ""}`} data-reveal>
      <p className={`eyebrow ${dark ? "text-gold-300!" : ""}`}>{eyebrow}</p>
      <h2
        id={id}
        className={`mt-4 font-display text-[clamp(1.85rem,5.5vw,3.4rem)] leading-[1.06] font-extrabold tracking-[-0.03em] ${
          dark ? "text-white" : "text-ink"
        }`}
      >
        {title}
      </h2>
      {intro && (
        <p className={`mt-4 text-lg leading-relaxed ${dark ? "text-white/70" : "text-ink-muted"}`}>{intro}</p>
      )}
    </header>
  );
}
