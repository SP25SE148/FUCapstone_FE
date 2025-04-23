import { AdminDashboardProvider } from "@/contexts/admin/admin-dashboard-context";

import EstimateTopic from "./components/estimate-topic";
import SelectSemester from "./components/select-semester";
import AdminDashBoardCharts from "./components/admin-dashboard-chart";
import AdminDashBoardOverall from "./components/admin-dashboard-overall";

export default function AdminDashboardPage() {
    return (
        <AdminDashboardProvider>
            <div className="flex flex-col gap-4">
                <SelectSemester />
                <AdminDashBoardOverall />
                <EstimateTopic />
                <AdminDashBoardCharts />
            </div>
        </AdminDashboardProvider>
    )
}