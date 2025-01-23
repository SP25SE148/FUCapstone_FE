import { columns, Topic } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const data: Topic[] = [
    {
        id: "1",
        name: "Nguyễn Văn A",
        email: "anv@fpt.edu.vn",
        capstone: "SEP490",
        status: "Active",
    },
    {
        id: "2",
        name: "Nguyễn Văn B",
        email: "bvn@fpt.edu.vn",
        capstone: "SEP490",
        status: "Active",
    },
    {
        id: "3",
        name: "Nguyễn Văn C",
        email: "cvn@fpt.edu.vn",
        capstone: "SEP490",
        status: "Active",
    },
    {
        id: "4",
        name: "Nguyễn Văn D",
        email: "dvn@fpt.edu.vn",
        capstone: "SEP490",
        status: "Active",
    },
    {
        id: "5",
        name: "Nguyễn Thị E",
        email: "etn@fpt.edu.vn",
        capstone: "SEP491",
        status: "Inactive",
    },
    {
        id: "6",
        name: "Lê Văn F",
        email: "fvn@fpt.edu.vn",
        capstone: "SEP491",
        status: "Active",
    },
    {
        id: "7",
        name: "Trần Văn G",
        email: "gvt@fpt.edu.vn",
        capstone: "SEP492",
        status: "Active",
    },
    {
        id: "8",
        name: "Phạm Thị H",
        email: "htp@fpt.edu.vn",
        capstone: "SEP492",
        status: "Inactive",
    },
    {
        id: "9",
        name: "Hoàng Văn I",
        email: "ivh@fpt.edu.vn",
        capstone: "SEP493",
        status: "Active",
    },
    {
        id: "10",
        name: "Đỗ Thị J",
        email: "jtd@fpt.edu.vn",
        capstone: "SEP493",
        status: "Inactive",
    },
    {
        id: "11",
        name: "Nguyễn Văn K",
        email: "kvn@fpt.edu.vn",
        capstone: "SEP494",
        status: "Active",
    },
    {
        id: "12",
        name: "Trần Thị L",
        email: "ltl@fpt.edu.vn",
        capstone: "SEP494",
        status: "Inactive",
    },
    {
        id: "13",
        name: "Lê Văn M",
        email: "mvn@fpt.edu.vn",
        capstone: "SEP495",
        status: "Active",
    },
    {
        id: "14",
        name: "Phạm Thị N",
        email: "ntp@fpt.edu.vn",
        capstone: "SEP495",
        status: "Inactive",
    },
    {
        id: "15",
        name: "Ngô Văn O",
        email: "ovn@fpt.edu.vn",
        capstone: "SEP496",
        status: "Active",
    },
    {
        id: "16",
        name: "Đinh Thị P",
        email: "ptd@fpt.edu.vn",
        capstone: "SEP496",
        status: "Inactive",
    },
    {
        id: "17",
        name: "Nguyễn Văn Q",
        email: "qvn@fpt.edu.vn",
        capstone: "SEP497",
        status: "Active",
    },
    {
        id: "18",
        name: "Hoàng Thị R",
        email: "rth@fpt.edu.vn",
        capstone: "SEP497",
        status: "Inactive",
    },
    {
        id: "19",
        name: "Lý Văn S",
        email: "svl@fpt.edu.vn",
        capstone: "SEP498",
        status: "Active",
    },
    {
        id: "20",
        name: "Trần Thị T",
        email: "ttt@fpt.edu.vn",
        capstone: "SEP498",
        status: "Inactive",
    },
];

export default function TopicTable() {
    return (
        <Card >
            <CardHeader>
                <CardTitle className="font-semibold tracking-tight text-xl">Managers</CardTitle>
                <CardDescription>Campus Hồ Chí Minh</CardDescription>
            </CardHeader>
            <CardContent className="h-full overflow-auto">
                <DataTable columns={columns} data={data} />
            </CardContent>
        </Card>
    );
}
