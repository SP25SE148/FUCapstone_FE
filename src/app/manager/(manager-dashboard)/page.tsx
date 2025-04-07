import { ManagerDashboardProvider } from "@/contexts/manager/manager-dashboard-context";

import InfoArchive from "./components/info-archive";
import ManagerDashBoardCharts from "./components/manager-dashboard-chart";
import ManagerDashBoardOverall from "./components/manager-dashboard-overall";

export default function ManagerDashboardPage() {
    return (
        <ManagerDashboardProvider>
            <div className="flex flex-col gap-4">
                <InfoArchive />
                <ManagerDashBoardOverall />
                <ManagerDashBoardCharts />
            </div>
        </ManagerDashboardProvider>
    )
}