"use server";
import { UNAUTHORIZED_REDIRECT } from "@/routes";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logoutAction = async () => {
  try {
    cookies()?.delete("token");
    redirect(UNAUTHORIZED_REDIRECT);
  } catch (error) {
    return null;
  }
};
