"use client"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { DefenseResult } from "@/types/types";
import { useSupervisorGroup } from "@/contexts/supervisor/supervisor-group-context";

import NoResult from "./components/no-result";
import ResultDetails from "./components/result-details";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResultsPage() {
    const { getDefendResultByGroupId } = useSupervisorGroup();
    const params = useParams();
    const groupId: string = String(params.id);
    const [results, setResults] = useState<DefenseResult[]>()

    useEffect(() => {
        if (groupId) {
            (async () => {
                const resultDetails = await getDefendResultByGroupId(groupId);
                setResults(resultDetails)
            })();
        }
    }, [groupId])

    return (
        <Card className="min-h-[calc(100vh-60px)]">
            <CardHeader>
                <CardTitle className="font-semibold tracking-tight text-xl text-primary">Defense Results</CardTitle>
                <CardDescription>All informations about defense result.</CardDescription>
            </CardHeader>
            {results
                ?
                <ResultDetails results={results} />
                :
                <NoResult />
            }
        </Card>
    )
}