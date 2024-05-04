"use client";
import { useSocket } from "@/app/provider/socket-provider";
import { Button } from "@/components/ui/button";
import { userInterface } from "@/types/types";

interface ToogleMenuProps {
  user: userInterface;
}

const ToogleMenu = ({ user }: ToogleMenuProps) => {
  const { isConnected, socket } = useSocket();

  const handleSocket = () => {
    if (!socket) {
      return null;
    }
    socket?.emit("logoutAll", user);
  };

  return (
    <div className="pt-16 mb-8 ">
      <div className="flex items-center justify-between">
        <span />
        <Button
          size="lg"
          onClick={() => handleSocket()}
          variant="outline"
          className="text-red-600 hover:text-red-600/90"
        >
          <p>Status: {isConnected ? "connected" : "disconnected"}</p>
        </Button>
      </div>
    </div>
  );
};

export default ToogleMenu;
