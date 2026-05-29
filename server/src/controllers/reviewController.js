import { findClaim, updateClaim } from "../models/Claim.js";
import { validateReview } from "../services/validationService.js";

export function reviewClaim(req, res, next) {
  const claim = findClaim(req.params.id);
  if (!claim) {
    return next({ status: 404, message: "Claim not found" });
  }

  const error = validateReview(req.body);
  if (error) {
    return next({ status: 400, message: error });
  }

  const updated = updateClaim(req.params.id, {
    status: req.body.status,
    reviewerFeedback: req.body.reviewerFeedback || "",
    reviewerScore: Number(req.body.reviewerScore),
    aiUsefulness: req.body.aiUsefulness
  });

  res.json({ data: updated });
}
