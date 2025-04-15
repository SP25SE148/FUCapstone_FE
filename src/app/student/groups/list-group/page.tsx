import { StudentListGroupProvider } from "@/contexts/student/student-list-group-context";

import GroupTable from "./components/group-table";

export default function ListGroupPage() {
    return (
        <StudentListGroupProvider>
            <GroupTable />
        </StudentListGroupProvider>
    )
}