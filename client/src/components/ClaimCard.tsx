import Link from "next/link";
import { MapPin, ShieldCheck } from "lucide-react";
import { StatusBadge } from "./StatusBadge";
import type { KnowledgeClaim } from "@/lib/types";

export function ClaimCard({ claim }: { claim: KnowledgeClaim }) {
  return (
    <article className="rounded-md border border-white/10 bg-panel/80 p-4 shadow-lg shadow-black/20 transition hover:border-mint/40">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-mint">{claim.category}</p>
          <h3 className="mt-1 text-lg font-semibold text-white">
            <Link href={`/claims/${claim.id}`} className="hover:underline">
              {claim.title}
            </Link>
          </h3>
        </div>
        <StatusBadge status={claim.status} />
      </div>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-300">{claim.description}</p>
      <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-300">
        <span className="inline-flex items-center gap-1">
          <ShieldCheck className="h-4 w-4 text-mint" aria-hidden="true" />
          {claim.scores.knowledgeValue}/100 value
        </span>
        {claim.location && (
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-4 w-4 text-slate-400" aria-hidden="true" />
            {claim.location}
          </span>
        )}
      </div>
    </article>
  );
}
