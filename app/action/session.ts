import { sessionInterface } from "./../../types/types";
import { serverUrl } from "@/lib/env-export";
import { getToken } from "@/app/action/cookei";
import { userAgent } from "next/server";
import { headers } from "next/headers";

export const getUserSession = async () => {
  try {
    const token = await getToken();

    if (!token) {
      return {
        error: "No token found",
      };
    }

    const res = await fetch(`${serverUrl("/analytics/get")}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      next: {
        tags: ["refetchSession"],
      },
    });

    const resData = await res.json();

    if (!res.ok) {
      return {
        error: resData?.error,
      };
    }

    const {
      data,
    }: {
      data: sessionInterface[] | [];
    } = resData;

    return {
      data,
    };
  } catch (error) {
    return null;
  }
};

export const getSingleSession = async (token: string) => {
  try {
    if (!token) {
      return {
        error: "No token found",
      };
    }

    const headersList = headers();
    const userAgentStructure = { headers: headersList };
    const { ua } = userAgent(userAgentStructure);

    const res = await fetch(`${serverUrl(`/session/single`)}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "User-Agent": ua,
      },
    });

    const resData = await res.json();

    if (!res.ok) {
      return {
        error: resData?.error,
      };
    }

    const {
      data,
    }: {
      data: sessionInterface | null;
    } = resData;

    return {
      data,
    };
  } catch (error) {
    return {
      error: "Internal server Error",
    };
  }
};
