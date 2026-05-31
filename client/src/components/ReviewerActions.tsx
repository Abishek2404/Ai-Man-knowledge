"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { reviewClaimApi } from "@/lib/api";
import { aiUsefulnessOptions, statuses } from "@/lib/options";
import type { AiUsefulness, ClaimStatus, KnowledgeClaim } from "@/lib/types";

export function ReviewerActions({
  claim,
  onReviewed
}: {
  claim: KnowledgeClaim;
  onReviewed?: (claim: KnowledgeClaim) => void;
}) {
  const router = useRouter();
  const [status, setStatus] = useState<ClaimStatus>(claim.status);
  const [reviewerScore, setReviewerScore] = useState(claim.reviewerScore || 70);
  const [aiUsefulness, setAiUsefulness] = useState<AiUsefulness>(claim.aiUsefulness);
  const [reviewerFeedback, setReviewerFeedback] = useState(claim.reviewerFeedback);
  const [isSaving, setIsSaving] = useState(false);

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    try {
      const updated = await reviewClaimApi(claim.id, {
        status,
        reviewerFeedback,
        reviewerScore,
        aiUsefulness
      });
      if (updated) onReviewed?.(updated);
      router.refresh();
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4 rounded-md border border-white/10 bg-panel/80 p-4 shadow-lg shadow-black/20">
      <div className="grid gap-4 md:grid-cols-3">
        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(event) => setStatus(event.target.value as ClaimStatus)}
            className="focus-ring rounded-md border border-white/10 px-3 py-2"
          >
            {statuses.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="reviewerScore">
            Reviewer score
          </label>
          <input
            id="reviewerScore"
            type="number"
            min={0}
            max={100}
            value={reviewerScore}
            onChange={(event) => setReviewerScore(Number(event.target.value))}
            className="focus-ring rounded-md border border-white/10 px-3 py-2"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="aiUsefulness">
            AI usefulness
          </label>
          <select
            id="aiUsefulness"
            value={aiUsefulness}
            onChange={(event) => setAiUsefulness(event.target.value as AiUsefulness)}
            className="focus-ring rounded-md border border-white/10 px-3 py-2"
          >
            {aiUsefulnessOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="reviewerFeedback">
          Reviewer feedback
        </label>
        <textarea
          id="reviewerFeedback"
          value={reviewerFeedback}
          onChange={(event) => setReviewerFeedback(event.target.value)}
          className="focus-ring min-h-24 rounded-md border border-white/10 px-3 py-2"
          placeholder="Decision notes, required evidence, or validation context."
        />
      </div>

      <button
        type="submit"
        disabled={isSaving}
        className="focus-ring inline-flex w-fit items-center gap-2 rounded-md bg-glow px-4 py-2 font-semibold text-white shadow-lg shadow-violet-500/20 hover:bg-violet-500"
      >
        <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
        {isSaving ? "Saving..." : "Save review"}
      </button>
    </form>
  );
}
