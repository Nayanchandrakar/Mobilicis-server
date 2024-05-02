"use server";

import { serverUrl } from "@/lib/env-export";
import { cookies } from "next/headers";
import { loginSchema, loginSchemaType } from "@/schema/zod-schema";

export const loginAction = async (formData: loginSchemaType) => {
  try {
    const validateFields = loginSchema?.safeParse(formData);

    if (!validateFields?.success) {
      return {
        error: "Invalid credentials",
      };
    }

    const res = await fetch(serverUrl("/auth/login"), {
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

    const { data, success } = resData;
    cookies()?.set("token", data?.jwtToken);

    return {
      success,
    };
  } catch (error) {
    console.log(`[ERROR_FROM_LOGIN_ACTION]`, error);
    return {
      error: "Internal server error",
    };
  }
};
