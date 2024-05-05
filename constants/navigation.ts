import { Activity, BarChart2, LucideIcon } from "lucide-react";

export interface NavigationInterface {
  label: string;
  href: string;
  Icon: LucideIcon;
}

export const userPanel: NavigationInterface[] = [
  { label: "Analytics", href: "/analytics", Icon: BarChart2 },
  { label: "Activities", href: "/activities", Icon: Activity },
];
