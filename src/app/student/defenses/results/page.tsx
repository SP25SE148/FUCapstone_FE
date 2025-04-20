"use client"

import { useEffect, useState } from "react";

import { DefenseResult } from "@/types/types";
import { useStudentGroup } from "@/contexts/student/student-group-context";
import { useStudentDefense } from "@/contexts/student/student-defense-context";

import NoResult from "./components/no-result";
import ResultDetails from "./components/result-details";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResultsPage() {
    const { groupInfo } = useStudentGroup();
    const { getDefendResultByGroupId } = useStudentDefense();
    const [results, setResults] = useState<DefenseResult[]>()

    useEffect(() => {
        if (groupInfo?.id) {
            (async () => {
                const resultDetails = await getDefendResultByGroupId(groupInfo?.id);
                setResults(resultDetails)
            })();
        }
    }, [getDefendResultByGroupId, groupInfo])

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