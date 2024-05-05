import type { Request, Response } from "express";
import { AuthenticatedRequest } from "../types/types";
import { getUserById } from "../helpers";
import db from "../lib/db";

const getSingleSession = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req?.user;

    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({
        error: "No user Found",
      });
    }

    const { userAgent } = req?.params;

    if (!userAgent) {
      return res.status(402).json({
        error: "No user Agent found",
      });
    }

    const session = await db?.session?.findUnique({
      where: {
        userAgent,
        userId: user?.id,
      },
    });

    if (!session) {
      return res.status(405).json({
        error: "Session not exist",
      });
    }

    return res.status(200).json({
      data: session,
      success: "Session exist!",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server Error",
    });
  }
};

export { getSingleSession };