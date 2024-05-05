"use server";

import { serverUrl } from "@/lib/env-export";
import { twoFactorSchema, twoFactorSchemaType } from "@/schema/zod-schema";

export const twoFactorAction = async (
  formData: twoFactorSchemaType,
  token: string
) => {
  try {
    const validateFields = twoFactorSchema?.safeParse(formData);

    if (!validateFields?.success) {
      return {
        error: "Invalid credentials",
      };
    }

    const res = await fetch(serverUrl("/auth/twofactor"), {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const resData = await res.json();

    if (!res.ok) {
      return {
        error: resData?.error,
      };
    }

    const { success, error, data } = resData;

    if (success) {
      return {
        data,
        success,
      };
    }

    return {
      error,
    };
  } catch (error) {
    console.log(`[ERROR_FROM_TWO_FACTOR_ACTION]`, error);
    return {
      error: "Internal server error",
    };
  }
};
