import express from "express";

// imports here
import { authenticateToken } from "../middleware/middleware";
import { getAnalyticsController } from "../controllers/analytics-controller";

const router = express.Router();

router.get("/get", authenticateToken, getAnalyticsController);

export default router;
