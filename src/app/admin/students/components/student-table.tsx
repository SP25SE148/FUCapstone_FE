import { columns, Student } from "./columns";
import AddStudent from "./add-student/add-student";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const data: Student[] = [
    {
        id: "1",
        name: "Nguyễn Thị Hương",
        email: "nguyenthihuong@example.com",
        major: "Công nghệ thông tin",
        capstone: "SAP490",
        status: "Active",
    },
    {
        id: "2",
        name: "Trần Văn Long",
        email: "tranvanlong@example.com",
        major: "Khoa học máy tính",
        capstone: "SEP490",
        status: "Inactive",
    },
    {
        id: "3",
        name: "Lê Hoài Nam",
        email: "lehoainam@example.com",
        major: "Kỹ thuật phần mềm",
        capstone: "SAP490",
        status: "Active",
    },
    {
        id: "4",
        name: "Phạm Thị Lan",
        email: "phamthilan@example.com",
        major: "Hệ thống thông tin",
        capstone: "SEP490",
        status: "Inactive",
    },
    {
        id: "5",
        name: "Hoàng Minh Phúc",
        email: "hoangminhphuc@example.com",
        major: "Mạng máy tính",
        capstone: "SAP490",
        status: "Active",
    },
];

export default function StudentTable() {
    return (
        <Card>
            <div className="flex items-center justify-between">
                <CardHeader>
                    <CardTitle className="font-semibold tracking-tight text-xl">Students</CardTitle>
                    <CardDescription>Campus Hồ Chí Minh</CardDescription>
                </CardHeader>
                <AddStudent />
            </div>
            <CardContent>
                <DataTable columns={columns} data={data} />
            </CardContent>
        </Card>
    );
}
