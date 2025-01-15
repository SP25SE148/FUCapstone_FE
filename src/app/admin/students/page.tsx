import StudentTable from "./components/student-table";
import StudentOverall from "./components/student-overall";

export default function AdminManageStudentsPage() {
    return (
        <div className="flex flex-col gap-4">
            <StudentOverall />
            <StudentTable />
        </div>
    )
}