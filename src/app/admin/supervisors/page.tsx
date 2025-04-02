import { AdminSupervisorProvider } from "@/contexts/admin/admin-supervisor-context";

import SupervisorTable from "./components/supervisor-table";
import SupervisorOverall from "./components/supervisor-overall";

export default function AdminManageSupervisorsPage() {
    return (
        <AdminSupervisorProvider>
            <div className="flex flex-col gap-4">
                <SupervisorOverall />
                <SupervisorTable />
            </div>
        </AdminSupervisorProvider>
    )
}