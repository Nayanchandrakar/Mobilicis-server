import { v4 as uuidv4 } from "uuid";
import db from "../lib/db";

export const getTokenByEmail = async (email: string) => {
  try {
    const token = await db?.emailVerification?.findFirst({
      where: {
        email,
      },
    });

    return token;
  } catch (error) {
    return null;
  }
};

export const getTokenByToken = async (token: string) => {
  try {
    const data = await db?.emailVerification?.findFirst({
      where: {
        token,
      },
    });

    return data;
  } catch (error) {
    return null;
  }
};

export const generateEmailVerificationToken = async (email: string) => {
  try {
    const isExist = await getTokenByEmail(email);

    if (isExist) {
      await db?.emailVerification?.delete({
        where: {
          id: isExist?.id,
        },
      });
    }

    const token = uuidv4();

    const expire = new Date(new Date().getTime() + 3600 * 1000);

    const newToken = await db?.emailVerification?.create({
      data: {
        email,
        expire,
        token,
      },
    });

    return newToken;
  } catch (error) {
    return null;
  }
};
