"use client"

import { useEffect, useState } from "react";

import { ReviewResult } from "@/types/types";
import { useStudentReview } from "@/contexts/student/student-review-context";

import NoResult from "./components/no-result";
import ResultDetails from "./components/result-details";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ResultsPage() {
    const { getReviewResult } = useStudentReview();
    const [results, setResults] = useState<ReviewResult[]>()

    useEffect(() => {
        (async () => {
            const resultDetails = await getReviewResult();
            setResults(resultDetails)
        })();
    }, [])

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