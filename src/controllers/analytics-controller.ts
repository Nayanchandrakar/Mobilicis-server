import type { Request, Response } from "express";
import { AuthenticatedRequest } from "../types/types";
import { getSessionByUserId, getUserById } from "../helpers";

const getAnalyticsController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req?.user;

    const user = await getUserById(userId);

    if (!user || !user?.emailVerified) {
      return res.status(401).json({
        error: "No user found",
      });
    }

    const session = await getSessionByUserId(user?.id);

    return res.status(200).json({
      data: session,
      success: "your session users.",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export { getAnalyticsController };
