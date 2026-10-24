import { cx } from "@/lib/utils";

/** Illustrative account rows — fictional companies, not customer data. */
const accounts = [
  {
    name: "Northwind Logistics",
    priority: 92,
    fit: 88,
    signals: ["funding · 3d", "hiring +14", "news"],
    stage: "Sales Ready",
  },
  { name: "Arcadia Robotics", priority: 78, fit: 81, signals: ["hiring +6", "stack"], stage: "Engaged" },
  { name: "Verity Health", priority: 64, fit: 74, signals: ["news · 11d"], stage: "Watching" },
  { name: "Harbor Analytics", priority: 41, fit: 69, signals: ["—"], stage: "Cold" },
] as const;

const stageTone: Record<string, string> = {
  "Sales Ready": "bg-sage text-forest border-forest/30",
  Engaged: "bg-powder text-marine border-marine/25",
  Watching: "bg-cream/70 text-clay border-clay/25",
  Cold: "bg-shell text-slate border-hair-strong",
};

export function MarketRadarVisual() {
  return (
    <div className="bg-paper border-hair rounded-xl border p-4 sm:p-6">
      <div className="border-hair flex flex-wrap items-baseline justify-between gap-2 border-b pb-3">
        <span className="eyebrow">account queue · ranked by priority</span>
        <span className="border-hair-strong text-slate-soft rounded-full border px-2 py-0.5 font-mono text-[0.625rem] tracking-[0.08em] uppercase">
          mockup
        </span>
      </div>

      <ul className="divide-hair divide-y">
        {accounts.map((account) => (
          <li key={account.name} className="flex flex-wrap items-center gap-x-4 gap-y-2 py-3.5">
            <span className="text-ink w-8 shrink-0 font-mono text-[1.0625rem] tabular-nums">{account.priority}</span>

            <span className="min-w-[8.5rem] flex-1">
              <span className="font-display text-ink block text-[1.0625rem] leading-tight">{account.name}</span>
              <span className="mt-1.5 flex items-center gap-2">
                <span className="bg-shell relative h-1.5 w-20 overflow-hidden rounded-full">
                  <span
                    className="bg-marine/55 absolute inset-y-0 left-0 rounded-full"
                    style={{ width: `${account.fit}%` }}
                  />
                </span>
                <span className="text-slate-soft font-mono text-[0.625rem] tracking-[0.06em]">fit {account.fit}</span>
              </span>
            </span>

            <span className="flex flex-wrap gap-1.5">
              {account.signals.map((signal) => (
                <span
                  key={signal}
                  className="bg-shell text-slate rounded px-1.5 py-0.5 font-mono text-[0.625rem] tracking-[0.04em]"
                >
                  {signal}
                </span>
              ))}
            </span>

            <span
              className={cx(
                "shrink-0 rounded-full border px-2.5 py-1 font-mono text-[0.625rem] tracking-[0.06em]",
                stageTone[account.stage],
              )}
            >
              {account.stage}
            </span>
          </li>
        ))}
      </ul>

      <div className="border-hair bg-shell/60 mt-5 rounded-lg border p-3.5">
        <div className="flex items-center gap-2">
          <span className="bg-forest motif-pulse h-1.5 w-1.5 rounded-full" aria-hidden="true" />
          <span className="text-slate font-mono text-[0.6875rem] tracking-[0.08em]">#gtm-alerts</span>
        </div>
        <p className="text-ink mt-2 text-[0.875rem] leading-snug">
          <span className="font-display">Northwind Logistics</span> → Sales Ready
        </p>
        <p className="text-slate mt-1 font-mono text-[0.6875rem] leading-relaxed">
          strong ICP fit (88) + funding 3d + hiring surge · 3 signals in 7 days
        </p>
      </div>
    </div>
  );
}
