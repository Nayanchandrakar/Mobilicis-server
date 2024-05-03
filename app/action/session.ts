import { sessionInterface } from "./../../types/types";
import { serverUrl } from "@/lib/env-export";
import { getToken } from "@/app/action/cookei";

export const getUserSession = async () => {
  try {
    const token = await getToken();

    if (!token) {
      return {
        error: "No token found",
      };
    }

    console.log(token);

    const res = await fetch(`${serverUrl("/analytics/get")}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
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
