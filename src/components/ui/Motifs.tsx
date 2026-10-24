import { cx } from "@/lib/utils";

/** Decorative only — every motif is aria-hidden and never carries meaning. */

export function StarMotif({ className, size = 22 }: { className?: string; size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={cx("text-plum/45", className)}
    >
      <path
        d="M12 0c.6 6.4 5 10.8 12 12-7 1.2-11.4 5.6-12 12-.6-6.4-5-10.8-12-12C7 10.8 11.4 6.4 12 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function OrbitMotif({ className, size = 120 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 120 120" aria-hidden="true" className={className}>
      <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 7" />
      <circle cx="60" cy="60" r="34" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.5" />
      <circle cx="60" cy="8" r="3.5" fill="currentColor" />
    </svg>
  );
}

export function ArcMotif({ className, size = 90 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size / 2} viewBox="0 0 90 45" aria-hidden="true" className={className}>
      <path d="M1 44a44 44 0 0 1 88 0" fill="none" stroke="currentColor" strokeWidth="1.25" />
      <path d="M14 44a31 31 0 0 1 62 0" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.45" />
    </svg>
  );
}

export function CrossMotif({ className, size = 14 }: { className?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" aria-hidden="true" className={className}>
      <path d="M7 0v14M0 7h14" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

export function WaveMotif({ className, width = 160 }: { className?: string; width?: number }) {
  return (
    <svg
      width={width}
      height="24"
      viewBox="0 0 160 24"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M0 12c10-9 20-9 30 0s20 9 30 0 20-9 30 0 20 9 30 0 20-9 30 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      />
    </svg>
  );
}
