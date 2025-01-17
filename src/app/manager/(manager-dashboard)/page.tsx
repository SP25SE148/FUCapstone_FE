import ManagerDashBoardCharts from "./components/manager-dashboard-chart";
import ManagerDashBoardOverall from "./components/manager-dashboard-overall";

export default function ManagerDashboardPage() {
    return (
        <div className="flex flex-col gap-4">
            <ManagerDashBoardOverall />
            <ManagerDashBoardCharts />
        </div>
    )
}