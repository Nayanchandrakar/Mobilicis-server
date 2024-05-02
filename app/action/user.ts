import { serverUrl } from "@/lib/env-export";

export const getUser = async (token: string) => {
  try {
    const res = await fetch(`${serverUrl("/auth/user")}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      return null;
    }

    const user = await res.json();

    return user?.data;
  } catch (error) {
    return null;
  }
};
