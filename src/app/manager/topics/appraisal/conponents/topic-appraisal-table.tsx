import { columns, Topic } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const data: Topic[] = [
    {
        id: "1",
        capstone: "SEP490",
        code: "TOP001",
        englishName: "Artificial Intelligence in Healthcare",
        vietnameseName: "Trí tuệ nhân tạo trong chăm sóc sức khỏe",
        abbreviation: "AIHC",
        supervisor: "Dr. Nguyễn Văn A",
        supervisor2: "Dr. Lê Thị B",
        status: "C-R",
    },
    {
        id: "2",
        capstone: "SEP490",
        code: "TOP002",
        englishName: "Blockchain for Supply Chain Management",
        vietnameseName: "Blockchain trong quản lý chuỗi cung ứng",
        abbreviation: "BSCM",
        supervisor: "Dr. Trần Văn C",
        supervisor2: "Dr. Phạm Thị D",
        status: "C-C",
    }
];

export default function TopicAppraisalTable() {
    return (
        <Card className="min-h-[calc(100vh-60px)]">
            <CardHeader>
                <CardTitle className="font-semibold tracking-tight text-xl">Topic Registration Request</CardTitle>
                <CardDescription>List information of topic registration request</CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns} data={data} />
            </CardContent>
        </Card>
    );
}
