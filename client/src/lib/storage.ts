"use client";

import { scoreClaim } from "./scoring";
import type { ClaimInput, ClaimStatus, KnowledgeClaim, AiUsefulness } from "./types";

const STORAGE_KEY = "aiman.claims.v1";

export function listClaims(): KnowledgeClaim[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    const seeded = seedClaims();
    saveClaims(seeded);
    return seeded;
  }

  try {
    return JSON.parse(raw) as KnowledgeClaim[];
  } catch {
    return [];
  }
}

export function getClaim(id: string): KnowledgeClaim | undefined {
  return listClaims().find((claim) => claim.id === id);
}

export function createClaim(input: ClaimInput): KnowledgeClaim {
  const claim: KnowledgeClaim = {
    ...input,
    id: crypto.randomUUID(),
    status: "Submitted",
    reviewerFeedback: "",
    reviewerScore: 0,
    aiUsefulness: scoreClaim(input).suggestedUse,
    createdAt: new Date().toISOString(),
    scores: scoreClaim(input)
  };

  saveClaims([claim, ...listClaims()]);
  return claim;
}

export function reviewClaim(
  id: string,
  update: {
    status: ClaimStatus;
    reviewerFeedback: string;
    reviewerScore: number;
    aiUsefulness: AiUsefulness;
  }
): KnowledgeClaim | undefined {
  const claims = listClaims();
  const updated = claims.map((claim) =>
    claim.id === id
      ? {
          ...claim,
          ...update
        }
      : claim
  );
  saveClaims(updated);
  return updated.find((claim) => claim.id === id);
}

function saveClaims(claims: KnowledgeClaim[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(claims));
}

function seedClaims(): KnowledgeClaim[] {
  const examples: ClaimInput[] = [
    {
      title: "Damaged pedestrian bridge near river crossing",
      category: "Infrastructure Issue",
      description:
        "The pedestrian bridge connecting the west path to the market road has visible railing damage and missing warning signs. Local residents still use it daily, but the route should not be marked as fully safe until inspected.",
      usefulness:
        "Mapping assistants and local safety tools could use this to avoid routing vulnerable pedestrians through an unsafe crossing.",
      evidenceUrl: "https://example.com/bridge-photo",
      location: "Market Road river crossing",
      observedAt: "2026-05-21",
      contributorName: "Field volunteer",
      consent: true
    },
    {
      title: "Outdated permit instruction in AI answer",
      category: "AI Correction",
      description:
        "An AI assistant gave an old permit submission process and missed the newer online-only form requirement. The official office now asks applicants to upload documents before visiting.",
      usefulness:
        "This can help evaluate assistants that answer government procedure questions and reduce outdated procedural guidance.",
      evidenceUrl: "",
      location: "City planning office",
      observedAt: "2026-05-12",
      contributorName: "Community member",
      consent: true
    }
  ];

  return examples.map((input) => ({
    ...input,
    id: crypto.randomUUID(),
    status: input.evidenceUrl ? "Needs Review" : "Needs More Evidence",
    reviewerFeedback: "",
    reviewerScore: 0,
    aiUsefulness: scoreClaim(input).suggestedUse,
    createdAt: new Date().toISOString(),
    scores: scoreClaim(input)
  }));
}
