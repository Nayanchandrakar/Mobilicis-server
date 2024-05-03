"use client";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { sessionInterface } from "@/types/types";
import type { DeviceDetectorResult } from "device-detector-js";
import { Clock, Computer, User } from "lucide-react";

interface SessionCardProps extends Omit<sessionInterface, "userAgent"> {
  userAgent: DeviceDetectorResult;
  ua: string;
  rawAgent: string;
}

const SessionCard = ({
  id,
  status,
  timeStamp,
  token,
  userAgent,
  userId,
  ua,
  rawAgent,
}: SessionCardProps) => {
  const { client, device, os } = userAgent;

  const isCurrentDevice = !!(ua === rawAgent);

  return (
    <div className="bg-sky-100/50 rounded-md p-3 space-y-4 border">
      <span className="flex items-center justify-between gap-3">
        <span className="flex gap-3">
          <Computer className="size-5 " />
          <p className="text-sm font-semibold">
            {device?.type} {client?.name} - {client?.type}
          </p>
        </span>
        {
          <Badge
            className={cn(
              isCurrentDevice
                ? "bg-sky-600 hover:bg-sky-600/90"
                : "bg-red-600 hover:bg-red-600/90"
            )}
          >
            {isCurrentDevice ? "current device" : "log out"}
          </Badge>
        }
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
    </div>
  );
};

export default SessionCard;
