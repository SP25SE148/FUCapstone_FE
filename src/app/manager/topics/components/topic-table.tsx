import { columns, Topic } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const data: Topic[] = [
    {
        id: "1",
        englishName: "Artificial Intelligence",
        vietnameseName: "Trí tuệ nhân tạo",
        code: "AI101",
        status: "Available",
    },
    {
        id: "2",
        englishName: "Machine Learning",
        vietnameseName: "Học máy",
        code: "ML102",
        status: "Assigned",
    },
    {
        id: "3",
        englishName: "Blockchain Technology",
        vietnameseName: "Công nghệ chuỗi khối",
        code: "BC103",
        status: "Available",
    },
    {
        id: "4",
        englishName: "Cloud Computing",
        vietnameseName: "Điện toán đám mây",
        code: "CC104",
        status: "Assigned",
    },
    {
        id: "5",
        englishName: "Cybersecurity",
        vietnameseName: "An ninh mạng",
        code: "CS105",
        status: "Available",
    },
    {
        id: "6",
        englishName: "Data Science",
        vietnameseName: "Khoa học dữ liệu",
        code: "DS106",
        status: "Assigned",
    },
    {
        id: "7",
        englishName: "Internet of Things",
        vietnameseName: "Internet vạn vật",
        code: "IoT107",
        status: "Available",
    },
    {
        id: "8",
        englishName: "Digital Marketing",
        vietnameseName: "Tiếp thị kỹ thuật số",
        code: "DM108",
        status: "Assigned",
    },
    {
        id: "9",
        englishName: "Virtual Reality",
        vietnameseName: "Thực tế ảo",
        code: "VR109",
        status: "Available",
    },
    {
        id: "10",
        englishName: "Big Data",
        vietnameseName: "Dữ liệu lớn",
        code: "BD110",
        status: "Assigned",
    },
];

export default function TopicTable() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-semibold tracking-tight text-xl">Topic(s)</CardTitle>
                <CardDescription>SEP490</CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns} data={data} />
            </CardContent>
        </Card>
    );
}
