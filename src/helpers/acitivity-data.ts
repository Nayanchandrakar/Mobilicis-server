import db from "../lib/db";

export const getActivityByUserId = async (userId: string) => {
  try {
    const data = await db?.auditLog?.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return data;
  } catch (error) {
    return null;
  }
};
