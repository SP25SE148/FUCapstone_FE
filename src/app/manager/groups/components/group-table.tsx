import { columns, Group } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const data: Group[] = [
    {
        id: "1",
        code: "G001",
        leader: "Nguyen Van A",
        status: "Created",
    },
    {
        id: "2",
        code: "G002",
        leader: "Tran Thi B",
        status: "In progress",
    },
    {
        id: "3",
        code: "G003",
        leader: "Le Van C",
        status: "Created",
    },
    {
        id: "4",
        code: "G004",
        leader: "Pham Thi D",
        status: "In progress",
    },
    {
        id: "5",
        code: "G005",
        leader: "Hoang Van E",
        status: "Created",
    },
    {
        id: "6",
        code: "G006",
        leader: "Vo Thi F",
        status: "In progress",
    },
    {
        id: "7",
        code: "G007",
        leader: "Do Van G",
        status: "Created",
    },
    {
        id: "8",
        code: "G008",
        leader: "Nguyen Thi H",
        status: "In progress",
    },
    {
        id: "9",
        code: "G009",
        leader: "Phan Van I",
        status: "Created",
    },
    {
        id: "10",
        code: "G010",
        leader: "Vu Thi J",
        status: "In progress",
    },
];

export default function GroupTable() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="font-semibold tracking-tight text-xl">Group(s)</CardTitle>
                <CardDescription>SEP490</CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns} data={data} />
            </CardContent>
        </Card>
    );
}
