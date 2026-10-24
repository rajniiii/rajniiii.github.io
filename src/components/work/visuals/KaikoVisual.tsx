const steps = [
  { from: "agent", to: "server", label: "tools/list", detail: "discover what exists" },
  { from: "agent", to: "server", label: "get_exchanges()", detail: "model picks the tool" },
  { from: "server", to: "api", label: "GET /reference", detail: "authed HTTP call" },
  { from: "api", to: "agent", label: "JSON", detail: "returned verbatim" },
] as const;

const lanes = ["agent · LLM", "FastMCP server", "Kaiko API"] as const;

export function KaikoVisual() {
  return (
    <div className="bg-paper border-hair rounded-xl border p-4 sm:p-6">
      <div className="border-hair flex flex-wrap items-baseline justify-between gap-2 border-b pb-3">
        <span className="eyebrow">tool call path</span>
        <span className="text-slate font-mono text-[0.6875rem] tracking-[0.04em]">3 tools registered</span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2">
        {lanes.map((lane, index) => (
          <span
            key={lane}
            className={`rounded-lg px-2 py-2 text-center font-mono text-[0.625rem] leading-tight tracking-[0.04em] sm:text-[0.6875rem] ${
              index === 0 ? "bg-peach/70 text-clay" : index === 1 ? "bg-shell text-ink" : "bg-powder/70 text-marine"
            }`}
          >
            {lane}
          </span>
        ))}
      </div>

      <ol className="mt-4 space-y-2.5">
        {steps.map((step, index) => {
          const laneIndex = step.from === "agent" ? 0 : step.from === "server" ? 1 : 2;
          const targetIndex = step.to === "agent" ? 0 : step.to === "server" ? 1 : 2;
          const reversed = targetIndex < laneIndex;

          return (
            <li key={step.label} className="flex items-center gap-3">
              <span className="text-slate-soft w-4 shrink-0 font-mono text-[0.625rem]">{index + 1}</span>
              <span className="flex-1">
                <span className="flex items-center gap-2">
                  <span
                    aria-hidden="true"
                    className="bg-hair-strong h-px flex-1"
                    style={{ opacity: reversed ? 0.45 : 1 }}
                  />
                  <code className="bg-shell text-ink rounded px-2 py-0.5 font-mono text-[0.6875rem] tracking-[0.02em]">
                    {step.label}
                  </code>
                  <span aria-hidden="true" className="text-slate-soft font-mono text-[0.75rem]">
                    {reversed ? "←" : "→"}
                  </span>
                </span>
                <span className="text-slate-soft mt-1 block font-mono text-[0.625rem] tracking-[0.04em]">
                  {step.detail}
                </span>
              </span>
            </li>
          );
        })}
      </ol>

      <div className="border-hair bg-shell/50 mt-5 rounded-lg border p-3.5">
        <span className="eyebrow">registered tools</span>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {["get_exchanges", "get_instruments", "get_assets"].map((tool) => (
            <code
              key={tool}
              className="bg-paper border-hair text-ink rounded border px-2 py-1 font-mono text-[0.6875rem]"
            >
              {tool}
            </code>
          ))}
        </div>
      </div>
    </div>
  );
}
