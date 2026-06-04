import { getGeneralReports } from "@/app/actions/reports";
import { ReportsClient } from "./reports-client";

export default async function ReportsPage() {
  const data = await getGeneralReports();

  return (
    <div>
      <ReportsClient data={data} />
    </div>
  );
}
