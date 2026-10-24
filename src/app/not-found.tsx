import Link from "next/link";
import { ArcMotif } from "@/components/ui/Motifs";

export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-[1240px] flex-col items-start px-5 pt-40 pb-32 sm:px-8">
      <ArcMotif className="text-plum/50" size={96} />
      <p className="eyebrow mt-8">Error 404</p>
      <h1 className="display-lg mt-4 max-w-[24ch]">This page is not part of the record.</h1>
      <p className="lede mt-5 max-w-[46ch]">
        The link may be old, or the page may never have existed. The work is all one click away.
      </p>
      <Link
        href="/"
        className="bg-ink text-ivory hover:bg-plum mt-9 rounded-full px-6 py-3 font-mono text-[0.75rem] tracking-[0.1em] uppercase transition-colors duration-300"
      >
        Back to the portfolio
      </Link>
    </section>
  );
}
