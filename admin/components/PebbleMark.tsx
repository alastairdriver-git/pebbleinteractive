export function PebbleMark({ className = "pebble-mark" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 125 102" aria-hidden="true">
      <path fill="currentColor" d="M60 2 C95 -3 122 18 124 48 C126 78 100 100 62 101 C26 102 -2 82 0 50 C2 20 28 7 60 2 Z" />
      <rect x="-20" y="58" width="180" height="12" fill="var(--mark-cut, oklch(var(--camel)))" transform="rotate(-7 62 64)" />
    </svg>
  );
}
