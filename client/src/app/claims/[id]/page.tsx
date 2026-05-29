"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { ReviewerActions } from "@/components/ReviewerActions";
import { ScoreBadge } from "@/components/ScoreBadge";
import { StatusBadge } from "@/components/StatusBadge";
import { getClaimApi } from "@/lib/api";
import type { KnowledgeClaim } from "@/lib/types";

export default function ClaimDetailPage({ params }: { params: { id: string } }) {
  const [claim, setClaim] = useState<KnowledgeClaim | undefined>();

  useEffect(() => {
    getClaimApi(params.id).then(setClaim);
  }, [params.id]);

  if (!claim) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-10">
        <h1 className="text-2xl font-bold">Claim not found</h1>
        <Link href="/dashboard" className="mt-4 inline-block text-mint hover:underline">
          Back to dashboard
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold uppercase text-mint">{claim.category}</p>
          <h1 className="mt-2 text-3xl font-bold text-ink">{claim.title}</h1>
        </div>
        <StatusBadge status={claim.status} />
      </div>

      <div className="mb-8 grid gap-3 md:grid-cols-3">
        <ScoreBadge label="Knowledge value" value={`${claim.scores.knowledgeValue}/100`} />
        <ScoreBadge label="Completeness" value={`${claim.scores.completeness}/100`} />
        <ScoreBadge label="Confidence" value={claim.scores.confidence} />
      </div>

      <section className="grid gap-6">
        <div className="rounded-md border border-line bg-white p-5">
          <h2 className="text-xl font-semibold">Claim details</h2>
          <p className="mt-4 leading-7 text-slate-700">{claim.description}</p>
          <h3 className="mt-6 font-semibold">Usefulness</h3>
          <p className="mt-2 leading-7 text-slate-700">{claim.usefulness}</p>
          <dl className="mt-6 grid gap-3 text-sm md:grid-cols-2">
            <div>
              <dt className="font-semibold">Location</dt>
              <dd className="text-slate-600">{claim.location || "Not provided"}</dd>
            </div>
            <div>
              <dt className="font-semibold">Observed date</dt>
              <dd className="text-slate-600">{claim.observedAt || "Not provided"}</dd>
            </div>
            <div>
              <dt className="font-semibold">Contributor</dt>
              <dd className="text-slate-600">{claim.contributorName}</dd>
            </div>
            <div>
              <dt className="font-semibold">Suggested AI use</dt>
              <dd className="text-slate-600">{claim.aiUsefulness}</dd>
            </div>
          </dl>
          {claim.evidenceUrl && (
            <a
              href={claim.evidenceUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-mint hover:underline"
            >
              Open evidence
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          )}
        </div>

        <div className="rounded-md border border-line bg-white p-5">
          <h2 className="text-xl font-semibold">Trust indicators</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {claim.scores.flags.length ? (
              claim.scores.flags.map((flag) => (
                <span key={flag} className="rounded-md bg-amber-100 px-2.5 py-1 text-sm text-amber">
                  {flag}
                </span>
              ))
            ) : (
              <span className="rounded-md bg-emerald-100 px-2.5 py-1 text-sm text-emerald-700">
                No major scoring flags
              </span>
            )}
          </div>
        </div>

        <ReviewerActions claim={claim} onReviewed={setClaim} />
      </section>
    </main>
  );
}
