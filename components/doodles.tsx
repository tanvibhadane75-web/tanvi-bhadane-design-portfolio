import type { DoodleKind } from '@/lib/content';

type DoodlesProps = {
  kind: DoodleKind;
  className?: string;
};

const stroke = {
  fill: 'none',
  stroke: '#171717',
  strokeWidth: 1.4,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

const strokeSoft = {
  ...stroke,
  stroke: '#b6a88f',
};

export function Doodle({ kind, className }: DoodlesProps) {
  switch (kind) {
    case 'strings':
      return (
        <svg viewBox="0 0 220 60" className={className} aria-hidden="true">
          <path className="draw-line" d="M4 14 C 70 20, 150 8, 216 16" {...strokeSoft} pathLength={1} />
          <path className="draw-line" d="M4 30 C 70 24, 150 38, 216 30" {...strokeSoft} pathLength={1} />
          <path className="draw-line" d="M4 46 C 70 42, 150 52, 216 44" {...strokeSoft} pathLength={1} />
          <circle cx="110" cy="30" r="2" fill="#b6a88f" />
          <circle cx="150" cy="31" r="2" fill="#b6a88f" />
        </svg>
      );
    case 'ukulele':
      return (
        <svg viewBox="0 0 90 190" className={className} aria-hidden="true">
          <path className="draw-line" d="M45 8 L45 96" {...stroke} pathLength={1} />
          <path className="draw-line" d="M38 10 L38 92" {...strokeSoft} pathLength={1} />
          <path className="draw-line" d="M52 10 L52 92" {...strokeSoft} pathLength={1} />
          <path
            className="draw-line"
            d="M45 92 C 20 96, 12 118, 18 140 C 24 164, 48 176, 66 166 C 86 155, 86 128, 74 112 C 66 101, 56 96, 45 92 Z M45 122 a 12 12 0 1 0 0.1 0"
            {...stroke}
            pathLength={1}
          />
          <path className="draw-line" d="M30 150 L60 126" {...strokeSoft} pathLength={1} />
        </svg>
      );
    case 'portrait':
      return (
        <svg viewBox="0 0 120 150" className={className} aria-hidden="true">
          <path className="draw-line" d="M60 22 C 76 22, 84 36, 82 52 C 81 62, 74 70, 74 78" {...stroke} pathLength={1} />
          <path className="draw-line" d="M60 22 C 46 22, 38 34, 40 50 C 41 60, 47 68, 48 76" {...stroke} pathLength={1} />
          <path className="draw-line" d="M50 96 C 50 88, 46 82, 48 76 M72 96 C 72 88, 75 82, 74 78" {...strokeSoft} pathLength={1} />
          <path className="draw-line" d="M34 132 C 38 112, 50 100, 61 100 C 74 100, 84 112, 88 132" {...stroke} pathLength={1} />
          <path className="draw-line" d="M52 56 C 55 58, 59 58, 62 56" {...strokeSoft} pathLength={1} />
        </svg>
      );
    case 'palette':
      return (
        <svg viewBox="0 0 120 100" className={className} aria-hidden="true">
          <path
            className="draw-line"
            d="M58 18 C 30 18, 14 38, 16 58 C 18 78, 38 90, 58 88 C 66 87, 66 80, 62 76 C 57 71, 60 64, 68 64 L 84 64 C 98 64, 106 52, 102 40 C 97 26, 78 18, 58 18 Z"
            {...stroke}
            pathLength={1}
          />
          <circle cx="38" cy="42" r="3" fill="#b6a88f" />
          <circle cx="52" cy="32" r="3" fill="#b6a88f" />
          <circle cx="70" cy="32" r="3" fill="#b6a88f" />
          <path className="draw-line" d="M88 60 L 108 20 L 114 26 L 96 64" {...strokeSoft} pathLength={1} />
        </svg>
      );
    case 'sun':
      return (
        <svg viewBox="0 0 140 90" className={className} aria-hidden="true">
          <path className="draw-line" d="M12 70 C 40 60, 100 60, 128 70" {...strokeSoft} pathLength={1} />
          <path className="draw-line" d="M70 52 a 16 16 0 1 0 0.1 0" {...stroke} pathLength={1} />
          {['M70 22 L70 12', 'M40 32 L33 25', 'M100 32 L107 25', 'M28 52 L17 49', 'M112 52 L123 49'].map((d) => (
            <path key={d} className="draw-line" d={d} {...strokeSoft} pathLength={1} />
          ))}
          <path className="draw-line" d="M30 78 C 50 84, 90 84, 110 78" {...stroke} pathLength={1} />
        </svg>
      );
    case 'book':
      return (
        <svg viewBox="0 0 130 90" className={className} aria-hidden="true">
          <path className="draw-line" d="M65 24 C 50 14, 24 14, 12 20 L 12 70 C 26 64, 50 64, 65 74" {...stroke} pathLength={1} />
          <path className="draw-line" d="M65 24 C 80 14, 106 14, 118 20 L 118 70 C 104 64, 80 64, 65 74" {...stroke} pathLength={1} />
          <path className="draw-line" d="M65 24 L 65 74" {...stroke} pathLength={1} />
          <path className="draw-line" d="M22 32 C 34 28, 48 29, 56 33 M22 44 C 34 40, 48 41, 56 45 M74 33 C 82 29, 96 28, 108 32 M74 45 C 82 41, 96 40, 108 44" {...strokeSoft} pathLength={1} />
        </svg>
      );
    case 'sparkle':
      return (
        <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
          <path className="draw-line" d="M20 6 C 21 14, 26 19, 34 20 C 26 21, 21 26, 20 34 C 19 26, 14 21, 6 20 C 14 19, 19 14, 20 6 Z" {...strokeSoft} pathLength={1} />
        </svg>
      );
  }
}

export function ArrowDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 60" className={className} aria-hidden="true">
      <path className="draw-line" d="M6 8 C 40 10, 80 22, 104 46" {...strokeSoft} pathLength={1} />
      <path className="draw-line" d="M96 44 L 105 47 L 102 38" {...strokeSoft} pathLength={1} />
    </svg>
  );
}
