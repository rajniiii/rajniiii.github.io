/** Small system schematic: the shape shared by most of the work on this site. */
export function HeroSchematic({ className }: { className?: string }) {
  const inputs = [
    { y: 34, label: "corpus" },
    { y: 86, label: "signals" },
    { y: 138, label: "tools" },
  ];

  return (
    <svg
      viewBox="0 0 368 196"
      className={className}
      role="img"
      aria-label="Schematic: a corpus, signals and tools feed a retrieve, score and gate stage, which produces a ranked and explained output."
    >
      <defs>
        <linearGradient id="hero-core" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-lavender)" />
          <stop offset="100%" stopColor="var(--color-powder)" />
        </linearGradient>
      </defs>

      {inputs.map((input) => (
        <g key={input.label}>
          <rect
            x="4"
            y={input.y}
            width="84"
            height="30"
            rx="15"
            fill="var(--color-paper)"
            stroke="var(--color-hair-strong)"
          />
          <text
            x="46"
            y={input.y + 19}
            textAnchor="middle"
            fontFamily="var(--font-mono), monospace"
            fontSize="10"
            letterSpacing="0.1em"
            fill="var(--color-slate)"
          >
            {input.label}
          </text>
          <path
            d={`M90 ${input.y + 15} C 118 ${input.y + 15}, 124 98, 146 98`}
            fill="none"
            stroke="var(--line-accent)"
            strokeWidth="1.1"
          />
        </g>
      ))}

      <circle cx="146" cy="98" r="3" fill="var(--color-plum)" className="motif-pulse" />

      <rect x="150" y="56" width="104" height="84" rx="14" fill="url(#hero-core)" stroke="var(--color-hair)" />
      <text
        x="202"
        y="88"
        textAnchor="middle"
        fontFamily="var(--font-mono), monospace"
        fontSize="9.5"
        letterSpacing="0.12em"
        fill="var(--color-ink)"
      >
        retrieve
      </text>
      <text
        x="202"
        y="104"
        textAnchor="middle"
        fontFamily="var(--font-mono), monospace"
        fontSize="9.5"
        letterSpacing="0.12em"
        fill="var(--color-ink)"
      >
        score
      </text>
      <text
        x="202"
        y="120"
        textAnchor="middle"
        fontFamily="var(--font-mono), monospace"
        fontSize="9.5"
        letterSpacing="0.12em"
        fill="var(--color-ink)"
      >
        gate
      </text>

      <path d="M254 98h22" stroke="var(--color-hair-strong)" strokeWidth="1.1" />
      <path d="M272 94l6 4-6 4" fill="none" stroke="var(--color-hair-strong)" strokeWidth="1.1" />

      <rect x="282" y="62" width="72" height="22" rx="6" fill="var(--color-sage)" stroke="var(--line-forest)" />
      <rect x="282" y="88" width="72" height="22" rx="6" fill="var(--color-paper)" stroke="var(--color-hair)" />
      <rect x="282" y="114" width="72" height="22" rx="6" fill="var(--color-paper)" stroke="var(--color-hair)" />
      {[73, 99, 125].map((y, index) => (
        <g key={y}>
          <rect x="290" y={y - 3.5} width={index === 0 ? 38 : index === 1 ? 26 : 16} height="4" rx="2" fill="var(--color-hair-strong)" />
          <circle cx="344" cy={y} r="2.5" fill={index === 0 ? "var(--color-forest)" : "var(--color-hair-strong)"} />
        </g>
      ))}

      <text
        x="318"
        y="152"
        textAnchor="middle"
        fontFamily="var(--font-mono), monospace"
        fontSize="8.5"
        letterSpacing="0.06em"
        fill="var(--color-slate-soft)"
      >
        ranked · explained
      </text>
    </svg>
  );
}
