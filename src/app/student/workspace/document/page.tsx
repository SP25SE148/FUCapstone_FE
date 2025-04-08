"use client"

import { FileCheck, FileX } from "lucide-react";

import { useStudentTasks } from "@/contexts/student/student-task-context";
import { useStudentProfile } from "@/contexts/student/student-profile-context";

import UploadDocument from "./components/upload-document";
import DownloadDocument from "./components/download-document";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function DocumentPage() {
    const { studentProfile } = useStudentProfile();

    const { groupInfo } = useStudentTasks();
    const leaderInfo = groupInfo?.groupMemberList?.find((x) => x.isLeader == true)

    return (
        <Card className="min-h-[calc(100vh-60px)]">
            <div className="flex items-center justify-between">
                <CardHeader>
                    <CardTitle className="font-semibold tracking-tight text-xl text-primary">Group Document</CardTitle>
                    <CardDescription>All group document information.</CardDescription>
                </CardHeader>
                {studentProfile?.id == leaderInfo?.studentId && <UploadDocument />}
            </div>
            <CardContent className="h-[calc(100vh-188px)] max-h-[calc(100vh-188px)]">
                <div className="h-full flex flex-col items-center justify-center gap-8">
                    {groupInfo?.isUploadGroupDocument
                        ?
                        <FileCheck className="size-20 text-primary" />
                        :
                        <FileX className="size-20 text-primary" />}
                    <div className="space-y-2">
                        <p className="text-xl font-bold text-center text-primary">
                            {groupInfo?.isUploadGroupDocument
                                ?
                                "Group documents is uploaded."
                                :
                                "No documents uploaded yet"}
                        </p>
                        <p className="text-muted-foreground text-center text-sm">
                            {groupInfo?.isUploadGroupDocument
                                ?
                                "You can download your group documents."
                                :
                                "Your group hasn't uploaded any documents."}
                        </p>
                    </div>
                    {groupInfo?.isUploadGroupDocument && <DownloadDocument />}
                </div>
            </CardContent>
        </Card>
    )
}