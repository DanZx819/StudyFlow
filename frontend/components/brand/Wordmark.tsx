"use client";

interface WordmarkProps {
  size?: number;
  c1?: string;
  c2?: string;
}

export default function Wordmark({
  size = 56,
  c1 = "oklch(0.32 0.16 285)",
  c2 = "oklch(0.62 0.19 250)",
}: WordmarkProps) {
  return (
    <span
      style={{
        fontFamily: "var(--font-nunito), 'Nunito', system-ui, sans-serif",
        fontWeight: 900,
        fontSize: size,
        lineHeight: 1,
        letterSpacing: "-0.025em",
        display: "inline-flex",
        gap: "0.04em",
      }}
    >
      <span style={{ color: c1 }}>Study</span>
      <span style={{ color: c2 }}>Flow</span>
    </span>
  );
}
