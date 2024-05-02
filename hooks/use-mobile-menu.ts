import { create } from "zustand";

interface mobileMenuProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useMobileMenu = create<mobileMenuProps>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
