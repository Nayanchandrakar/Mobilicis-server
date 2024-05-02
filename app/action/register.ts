"use server";

import { serverUrl } from "@/lib/env-export";
import { registerSchema, registerSchemaType } from "@/schema/zod-schema";

export const registerAction = async (formData: registerSchemaType) => {
  try {
    const validateFields = registerSchema?.safeParse(formData);

    if (!validateFields?.success) {
      return {
        error: "Invalid credentials",
      };
    }

    const res = await fetch(serverUrl("/auth/register"), {
      method: "POST",
      headers: {
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

    const { success } = resData;

    return {
      success,
    };
  } catch (error) {
    console.log(`[ERROR_FROM_REGISTER_ACTION]`, error);
    return {
      error: "Internal server error",
    };
  }
};
