import type { Session } from "@prisma/client";
import db from "../lib/db";
import { generateJsonToken } from "../lib/jwt";

export const maintainSession = async (
  session: Session,
  userId: string,
  userAgent: string
) => {
  const jwtToken = generateJsonToken(userId);

  try {
    if (session) {
      await db?.session?.update({
        where: {
          userAgent: session?.userAgent,
          userId: session?.userId,
        },
        data: {
          token: jwtToken,
          status: true,
          timeStamp: new Date(),
        },
      });
    } else {
      await db?.session?.create({
        data: {
          token: jwtToken,
          userAgent,
          userId,
          status: true,
        },
      });
    }

    return { jwtToken };
  } catch (error) {
    return null;
  }
};
