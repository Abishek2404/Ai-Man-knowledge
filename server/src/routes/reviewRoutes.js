import { Router } from "express";
import { reviewClaim } from "../controllers/reviewController.js";

const router = Router();

router.patch("/:id", reviewClaim);

export default router;
