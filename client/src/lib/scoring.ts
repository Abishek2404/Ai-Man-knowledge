import type { AiUsefulness, ClaimInput, ClaimScores } from "./types";

export function scoreClaim(claim: ClaimInput): ClaimScores {
  let score = 0;
  const flags: string[] = [];

  if (claim.description.trim().length >= 120) score += 20;
  else flags.push("Low-detail description");

  if (claim.evidenceUrl.trim()) score += 25;
  else flags.push("Missing evidence");

  if (claim.location.trim()) score += 10;
  else flags.push("Missing location");

  if (claim.observedAt.trim()) score += 10;
  else flags.push("Missing observation date");

  if (claim.usefulness.trim().length >= 60) score += 20;
  else flags.push("Usefulness needs detail");

  if (claim.category === "Expert Knowledge") score += 15;
  if (!claim.consent) flags.push("Consent not granted");

  const completeness = Math.min(
    100,
    [
      claim.title,
      claim.category,
      claim.description,
      claim.usefulness,
      claim.evidenceUrl,
      claim.location,
      claim.observedAt,
      claim.contributorName
    ].filter(Boolean).length * 12 + (claim.consent ? 4 : 0)
  );

  const confidence =
    score >= 75 && flags.length <= 1 ? "High" : score >= 45 ? "Medium" : "Low";

  return {
    knowledgeValue: Math.min(score, 100),
    completeness,
    confidence,
    suggestedUse: suggestUse(claim),
    flags
  };
}

function suggestUse(claim: ClaimInput): AiUsefulness {
  if (claim.category === "AI Correction") return "Useful for Hallucination Correction";
  if (claim.category === "Expert Knowledge") return "Useful for AI Evaluation";
  if (claim.category === "Creative Idea") return "Useful for Knowledge Base";
  if (claim.evidenceUrl.trim() && claim.location.trim()) return "Useful for AI Training";
  return "Useful for Knowledge Base";
}
