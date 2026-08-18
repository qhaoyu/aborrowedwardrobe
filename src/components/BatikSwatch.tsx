import type { BatikPattern } from "@/lib/products";

type BatikSwatchProps = {
  pattern: BatikPattern;
  colorway: [string, string];
  className?: string;
};

// Lightweight generative stand-ins for product photography, so the
// catalogue reads as a real batik line before real photos exist.
export default function BatikSwatch({
  pattern,
  colorway,
  className,
}: BatikSwatchProps) {
  const [base, accent] = colorway;
  const id = `${pattern}-${base.replace("#", "")}-${accent.replace("#", "")}`;

  return (
    <svg
      viewBox="0 0 200 200"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-label={`Batik ${pattern} pattern swatch`}
    >
      <defs>
        <pattern
          id={id}
          width="40"
          height="40"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(0)"
        >
          <rect width="40" height="40" fill={base} />
          {pattern === "parang" && (
            <>
              <path
                d="M0 40 L40 0"
                stroke={accent}
                strokeWidth="6"
                fill="none"
              />
              <path
                d="M-10 10 L10 -10"
                stroke={accent}
                strokeWidth="6"
                fill="none"
              />
              <path
                d="M30 50 L50 30"
                stroke={accent}
                strokeWidth="6"
                fill="none"
              />
              <circle cx="10" cy="30" r="2.5" fill={accent} />
              <circle cx="30" cy="10" r="2.5" fill={accent} />
            </>
          )}
          {pattern === "kawung" && (
            <>
              <ellipse cx="10" cy="10" rx="7" ry="10" fill={accent} />
              <ellipse cx="30" cy="10" rx="7" ry="10" fill={accent} />
              <ellipse cx="10" cy="30" rx="7" ry="10" fill={accent} />
              <ellipse cx="30" cy="30" rx="7" ry="10" fill={accent} />
              <circle cx="20" cy="20" r="3" fill={base} stroke={accent} strokeWidth="1.5" />
            </>
          )}
          {pattern === "mega-mendung" && (
            <>
              <path
                d="M0 20 Q10 5 20 20 T40 20"
                stroke={accent}
                strokeWidth="4"
                fill="none"
              />
              <path
                d="M0 32 Q10 17 20 32 T40 32"
                stroke={accent}
                strokeWidth="3"
                fill="none"
                opacity="0.7"
              />
              <path
                d="M0 8 Q10 -7 20 8 T40 8"
                stroke={accent}
                strokeWidth="3"
                fill="none"
                opacity="0.7"
              />
            </>
          )}
          {pattern === "sekar-jagad" && (
            <>
              <path
                d="M20 5 L23 15 L34 15 L25 22 L28 33 L20 26 L12 33 L15 22 L6 15 L17 15 Z"
                fill={accent}
              />
              <circle cx="5" cy="35" r="3" fill={accent} opacity="0.8" />
              <circle cx="35" cy="35" r="3" fill={accent} opacity="0.8" />
            </>
          )}
          {pattern === "truntum" && (
            <>
              <g fill={accent}>
                <circle cx="10" cy="10" r="2" />
                <circle cx="10" cy="10" r="5" fillOpacity="0" stroke={accent} strokeWidth="1" />
                <circle cx="30" cy="30" r="2" />
                <circle cx="30" cy="30" r="5" fillOpacity="0" stroke={accent} strokeWidth="1" />
                <circle cx="30" cy="10" r="1.5" />
                <circle cx="10" cy="30" r="1.5" />
              </g>
            </>
          )}
          {pattern === "sido-mukti" && (
            <>
              <rect
                x="8"
                y="8"
                width="24"
                height="24"
                fill="none"
                stroke={accent}
                strokeWidth="2"
              />
              <path
                d="M20 12 L23 20 L20 28 L17 20 Z"
                fill={accent}
              />
              <circle cx="20" cy="20" r="2" fill={base} />
            </>
          )}
        </pattern>
      </defs>
      <rect width="200" height="200" fill={`url(#${id})`} />
      <rect
        width="200"
        height="200"
        fill="none"
        stroke={accent}
        strokeOpacity="0.25"
        strokeWidth="10"
      />
    </svg>
  );
}
