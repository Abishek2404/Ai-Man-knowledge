import { addClaim, findClaim, getClaims } from "../models/Claim.js";
import { scoreClaim } from "../services/scoringService.js";

export function listClaims(_req, res) {
  res.json({ data: getClaims() });
}

export function getClaimById(req, res, next) {
  const claim = findClaim(req.params.id);
  if (!claim) {
    return next({ status: 404, message: "Claim not found" });
  }
  res.json({ data: claim });
}

export function createClaim(req, res, next) {
  const required = ["title", "category", "description", "usefulness", "contributorName"];
  const missing = required.filter((field) => !req.body[field]);

  if (missing.length) {
    return next({ status: 400, message: `Missing required fields: ${missing.join(", ")}` });
  }

  const scores = scoreClaim(req.body);
  const claim = addClaim({
    ...req.body,
    id: crypto.randomUUID(),
    status: "Submitted",
    reviewerFeedback: "",
    reviewerScore: 0,
    aiUsefulness: scores.suggestedUse,
    createdAt: new Date().toISOString(),
    scores
  });

  res.status(201).json({ data: claim });
}
