import { Router } from "express";
import verifyJWT from "../middleware/auth.middleware.js";
import { generateAiReview } from "../controllers/ai.controller.js";
import upload from "../middleware/upload.middleware.js";

const router = Router();

// secure routes
router
  .route("/review")
  .post(verifyJWT, upload.single("resume"), generateAiReview);

export default router;
