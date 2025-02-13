import ManagerTable from "./components/manager-table";
import ManagerOverall from "./components/manager-overall";
import { ManagerProvider } from "@/contexts/manager-context";

export default function AdminManageManagersPage() {
    return (
        <ManagerProvider>
            <div className="flex flex-col gap-4">
                <ManagerOverall />
                <ManagerTable />
            </div>
        </ManagerProvider>
    )
}