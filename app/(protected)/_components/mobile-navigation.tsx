"use client";
import { FC, useState, useEffect } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useMobileMenu } from "@/hooks/use-mobile-menu";
import Sidebar from "@/app/(protected)/_components/Sidebar";

interface MobileNavigationProps {}

const MobileNavigation: FC<MobileNavigationProps> = () => {
  const [isMount, setIsMounted] = useState(false);
  const { isOpen, onClose } = useMobileMenu((state) => ({
    isOpen: state.isOpen,
    onClose: state.onClose,
  }));

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMount) {
    return null;
  }

  return (
    <Sheet onOpenChange={onClose} open={isOpen}>
      <SheetContent className="w-72 " side="left">
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavigation;
