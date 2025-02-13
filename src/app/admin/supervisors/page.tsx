import SupervisorTable from "./components/supervisor-table";
import SupervisorOverall from "./components/supervisor-overall";
import { SupervisorProvider } from "@/contexts/supervisor-context";

export default function AdminManageSupervisorsPage() {
    return (
        <SupervisorProvider>
            <div className="flex flex-col gap-4">
                <SupervisorOverall />
                <SupervisorTable />
            </div>
        </SupervisorProvider>
    )
}