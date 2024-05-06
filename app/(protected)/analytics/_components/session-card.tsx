"use client";

import { refetchSession } from "@/app/action";
import { useSocket } from "@/app/provider/socket-provider";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { sessionInterface } from "@/types/types";
import type { DeviceDetectorResult } from "device-detector-js";
import { Clock, Computer, User } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface SessionCardProps extends Omit<sessionInterface, "userAgent"> {
  userAgent: DeviceDetectorResult;
  ua: string;
  rawAgent: string;
}

const SessionCard = ({
  id,
  timeStamp,
  userAgent,
  ua,
  rawAgent,
  isRestricted,
}: SessionCardProps) => {
  const { client, device, os } = userAgent;

  const isCurrentDevice = !!(ua === rawAgent);
  const [isRestrictedLoading, setIsRestricted] = useState(false);
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);

  const { socket } = useSocket();

  const handleSessionLogout = async () => {
    try {
      if (isCurrentDevice) {
        return;
      }

      if (!socket) {
        return;
      }

      if (isLogoutLoading) {
        return;
      }

      setIsLogoutLoading(true);
      socket?.emit("sessionLogout", id);
      await refetchSession("refetchSession");
    } catch (error) {
      toast.error("Internal server error");
    } finally {
      setIsLogoutLoading(false);
    }
  };

  const handleRestrictDevice = async () => {
    try {
      if (!socket) {
        return;
      }

      if (isCurrentDevice) {
        return;
      }

      setIsRestricted(true);
      socket?.emit("restrictDevice", {
        id,
        isRestricted: !isRestricted,
      });

      await refetchSession("refetchSession");
    } catch (error) {
      toast.error("Internal server Error");
    } finally {
      setIsRestricted(false);
    }
  };

  return (
    <div className="bg-sky-100/50 rounded-md p-3 space-y-4 border">
      <span className="flex items-center justify-between gap-3">
        <span className="flex gap-3">
          <Computer className="size-5 " />
          <p className="text-sm font-semibold">
            {device?.type} {client?.name} - {client?.type}
          </p>
        </span>
        {!isRestricted && (
          <Badge
            onClick={() => handleSessionLogout()}
            className={cn(
              "cursor-pointer line-clamp-1",
              isLogoutLoading && "opacity-90",
              isCurrentDevice
                ? "bg-sky-600 hover:bg-sky-600/90"
                : "bg-red-600 hover:bg-red-600/90"
            )}
          >
            {isCurrentDevice ? "current device" : "log out"}
          </Badge>
        )}
      </span>

      <hr className="border-zinc-300" />
      <span className="flex items-start ">
        <User className="size-5 mr-3" />
        <text className="text-sm font-medium">{os?.name}</text>
      </span>

      <span className="flex items-start ">
        <Clock className="size-5 mr-3" />
        <time className="text-sm font-medium">
          {new Date(timeStamp)?.toUTCString()}
        </time>
      </span>

      <Button
        size="sm"
        disabled={isCurrentDevice || isRestrictedLoading}
        onClick={handleRestrictDevice}
        className="w-full bg-sky-600 hover:bg-sky-600/90 rounded-md"
      >
        {isRestricted ? "Unrestrict device" : " Restrict this device"}
      </Button>
    </div>
  );
};

export default SessionCard;
