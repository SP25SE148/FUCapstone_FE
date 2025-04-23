import { SuperadminDashboardProvider } from "@/contexts/superadmin/superadmin-dashboard-context";

import SelectSemester from "./components/select-semester";
import DashBoardCharts from "@/app/superadmin/(superadmin-dashboard)/components/dashboard-chart";
import DashBoardOverallStats from "@/app/superadmin/(superadmin-dashboard)/components/dashboard-overall";

export default function Dashboard() {

  return (
    <SuperadminDashboardProvider>
      <div className="flex flex-col gap-4">
        <SelectSemester />
        <DashBoardOverallStats />
        <DashBoardCharts />
      </div>
    </SuperadminDashboardProvider>
  );
}
