import { cx } from "@/lib/utils";

interface Stage {
  label: string;
  note: string;
  gate?: boolean;
}

const stages: readonly Stage[] = [
  { label: "Authenticate", note: "creds" },
  { label: "Navigate", note: "locate records" },
  { label: "Clean", note: "drop / normalise" },
  { label: "Transform", note: "map to schema" },
  { label: "Review", note: "human gate", gate: true },
  { label: "Load", note: "write" },
] as const;

const services = ["FastAPI", "MCP server", "Ollama", "MySQL", "ChromaDB"] as const;

export function PlaybookForgeVisual() {
  return (
    <div className="bg-paper border-hair rounded-xl border p-4 sm:p-6">
      <div className="border-hair flex flex-wrap items-baseline justify-between gap-2 border-b pb-3">
        <span className="eyebrow">migration stages</span>
        <span className="text-slate font-mono text-[0.6875rem] tracking-[0.04em]">
          unstructured → relational schema
        </span>
      </div>

      <ol className="mt-4 space-y-px">
        {stages.map((stage, index) => (
          <li key={stage.label} className="relative flex items-stretch gap-3">
            {/* connector rail */}
            <span className="relative flex w-6 shrink-0 justify-center" aria-hidden="true">
              <span className={cx("bg-hair-strong w-px", index === 0 && "mt-4", index === stages.length - 1 && "mb-4")} />
              <span
                className={cx(
                  "absolute top-3.5 h-2 w-2 rounded-full border",
                  stage.gate ? "bg-forest border-forest" : "bg-paper border-hair-strong",
                )}
              />
            </span>

            <div
              className={cx(
                "mb-px flex flex-1 flex-wrap items-baseline justify-between gap-x-3 gap-y-1 rounded-lg px-3.5 py-2.5",
                stage.gate ? "bg-sage/70 border-forest/25 border" : "bg-shell/70",
              )}
            >
              <span className="flex items-baseline gap-2.5">
                <span className="text-slate-soft font-mono text-[0.625rem]">{`0${index + 1}`}</span>
                <span className="font-display text-ink text-[1.0625rem] leading-none">{stage.label}</span>
              </span>
              <span
                className={cx(
                  "font-mono text-[0.6875rem] tracking-[0.04em]",
                  stage.gate ? "text-forest" : "text-slate-soft",
                )}
              >
                {stage.note}
              </span>
            </div>
          </li>
        ))}
      </ol>

      <div className="border-hair mt-5 border-t pt-4">
        <span className="eyebrow">one compose file</span>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {services.map((service) => (
            <span
              key={service}
              className="border-hair-strong text-slate rounded border border-dashed px-2.5 py-1 font-mono text-[0.6875rem] tracking-[0.04em]"
            >
              {service}
            </span>
          ))}
        </div>
        <p className="text-slate-soft mt-3 font-mono text-[0.625rem] tracking-[0.04em]">
          local inference · nothing leaves the host
        </p>
      </div>
    </div>
  );
}
