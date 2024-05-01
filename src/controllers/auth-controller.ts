import type { Request, Response } from "express";
import bcrypt from "bcryptjs";

// imports
import { getUserByEmail } from "../helpers";
import db from "../lib/db";
import { loginSchemaType, registerSchemaType } from "../schemas/auth-schema";
import {
  generateEmailVerificationToken,
  getTokenByToken,
} from "../helpers/token-verification";

const registerController = async (req: Request, res: Response) => {
  try {
    const { email, name, password }: registerSchemaType = req?.body;

    const user = await getUserByEmail(email);

    if (user) {
      return res.status(401).json({
        message: "Email already in use",
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

    const verificationToken = await generateEmailVerificationToken(email);

    return res.status(200).json({
      message: "Confirm your Email",
      data: verificationToken,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const verifyTokenController = async (req: Request, res: Response) => {
  try {
    const token = req?.params?.token;

    if (!token) {
      return res.status(402).json({
        message: "token is not provided",
      });
    }

    const data = await getTokenByToken(token);

    if (!data) {
      return res.status(404).json({
        message: "token not exist",
      });
    }

    const hasExpired = !!(new Date(data?.expire) < new Date());

    if (hasExpired) {
      return res.status(401).json({
        message: "Token is Expired",
      });
    }

    await db?.user?.update({
      where: {
        email: data?.email,
      },
      data: {
        emailVerified: new Date(),
      },
    });

    return res.status(200).json({
      message: "Succefully login",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

const loginController = async (req: Request, res: Response) => {
  try {
    const { email, password }: loginSchemaType = req?.body;

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(402).json({
        message: "Email not in use!",
      });
    }

    const validPassword = await bcrypt?.compare(password, user?.password);

    if (!validPassword) {
      return res.status(401).json({
        message: "Password is wrong",
      });
    }

    // additional logic to be added for 2FA
    //here

    // for normal user authentication
    return res.json({
      message: "Succefully logged IN",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export { registerController, verifyTokenController, loginController };
