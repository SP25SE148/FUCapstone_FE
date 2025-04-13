"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AlignLeft, ClipboardList, Clock, History, Undo2 } from "lucide-react";

import { Task } from "@/types/types";
import { useSupervisorGroup } from "@/contexts/supervisor/supervisor-group-context";

import { getDate } from "@/lib/utils";
import { getPriorityStatus, getTaskStatus } from "@/utils/statusUtils";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TaskDetailPage() {
    const { getProjectProgressTaskDetail } = useSupervisorGroup();
    const router = useRouter();
    const params = useParams();
    const taskId: string = String(params.taskId);
    const [task, setTask] = useState<Task>();

    useEffect(() => {
        (async () => {
            const taskDetail = await getProjectProgressTaskDetail(taskId || "");
            setTask(taskDetail);
        })();
    }, [taskId])

    return task &&
        <Card className="min-h-[calc(100vh-60px)]">
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <Button className="ml-6" size={"icon"}
                        onClick={() => router.back()}
                    >
                        <Undo2 />
                    </Button>
                    <CardHeader>
                        <CardTitle className="font-semibold tracking-tight text-xl text-primary flex items-center gap-4">{task?.keyTask}{getTaskStatus(task?.status)}</CardTitle>
                        <CardDescription>Task ID: {task?.id}</CardDescription>
                    </CardHeader>
                </div>
                <Button variant="outline" size="sm" className="mr-6 hover:bg-transparent">
                    <Clock className="h-4 w-4" />
                    {task && (() => {
                        const dueDate = new Date(task?.dueDate);
                        const today = new Date();
                        const diffTime = dueDate.getTime() - today.getTime();
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

                        if (diffDays > 0) {
                            return `Due in ${diffDays} day${diffDays > 1 ? "s" : ""}`;
                        } else if (diffDays === 0) {
                            return "Due today";
                        } else {
                            return `Overdue by ${Math.abs(diffDays)} day${Math.abs(diffDays) > 1 ? "s" : ""
                                }`;
                        }
                    })()}
                </Button>
            </div>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-4">
                    <div className="max-h-[calc(100vh-188px)] space-y-2 overflow-y-auto">
                        <Card className="bg-primary/5">
                            <CardContent className="p-4 space-y-4">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <ClipboardList className="size-4 text-primary" />
                                    Summary
                                </h3>
                                <p className="pl-4 text-sm text-muted-foreground">
                                    {task?.summary}
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-primary/5">
                            <CardContent className="p-4 space-y-4">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <AlignLeft className="size-4 text-primary" />
                                    Description
                                </h3>
                                <p className="pl-4 text-sm text-muted-foreground">
                                    {task?.description}
                                </p>
                            </CardContent>
                        </Card>

                        <Card className="bg-primary/5">
                            <CardContent className="p-4 space-y-4">
                                <h3 className="font-semibold flex items-center gap-2">
                                    <History className="size-4 text-primary" />
                                    History
                                </h3>
                                {task && task?.fucTaskHistories && task.fucTaskHistories.length > 0 ? (
                                    <div className="border bg-background rounded-lg divide-y">
                                        {task.fucTaskHistories
                                            .slice()
                                            .reverse()
                                            .map((history: any) => (
                                                <div key={history.id} className="p-4">
                                                    <div className="space-y-2">
                                                        <p className="flex items-center gap-2 text-sm text-muted-foreground">
                                                            <History className="h-4 w-4 text-muted-foreground" />
                                                            {getDate(history.createdDate)}
                                                        </p>
                                                        <p className="pl-4 font-semibold tracking-tight">{history.content}</p>
                                                    </div>
                                                </div>
                                            ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 border rounded-lg bg-muted/20">
                                        <Clock className="h-10 w-10 mx-auto text-muted-foreground mb-2 opacity-50" />
                                        <p className="text-muted-foreground">
                                            No history available
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Changes to this task will be recorded here
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    <Card className="bg-primary/5">
                        <CardContent className="space-y-4 p-4">
                            <h3 className="font-semibold flex items-center gap-2">
                                <AlignLeft className="size-4 text-primary" />
                                Detail
                            </h3>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Status</span>
                                {getTaskStatus(task?.status)}
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Assignee</span>
                                <span className="font-semibold tracking-tight">{task?.assigneeName}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Reporter</span>
                                <span className="font-semibold tracking-tight">{task && task.reporterName}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Priority</span>
                                {getPriorityStatus(task?.priority)}
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Due date</span>
                                <span className="text-sm font-semibold tracking-tight">{task?.dueDate && getDate(task?.dueDate)}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Created date</span>
                                <span className="text-sm font-semibold tracking-tight">{task?.createdDate && getDate(task.createdDate)}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Updated date</span>
                                <span className="text-sm font-semibold tracking-tight">{task?.lastUpdatedDate && getDate(task.lastUpdatedDate)}</span>
                            </div>
                            <Separator />
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Completion date</span>
                                <span className="text-sm font-semibold tracking-tight">{task?.completionDate && getDate(task.completionDate)}</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </CardContent>
        </Card>;
}