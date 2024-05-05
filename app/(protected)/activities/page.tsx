import { getUserActivity } from "@/app/action/activity-data";
import Container from "@/components/shared/global-container";
import { formatAgent } from "@/lib/user-agent-formatter";
import { DataTable } from "./_components/data-table";
import { activityType, columns } from "./_components/columns";
import ToogleMenu from "./_components/toogle-menu";
import { getUser } from "@/app/action/user";
import { getToken } from "@/app/action/cookei";
import { redirect } from "next/navigation";
import { UNAUTHORIZED_REDIRECT } from "@/routes";

interface ActivityPageProps {}

const ActivityPage = async ({}: ActivityPageProps) => {
  const activities = await getUserActivity();

  const token = await getToken();

  if (!token) {
    return redirect(UNAUTHORIZED_REDIRECT);
  }
  const user = await getUser(token!);

  if (!user) {
    return redirect(UNAUTHORIZED_REDIRECT);
  }

  const finalData: activityType[] = activities?.data?.map(
    ({ id, type, updatedAt, userAgent }) => ({
      id,
      type,
      time: new Date(updatedAt)?.toUTCString(),
      system: formatAgent(userAgent)?.os?.name!,
    })
  )!;

  return (
    <Container>
      <ToogleMenu token={token} user={user!} />
      <DataTable columns={columns} data={finalData} />
    </Container>
  );
};

export default ActivityPage;
