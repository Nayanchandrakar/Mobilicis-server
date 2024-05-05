import type { Request, Response } from "express";
import bcrypt from "bcryptjs";

// imports
import { getSessionByUserAgent, getUserByEmail, getUserById } from "../helpers";
import db from "../lib/db";
import {
  loginSchemaType,
  registerSchemaType,
  twoFactorType,
} from "../schemas/auth-schema";
import {
  generateTwoFactorToken,
  getTokenByToken,
} from "../helpers/token-verification";

import { maintainSession } from "../helpers/session";
import { AuthenticatedRequest } from "../types/types";
import { createAuditLog } from "../helpers/audit";
import { sendTwoFactorEmail, sendVerificationEmail } from "../helpers/mail";
import { getTwoFactorTokenByEmail } from "../helpers/two-factor";
import { generateJsonToken } from "../lib/jwt";

const registerController = async (req: Request, res: Response) => {
  try {
    const { email, name, password }: registerSchemaType = req?.body;

    const user = await getUserByEmail(email);

    if (user) {
      return res.status(401).json({
        error: "Email already in use",
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await db?.user?.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });

    await sendVerificationEmail(email);

    return res.status(200).json({
      success: "Confirm your Email",
      data: null,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

const verifyTokenController = async (req: Request, res: Response) => {
  try {
    const token = req?.params?.token;

    if (!token) {
      return res.status(402).json({
        error: "token is not provided",
      });
    }

    const tokenData = await getTokenByToken(token);

    if (!tokenData) {
      return res.status(404).json({
        error: "token not exist",
      });
    }

    const userAgent = req?.headers["user-agent"];

    const hasExpired = !!(new Date(tokenData?.expire) < new Date());

    if (hasExpired) {
      return res.status(401).json({
        error: "Token is Expired",
      });
    }

    const user = await getUserByEmail(tokenData?.email);

    if (!user) {
      return res.status(405).json({
        error: "user not found",
      });
    }

    await db?.user?.update({
      where: {
        email: user?.email,
      },
      data: {
        emailVerified: new Date(),
      },
      select: {
        id: true,
      },
    });

    const session = await getSessionByUserAgent(userAgent, user?.id);
    const jwtToken = generateJsonToken(user?.id);
    await maintainSession(session, user?.id, userAgent, jwtToken);

    await createAuditLog({
      type: !user?.emailVerified ? "REGISTER" : "LOGIN",
      userAgent,
      userId: user?.id,
    });

    await db?.emailVerification?.delete({
      where: {
        token_email: {
          token: token,
          email: user?.email,
        },
      },
    });

    return res.status(200).json({
      success: !user?.emailVerified
        ? "Succefully registered"
        : "Succefully Login",
      data: {
        jwtToken,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password, code }: loginSchemaType = req?.body;

    const userAgent = req?.headers["user-agent"];

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(402).json({
        error: "Email not found",
      });
    }

    const validPassword = await bcrypt?.compare(password, user?.password);

    if (!validPassword) {
      return res.status(401).json({
        error: "Password is wrong",
      });
    }

    if (!user?.emailVerified) {
      await sendVerificationEmail(user?.email!);
      return res.status(406).json({
        error: "an verification email is sent!",
      });
    }

    // @FA code here

    if (user?.isTwoFactorEnabled && user?.email) {
      if (code) {
        const twoFactorToken = await getTwoFactorTokenByEmail(email);

        if (!twoFactorToken) {
          return res.status(406).json({
            error: "Code is wrong",
          });
        }

        if (twoFactorToken?.token !== code) {
          return res.status(409).json({
            error: "Invalid code!",
          });
        }

        const hasExpired = !!(new Date(twoFactorToken?.expire) < new Date());

        if (hasExpired) {
          return res.status(407).json({
            error: "Code is expired",
          });
        }

        await db?.twoFactorToken?.delete({
          where: {
            id: twoFactorToken?.id,
          },
        });
      } else {
        const twoFactorToken = await generateTwoFactorToken(user?.email);
        sendTwoFactorEmail(twoFactorToken?.email, twoFactorToken?.token);
        return res.status(200).json({
          twoFactor: true,
          success: "An code is sent to your email",
        });
      }
    }

    await createAuditLog({
      type: "LOGIN",
      userAgent,
      userId: user?.id,
    });

    // for normal user authentication

    const session = await getSessionByUserAgent(userAgent, user?.id);
    const jwtToken = generateJsonToken(user?.id);
    await maintainSession(session, user?.id, userAgent, jwtToken);

    await db?.user?.update({
      where: {
        id: user?.id,
      },
      data: {
        emailVerified: new Date(),
      },
    });

    res.status(200).json({
      data: {
        ...user,
        jwtToken,
      },
      redirect: true,
      success: "suceefully login",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

const userController = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const userId = req.user;

    const user = await getUserById(userId);

    if (!user) {
      return res.status(404).json({
        error: "Invalid token provided",
      });
    }

    return res.status(200).json({
      data: {
        password: null,
        ...user,
      },
      success: "user data succefully fetched",
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

const twoFactorController = async (
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
    const { twoFactor }: twoFactorType = req?.body;

    await db?.user?.update({
      where: {
        id: user?.id,
      },
      data: {
        isTwoFactorEnabled: !!twoFactor,
      },
      select: {
        isTwoFactorEnabled: true,
      },
    });

    return res.status(200).json({
      success: `two factor auth ${twoFactor ? "Enabled" : "Disabled"}`,
      data: twoFactor,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};

export {
  registerController,
  verifyTokenController,
  loginController,
  userController,
  twoFactorController,
};
