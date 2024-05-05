import type { Session } from "@prisma/client";
import db from "../lib/db";
import { getUserById } from "../helpers";

export const maintainSession = async (
  session: Session,
  userId: string,
  userAgent: string,
  jwtToken: string
) => {
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

    return true;
  } catch (error) {
    return null;
  }
};

export const deleteUserSession = async (userId: string) => {
  try {
    const user = await getUserById(userId);

    if (!user) {
      return false;
    }

    await db?.session?.deleteMany({
      where: {
        userId,
      },
    });

    return true;
  } catch (error) {
    return false;
  }
};

export const getSessionById = async (id: string) => {
  try {
    const session = await db?.session?.findFirst({
      where: {
        id,
      },
    });

    return session;
  } catch (error) {
    return null;
  }
};

export const deleteSingleSession = async (id: string) => {
  try {
    const isExist = await getSessionById(id);
    if (!isExist) {
      return null;
    }

    const deletedData = await db?.session?.delete({
      where: {
        id: isExist?.id,
      },
    });

    return deletedData;
  } catch (error) {
    return null;
  }
};
