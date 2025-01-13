import AdminDashBoardCharts from "./components/admin-dashboard-chart";
import AdminDashBoardOverall from "./components/admin-dashboadr-overall";

export default function AdminDashboardPage() {
    return (
        <div className="flex flex-col gap-4">
            <AdminDashBoardOverall />
            <AdminDashBoardCharts />
        </div>
    )
}