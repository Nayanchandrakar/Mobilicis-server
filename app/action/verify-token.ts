"use server";
import { serverUrl } from "@/lib/env-export";
import { cookies, headers } from "next/headers";
import { userAgent } from "next/server";

export const verifyTokenAction = async (token: string) => {
  try {
    if (!token) {
      return {
        error: "Invalid credentials",
      };
    }

    const headersList = headers();
    const userAgentStructure = { headers: headersList };
    const { ua } = userAgent(userAgentStructure);

    const res = await fetch(serverUrl(`/auth/verify-token/${token}`), {
      headers: {
        "User-Agent": ua,
      },
    });

    const resData = await res.json();

    if (!res.ok) {
      return {
        error: resData?.error,
      };
    }

    const { data, success } = resData;

    if (data?.jwtToken) {
      cookies()?.set("token", data?.jwtToken);
    }

    return {
      success,
    };
  } catch (error) {
    console.log(`[ERROR_FROM_VERIFY_ACTION]`, error);
    return {
      error: "Internal server error",
    };
  }
};
