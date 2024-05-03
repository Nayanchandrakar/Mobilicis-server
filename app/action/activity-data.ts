import { activityInterface } from "@/types/types";
import { serverUrl } from "@/lib/env-export";
import { getToken } from "@/app/action/cookei";

export const getUserActivity = async () => {
  try {
    const token = await getToken();

    if (!token) {
      return {
        error: "No token found",
      };
    }

    const res = await fetch(`${serverUrl("/activity/get")}`, {
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
      data: activityInterface[] | [];
    } = resData;

    return {
      data,
    };
  } catch (error) {
    return null;
  }
};
