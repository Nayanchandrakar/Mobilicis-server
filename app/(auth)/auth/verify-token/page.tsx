import { verifyTokenAction } from "@/app/action/verify-token";
import { CardWrapper } from "@/components/shared/card-wrapper";
import { serverUrl } from "@/lib/env-export";
import { cn } from "@/lib/utils";
import { DEFAULT_REDIRECT_URL, UNAUTHORIZED_REDIRECT } from "@/routes";

interface VerifyTokenPageProps {
  searchParams: {
    token: string;
  };
}

const VerifyTokenPage = async ({ searchParams }: VerifyTokenPageProps) => {
  const { token } = searchParams;
  if (!token) {
    return "";
  }
  const { error, success } = await verifyTokenAction(token);

  return (
    <CardWrapper
      title=" verify your email. ✅"
      description="email verification page"
      backButtonLabel="go to website"
      backButtonHref={serverUrl(
        !success ? UNAUTHORIZED_REDIRECT : DEFAULT_REDIRECT_URL
      )}
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

export default VerifyTokenPage;
