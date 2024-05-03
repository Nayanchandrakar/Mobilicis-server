import { Activity, BarChart2, Layout, LucideIcon } from "lucide-react";

export interface NavigationInterface {
  label: string;
  href: string;
  Icon: LucideIcon;
}

export const userPanel: NavigationInterface[] = [
  { label: "Analytics", href: "/analytics", Icon: BarChart2 },
  { label: "Activities", href: "/activities", Icon: Activity },
];

export const adminPanel: NavigationInterface[] = [
  { label: "Dashboard", href: "/user", Icon: Layout },
  { label: "Activities", href: "/activity", Icon: Activity },
];
