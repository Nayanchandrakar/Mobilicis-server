import type { Request, Response } from "express";
import { AuthenticatedRequest } from "../types/types";
import { getUserById } from "../helpers";
import { getActivityByUserId } from "../helpers/acitivity-data";
import { deleteActivitySchemaType } from "../schemas/activity-schema";
import db from "../lib/db";

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

const deleteActivityController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.user;

    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({
        error: "Invalid token provided",
      });
    }

    const { id }: deleteActivitySchemaType = req?.body;

    const isExist = await db?.auditLog?.findFirst({
      where: {
        id,
        userId,
      },
    });

    if (!isExist) {
      return res.status(404).json({
        error: "No activity Data found",
      });
    }

    await db?.auditLog?.delete({
      where: {
        id: isExist?.id,
        userId,
      },
    });

    return res.status(200).json({
      success: "Activity deleted",
      data: true,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export { getActivitiesController, deleteActivityController };
