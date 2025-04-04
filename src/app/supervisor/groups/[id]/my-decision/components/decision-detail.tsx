import { BadgeInfo, UserCheck } from "lucide-react";

import { Decision } from "@/types/types";
import { getDecisionStatus } from "@/utils/statusUtils";

import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function DecisionDetail({ decision }: { decision: Decision }) {
    return (
        <CardContent className="min-h-[calc(100vh-188px)] flex items-center justify-center">
            <Card className="w-full max-w-4xl mx-auto shadow-lg">
                <CardHeader className="p-4 bg-primary/20 rounded-t-lg">
                    <CardTitle className="font-semibold tracking-tight text-xl text-primary">{decision?.groupCode}</CardTitle>
                    <CardDescription>Topic: <span className="font-medium">{decision?.topicCode}</span></CardDescription>
                </CardHeader>
                <CardContent className="p-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                            <div className="rounded-md p-2">
                                <UserCheck className="size-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-sm text-muted-foreground">
                                    Supervisor
                                </h3>
                                <p className="font-semibold tracking-tight">{decision?.supervisorName}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="rounded-md p-2">
                                <BadgeInfo className="size-5 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-sm text-muted-foreground">
                                    Defense Status
                                </h3>
                                {getDecisionStatus(decision?.decision)}
                            </div>
                        </div>
                    </div>

                    <Separator />

                    <div className="grid grid-cols-3 gap-2 py-2">
                        <span className="font-semibold">Comment:</span>
                        <span className="col-span-2 text-sm italic text-muted-foreground">
                            {decision?.comment || "No comment provided"}
                        </span>
                    </div>

                    <Separator />

                    <div className="space-y-2">
                        <h3 className="font-semibold">Student Decisions</h3>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[100px]">Student ID</TableHead>
                                    <TableHead>Full Name</TableHead>
                                    <TableHead className="text-right">Decision</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {decision?.studentDecisionList.map((student) => (
                                    <TableRow key={student.studentId}>
                                        <TableCell>{student.studentId}</TableCell>
                                        <TableCell className="font-bold text-primary">{student.studentFullName}</TableCell>
                                        <TableCell className="text-right">
                                            {getDecisionStatus(student?.decision)}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>
        </CardContent>
    )
}