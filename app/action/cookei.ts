import { cookies } from "next/headers";

export const getToken = async (): Promise<string | null> => {
  try {
    const token = cookies()?.get("token")?.value as string;
    return token;
  } catch (error) {
    return null;
  }
};
