"use client";
import { Badge } from "@/components/ui/badge";
import { sessionInterface } from "@/types/types";
import type { DeviceDetectorResult } from "device-detector-js";
import { Clock, Computer, User } from "lucide-react";

interface SessionCardProps extends Omit<sessionInterface, "userAgent"> {
  userAgent: DeviceDetectorResult;
}

const SessionCard = ({
  id,
  status,
  timeStamp,
  token,
  userAgent,
  userId,
}: SessionCardProps) => {
  console.log(userAgent);

  return (
    <div className="bg-sky-100/50 rounded-md p-3 space-y-4 border">
      <span className="flex items-center justify-between gap-3">
        <span className="flex gap-3">
          <Computer className="size-5 " />
          <p className="text-sm font-semibold">PC chrome - web browser</p>
        </span>
        <Badge className="bg-sky-600">current device</Badge>
      </span>

      <hr className="border-zinc-300" />
      <span className="flex items-start ">
        <User className="size-5 mr-3" />
        <text className="text-sm font-medium">Nayan</text>
      </span>

      <span className="flex items-start ">
        <Clock className="size-5 mr-3" />
        <time className="text-sm font-medium">24/04/24 12:47 pm GMT</time>
      </span>
    </div>
  );
};

export default SessionCard;
