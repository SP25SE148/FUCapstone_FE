"use client"

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { useSupervisorGroup } from "@/contexts/supervisor/supervisor-group-context";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function MyEvaluationPage() {
    const { getEvaluationWeeklyProgress } = useSupervisorGroup();

    const params = useParams();
    const id: string = String(params.id);
    const [evaluationWeekly, setEvaluationWeekly] = useState<any>();

    useEffect(() => {
        (async () => {
            const projectProgressDetail = await getEvaluationWeeklyProgress(id);
            setEvaluationWeekly(projectProgressDetail)
        })();
    }, [])

    return (
        <Card className="min-h-[calc(100vh-60px)]">
            <CardHeader>
                <CardTitle className="font-semibold tracking-tight text-xl text-primary">My Evaluation</CardTitle>
                <CardDescription>My evaluation for group weekly</CardDescription>
            </CardHeader>
        </Card>
    )
}