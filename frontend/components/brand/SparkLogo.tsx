"use client";

interface SparkLogoProps {
  size?: number;
  expression?: "happy" | "wink" | "focus" | "sleep";
  variant?: "duo" | "mono-light" | "mono-dark";
  withSparks?: boolean;
  id?: string;
}

const PURPLE_DEEP = "oklch(0.32 0.16 285)";
const PURPLE = "oklch(0.45 0.18 285)";
const BLUE = "oklch(0.62 0.19 250)";
const CORAL = "oklch(0.72 0.17 30)";
const AMBER = "oklch(0.82 0.14 75)";
const INK = "oklch(0.22 0.04 280)";

export default function SparkLogo({
  size = 200,
  expression = "happy",
  variant = "duo",
  withSparks = true,
  id: idProp = "",
}: SparkLogoProps) {
  const pfx = (n: string) => `${n}${idProp}`;
  const isMonoLight = variant === "mono-light";
  const isMonoDark = variant === "mono-dark";

  const outerFill = isMonoLight
    ? "#fff"
    : isMonoDark
      ? INK
      : `url(#${pfx("sparkOuter")})`;

  const innerFill = isMonoLight || isMonoDark
    ? "transparent"
    : `url(#${pfx("sparkInner")})`;

  const innerOpacity = isMonoLight || isMonoDark ? 0 : 1;

  const faceColor = isMonoLight ? PURPLE_DEEP : isMonoDark ? "#fff" : PURPLE_DEEP;

  const showCheeks = !isMonoLight && !isMonoDark;

  const eyeY = 138;
  const leftEyeCx = 90;
  const rightEyeCx = 110;

  let leftEye, rightEye, mouth;

  if (expression === "wink") {
    leftEye = <circle cx={leftEyeCx} cy={eyeY} r="3" fill={faceColor} />;
    rightEye = (
      <path
        d={`M${rightEyeCx - 5} ${eyeY} Q${rightEyeCx} ${eyeY - 4} ${rightEyeCx + 5} ${eyeY}`}
        stroke={faceColor} strokeWidth="2.5" strokeLinecap="round" fill="none"
      />
    );
    mouth = <path d="M92 148 Q100 156 108 148" stroke={faceColor} strokeWidth="2.6" strokeLinecap="round" fill="none" />;
  } else if (expression === "focus") {
    leftEye = <rect x={leftEyeCx - 4} y={eyeY - 1} width="8" height="3" rx="1.5" fill={faceColor} />;
    rightEye = <rect x={rightEyeCx - 4} y={eyeY - 1} width="8" height="3" rx="1.5" fill={faceColor} />;
    mouth = <path d="M93 150 Q100 153 107 150" stroke={faceColor} strokeWidth="2.6" strokeLinecap="round" fill="none" />;
  } else if (expression === "sleep") {
    leftEye = (
      <path d={`M${leftEyeCx - 5} ${eyeY} Q${leftEyeCx} ${eyeY + 4} ${leftEyeCx + 5} ${eyeY}`}
        stroke={faceColor} strokeWidth="2.5" strokeLinecap="round" fill="none"
      />
    );
    rightEye = (
      <path d={`M${rightEyeCx - 5} ${eyeY} Q${rightEyeCx} ${eyeY + 4} ${rightEyeCx + 5} ${eyeY}`}
        stroke={faceColor} strokeWidth="2.5" strokeLinecap="round" fill="none"
      />
    );
    mouth = <path d="M94 150 Q100 154 106 150" stroke={faceColor} strokeWidth="2.4" strokeLinecap="round" fill="none" />;
  } else {
    leftEye = <circle cx={leftEyeCx} cy={eyeY} r="3" fill={faceColor} />;
    rightEye = <circle cx={rightEyeCx} cy={eyeY} r="3" fill={faceColor} />;
    mouth = <path d="M92 148 Q100 158 108 148" stroke={faceColor} strokeWidth="2.8" strokeLinecap="round" fill="none" />;
  }

  return (
    <svg width={size} height={size} viewBox="0 0 200 200" fill="none" aria-label="StudyFlow Spark">
      <defs>
        <linearGradient id={pfx("sparkOuter")} x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0" stopColor={PURPLE} />
          <stop offset="0.55" stopColor={BLUE} />
          <stop offset="1" stopColor={CORAL} />
        </linearGradient>
        <linearGradient id={pfx("sparkInner")} x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0" stopColor={AMBER} />
          <stop offset="1" stopColor={CORAL} />
        </linearGradient>
      </defs>

      {/* outer flame body */}
      <path
        d="M100 18 C 132 56, 160 84, 160 122 C 160 158, 132 184, 100 184 C 68 184, 40 158, 40 122 C 40 96, 56 80, 68 64 C 76 76, 78 92, 74 106 C 86 92, 92 70, 100 18 Z"
        fill={outerFill}
      />

      {/* inner flame core */}
      <path
        d="M100 70 C 116 92, 132 110, 132 134 C 132 154, 118 168, 100 168 C 82 168, 68 154, 68 134 C 68 120, 78 110, 86 102 C 90 110, 90 118, 90 124 C 96 116, 98 100, 100 70 Z"
        fill={innerFill}
        opacity={innerOpacity}
      />

      {/* cheeks */}
      {showCheeks && (
        <>
          <ellipse cx="80" cy="148" rx="6" ry="4" fill={CORAL} opacity="0.55" />
          <ellipse cx="120" cy="148" rx="6" ry="4" fill={CORAL} opacity="0.55" />
        </>
      )}

      {/* face */}
      {leftEye}
      {rightEye}
      {mouth}

      {/* sparks */}
      {withSparks && (
        <>
          <circle cx="170" cy="58" r="3" fill={isMonoLight ? "#fff" : isMonoDark ? INK : CORAL} />
          <circle cx="28" cy="78" r="2.5" fill={isMonoLight ? "#fff" : isMonoDark ? INK : BLUE} />
          <circle cx="178" cy="128" r="2.5" fill={isMonoLight ? "#fff" : isMonoDark ? INK : PURPLE} opacity="0.85" />
          <circle cx="22" cy="150" r="3" fill={isMonoLight ? "#fff" : isMonoDark ? INK : CORAL} />
          <circle cx="160" cy="30" r="2" fill={isMonoLight ? "#fff" : isMonoDark ? INK : AMBER} />
        </>
      )}
    </svg>
  );
}
