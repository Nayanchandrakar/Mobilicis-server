import { v4 as uuidv4 } from "uuid";
import db from "../lib/db";
import { getTwoFactorTokenByEmail } from "../helpers/two-factor";
import crypto from "crypto";

export const generateTwoFactorToken = async (email: string) => {
  const token = crypto.randomInt(100_000, 1_000_000).toString();
  const expire = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getTwoFactorTokenByEmail(email);
  if (existingToken) {
    await db?.twoFactorToken?.delete({
      where: {
        id: existingToken?.id,
      },
    });
  }

  const twoFactorToken = await db?.twoFactorToken?.create({
    data: {
      email,
      token,
      expire,
    },
  });

  return twoFactorToken;
};

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
