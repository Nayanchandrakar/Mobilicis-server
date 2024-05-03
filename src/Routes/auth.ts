import express from "express";
import {
  registerController,
  verifyTokenController,
  loginController,
  userController,
} from "../controllers/auth-controller";
import { loginSchema, registerSchema } from "../schemas/auth-schema";
import { validateData } from "../middleware/zod-validation";
import { authenticateToken } from "../middleware/middleware";

const router = express.Router();

router.post("/register", validateData(registerSchema), registerController);
router.get("/verify-token/:token", verifyTokenController);
router.post("/login", validateData(loginSchema), loginController);
router.get("/user", authenticateToken, userController);

export default router;
