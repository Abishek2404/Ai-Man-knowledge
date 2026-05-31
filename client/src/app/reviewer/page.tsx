"use client";

import { useEffect, useMemo, useState } from "react";
import { ClaimCard } from "@/components/ClaimCard";
import { listClaimsApi } from "@/lib/api";
import { categories, statuses } from "@/lib/options";
import type { ClaimCategory, ClaimStatus, KnowledgeClaim } from "@/lib/types";

export default function ReviewerPage() {
  const [claims, setClaims] = useState<KnowledgeClaim[]>([]);
  const [category, setCategory] = useState<ClaimCategory | "All">("All");
  const [status, setStatus] = useState<ClaimStatus | "All">("All");

  useEffect(() => {
    listClaimsApi().then(setClaims);
  }, []);

  const filtered = useMemo(
    () =>
      claims.filter((claim) => {
        const categoryMatch = category === "All" || claim.category === category;
        const statusMatch = status === "All" || claim.status === status;
        return categoryMatch && statusMatch;
      }),
    [claims, category, status]
  );

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="mb-8">
        <p className="text-sm font-semibold uppercase text-mint">Reviewer workspace</p>
        <h1 className="mt-2 text-3xl font-bold text-white">Validation queue</h1>
      </div>

      <div className="mb-6 grid gap-4 rounded-md border border-white/10 bg-panel/80 p-4 shadow-lg shadow-black/20 md:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium">
          Category
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value as ClaimCategory | "All")}
            className="focus-ring rounded-md border border-white/10 px-3 py-2"
          >
            <option>All</option>
            {categories.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm font-medium">
          Status
          <select
            value={status}
            onChange={(event) => setStatus(event.target.value as ClaimStatus | "All")}
            className="focus-ring rounded-md border border-white/10 px-3 py-2"
          >
            <option>All</option>
            {statuses.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-4">
        {filtered.map((claim) => (
          <ClaimCard key={claim.id} claim={claim} />
        ))}
      </div>
    </main>
  );
}
