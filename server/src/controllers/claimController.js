import { addClaim, findClaim, getClaims } from "../models/Claim.js";
import { scoreClaim } from "../services/scoringService.js";

export async function listClaims(_req, res, next) {
  try {
    res.json({ data: await getClaims() });
  } catch (error) {
    next(error);
  }
}

export async function getClaimById(req, res, next) {
  try {
    const claim = await findClaim(req.params.id);
    if (!claim) {
      return next({ status: 404, message: "Claim not found" });
    }
    res.json({ data: claim });
  } catch (error) {
    next(error);
  }
}

export async function createClaim(req, res, next) {
  const required = ["title", "category", "description", "usefulness", "contributorName"];
  const missing = required.filter((field) => !req.body[field]);

  if (missing.length) {
    return next({ status: 400, message: `Missing required fields: ${missing.join(", ")}` });
  }

  const scores = scoreClaim(req.body);
  try {
    const claim = await addClaim({
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
  } catch (error) {
    next(error);
  }
}
