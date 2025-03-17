"use client"

import { Grid2x2X } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import { EvaluationStudent, EvaluationWeek, useSupervisorGroup } from "@/contexts/supervisor/supervisor-group-context";

import ExportEvaluation from "./components/export-evaluation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function MyEvaluationPage() {
    const { getEvaluationWeeklyProgress } = useSupervisorGroup();

    const params = useParams();
    const id: string = String(params.id);
    const [evaluationWeekly, setEvaluationWeekly] = useState<EvaluationStudent[]>();

    useEffect(() => {
        (async () => {
            const projectProgressDetail = await getEvaluationWeeklyProgress(id);
            setEvaluationWeekly(projectProgressDetail)
        })();
    }, []);

    return (
        <Card className="min-h-[calc(100vh-60px)]">
            <div className="flex items-center justify-between">
                <CardHeader>
                    <CardTitle className="font-semibold tracking-tight text-xl text-primary">My Evaluation</CardTitle>
                    <CardDescription>My evaluation for group weekly</CardDescription>
                </CardHeader>
                {evaluationWeekly && <ExportEvaluation />}
            </div>
            {evaluationWeekly
                ?
                <CardContent>
                    <Table className="border min-w-max select-none">
                        <TableHeader className="bg-primary hover:bg-primary">
                            <TableRow className="hover:bg-primary">
                                <TableHead className="py-2 h-fit text-background sticky left-0 bg-primary z-10">
                                    Student
                                </TableHead>
                                {evaluationWeekly?.[0].evaluationWeeks?.map((evaluationWeek: EvaluationWeek, index: number) => (
                                    <TableCell key={index} className="py-2 h-fit w-[200px] text-background">
                                        Week {evaluationWeek?.weekNumber}
                                    </TableCell>
                                ))}
                                <TableCell className="py-2 h-fit text-center text-background sticky right-0 bg-primary z-10">
                                    Average Contribution
                                </TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {evaluationWeekly?.map((student: EvaluationStudent, index: number) => (
                                <TableRow key={index}>
                                    <TableCell className="font-bold sticky left-0 bg-white z-10">
                                        {student?.studentName}
                                    </TableCell>
                                    {student?.evaluationWeeks?.map((evaluationWeek: EvaluationWeek, index: number) => (
                                        <TableCell key={index} className="space-y-2 w-[200px]">
                                            <p className="text-muted-foreground">Contribution: <span className="text-foreground font-semibold">{evaluationWeek?.contributionPercentage}%</span></p>
                                            <p className="text-muted-foreground">Status: <span className="text-foreground font-semibold">{evaluationWeek?.status}</span></p>
                                        </TableCell>
                                    ))}
                                    <TableCell className="font-bold text-center sticky right-0 bg-white z-10">
                                        {student?.averageContributionPercentage?.toFixed(2)}%
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
                :
                <CardContent className="h-[calc(100vh-188px)] max-h-[calc(100vh-188px)]">
                    <div className="h-full flex flex-col items-center justify-center gap-8">
                        <Grid2x2X className="size-20 text-primary" />
                        <div className="space-y-2">
                            <p className="text-xl font-bold text-center">
                                No reviews have been made yet.
                            </p>
                            <p className="text-muted-foreground text-center text-sm">
                                Please take a evaluation to view and export the file.                            </p>
                        </div>
                    </div>
                </CardContent>}
        </Card>
    );
}