import { columns, Supervisor } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const data: Supervisor[] = [
    {
        id: "1",
        name: "Nguyễn Văn A",
        code: "SUP001",
        email: "nguyenvana@example.com",
        major: "Công nghệ thông tin",
        status: "Active",
    },
    {
        id: "2",
        name: "Trần Thị B",
        code: "SUP002",
        email: "tranthib@example.com",
        major: "Khoa học máy tính",
        status: "Inactive",
    },
    {
        id: "3",
        name: "Lê Văn C",
        code: "SUP003",
        email: "levanc@example.com",
        major: "Kỹ thuật phần mềm",
        status: "Active",
    },
    {
        id: "4",
        name: "Phạm Minh D",
        code: "SUP004",
        email: "phamminhd@example.com",
        major: "Hệ thống thông tin",
        status: "Inactive",
    },
    {
        id: "5",
        name: "Hoàng Thị E",
        code: "SUP005",
        email: "hoangthie@example.com",
        major: "Mạng máy tính",
        status: "Active",
    },
];

export default function SupervisorTable() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-semibold tracking-tight text-xl">Supervisors</CardTitle>
                <CardDescription>Campus Hồ Chí Minh</CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns} data={data} />
            </CardContent>
        </Card>
    );
}
