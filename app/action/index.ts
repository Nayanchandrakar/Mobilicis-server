"use server";

import { revalidateTag } from "next/cache";

export const refetchSession = async (tag: string) => {
  try {
    revalidateTag(tag);
    return true;
  } catch (error) {
    return false;
  }
};
