import { BadgeInfo, BookUser, FileCheck, UserCheck, Users } from "lucide-react";

import { Decision } from "@/types/types";
import { getDecisionStatus } from "@/utils/statusUtils";

import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

export default function DecisionDetail({ decision }: { decision: Decision }) {
    return (
        <CardContent className="space-y-8">
            <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                    <BookUser className="size-4 text-primary" />
                    General Information
                </h3>
                <Card className="bg-primary/5">
                    <CardContent className="p-6 space-y-2">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-sm border-b pb-4 mb-4">
                            <div className="flex items-center space-x-2">
                                <div className="rounded-md p-2">
                                    <Users className="size-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-sm text-muted-foreground">Group Code</h3>
                                    <p className="font-semibold tracking-tight">
                                        {decision?.groupCode}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="rounded-md p-2">
                                    <FileCheck className="size-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-sm text-muted-foreground">Topic Code</h3>
                                    <p className="font-semibold tracking-tight">
                                        {decision?.topicCode}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="bg-muted rounded-md p-2">
                                    <UserCheck className="size-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-sm text-muted-foreground">Supervisor</h3>
                                    <p className="font-semibold tracking-tight">
                                        {decision?.supervisorName}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="bg-muted rounded-md p-2">
                                    <BadgeInfo className="size-5 text-primary" />
                                </div>
                                <div>
                                    <h3 className="text-sm text-muted-foreground">Decision Status</h3>
                                    {getDecisionStatus(decision?.decision)}
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <h3 className="text-sm text-muted-foreground">
                                Comment:
                            </h3>
                            <p className="font-semibold tracking-tight text-justify italic">
                                {decision?.comment || "No comment provided"}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="space-y-2">
                <h3 className="font-semibold flex items-center gap-2">
                    <Users className="size-4 text-primary" />
                    Student Decisions
                </h3>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Student ID</TableHead>
                            <TableHead>Full Name</TableHead>
                            <TableHead>Decision</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {decision?.studentDecisionList.map((student) => (
                            <TableRow key={student.studentId}>
                                <TableCell>{student.studentId}</TableCell>
                                <TableCell className="font-bold text-primary">{student.studentFullName}</TableCell>
                                <TableCell>{getDecisionStatus(student?.decision)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </CardContent>
    )
}