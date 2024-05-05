import db from "../lib/db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db?.user?.findFirst({
      where: {
        email,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await db?.user?.findFirst({
      where: {
        id,
      },
    });

    return user;
  } catch (error) {
    return null;
  }
};

export const getSessionByUserAgent = async (userAgent: string, id: string) => {
  try {
    const session = await db?.session?.findUnique({
      where: {
        userId: id,
        userAgent,
      },
    });

    return session;
  } catch (error) {
    return null;
  }
};

export const getSessionByUserId = async (id: string) => {
  try {
    const session = await db?.session?.findMany({
      where: {
        userId: id,
      },
      orderBy: {
        timeStamp: "desc",
      },
    });

    return session;
  } catch (error) {
    return null;
  }
};
