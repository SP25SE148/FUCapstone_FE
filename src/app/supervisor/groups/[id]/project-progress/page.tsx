"use client"

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ClipboardX, Eye, LayoutList } from "lucide-react";

import { getProjectProgressWeekStatus } from "@/utils/statusUtils";
import { ProjectProgress, ProjectProgressWeek } from "@/types/types";
import { useSupervisorGroup } from "@/contexts/supervisor/supervisor-group-context";

import MeetingTime from "./components/meeting-time";
import UploadProjectProgress from "./components/upload-project-progress";
import ProjectProgressWeekDetail from "./components/project-progress-week-detail";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProjectProgressPage() {
    const { getProjectProgressOfGroup } = useSupervisorGroup();

    const params = useParams();
    const id: string = String(params.id);
    const [isRefresh, setIsRefresh] = useState<boolean>(false);
    const [currentWeekNumber, setCurrentWeekNumber] = useState<number>(0);
    const [projectProgress, setProjectProgress] = useState<ProjectProgress>();
    const [currentProjectProgressWeek, setCurrentProjectProgressWeek] = useState<ProjectProgressWeek | null>();

    useEffect(() => {
        (async () => {
            const projectProgressDetail = await getProjectProgressOfGroup(id);
            setProjectProgress(projectProgressDetail);
            const currentWeek = projectProgressDetail?.projectProgressWeeks?.find((x) => x?.weekNumber === currentWeekNumber)
            setCurrentProjectProgressWeek(currentWeek);
        })();
    }, [isRefresh])

    return (
        <Card className="min-h-[calc(100vh-60px)]">
            <div className="flex items-center justify-between">
                <CardHeader>
                    <CardTitle className="font-semibold tracking-tight text-xl text-primary">Project Progress</CardTitle>
                    <CardDescription>Detail information of project progress</CardDescription>
                </CardHeader>
                {!projectProgress
                    ?
                    <UploadProjectProgress refresh={() => setIsRefresh(!isRefresh)} />
                    :
                    <Button
                        asChild
                        className="mr-6"
                    >
                        <Link
                            href={{
                                pathname: `/supervisor/groups/${id}/tasks`,
                                query: { projectProgressId: `${projectProgress?.id}` }
                            }}
                        >
                            <Eye />
                            Group Tasks
                        </Link>
                    </Button>
                }
            </div >
            {
                projectProgress
                    ?
                    <CardContent className="grid grid-cols-2 gap-4">
                        < div className="h-[calc(100vh-188px)] max-h-[calc(100vh-188px)] overflow-y-auto space-y-2 rounded-xl shadow" >
                            <MeetingTime projectProgress={projectProgress} refresh={() => setIsRefresh(!isRefresh)} />
                            {
                                projectProgress?.projectProgressWeeks?.map((projectProgressWeek: ProjectProgressWeek, index) => (
                                    <Card
                                        key={index}
                                        className="bg-primary/5 cursor-pointer hover:bg-primary/20"
                                        onClick={() => {
                                            setCurrentWeekNumber(projectProgressWeek?.weekNumber)
                                            setCurrentProjectProgressWeek(projectProgressWeek)
                                        }}
                                    >
                                        <CardContent className="p-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="size-12 border-2 border-primary">
                                                    <AvatarFallback className="bg-primary/10">
                                                        {projectProgressWeek?.weekNumber}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="flex-1 flex items-center justify-between">
                                                    <div>
                                                        <p className="font-semibold">Week: {projectProgressWeek?.weekNumber}</p>
                                                        <p className="text-xs text-muted-foreground">Click to view task description</p>
                                                    </div>
                                                    {getProjectProgressWeekStatus(projectProgressWeek?.status)}
                                                </div>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))
                            }
                        </div >
                        {
                            currentProjectProgressWeek
                                ?
                                <ProjectProgressWeekDetail
                                    projectProgressId={projectProgress?.id}
                                    currentProjectProgressWeek={currentProjectProgressWeek}
                                    refresh={() => { setIsRefresh(!isRefresh) }}
                                    onClose={() => {
                                        setCurrentProjectProgressWeek(null);
                                        setCurrentWeekNumber(0);
                                    }}
                                />
                                :
                                <div className="h-[calc(100vh-188px)] max-h-[calc(100vh-188px)] rounded-xl border bg-card text-card-foreground shadow">
                                    <div className="h-full flex flex-col items-center justify-center gap-8">
                                        <LayoutList className="size-20 text-primary" />
                                        <div className="space-y-2">
                                            <p className="text-xl font-bold text-center">
                                                No project progress week selected
                                            </p>
                                            <p className="text-muted-foreground text-center text-sm">
                                                Please select a week to see task description.
                                            </p>
                                        </div>
                                    </div>
                                </div>}
                    </CardContent >
                    :
                    <CardContent className="h-[calc(100vh-188px)] max-h-[calc(100vh-188px)]">
                        <div className="h-full flex flex-col items-center justify-center gap-8">
                            <ClipboardX className="size-20 text-primary" />
                            <div className="space-y-2">
                                <p className="text-xl font-bold text-center">
                                    No project progress was uploaded
                                </p>
                                <p className="text-muted-foreground text-center text-sm">
                                    Please select upload a project progress for your group.
                                </p>
                            </div>
                        </div>
                    </CardContent>
            }
        </Card >
    )
}