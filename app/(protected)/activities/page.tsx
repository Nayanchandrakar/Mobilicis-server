import { getUserActivity } from "@/app/action/activity-data";
import Container from "@/components/shared/global-container";
import { formatAgent } from "@/lib/user-agent-formatter";
import { DataTable } from "./_components/data-table";
import { activityType, columns } from "./_components/columns";

interface ActivityPageProps {}

const ActivityPage = async ({}: ActivityPageProps) => {
  const activities = await getUserActivity();

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
      <DataTable columns={columns} data={finalData} />
    </Container>
  );
};

export default ActivityPage;
