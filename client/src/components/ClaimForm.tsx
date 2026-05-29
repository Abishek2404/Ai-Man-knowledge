"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Send } from "lucide-react";
import { categories } from "@/lib/options";
import { createClaimApi } from "@/lib/api";
import type { ClaimInput } from "@/lib/types";

const emptyClaim: ClaimInput = {
  title: "",
  category: "Field Observation",
  description: "",
  usefulness: "",
  evidenceUrl: "",
  location: "",
  observedAt: "",
  contributorName: "",
  consent: false
};

export function ClaimForm() {
  const router = useRouter();
  const [claim, setClaim] = useState<ClaimInput>(emptyClaim);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function update<K extends keyof ClaimInput>(key: K, value: ClaimInput[K]) {
    setClaim((current) => ({ ...current, [key]: value }));
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const created = await createClaimApi(claim);
      router.push(`/claims/${created.id}`);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="title">
          Title
        </label>
        <input
          id="title"
          required
          value={claim.title}
          onChange={(event) => update("title", event.target.value)}
          className="focus-ring rounded-md border border-line px-3 py-2"
          placeholder="Short summary of the knowledge claim"
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="category">
          Category
        </label>
        <select
          id="category"
          value={claim.category}
          onChange={(event) => update("category", event.target.value as ClaimInput["category"])}
          className="focus-ring rounded-md border border-line px-3 py-2"
        >
          {categories.map((category) => (
            <option key={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="description">
          Description
        </label>
        <textarea
          id="description"
          required
          value={claim.description}
          onChange={(event) => update("description", event.target.value)}
          className="focus-ring min-h-36 rounded-md border border-line px-3 py-2"
          placeholder="Describe what happened, what changed, or what should be corrected."
        />
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="usefulness">
          Usefulness for AI
        </label>
        <textarea
          id="usefulness"
          required
          value={claim.usefulness}
          onChange={(event) => update("usefulness", event.target.value)}
          className="focus-ring min-h-28 rounded-md border border-line px-3 py-2"
          placeholder="Explain how this could help AI systems become more accurate or useful."
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="evidenceUrl">
            Evidence link
          </label>
          <input
            id="evidenceUrl"
            value={claim.evidenceUrl}
            onChange={(event) => update("evidenceUrl", event.target.value)}
            className="focus-ring rounded-md border border-line px-3 py-2"
            placeholder="https://..."
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="location">
            Location
          </label>
          <input
            id="location"
            value={claim.location}
            onChange={(event) => update("location", event.target.value)}
            className="focus-ring rounded-md border border-line px-3 py-2"
            placeholder="Place, region, or context"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="observedAt">
            Date observed
          </label>
          <input
            id="observedAt"
            type="date"
            value={claim.observedAt}
            onChange={(event) => update("observedAt", event.target.value)}
            className="focus-ring rounded-md border border-line px-3 py-2"
          />
        </div>
        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="contributorName">
            Contributor name
          </label>
          <input
            id="contributorName"
            required
            value={claim.contributorName}
            onChange={(event) => update("contributorName", event.target.value)}
            className="focus-ring rounded-md border border-line px-3 py-2"
            placeholder="Name or organization"
          />
        </div>
      </div>

      <label className="flex items-start gap-3 rounded-md border border-line bg-white p-3 text-sm">
        <input
          type="checkbox"
          checked={claim.consent}
          onChange={(event) => update("consent", event.target.checked)}
          className="mt-1 h-4 w-4"
        />
        <span>I consent to this submission being reviewed and used in AI knowledge workflows.</span>
      </label>

      <button
        type="submit"
        disabled={isSubmitting}
        className="focus-ring inline-flex w-fit items-center gap-2 rounded-md bg-mint px-4 py-2 font-semibold text-white hover:bg-teal-800"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        {isSubmitting ? "Submitting..." : "Submit claim"}
      </button>
    </form>
  );
}
