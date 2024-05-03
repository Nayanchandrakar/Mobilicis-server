import type { Request, Response } from "express";
import { AuthenticatedRequest } from "../types/types";
import { getUserById } from "../helpers";
import { getActivityByUserId } from "../helpers/acitivity-data";

const getActivitiesController = async (
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

    const activity = await getActivityByUserId(user?.id);

    return res.status(200).json({
      data: activity,
      success: "your activities.",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export { getActivitiesController };
