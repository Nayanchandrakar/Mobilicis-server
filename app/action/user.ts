import { serverUrl } from "@/lib/env-export";
import { userInterface } from "@/types/types";

export const getUser = async (token: string): Promise<userInterface | null> => {
  try {
    const res = await fetch(`${serverUrl("/auth/user")}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "force-cache",
    });

    if (!res.ok) {
      return null;
    }

    const {
      data,
    }: {
      data: userInterface;
    } = await res.json();

    return data;
  } catch (error) {
    return null;
  }
};
