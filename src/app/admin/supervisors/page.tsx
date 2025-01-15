import SupervisorTable from "./components/supervisor-table";
import SupervisorOverall from "./components/supervisor-overall";

export default function AdminManageSupervisorsPage() {
    return (
        <div className="flex flex-col gap-4">
            <SupervisorOverall />
            <SupervisorTable />
        </div>
    )
}