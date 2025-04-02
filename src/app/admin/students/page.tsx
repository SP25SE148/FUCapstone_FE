import { AdminStudentProvider } from "@/contexts/admin/admin-student-context";

import StudentTable from "./components/student-table";
import StudentOverall from "./components/student-overall";

export default function AdminManageStudentsPage() {
    return (
        <AdminStudentProvider>
            <div className="flex flex-col gap-4">
                <StudentOverall />
                <StudentTable />
            </div>
        </AdminStudentProvider>
    )
}