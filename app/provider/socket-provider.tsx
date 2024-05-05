"use client";

import { sessionInterface, userInterface } from "@/types/types";
import { useContext, useState, useEffect, createContext } from "react";
import { io } from "socket.io-client";
import type { Socket } from "socket.io-client";
import { toast } from "sonner";
import { logoutAction } from "@/app/action/logout";

type SocketContextType = {
  isConnected: boolean;
  socket: Socket | null;
};

const SocketContext = createContext<SocketContextType>({
  isConnected: false,
  socket: null,
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({
  children,
  user,
  session,
}: {
  children: React.ReactNode;
  user: userInterface;
  session: sessionInterface;
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socketInstance = io("http://localhost:5000", {
      transports: ["websocket", "polling"],
    });

    socketInstance.on("connect", () => {
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      setIsConnected(false);
    });

    socketInstance.on("listen", () => {
      console.log("user connnected");
    });

    if (user && user?.id) {
      socketInstance?.on(user?.id, async (isValid) => {
        if (isValid) {
          await logoutAction();
          toast.error("Session expired");
        }
      });
    }

    if (session && session?.id) {
      socketInstance?.on(session?.id, async (isValid) => {
        if (isValid) {
          await logoutAction();
          toast.error("Session logout");
        }
      });
    }

    if (session && session?.id) {
      socketInstance?.on(`${session?.id}34545`, async (isValid) => {
        if (isValid) {
          await logoutAction();
          toast.error("Device restricted");
        }
      });
    }

    setSocket(socketInstance as Socket);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};
