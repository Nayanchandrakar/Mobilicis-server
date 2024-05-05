"use client";

import { verifyTokenAction } from "@/app/action/verify-token";
import { CardWrapper } from "@/components/shared/card-wrapper";
import { serverUrl } from "@/lib/env-export";
import { cn } from "@/lib/utils";
import { DEFAULT_REDIRECT_URL, UNAUTHORIZED_REDIRECT } from "@/routes";
import { useEffect, useState } from "react";

export const TokenVerification = ({ token }: { token: string }) => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const verifyToken = async () => {
    const { error, success } = await verifyTokenAction(token);
    setSuccess(success);
    setError(error);
  };

  useEffect(() => {
    verifyToken();
  }, []);

  return (
    <CardWrapper
      title=" verify your email. ✅"
      description="email verification page"
      backButtonLabel="go to website"
      backButtonHref={!success ? UNAUTHORIZED_REDIRECT : DEFAULT_REDIRECT_URL}
    >
      <div
        className={cn(
          "flex items-center justify-center font-semibold h-28 border rounded-md border-zinc-200",
          success ? "text-green-500" : "text-red-500"
        )}
      >
        {success ? success : error}
      </div>
    </CardWrapper>
  );
};
