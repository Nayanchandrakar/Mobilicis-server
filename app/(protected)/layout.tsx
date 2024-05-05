import type { Metadata } from "next";

import Navbar from "@/app/(protected)/_components/Navbar/Navbar";
import Sidebar from "@/app/(protected)/_components/Sidebar";
import { redirect } from "next/navigation";
import { getUser } from "@/app/action/user";
import { UNAUTHORIZED_REDIRECT } from "@/routes";
import { getToken } from "@/app/action/cookei";
import { SocketProvider } from "@/app/provider/socket-provider";
import { getSingleSession } from "../action/session";

export const metadata: Metadata = {
  title: "Protected user Page",
  description: "Next js server actions",
};

export default async function UserLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const token = await getToken();

  if (!token) {
    return redirect(UNAUTHORIZED_REDIRECT);
  }

  const user = await getUser(token);

  if (!user?.emailVerified) {
    return redirect(UNAUTHORIZED_REDIRECT);
  }

  const userSession = await getSingleSession(token);

  if (!userSession) {
    return redirect(UNAUTHORIZED_REDIRECT);
  }

  return (
    <SocketProvider user={user} session={userSession?.data!}>
      <div className="h-full relative">
        <div className="hidden p-4 h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0  bg-white  border-r">
          <Sidebar />
        </div>
        <Navbar user={user} />
        <main className="md:pl-72 pl-0 mt-[78px]">{children}</main>
      </div>
    </SocketProvider>
  );
}
