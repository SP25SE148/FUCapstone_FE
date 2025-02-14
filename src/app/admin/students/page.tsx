import StudentTable from "./components/student-table";
import StudentOverall from "./components/student-overall";
import { StudentProvider } from "@/contexts/student-context";

export default function AdminManageStudentsPage() {
    return (
        <StudentProvider>
            <div className="flex flex-col gap-4">
                <StudentOverall />
                <StudentTable />
            </div>
        </StudentProvider>
    )
}