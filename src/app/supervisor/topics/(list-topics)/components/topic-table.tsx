import { columns, Topic } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const data: Topic[] = [
    {
        id: "1",
        capstone: "Capstone Project 2025",
        code: "TOP001",
        englishName: "Artificial Intelligence in Healthcare",
        vietnameseName: "Trí tuệ nhân tạo trong chăm sóc sức khỏe",
        abbreviation: "AIHC",
        supervisor: "Dr. Nguyễn Văn A",
        supervisor2: "Dr. Lê Thị B",
        status: "Pending",
    },
    {
        id: "2",
        capstone: "Capstone Project 2025",
        code: "TOP002",
        englishName: "Blockchain for Supply Chain Management",
        vietnameseName: "Blockchain trong quản lý chuỗi cung ứng",
        abbreviation: "BSCM",
        supervisor: "Dr. Trần Văn C",
        supervisor2: "Dr. Phạm Thị D",
        status: "Available",
    },
    {
        id: "3",
        capstone: "Capstone Project 2024",
        code: "TOP003",
        englishName: "IoT Applications in Smart Cities",
        vietnameseName: "Ứng dụng IoT trong thành phố thông minh",
        abbreviation: "IoTSC",
        supervisor: "Dr. Vũ Văn E",
        supervisor2: "Dr. Nguyễn Thị F",
        status: "Pending",
    },
    {
        id: "4",
        capstone: "Capstone Project 2024",
        code: "TOP004",
        englishName: "Machine Learning for Financial Forecasting",
        vietnameseName: "Học máy trong dự báo tài chính",
        abbreviation: "MLFF",
        supervisor: "Dr. Lý Thị G",
        supervisor2: "Dr. Trịnh Văn H",
        status: "Available",
    },
    {
        id: "5",
        capstone: "Capstone Project 2023",
        code: "TOP005",
        englishName: "Big Data Analytics in Education",
        vietnameseName: "Phân tích dữ liệu lớn trong giáo dục",
        abbreviation: "BDAE",
        supervisor: "Dr. Đặng Văn I",
        supervisor2: "Dr. Hồ Thị J",
        status: "Pending",
    },
];

export default function TopicTable() {
    return (
        <Card >
            <CardHeader>
                <CardTitle className="font-semibold tracking-tight text-xl">Topics</CardTitle>
                <CardDescription>List information of topics</CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns} data={data} />
            </CardContent>
        </Card>
    );
}
