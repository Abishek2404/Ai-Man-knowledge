const statuses = new Set([
  "Submitted",
  "Needs Review",
  "Verified",
  "Rejected",
  "Needs More Evidence"
]);

const aiUsefulnessOptions = new Set([
  "Useful for AI Training",
  "Useful for AI Evaluation",
  "Useful for Knowledge Base",
  "Useful for Hallucination Correction",
  "Not Suitable"
]);

export function validateReview(review) {
  if (!statuses.has(review.status)) return "Invalid review status";
  if (!aiUsefulnessOptions.has(review.aiUsefulness)) return "Invalid AI usefulness classification";

  const score = Number(review.reviewerScore);
  if (!Number.isFinite(score) || score < 0 || score > 100) {
    return "Reviewer score must be between 0 and 100";
  }

  return "";
}
