import ManagerTable from "./components/manager-table";
import ManagerOverall from "./components/manager-overall";
import { AdminManagerProvider } from "@/contexts/admin/admin-manager-context";

export default function AdminManageManagersPage() {
    return (
        <AdminManagerProvider>
            <div className="flex flex-col gap-4">
                <ManagerOverall />
                <ManagerTable />
            </div>
        </AdminManagerProvider>
    )
}