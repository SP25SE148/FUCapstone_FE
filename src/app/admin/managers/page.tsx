import ManagerTable from "./components/manager-table";
import ManagerOverall from "./components/manager-overall";

export default function AdminManageManagersPage() {
    return (
        <div className="flex flex-col gap-4">
            <ManagerOverall />
            <ManagerTable />
        </div>
    )
}