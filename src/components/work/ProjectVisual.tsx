import type { VisualKey } from "@/data/types";
import { RagProbeVisual } from "./visuals/RagProbeVisual";
import { MarketRadarVisual } from "./visuals/MarketRadarVisual";
import { PlaybookForgeVisual } from "./visuals/PlaybookForgeVisual";
import { KaikoVisual } from "./visuals/KaikoVisual";

export function ProjectVisual({ visual }: { visual: VisualKey }) {
  switch (visual) {
    case "ragprobe":
      return <RagProbeVisual />;
    case "market-radar":
      return <MarketRadarVisual />;
    case "playbook-forge":
      return <PlaybookForgeVisual />;
    case "kaiko-mcp":
      return <KaikoVisual />;
  }
}
