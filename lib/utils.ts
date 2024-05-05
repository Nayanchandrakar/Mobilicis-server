import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
const expires = new Date(new Date().getTime() + 7 * oneDay);

export const cookieConfig = {
  expires,
  secure: true,
  httpOnly: true,
};
