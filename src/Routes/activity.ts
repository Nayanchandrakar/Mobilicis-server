import express from "express";

// imports here
import { authenticateToken } from "../middleware/middleware";
import {
  getActivitiesController,
  deleteActivityController,
} from "../controllers/activity-controller";
import { validateData } from "../middleware/zod-validation";
import { deleteActivitySchema } from "../schemas/activity-schema";

const router = express.Router();

router.get("/get", authenticateToken, getActivitiesController);
router.delete(
  "/delete",
  validateData(deleteActivitySchema),
  authenticateToken,
  deleteActivityController
);

export default router;
