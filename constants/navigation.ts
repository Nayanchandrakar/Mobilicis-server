import { Compass, Layout, LucideIcon } from "lucide-react";

export interface NavigationInterface {
  label: string;
  href: string;
  Icon: LucideIcon;
}

export const userPanel: NavigationInterface[] = [
  { label: "Dashboard", href: "/", Icon: Layout },
  { label: "Browse", href: "/browse", Icon: Compass },
];
