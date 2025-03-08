import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TopicRegistrationRequestTable() {
    return (
        <Card className="min-h-[calc(100vh-60px)]">
            <CardHeader>
                <CardTitle className="font-semibold tracking-tight text-xl text-primary">Topic Registration Request</CardTitle>
                <CardDescription>List information of topic registration request from groups</CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns} data={[]} />
            </CardContent>
        </Card>
    );
}
