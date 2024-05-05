import { authenticateToken } from "./../middleware/middleware";
import express from "express";
import {
  registerController,
  verifyTokenController,
  loginController,
  userController,
  twoFactorController,
} from "../controllers/auth-controller";
import {
  loginSchema,
  registerSchema,
  twoFactorSchema,
} from "../schemas/auth-schema";
import { validateData } from "../middleware/zod-validation";

const router = express.Router();

router.post("/register", validateData(registerSchema), registerController);
router.get("/verify-token/:token", verifyTokenController);
router.post("/login", validateData(loginSchema), loginController);
router.get("/user", authenticateToken, userController);
router.post(
  "/twofactor",
  validateData(twoFactorSchema),
  authenticateToken,
  twoFactorController
);

export default router;
