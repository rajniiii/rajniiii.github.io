import type { Certification, Degree, Publication } from "./types";

export const degrees: readonly Degree[] = [
  {
    school: "Stevens Institute of Technology",
    degree: "M.S. Data Science",
    dates: "2024 — 2026",
    location: "Hoboken, NJ",
    courses: [
      "Applied Machine Learning",
      "Deep Learning",
      "Prompt Engineering for Business Applications",
      "Time Series Analysis",
      "Marketing Analytics",
    ],
  },
  {
    school: "MIT World Peace University",
    degree: "B.Tech Computer Science & Technology",
    dates: "2019 — 2023",
    location: "Pune, India",
    courses: ["Data Warehousing & Mining", "Big Data Analytics", "Distributed Computing", "Information Security"],
  },
] as const;

export const certifications: readonly Certification[] = [
  {
    name: "Microsoft Azure AI Essentials Professional",
    issuer: "Microsoft & LinkedIn",
    url: "https://www.linkedin.com/learning/certificates/36182de093ee6d7dad88ec1c8bfbd2db5f8e913d837b2c73486b09d661e54f74",
  },
  {
    name: "Forward Deployed Engineering in the Age of AI",
    issuer: "LinkedIn Learning",
    url: "https://www.linkedin.com/learning/certificates/5486f76a627b45e0cc45e72457fcdc70f6fad7eb2976e2ca853b43f428b03e52",
  },
] as const;

export const publication: Publication = {
  title: "Advanced Generation of Private and Community Crowdfunding Platform for Investors",
  authors: "Rajanee Shenkar et al.",
  venue: "European Chemical Bulletin",
  details: "Volume 12, Special Issue 10",
  url: "https://www.eurchembull.com/archives/volume-12/special%20issue-10/14115",
  abstract:
    "A blockchain-based crowdfunding platform on Ethereum — Solidity smart contracts with reusable libraries, Web3.js transaction handling and wallet authentication — arguing for decentralised custody and transparency over intermediary-held funds.",
} as const;
