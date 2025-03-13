"use client"

import { Users } from "lucide-react";

import { useStudentProfile } from "@/contexts/student/student-profile-context";
import { useStudentListGroup } from "@/contexts/student/student-list-group-context";

import { columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function GroupTable() {
    const { studentProfile } = useStudentProfile();
    const { listGroup } = useStudentListGroup();

    return (
        <>
            {studentProfile?.isHaveBeenJoinGroup
                ?
                <Card className="min-h-[calc(100vh-60px)] flex items-center justify-center bg-gradient-to-tr from-primary/20 to-background">
                    <div className="flex flex-col items-center justify-center gap-8">
                        <Users className="size-20 text-primary" />
                        <div className="space-y-2">
                            <p className="text-2xl font-bold text-center">
                                You are currently in a group.
                            </p>
                            <p className="text-muted-foreground text-center">
                                This section is only for student does not in any groups.
                            </p>
                        </div>
                    </div>
                </Card>
                :
                <Card className="min-h-[calc(100vh-60px)]">
                    < CardHeader >
                        <CardTitle className="font-semibold tracking-tight text-xl text-primary">List Group</CardTitle>
                        <CardDescription>Information of list group is available to join</CardDescription>
                    </CardHeader >
                    <CardContent>
                        <DataTable columns={columns} data={listGroup || []} />
                    </CardContent>
                </Card >}
        </>
    );
}
