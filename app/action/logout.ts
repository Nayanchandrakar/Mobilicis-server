"use server";
import { serverUrl } from "@/lib/env-export";
import { UNAUTHORIZED_REDIRECT } from "@/routes";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { getToken } from "./cookei";
import { userAgent } from "next/server";

export const trackLogoutAction = async () => {
  try {
    const token = await getToken();

    if (!token) {
      return false;
    }

    const headersList = headers();
    const userAgentStructure = { headers: headersList };
    const { ua } = userAgent(userAgentStructure);

    const res = await fetch(serverUrl("/auth/logout"), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "User-Agent": ua,
      },
    });

    const resData = await res.json();

    if (!res.ok) {
      return false;
    }

    const { success } = resData;

    if (success) {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
};

export const logoutAction = async () => {
  try {
    const isValid = await trackLogoutAction();
    if (isValid) {
      cookies()?.delete("token");
      redirect(UNAUTHORIZED_REDIRECT);
    }
    return false;
  } catch (error) {
    return false;
  }
};
