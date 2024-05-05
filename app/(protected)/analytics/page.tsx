import { getUserSession } from "@/app/action/session";
import Container from "@/components/shared/global-container";
import { ShieldCheck } from "lucide-react";
import Link from "next/link";
import SessionCard from "./_components/session-card";
import { formatAgent } from "@/lib/user-agent-formatter";
import { headers } from "next/headers";
import { userAgent } from "next/server";

interface AnalyticsPageProps {}

const AnalyticsPage = async ({}: AnalyticsPageProps) => {
  const session = await getUserSession();

  const headersList = headers();
  const userAgentStructure = { headers: headersList };
  const { ua } = userAgent(userAgentStructure);

  const formattedData = session?.data?.map((elem) => ({
    ...elem,
    userAgent: formatAgent(elem?.userAgent),
    rawAgent: elem?.userAgent,
  }));

  return (
    <Container>
      <>
        <div className="md:py-10 flex items-center justify-center flex-col">
          <ShieldCheck className="size-24 text-sky-600" />
          <h2 className="font-semibold text-xl sm:text-3xl text-center">
            Manage Access and Devices
          </h2>
          <p className="text-center font-medium text-sm mt-2 sm:mt-4 line-clamp-3">
            These signed-in devices have recently been active on this account.
            You
            <br className="hidden lg:inline-block" /> can Sign out an unfamiliar
            devices or <Link href="/">change your password</Link> for added
            <br /> security.
          </p>
        </div>
        <section className="grid grid-cols-1 lg:grid-cols-2 min-[1350px]:grid-cols-3 gap-6 mt-12 md:mt-0 mb-12 ">
          {formattedData?.map((data) => (
            <SessionCard key={data?.id} {...data} ua={ua} />
          ))}
        </section>
      </>
    </Container>
  );
};

export default AnalyticsPage;
