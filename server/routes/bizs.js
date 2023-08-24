import express from "express";
import { getFeedBizs, getUserBizs, likeBiz } from "../controllers/bizs.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedBizs);
router.get("/:userId/bizs", verifyToken, getUserBizs);

/* UPDATE */
router.patch("/:id/like", verifyToken, likeBiz);

export default router;
