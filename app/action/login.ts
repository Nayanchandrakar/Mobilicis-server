"use server";

import { serverUrl } from "@/lib/env-export";
import { cookies, headers } from "next/headers";
import { loginSchema, loginSchemaType } from "@/schema/zod-schema";
import { userAgent } from "next/server";
import { cookieConfig } from "@/lib/utils";

export const loginAction = async (formData: loginSchemaType) => {
  try {
    const validateFields = loginSchema?.safeParse(formData);

    if (!validateFields?.success) {
      return {
        error: "Invalid credentials",
      };
    }

    const headersList = headers();
    const userAgentStructure = { headers: headersList };
    const { ua } = userAgent(userAgentStructure);

    const res = await fetch(serverUrl("/auth/login"), {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": ua,
      },
      body: JSON.stringify(formData),
    });

    const resData = await res.json();

    if (!res.ok) {
      return {
        error: resData?.error,
      };
    }

    const { data, success, twoFactor, redirect } = resData;

    if (data?.jwtToken) {
      cookies()?.set("token", data?.jwtToken, cookieConfig);
    }

    if (twoFactor) {
      return {
        twoFactor,
        success,
      };
    }

    return {
      redirect,
      success,
    };
  } catch (error) {
    console.log(`[ERROR_FROM_LOGIN_ACTION]`, error);
    return {
      error: "Internal server error",
    };
  }
};
