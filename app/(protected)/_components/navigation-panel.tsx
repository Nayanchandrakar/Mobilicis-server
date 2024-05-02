"use client";
import { FC } from "react";
import { usePathname, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { NavigationInterface, userPanel } from "@/constants/navigation";

interface NavigationPanelProps {}

const NavigationPanel: FC<NavigationPanelProps> = ({}) => {
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = (href: string) => {
    router.push(href);
  };

  const checkRoute = (href: string) => {
    const isActive =
      pathname === href ? "text-black bg-slate-100" : "text-slate-500 ";
    return isActive;
  };

  return (
    <div className="space-y-4 md:mt-[80px]">
      {userPanel?.map((navigation: NavigationInterface, index) => (
        <span
          key={index}
          onClick={() => handleClick(navigation?.href)}
          className={cn(
            "text-black text-sm font-medium antialiased  p-4 rounded-lg cursor-pointer hover:bg-slate-100 transition-colors duration-300 w-full flex items-center ",
            checkRoute(navigation?.href)
          )}
        >
          <navigation.Icon className="w-5 h-5 mr-2 transition-all duration-300 animate_spin_once" />
          {navigation?.label}
        </span>
      ))}
    </div>
  );
};

export default NavigationPanel;
