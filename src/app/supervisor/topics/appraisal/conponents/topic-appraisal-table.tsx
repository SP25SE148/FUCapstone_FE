"use client"

import { useAuth } from "@/contexts/auth-context";
import { useSupervisorTopicAppraisal } from "@/contexts/supervisor/supervisor-topic-appraisal-context";

import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TopicAppraisalTable() {
    const { user } = useAuth();
    const { topicAppraisals } = useSupervisorTopicAppraisal();

    return (
        <Card className="min-h-[calc(100vh-60px)]">
            <CardHeader>
                <CardTitle className="font-semibold tracking-tight text-xl text-primary">Topic Appraisal</CardTitle>
                <CardDescription>List topic appraisal assigned for <span className="text-primary font-semibold">{user?.name}</span></CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns} data={topicAppraisals || []} />
            </CardContent>
        </Card>
    );
}
