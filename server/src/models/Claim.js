import { scoreClaim } from "../services/scoringService.js";

const seedInputs = [
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

const claims = seedInputs.map((input) => {
  const scores = scoreClaim(input);
  return {
    ...input,
    id: crypto.randomUUID(),
    status: input.evidenceUrl ? "Needs Review" : "Needs More Evidence",
    reviewerFeedback: "",
    reviewerScore: 0,
    aiUsefulness: scores.suggestedUse,
    createdAt: new Date().toISOString(),
    scores
  };
});

export function getClaims() {
  return [...claims].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
}

export function findClaim(id) {
  return claims.find((claim) => claim.id === id);
}

export function addClaim(claim) {
  claims.unshift(claim);
  return claim;
}

export function updateClaim(id, update) {
  const index = claims.findIndex((claim) => claim.id === id);
  if (index === -1) return undefined;
  claims[index] = { ...claims[index], ...update };
  return claims[index];
}
