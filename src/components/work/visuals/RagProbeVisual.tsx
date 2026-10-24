const categories = [
  { label: "hallucination bait", count: 10 },
  { label: "prompt injection", count: 10 },
  { label: "context poisoning", count: 10 },
  { label: "temporal confusion", count: 10 },
  { label: "out of scope", count: 11 },
] as const;

const config = ["chunks 512/64", "embed 1536-d", "judge ≥ 0.75"] as const;

export function RagProbeVisual() {
  const max = 11;

  return (
    <div className="bg-paper border-hair rounded-xl border p-4 sm:p-6">
      <div className="border-hair flex flex-wrap items-baseline justify-between gap-2 border-b pb-3">
        <span className="eyebrow">probe suite</span>
        <span className="text-ink font-mono text-[0.75rem] tracking-[0.04em]">51 prompts · 5 categories</span>
      </div>

      <ul className="mt-4 space-y-2.5">
        {categories.map((category) => (
          <li key={category.label} className="flex items-center gap-3">
            <span className="text-slate w-[8.5rem] shrink-0 font-mono text-[0.6875rem] tracking-[0.04em] sm:w-[10rem]">
              {category.label}
            </span>
            <span className="bg-shell relative h-2 flex-1 overflow-hidden rounded-full">
              <span
                className="bg-plum/55 absolute inset-y-0 left-0 rounded-full"
                style={{ width: `${(category.count / max) * 100}%` }}
              />
            </span>
            <span className="text-ink w-6 shrink-0 text-right font-mono text-[0.75rem]">{category.count}</span>
          </li>
        ))}
      </ul>

      <div className="border-hair mt-5 border-t pt-5">
        <span className="eyebrow">two paths, one index</span>
        <svg viewBox="0 0 360 118" className="mt-3 h-auto w-full max-w-[560px]" role="img" aria-label="Baseline retrieves five chunks and generates. Hardened retrieves ten chunks, re-ranks, keeps three, cites sources, and refuses below a 0.40 confidence score.">
          {/* baseline track */}
          <text x="0" y="12" fontFamily="var(--font-mono), monospace" fontSize="9" letterSpacing="0.1em" fill="#68677A">
            BASELINE
          </text>
          <rect x="0" y="20" width="62" height="24" rx="12" fill="#FFFDFA" stroke="rgba(41,40,58,0.18)" />
          <text x="31" y="35.5" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="9" fill="#5F5E70">
            top-5
          </text>
          <path d="M66 32h36" stroke="rgba(41,40,58,0.25)" strokeWidth="1" />
          <path d="M98 28.5l5 3.5-5 3.5" fill="none" stroke="rgba(41,40,58,0.25)" strokeWidth="1" />
          <rect x="106" y="20" width="78" height="24" rx="12" fill="#FFFDFA" stroke="rgba(41,40,58,0.18)" />
          <text x="145" y="35.5" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="9" fill="#5F5E70">
            generate
          </text>

          {/* hardened track */}
          <text x="0" y="68" fontFamily="var(--font-mono), monospace" fontSize="9" letterSpacing="0.1em" fill="#655080">
            HARDENED
          </text>
          <rect x="0" y="76" width="62" height="24" rx="12" fill="#E8DFF5" stroke="rgba(101,80,128,0.3)" />
          <text x="31" y="91.5" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="9" fill="#3D3C51">
            top-10
          </text>
          <path d="M66 88h22" stroke="rgba(101,80,128,0.4)" strokeWidth="1" />
          <path d="M84 84.5l5 3.5-5 3.5" fill="none" stroke="rgba(101,80,128,0.4)" strokeWidth="1" />
          <rect x="92" y="76" width="68" height="24" rx="12" fill="#E8DFF5" stroke="rgba(101,80,128,0.3)" />
          <text x="126" y="91.5" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="9" fill="#3D3C51">
            re-rank
          </text>
          <path d="M164 88h22" stroke="rgba(101,80,128,0.4)" strokeWidth="1" />
          <path d="M182 84.5l5 3.5-5 3.5" fill="none" stroke="rgba(101,80,128,0.4)" strokeWidth="1" />
          <rect x="190" y="76" width="60" height="24" rx="12" fill="#E8DFF5" stroke="rgba(101,80,128,0.3)" />
          <text x="220" y="91.5" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="9" fill="#3D3C51">
            top-3
          </text>
          <path d="M254 88h22" stroke="rgba(101,80,128,0.4)" strokeWidth="1" />
          <path d="M250 84.5l5 3.5-5 3.5" fill="none" stroke="rgba(101,80,128,0.4)" strokeWidth="1" transform="translate(22,0)" />
          <rect x="278" y="76" width="82" height="24" rx="12" fill="#FFFDFA" stroke="rgba(101,80,128,0.3)" />
          <text x="319" y="91.5" textAnchor="middle" fontFamily="var(--font-mono), monospace" fontSize="9" fill="#5F5E70">
            cite / refuse
          </text>

          {/* refusal gate annotation */}
          <path d="M319 72V58h-44" stroke="rgba(138,83,64,0.45)" strokeWidth="1" strokeDasharray="3 3" fill="none" />
          <text x="271" y="55" textAnchor="end" fontFamily="var(--font-mono), monospace" fontSize="8.5" fill="#8A5340">
            score &lt; 0.40 → refuse
          </text>
        </svg>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {config.map((item) => (
          <span
            key={item}
            className="bg-shell text-slate rounded-full px-2.5 py-1 font-mono text-[0.6875rem] tracking-[0.04em]"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
