import type { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthenticatedRequest } from "../types/types";

interface DecodedToken {
  id: string;
}

export const authenticateToken = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  const accessToken = (req.headers.authorization || "").replace(
    /^Bearer\s/,
    ""
  );

  if (!accessToken) {
    return res.sendStatus(401);
  }

  jwt.verify(accessToken, process?.env?.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.sendStatus(403);
    }

    const { id } = decoded as DecodedToken;

    req.user = id;
    return next();
  });
};
