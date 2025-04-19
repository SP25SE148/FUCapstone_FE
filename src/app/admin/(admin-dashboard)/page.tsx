import { AdminDashboardProvider } from "@/contexts/admin/admin-dashboard-context";

import EstimateTopic from "./components/estimate-topic";
import AdminDashBoardCharts from "./components/admin-dashboard-chart";
import AdminDashBoardOverall from "./components/admin-dashboard-overall";

export default function AdminDashboardPage() {
    return (
        <AdminDashboardProvider>
            <div className="flex flex-col gap-4">
                <AdminDashBoardOverall />
                <EstimateTopic />
                <AdminDashBoardCharts />
            </div>
        </AdminDashboardProvider>
    )
}