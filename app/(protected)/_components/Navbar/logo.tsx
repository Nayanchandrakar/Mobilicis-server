"use client";

import { FC } from "react";
import Link from "next/link";
import { MuseoModerno } from "next/font/google";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { useMobileMenu } from "@/hooks/use-mobile-menu";
import { Menu } from "lucide-react";

interface LogoProps {}

const font = MuseoModerno({ subsets: ["latin"] });

const Logo: FC<LogoProps> = ({}) => {
  const mobileMenu = useMobileMenu();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-x-4">
      {pathname !== "/" ? (
        <Menu
          className="md:hidden inline-block w-7 h-7 cursor-pointer"
          color="black"
          onClick={() => mobileMenu.onOpen()}
        />
      ) : null}
      <Link href="/" className={cn("text-2xl font-medium", font?.className)}>
        User
      </Link>
    </div>
  );
};

export default Logo;
