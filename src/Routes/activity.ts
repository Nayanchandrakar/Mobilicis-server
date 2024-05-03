import express from "express";

// imports here
import { authenticateToken } from "../middleware/middleware";
import { getActivitiesController } from "../controllers/activity-controller";

const router = express.Router();

router.get("/get", authenticateToken, getActivitiesController);

export default router;
