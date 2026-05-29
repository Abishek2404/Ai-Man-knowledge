import { Router } from "express";
import {
  createClaim,
  getClaimById,
  listClaims
} from "../controllers/claimController.js";

const router = Router();

router.get("/", listClaims);
router.post("/", createClaim);
router.get("/:id", getClaimById);

export default router;
