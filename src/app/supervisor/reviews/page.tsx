import { SupervisorTopicProvider } from "@/contexts/supervisor/supervisor-topic-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { columns } from "./components/columns";
import { defenseData } from "@/app/manager/defenses/data";

export default function ReviewsPage() {
    return (
        <SupervisorTopicProvider>
            <Card className="min-h-[calc(100vh-60px)]">
                <CardHeader>
                    <CardTitle className="font-semibold tracking-tight text-xl text-primary">Reviews</CardTitle>
                    <CardDescription>Reviews schedule and information.</CardDescription>
                </CardHeader>
                <CardContent>
                    <DataTable columns={columns} data={defenseData} />
                </CardContent>
            </Card>
        </SupervisorTopicProvider>
    )
}