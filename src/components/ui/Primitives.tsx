import type { ReactNode } from "react";
import { cx } from "@/lib/utils";

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cx("eyebrow block", className)}>{children}</span>;
}

/** Renders `backticked` spans in content strings as inline code. */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/`([^`]+)`/g);

  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <code
            key={`${part}-${index}`}
            className="bg-shell text-ink rounded px-1.5 py-0.5 font-mono text-[0.85em] tracking-[0.01em]"
          >
            {part}
          </code>
        ) : (
          part
        ),
      )}
    </>
  );
}

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="border-hair-strong text-slate inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[0.6875rem] leading-none tracking-[0.06em]">
      {children}
    </span>
  );
}

export function Figure({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <figure className="m-0">
      {children}
      <figcaption className="text-slate mt-3 font-mono text-[0.6875rem] leading-relaxed tracking-[0.04em]">
        {caption}
      </figcaption>
    </figure>
  );
}

/** Section frame: hairline rule, mono index, display title, optional aside note. */
export function SectionHeading({
  index,
  title,
  note,
  id,
}: {
  index: string;
  title: string;
  note?: string;
  id?: string;
}) {
  return (
    <header className="rule-hair grid gap-5 pt-6 md:grid-cols-12 md:gap-8">
      <div className="md:col-span-3">
        <Eyebrow>{index}</Eyebrow>
      </div>
      <div className="md:col-span-9">
        <h2 id={id} className="display-lg max-w-[22ch]">
          {title}
        </h2>
        {note ? <p className="lede mt-4 max-w-[52ch]">{note}</p> : null}
      </div>
    </header>
  );
}

const arrowFor: Record<string, string> = {
  repo: "↗",
  demo: "↗",
  video: "↗",
  paper: "↗",
  site: "↗",
};

export function ActionLink({
  href,
  children,
  kind = "repo",
  variant = "quiet",
}: {
  href: string;
  children: ReactNode;
  kind?: string;
  variant?: "quiet" | "solid" | "outline";
}) {
  const external = href.startsWith("http");
  const base =
    "group inline-flex items-center gap-2 font-mono text-[0.75rem] tracking-[0.08em] uppercase transition-colors duration-300";
  const styles = {
    quiet: "text-ink hover:text-plum",
    solid: "bg-ink text-ivory hover:bg-plum rounded-full px-5 py-2.5",
    outline: "border-hair-strong text-ink hover:border-plum hover:text-plum rounded-full border px-5 py-2.5",
  } as const;

  return (
    <a
      href={href}
      className={cx(base, styles[variant])}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
      <span
        aria-hidden="true"
        className="inline-block transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none motion-reduce:group-hover:translate-x-0"
      >
        {arrowFor[kind] ?? "→"}
      </span>
    </a>
  );
}
