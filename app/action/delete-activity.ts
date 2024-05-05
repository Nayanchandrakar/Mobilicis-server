"use server";

import { serverUrl } from "@/lib/env-export";
import { getToken } from "./cookei";
import { revalidateTag } from "next/cache";

export const deleteActivityAction = async (activityId: string) => {
  try {
    const token = await getToken();

    if (!token) {
      return false;
    }

    const res = await fetch(serverUrl("/activity/delete"), {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: activityId }),
    });

    const resData = await res.json();

    if (!res.ok) {
      return false;
    }

    revalidateTag("refetchActivity");

    const { success } = resData;

    if (success) {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
};
