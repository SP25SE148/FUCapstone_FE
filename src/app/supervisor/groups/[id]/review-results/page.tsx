"use client"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { ReviewResult, useSupervisorGroup } from "@/contexts/supervisor/supervisor-group-context";

import NoResult from "./components/no-result";
import ResultDetails from "./components/result-details";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReviewResultsPage() {
    const { getReviewResultByGroupId } = useSupervisorGroup();

    const params = useParams();
    const id: string = String(params.id);
    const [results, setResults] = useState<ReviewResult[]>()

    useEffect(() => {
        (async () => {
            const resultDetails = await getReviewResultByGroupId(id);
            setResults(resultDetails)
        })();
    }, []);

    return (
        <Card className="min-h-[calc(100vh-60px)]">
            <CardHeader>
                <CardTitle className="font-semibold tracking-tight text-xl text-primary">Review Results</CardTitle>
                <CardDescription>All informations about review result.</CardDescription>
            </CardHeader>
            {results
                ?
                <ResultDetails results={results} />
                :
                <NoResult />
            }
        </Card >
    )
}