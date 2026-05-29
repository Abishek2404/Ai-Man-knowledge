import { createClaim, getClaim, listClaims, reviewClaim } from "./storage";
import type { ClaimInput, KnowledgeClaim, AiUsefulness, ClaimStatus } from "./types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api";

type ApiResponse<T> = {
  data: T;
};

export async function listClaimsApi(): Promise<KnowledgeClaim[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/claims`, { cache: "no-store" });
    if (!response.ok) throw new Error("Could not load claims");
    const payload = (await response.json()) as ApiResponse<KnowledgeClaim[]>;
    return payload.data;
  } catch {
    return listClaims();
  }
}

export async function getClaimApi(id: string): Promise<KnowledgeClaim | undefined> {
  try {
    const response = await fetch(`${API_BASE_URL}/claims/${id}`, { cache: "no-store" });
    if (!response.ok) throw new Error("Could not load claim");
    const payload = (await response.json()) as ApiResponse<KnowledgeClaim>;
    return payload.data;
  } catch {
    return getClaim(id);
  }
}

export async function createClaimApi(input: ClaimInput): Promise<KnowledgeClaim> {
  try {
    const response = await fetch(`${API_BASE_URL}/claims`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input)
    });
    if (!response.ok) throw new Error("Could not create claim");
    const payload = (await response.json()) as ApiResponse<KnowledgeClaim>;
    return payload.data;
  } catch {
    return createClaim(input);
  }
}

export async function reviewClaimApi(
  id: string,
  update: {
    status: ClaimStatus;
    reviewerFeedback: string;
    reviewerScore: number;
    aiUsefulness: AiUsefulness;
  }
): Promise<KnowledgeClaim | undefined> {
  try {
    const response = await fetch(`${API_BASE_URL}/reviews/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(update)
    });
    if (!response.ok) throw new Error("Could not review claim");
    const payload = (await response.json()) as ApiResponse<KnowledgeClaim>;
    return payload.data;
  } catch {
    return reviewClaim(id, update);
  }
}
