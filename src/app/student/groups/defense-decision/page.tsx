"use client"

import { useEffect, useState } from "react";

import { Decision } from "@/types/types";
import { useStudentGroup } from "@/contexts/student/student-group-context";

import NoDecision from "./components/no-decision";
import DecisionDetail from "./components/decision-detail";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DefenseDecisionPage() {
    const { groupInfo, getGroupDecisionResponse } = useStudentGroup();
    const [decision, setDecision] = useState<Decision>();

    useEffect(() => {
        (async () => {
            if (groupInfo?.id) {
                const decisionDetail = await getGroupDecisionResponse(groupInfo?.id);
                setDecision(decisionDetail)
            }
        })();
    }, [groupInfo])

    return (
        <Card className="min-h-[calc(100vh-60px)]">
            <CardHeader>
                <CardTitle className="font-semibold tracking-tight text-xl text-primary">Defense Decision</CardTitle>
                <CardDescription>Defense decision of group.</CardDescription>
            </CardHeader>
            {decision
                ?
                <DecisionDetail decision={decision} />
                :
                <NoDecision />}
        </Card >
    )
}