import mongoose from "mongoose";
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

const seedClaims = seedInputs.map((input) => {
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

const claimSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    title: { type: String, required: true, trim: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    usefulness: { type: String, required: true },
    evidenceUrl: { type: String, default: "" },
    location: { type: String, default: "" },
    observedAt: { type: String, default: "" },
    contributorName: { type: String, required: true },
    consent: { type: Boolean, default: false },
    status: { type: String, required: true },
    reviewerFeedback: { type: String, default: "" },
    reviewerScore: { type: Number, default: 0 },
    aiUsefulness: { type: String, required: true },
    createdAt: { type: String, required: true },
    scores: {
      knowledgeValue: { type: Number, required: true },
      completeness: { type: Number, required: true },
      confidence: { type: String, required: true },
      suggestedUse: { type: String, required: true },
      flags: { type: [String], default: [] }
    }
  },
  {
    id: false,
    versionKey: false,
    toJSON: {
      transform(_doc, ret) {
        delete ret._id;
        return ret;
      }
    }
  }
);

export const Claim = mongoose.models.Claim || mongoose.model("Claim", claimSchema);

let useMemoryStore = false;
let memoryClaims = seedClaims;

function serializeClaim(claim) {
  if (!claim) return claim;
  const { _id, ...data } = claim;
  return data;
}

export function enableMemoryStore() {
  useMemoryStore = true;
  memoryClaims = [...seedClaims];
}

export async function seedClaimsIfEmpty() {
  if (useMemoryStore) return;

  const count = await Claim.countDocuments();
  if (count === 0) {
    await Claim.insertMany(seedClaims);
  }
}

export async function getClaims() {
  if (useMemoryStore) {
    return [...memoryClaims].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
  }

  const claims = await Claim.find().sort({ createdAt: -1 }).lean();
  return claims.map(serializeClaim);
}

export async function findClaim(id) {
  if (useMemoryStore) {
    return memoryClaims.find((claim) => claim.id === id);
  }

  const claim = await Claim.findOne({ id }).lean();
  return serializeClaim(claim);
}

export async function addClaim(claim) {
  if (useMemoryStore) {
    memoryClaims = [claim, ...memoryClaims];
    return claim;
  }

  const created = await Claim.create(claim);
  return created.toJSON();
}

export async function updateClaim(id, update) {
  if (useMemoryStore) {
    const claim = memoryClaims.find((item) => item.id === id);
    if (!claim) return undefined;

    Object.assign(claim, update);
    return claim;
  }

  const claim = await Claim.findOneAndUpdate({ id }, update, { new: true }).lean();
  return serializeClaim(claim);
}
