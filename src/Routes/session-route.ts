import express from "express";

// imports here
import { authenticateToken } from "../middleware/middleware";
import { getSingleSession } from "../controllers/session-controller";

const router = express.Router();

router.get("/single/:userAgent", authenticateToken, getSingleSession);

export default router;