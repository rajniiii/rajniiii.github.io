import type { SkillGroup } from "./types";

export const skillGroups: readonly SkillGroup[] = [
  {
    title: "LLM systems",
    note: "Evaluation, retrieval and tool use",
    items: [
      "RAG pipelines",
      "LLM-as-judge evaluation",
      "Prompt injection testing",
      "MCP tool servers",
      "Function calling",
      "Claude · OpenAI · Gemini APIs",
      "Ollama / local inference",
    ],
    tint: "lavender",
  },
  {
    title: "Languages",
    note: "Daily drivers first",
    items: ["Python", "SQL", "TypeScript", "JavaScript", "R", "C++", "Java"],
    tint: "powder",
  },
  {
    title: "Data engineering",
    note: "Moving and shaping data",
    items: ["ETL pipelines", "Apache Kafka", "pandas / NumPy", "Snowflake", "Databricks", "Schema design"],
    tint: "sage",
  },
  {
    title: "Stores & retrieval",
    note: "Vector and relational",
    items: ["FAISS", "ChromaDB", "SQLite / SQLite Cloud", "MySQL", "MongoDB", "Firestore"],
    tint: "peach",
  },
  {
    title: "ML & modelling",
    note: "Beyond the LLM layer",
    items: ["PyTorch", "TensorFlow", "scikit-learn", "Sequence models (LSTM)", "Ensembles", "MediaPipe"],
    tint: "cream",
  },
  {
    title: "Build & deliver",
    note: "Getting it in front of people",
    items: ["FastAPI", "Streamlit", "Plotly Dash", "React / Next.js", "Docker Compose", "n8n", "Git", "AWS · Azure"],
    tint: "lavender",
  },
  {
    title: "Analytics",
    note: "Reporting surfaces",
    items: ["Tableau", "Power BI", "Excel (advanced)", "Google Analytics"],
    tint: "powder",
  },
] as const;
