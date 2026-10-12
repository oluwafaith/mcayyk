type Props = { className?: string; title?: string };

// Deterministic scalloped "verified" seal, like the flyer's badge.
const POINTS = 16;
const seal = Array.from({ length: POINTS * 2 }, (_, i) => {
  const r = i % 2 === 0 ? 11.4 : 9.6;
  const a = (Math.PI * i) / POINTS - Math.PI / 2;
  return `${(12 + r * Math.cos(a)).toFixed(2)},${(12 + r * Math.sin(a)).toFixed(2)}`;
}).join(" ");

export function VerifiedBadge({ className = "", title }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <polygon points={seal} fill="#c49a1c" stroke="#c49a1c" strokeWidth="1.6" strokeLinejoin="round" />
      <path
        d="m7.6 12.3 3 3 5.8-6.2"
        fill="none"
        stroke="#fff"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
