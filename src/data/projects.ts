import type { FeaturedProject, SideProject } from "./types";

export const featuredProjects: readonly FeaturedProject[] = [
  {
    slug: "rag-probe",
    index: "01",
    title: "RagProbe",
    category: "LLM evaluation & reliability",
    year: "2026",
    tint: "lavender",
    accent: "plum",
    oneLiner: "An adversarial test harness that measures when a RAG pipeline is wrong, not just fluent.",
    problem:
      "A retrieval pipeline that answers fluently can still be wrong, and you cannot tell which from the answer alone. Two failures hide behind one symptom: retrieval that misses the supporting passage, and a model that fills the gap anyway. RagProbe separates them — it attacks a pipeline with prompts designed to make it fail, then scores each answer against the context that was actually retrieved.",
    built: [
      "A 51-prompt adversarial suite spanning five failure modes — hallucination bait, prompt injection, context poisoning, temporal confusion, and out-of-scope questions — run from a `ragprobe` CLI as repeatable, recorded sessions.",
      "Two pipelines over the same FAISS index of SEC 10-K chunks: a baseline (top-5, generic system prompt) and a hardened variant that retrieves ten chunks, re-ranks them with a scoring pass, keeps the top three, requires citations, and refuses outright when nothing clears a 0.40 confidence score.",
      "An LLM-as-judge pass scoring faithfulness, relevance and context recall for every answer, with a separate safety classifier for injection outcomes. Each result is written to SQLite as it lands rather than batched, so an interrupted run keeps its data.",
      "`ragprobe compare` diffs hardened against baseline across the same prompt set, and a Plotly Dash dashboard reads the same database for per-category breakdowns.",
    ],
    stack: ["Python", "FAISS", "OpenAI embeddings", "Claude Haiku 4.5", "SQLite", "Plotly Dash", "pytest", "uv"],
    visual: "ragprobe",
    figure: "fig. 01 — probe suite composition and the two retrieval paths, read from the repository's prompt suite and config module",
    links: [{ label: "Repository", href: "https://github.com/rajniiii/RAG-Probe", kind: "repo" }],
    detail: {
      sections: [
        {
          heading: "Why adversarial prompts instead of a QA set",
          body: [
            "A clean question-answering set tells you how a pipeline behaves when retrieval works. That is the easy half. The interesting failures happen when the corpus does not contain the answer, when the question quietly assumes something false, or when the retrieved context carries an instruction of its own.",
            "So the suite is built around five categories that each provoke a specific failure: hallucination bait asks for facts the filings do not contain; context poisoning plants misleading passages; temporal confusion asks about periods outside the documents; prompt injection tries to override the system prompt from inside the retrieved text; out-of-scope questions check whether the pipeline knows to decline. Each prompt is tagged, so results are readable per failure mode instead of as one average.",
          ],
        },
        {
          heading: "Baseline against hardened, same index",
          body: [
            "Both pipelines read the same FAISS index, so any difference comes from retrieval and prompting rather than from the corpus. The baseline is deliberately ordinary: embed the query, take the top five chunks, generic system prompt, generate.",
            "The hardened path retrieves ten candidates, runs a scoring pass over them, keeps the three strongest, and injects an anti-hallucination prompt that requires a citation for each claim. If no chunk clears the confidence threshold, it refuses rather than answering from parametric memory. Refusal is treated as a correct outcome in the out-of-scope and hallucination-bait categories — a pipeline that never declines is not safe, it is lucky.",
          ],
        },
        {
          heading: "Scoring, and where scoring gets uncomfortable",
          body: [
            "Faithfulness, relevance and context recall are scored by a judge model against the retrieved context, with a configurable failure threshold. Injection attempts additionally run through a safety classifier, because 'the model stayed on task' and 'the model produced a faithful answer' are different questions.",
            "Every threshold, model name and chunking parameter lives in a single config module read from environment variables. That matters for an evaluation tool specifically: if the knobs are scattered, nobody can tell you what a run actually measured.",
          ],
        },
      ],
      decisions: [
        { label: "Chunking", value: "512 tokens, 64-token overlap" },
        { label: "Embeddings", value: "text-embedding-3-small, 1536-d, FAISS cosine" },
        { label: "Retrieval", value: "baseline top-5 · hardened top-10 → re-rank → top-3" },
        { label: "Refusal gate", value: "re-rank score below 0.40" },
        { label: "Faithfulness failure", value: "judge score below 0.75" },
        { label: "Generation & judge", value: "claude-haiku-4-5" },
        { label: "Storage", value: "SQLite, one row per probe result, written immediately" },
      ],
      limits: [
        "There is no published benchmark table here on purpose. The harness runs and the comparison command works; I am not going to quote a hardened-versus-baseline win rate until the suite has run across more than one generation model.",
        "Scoring leans on a single judge model, so judge bias is uncontrolled. Human spot-checks on a sample are the obvious next step, and the cheap one.",
        "The corpus is SEC 10-K filings. Nothing here tests how the probe categories transfer to a different document domain.",
      ],
    },
  },
  {
    slug: "market-radar",
    index: "02",
    title: "Market Radar",
    category: "GTM intelligence & account prioritisation",
    year: "2026",
    tint: "powder",
    accent: "marine",
    oneLiner: "Out of a thousand companies in market, which accounts deserve attention today — and why.",
    problem:
      "A list of a thousand companies that match an ideal customer profile is not something a seller can act on. The useful question is narrower: of these, which deserve attention today, and for what reason? Market Radar answers that one and shows its reasoning, because a priority score that cannot explain itself gets ignored the second it disagrees with a rep's instinct.",
    built: [
      "Company sourcing against an ICP — Tavily for discovery, Gemini for extraction — producing a 0–100 fit score per account rather than a yes/no match.",
      "Signal tracking across three streams: job postings, funding and news, and technology mentions. Signals fold into a priority score that weights recent evidence more heavily and boosts accounts firing several streams at once, since three signals in a week mean something one signal a quarter does not.",
      "Deterministic stage transitions — Cold → Watching → Engaged → Sales Ready — driven by rules rather than model judgment, so every stage change is reconstructable after the fact.",
      "A Slack alert the moment an account reaches Sales Ready, carrying the reason with it (\"strong ICP fit + recent funding + hiring surge, 3 days fresh\"), with the ranked queue in a Streamlit dashboard over SQLite Cloud.",
    ],
    stack: ["Python", "Tavily", "Gemini API", "SQLite Cloud", "Streamlit", "Slack"],
    visual: "market-radar",
    figure: "fig. 02 — ranked account queue and the Sales Ready alert payload. Interface mockup; account names and values are illustrative.",
    links: [
      {
        label: "Walkthrough",
        href: "https://drive.google.com/drive/folders/1URPR2sHRQiNMCd2oQTw-aXckg1zy_HoC",
        kind: "demo",
      },
    ],
    detail: {
      sections: [
        {
          heading: "Scoring that survives disagreement",
          body: [
            "Fit and priority are kept separate. Fit answers whether a company looks like the customers you already win — size, sector, stack, market. Priority answers whether now is the moment, which is a function of signals and their age. An account can be a perfect fit and completely cold, and collapsing both into one number hides exactly the distinction a seller needs.",
            "Recency weighting does most of the work. A funding round from last week and one from eleven months ago are not the same input, and a scoring model that treats them alike produces a queue that never changes order.",
          ],
        },
        {
          heading: "Why stage transitions are rules, not model judgment",
          body: [
            "Every stage change is a deterministic rule evaluated against stored signals. The LLM extracts and classifies; it does not decide when an account is ready for a human.",
            "That was a deliberate trade. A model could make subtler calls, but 'why is this account in my queue' then becomes unanswerable, and an unexplainable queue is one a sales team stops opening. Rules also mean a threshold can be tuned and the whole history re-derived against the new rule.",
          ],
        },
        {
          heading: "Delivering the score where the decision happens",
          body: [
            "The dashboard is the review surface, but the alert is the product. When an account crosses into Sales Ready, Slack gets the reason, not just the name — which signals fired, how fresh they are, and the fit that qualified it.",
            "A score is only useful if it is fresh, explained, and visible where the decision gets made. Building this is what taught me that the delivery surface is not an afterthought on top of the model; it is most of whether the model gets used at all.",
          ],
        },
      ],
      decisions: [
        { label: "Discovery", value: "Tavily search against ICP queries" },
        { label: "Extraction & scoring", value: "Gemini, structured output per company" },
        { label: "Fit", value: "0–100, separate from priority" },
        { label: "Signals", value: "job postings · funding & news · technology mentions" },
        { label: "Priority", value: "recency-weighted, multi-signal boost" },
        { label: "Stages", value: "Cold → Watching → Engaged → Sales Ready, rule-driven" },
        { label: "Delivery", value: "Slack alert with reason + Streamlit queue over SQLite Cloud" },
      ],
      limits: [
        "Search-based sourcing has blind spots I cannot measure. A company that is a strong fit but barely writes about itself may simply never surface, and nothing in the current design tells me how many of those there are.",
        "Technographic signals are the weakest stream. Inferring a company's stack from public mentions is thin evidence; doing it properly needs dedicated technographic data.",
        "The scoring thresholds are assumptions. They are reasonable assumptions, but until they are tested against real conversion data they stay assumptions, and I would rather say so than present them as tuned.",
      ],
    },
  },
  {
    slug: "playbook-forge",
    index: "03",
    title: "Playbook Forge",
    category: "Agentic data migration",
    year: "2026",
    tint: "sage",
    accent: "forest",
    oneLiner: "A staged migration pipeline that makes each judgment call about unstructured data reviewable.",
    problem:
      "Moving unstructured records into a schema is mostly judgment: what each field means, which rows are junk, what to do with the ones that do not fit. Most migration scripts bury those decisions in code, so when the loaded data looks wrong there is no way to see which step decided what. Playbook Forge turns them into discrete stages a human can review before anything is written.",
    built: [
      "A six-stage pipeline — Authenticate, Navigate, Clean, Transform, Review, Load — moving unstructured records out of a ChromaDB collection into a structured relational schema, with the Review stage as a deliberate gate before Load.",
      "A local LLM served by Ollama handles extraction and field mapping, so documents never leave the machine — the difference between a tool you can point at internal records and one you cannot.",
      "A FastAPI service drives the run and an MCP server exposes the stages as callable tools, so the same pipeline can be driven by an agent or by a human operator.",
      "The whole stack — app, MCP server, local model runtime, MySQL and ChromaDB — comes up from a single Docker Compose file.",
    ],
    stack: ["Docker Compose", "FastAPI", "MCP server", "Ollama", "MySQL", "ChromaDB"],
    visual: "playbook-forge",
    figure: "fig. 03 — stage sequence and the services behind it, as composed",
    links: [
      {
        label: "Walkthrough",
        href: "https://drive.google.com/file/d/1y8jkgVUZGoZsYM5bD_96Ahf2A4wUiXFL/view?usp=drive_link",
        kind: "video",
      },
    ],
    detail: {
      sections: [
        {
          heading: "Stages as the unit of review",
          body: [
            "The stage boundaries are the point. Cleaning is separable from transformation, and transformation is separable from loading, which means a bad result can be traced to the step that caused it instead of to 'the migration'.",
            "Review sits between Transform and Load for the same reason: the expensive mistakes in a migration are the ones you only notice after the data is in the target schema and something downstream is already reading it.",
          ],
        },
        {
          heading: "Local inference as a constraint, not a preference",
          body: [
            "Running the model locally through Ollama is slower and less capable than calling a frontier API. It is also the only version of this tool that can be pointed at records that are not allowed to leave the building, which is most of the records that actually need migrating.",
            "Exposing the stages through an MCP server keeps that choice open at the other end too: the pipeline is callable by an agent, but every stage is equally runnable by a person who wants to drive it one step at a time.",
          ],
        },
      ],
      decisions: [
        { label: "Stages", value: "Authenticate → Navigate → Clean → Transform → Review → Load" },
        { label: "Inference", value: "local model via Ollama, no external API calls" },
        { label: "Source", value: "ChromaDB collection of unstructured records" },
        { label: "Target", value: "relational schema (MySQL in the compose stack)" },
        { label: "Interfaces", value: "FastAPI service + MCP tool surface" },
        { label: "Orchestration", value: "single Docker Compose file, one command up" },
      ],
      limits: [
        "The pipeline is a working prototype demonstrated end to end, not something that has run against a large production migration.",
        "Local model quality is the ceiling on mapping accuracy. For messier schemas the Review stage stops being a formality and becomes real work.",
        "Source code is not public for this one — the walkthrough video is the honest evidence, and it shows the full run.",
      ],
    },
  },
  {
    slug: "kaiko-mcp-agent",
    index: "04",
    title: "Kaiko MCP Agent",
    category: "Tool-enabled agents & market data",
    year: "2026",
    tint: "peach",
    accent: "clay",
    oneLiner: "An MCP server that gives an LLM real crypto reference data instead of a plausible guess.",
    problem:
      "Ask a language model which exchanges a market-data provider covers and it will produce something that reads correctly and may be invented. The fix is not a better prompt, it is a tool — and tool use is its own engineering problem: the endpoints have to be described well enough that the model picks the right one and passes arguments it will accept.",
    built: [
      "A FastMCP server exposing Kaiko's basic-tier reference endpoints as discrete tools — `get_exchanges`, `get_instruments`, `get_assets` — each wrapping the HTTP call and returning JSON.",
      "An agent client that connects over `fastmcp.Client`, lists the server's tools at runtime, adapts them into an LLM-callable toolset, and routes reference questions to the right tool rather than answering from memory.",
      "Credentials kept in the environment and out of version control, with caches and local artefacts excluded — the unglamorous part of making a data-access agent safe to share.",
    ],
    stack: ["Python", "FastMCP", "Kaiko REST API", "LLM function calling"],
    visual: "kaiko-mcp",
    figure: "fig. 04 — tool discovery and call path, with the three tools the server actually registers",
    links: [{ label: "Repository", href: "https://github.com/rajniiii/kaiko-mcp-agent", kind: "repo" }],
    detail: {
      sections: [
        {
          heading: "Tool discovery over hard-wiring",
          body: [
            "The client does not hold a hard-coded list of tools. It asks the server what exists, then builds the LLM toolset from that response, which means a tool added on the server side is available to the agent without touching the client.",
            "That is the part of MCP worth having. The protocol's value is not that a model can call a function — it is that capability description and capability use are decoupled, so the agent and the data surface can change independently.",
          ],
        },
        {
          heading: "Scope, stated plainly",
          body: [
            "This covers the reference tier: which exchanges are covered, which instruments trade on them, which assets exist. It is deliberately a narrow, verifiable surface.",
            "Earlier write-ups of this project mentioned OHLCV downloads, paginated trade-level fetching, CSV export and a CI pipeline. None of that is in the repository, so none of it is claimed here. The three tools above, the server and the agent client are what exists — and I would rather a reviewer find the repo smaller than advertised in no respect at all.",
          ],
        },
      ],
      decisions: [
        { label: "Protocol", value: "MCP via FastMCP, server + client" },
        { label: "Tools registered", value: "get_exchanges · get_instruments · get_assets" },
        { label: "Tool selection", value: "LLM function calling over a runtime-listed toolset" },
        { label: "Data source", value: "Kaiko reference endpoints (basic tier)" },
        { label: "Secrets", value: "KAIKO_API_KEY from environment, .env untracked" },
      ],
      limits: [
        "Reference data only. Time-series market data is a different access tier and is not wired up.",
        "No test suite and no CI. For a three-file demonstration server that is a defensible scope, but it is the first thing I would add before calling it production-shaped.",
        "Error handling on the tool layer is thin — a failed upstream call surfaces to the model as a string rather than as a typed failure it can reason about.",
      ],
    },
  },
] as const;

export const sideProjects: readonly SideProject[] = [
  {
    title: "GTM-Copilot",
    category: "Outreach automation",
    year: "2026",
    description:
      "A research-to-outreach pipeline: n8n orchestrates the workflow, a FastAPI service and Gemini draft the message, Tavily supplies the research, leads land in Google Sheets and notifications go to Slack. Driven from a small web UI.",
    stack: ["n8n", "FastAPI", "Gemini API", "Tavily", "Google Sheets", "Slack"],
    links: [
      {
        label: "Walkthrough",
        href: "https://drive.google.com/file/d/1qhq_z38YFGPuTfnl5gvcLQbaVQ6zeBCn/view?usp=drivesdk",
        kind: "video",
      },
    ],
  },
  {
    title: "SowZone",
    category: "Civic data · Code for Climate 2026",
    year: "2026",
    description:
      "Finds idle city land in New York and turns it into a plantable plan: NYC Open Data for parcels, ISRIC and USGS APIs for soil properties and contamination risk, then a crop and restoration guide with a planting calendar. Prefills the NYC GreenThumb community-garden permit.",
    stack: ["React", "FastAPI", "Leaflet.js", "NYC Open Data", "ISRIC / USGS APIs"],
    links: [{ label: "Live site", href: "https://sow-zone-grow.base44.app", kind: "site" }],
  },
  {
    title: "Real-time sign language recognition",
    category: "Computer vision",
    year: "2026",
    description:
      "MediaPipe Holistic extracts 258-dimension pose and hand keypoints per frame; a bidirectional LSTM classifies dynamic gesture sequences from a custom video dataset, reaching 85.57% test accuracy at 20–30 FPS. Smoothing and a confidence threshold keep live predictions stable.",
    stack: ["Python", "MediaPipe", "TensorFlow", "Bi-LSTM"],
    links: [{ label: "Repository", href: "https://github.com/rajniiii/sign_language", kind: "repo" }],
  },
  {
    title: "FinDoc-Parser",
    category: "Document extraction",
    year: "2026",
    description:
      "Pulls structured records out of awkward financial PDFs: PyMuPDF for text, a locally hosted model via llama.cpp for section and table detection, and a custom parser for multi-line tabular rows across document variants. Outputs analysis-ready CSV, fully local, no API keys.",
    stack: ["Python", "PyMuPDF", "llama.cpp", "pandas"],
    links: [{ label: "Repository", href: "https://github.com/rajniiii/FinDoc-Parser", kind: "repo" }],
  },
  {
    title: "Patent RAG agent",
    category: "Retrieval agents",
    year: "2026",
    description:
      "Three retrieval tools over AI/ML patents — semantic search across a locally built vector store, live full-text fetch from Google Patents, and a USPTO PatentsView search — with the agent preferring the local index and escalating only when coverage runs out.",
    stack: ["Python", "Vector search", "PatentsView API", "LLM tool use"],
    links: [{ label: "Repository", href: "https://github.com/rajniiii/patent-rag-agent", kind: "repo" }],
  },
  {
    title: "TicketMatch",
    category: "Evaluation · classification",
    year: "2026",
    description:
      "Compares three ways to classify support tickets on the same data — zero-shot prompting, KNN over vector similarity, and few-shot with retrieved examples — across cloud and local embedding models, scored on precision, recall and F1 rather than vibes.",
    stack: ["LangChain", "Chroma", "OpenAI embeddings", "EmbeddingGemma"],
    links: [{ label: "Repository", href: "https://github.com/rajniiii/ticketmatch", kind: "repo" }],
  },
  {
    title: "Streaming sentiment pipeline",
    category: "Data engineering",
    year: "2025",
    description:
      "Ingests posts through the X API, streams them via Apache Kafka, scores sentiment with NLP in the consumer, and persists results for visualisation — built to practise the streaming side rather than the model side.",
    stack: ["Python", "Apache Kafka", "NLP"],
    links: [{ label: "Repository", href: "https://github.com/rajniiii/X_Sentiment_Analysis", kind: "repo" }],
  },
  {
    title: "Customer retention & CLV — Allianz",
    category: "Applied modelling",
    year: "2025",
    description:
      "Churn analysis on insurance policy data using a time-based cutoff to avoid leaking the future into the label, measuring a 4.04% churn rate, followed by customer-lifetime-value forecasting and segmentation under a CRISP-DM structure.",
    stack: ["Python", "scikit-learn", "lifelines", "pandas"],
    links: [
      {
        label: "Notebook",
        href: "https://github.com/rajniiii/Data_Analysis_AllianzInsurance",
        kind: "repo",
      },
    ],
  },
  {
    title: "Property price prediction",
    category: "Applied modelling",
    year: "2025",
    description:
      "An ETL and modelling pipeline over a 147K-property dataset, comparing random forests, neural networks and stacked ensembles with engineered location and property features.",
    stack: ["Python", "scikit-learn", "Ensembles", "Feature engineering"],
    links: [
      { label: "Repository", href: "https://github.com/rajniiii/worldrealestateprediction", kind: "repo" },
    ],
  },
  {
    title: "Flagstate",
    category: "Hackathon · agents",
    year: "2026",
    description:
      "Sanctions-screening and live investigation for shipping: checks US, UK, EU and UN lists, then sends an agent to a vessel's public registry page, remembers what it saw, and flags what changed since — with grounded-claim and LLM-as-judge evals on every run.",
    stack: ["Next.js", "Agents", "OpenSanctions", "Bedrock"],
    note: "Team build at Daytona HackSprint NYC, October 2026.",
    links: [{ label: "Live site", href: "https://flagstate.vercel.app", kind: "site" }],
  },
] as const;

export function getProject(slug: string): FeaturedProject | undefined {
  return featuredProjects.find((project) => project.slug === slug);
}
