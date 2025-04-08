import { AdminDashboardProvider } from "@/contexts/admin/admin-dashboard-context";

import AdminDashBoardCharts from "./components/admin-dashboard-chart";
import AdminDashBoardOverall from "./components/admin-dashboard-overall";

export default function AdminDashboardPage() {
    return (
        <AdminDashboardProvider>
            <div className="flex flex-col gap-4">
                <AdminDashBoardOverall />
                <AdminDashBoardCharts />
            </div>
        </AdminDashboardProvider>
    )
}