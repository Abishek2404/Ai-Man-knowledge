"use client";

import { useEffect, useState } from "react";
import { ClaimCard } from "@/components/ClaimCard";
import { ScoreBadge } from "@/components/ScoreBadge";
import { listClaimsApi } from "@/lib/api";
import type { KnowledgeClaim } from "@/lib/types";

export default function DashboardPage() {
  const [claims, setClaims] = useState<KnowledgeClaim[]>([]);

  useEffect(() => {
    listClaimsApi().then(setClaims);
  }, []);

  const verified = claims.filter((claim) => claim.status === "Verified").length;
  const needsReview = claims.filter((claim) =>
    ["Submitted", "Needs Review", "Needs More Evidence"].includes(claim.status)
  ).length;
  const averageScore = claims.length
    ? Math.round(claims.reduce((sum, claim) => sum + claim.scores.knowledgeValue, 0) / claims.length)
    : 0;

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase text-mint">Contributor dashboard</p>
        <h1 className="mt-2 text-3xl font-bold text-ink">Your knowledge claims</h1>
      </div>

      <div className="mb-8 grid gap-3 md:grid-cols-3">
        <ScoreBadge label="Total claims" value={claims.length} />
        <ScoreBadge label="Need review" value={needsReview} />
        <ScoreBadge label="Verified" value={verified} />
      </div>
      <div className="mb-8">
        <ScoreBadge label="Average value score" value={`${averageScore}/100`} />
      </div>

      <div className="grid gap-4">
        {claims.map((claim) => (
          <ClaimCard key={claim.id} claim={claim} />
        ))}
      </div>
    </main>
  );
}
