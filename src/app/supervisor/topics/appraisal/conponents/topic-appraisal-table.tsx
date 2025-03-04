"use client"

import { useEffect, useState } from "react";

import { useAuth } from "@/contexts/auth-context";
import { useSupervisorTopic } from "@/contexts/supervisor/supervisor-topic-context";

import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TopicAppraisalTable() {
    const { user } = useAuth();
    const { fetchTopicAppraisalAssigned } = useSupervisorTopic();

    const [appraisalList, setAppraisalList] = useState<[]>([]);

    useEffect(() => {
        (async () => {
            const appraisals = await fetchTopicAppraisalAssigned()
            setAppraisalList(appraisals);
        })();
    }, [user])

    return (
        <Card className="min-h-[calc(100vh-60px)]">
            <CardHeader>
                <CardTitle className="font-semibold tracking-tight text-xl text-primary">Topic Appraisal</CardTitle>
                <CardDescription>List topic appraisal assigned for <span className="text-primary font-semibold">{user?.name}</span></CardDescription>
            </CardHeader>
            <CardContent>
                <DataTable columns={columns} data={appraisalList || []} />
            </CardContent>
        </Card>
    );
}
