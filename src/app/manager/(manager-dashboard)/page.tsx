import { ManagerDashboardProvider } from "@/contexts/manager/manager-dashboard-context";

import InfoArchive from "./components/info-archive";
import ManagerGroupSummary from "./components/manager-group-summary";
import ManagerGroupOverall from "./components/manager-group-overall";
import ManagerDashBoardCharts from "./components/manager-dashboard-chart";
import ManagerDashBoardOverall from "./components/manager-dashboard-overall";

export default function ManagerDashboardPage() {
    return (
        <ManagerDashboardProvider>
            <div className="flex flex-col gap-4">
                <InfoArchive />
                <ManagerGroupOverall/>
                <ManagerGroupSummary />
                <ManagerDashBoardOverall />
                <ManagerDashBoardCharts />
            </div>
        </ManagerDashboardProvider>
    )
}