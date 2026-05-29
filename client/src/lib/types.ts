export type ClaimCategory =
  | "Field Observation"
  | "Local Knowledge"
  | "AI Correction"
  | "Expert Knowledge"
  | "Infrastructure Issue"
  | "Environment/Climate Observation"
  | "Creative Idea"
  | "Other";

export type ClaimStatus =
  | "Submitted"
  | "Needs Review"
  | "Verified"
  | "Rejected"
  | "Needs More Evidence";

export type AiUsefulness =
  | "Useful for AI Training"
  | "Useful for AI Evaluation"
  | "Useful for Knowledge Base"
  | "Useful for Hallucination Correction"
  | "Not Suitable";

export type ClaimScores = {
  knowledgeValue: number;
  completeness: number;
  confidence: "Low" | "Medium" | "High";
  suggestedUse: AiUsefulness;
  flags: string[];
};

export type KnowledgeClaim = {
  id: string;
  title: string;
  category: ClaimCategory;
  description: string;
  usefulness: string;
  evidenceUrl: string;
  location: string;
  observedAt: string;
  contributorName: string;
  consent: boolean;
  status: ClaimStatus;
  reviewerFeedback: string;
  reviewerScore: number;
  aiUsefulness: AiUsefulness;
  createdAt: string;
  scores: ClaimScores;
};

export type ClaimInput = Omit<
  KnowledgeClaim,
  | "id"
  | "status"
  | "reviewerFeedback"
  | "reviewerScore"
  | "aiUsefulness"
  | "createdAt"
  | "scores"
>;
