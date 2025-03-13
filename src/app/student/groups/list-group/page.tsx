import GroupTable from "./components/group-table";
import { StudentListGroupProvider } from "@/contexts/student/student-list-group-context";

export default function ListGroupPage() {
    return (
        <StudentListGroupProvider>
            <GroupTable />
        </StudentListGroupProvider>
    )
}