import { ManagerDashboardProvider } from "@/contexts/manager/manager-dashboard-context";

import SelectSemester from "./components/select-semester";
import ManagerGroupSummary from "./components/manager-group-summary";
import ManagerGroupOverall from "./components/manager-group-overall";
import ManagerDashBoardCharts from "./components/manager-dashboard-chart";
import ManagerDashBoardOverall from "./components/manager-dashboard-overall";

export default function ManagerDashboardPage() {
    return (
        <ManagerDashboardProvider>
            <div className="flex flex-col gap-4">
                <SelectSemester/>
                <ManagerGroupOverall/>
                <ManagerGroupSummary />
                <ManagerDashBoardOverall />
                <ManagerDashBoardCharts />
            </div>
        </ManagerDashboardProvider>
    )
}