import { MicIcon } from "./Icons";

type LogoProps = {
  className?: string;
  /** "light" = for dark backgrounds */
  tone?: "dark" | "light";
};

/**
 * Recreation of the flyer's stacked serif "MC / AYYK" wordmark with a small mic.
 * Replace with an <Image> of the real logo file once available.
 */
export function Logo({ className = "", tone = "dark" }: LogoProps) {
  const gradient = tone === "dark" ? "text-gold-gradient" : "text-gold-gradient-light";
  return (
    <span className={`inline-flex items-end gap-1 ${className}`}>
      <MicIcon
        className={`mb-[0.55em] size-[0.7em] ${tone === "dark" ? "text-gold-700" : "text-gold-300"}`}
        strokeWidth={2.2}
      />
      <span
        className={`flex flex-col items-center font-serif leading-[0.82] font-semibold tracking-[0.02em] ${gradient}`}
        aria-hidden="true"
      >
        <span className="text-[1.3em]">MC</span>
        <span className="text-[0.92em] tracking-[0.06em]">AYYK</span>
      </span>
      <span className="sr-only">MC AYYK</span>
    </span>
  );
}
