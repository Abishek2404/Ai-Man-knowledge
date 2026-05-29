import type { AiUsefulness, ClaimCategory, ClaimStatus } from "./types";

export const categories: ClaimCategory[] = [
  "Field Observation",
  "Local Knowledge",
  "AI Correction",
  "Expert Knowledge",
  "Infrastructure Issue",
  "Environment/Climate Observation",
  "Creative Idea",
  "Other"
];

export const statuses: ClaimStatus[] = [
  "Submitted",
  "Needs Review",
  "Verified",
  "Rejected",
  "Needs More Evidence"
];

export const aiUsefulnessOptions: AiUsefulness[] = [
  "Useful for AI Training",
  "Useful for AI Evaluation",
  "Useful for Knowledge Base",
  "Useful for Hallucination Correction",
  "Not Suitable"
];
