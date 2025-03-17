import { useEffect, useState } from "react";
import { Calendar1, Pencil, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import EvaluationWeek from "./evaluation-week";
import { Button } from "@/components/ui/button";
import UpdateProjectProgressWeek from "./update-project-progress-week";

interface ProjectProgressWeekProps {
    projectProgressId: string,
    currentProjectProgressWeek: any,
    refresh: () => void
    onClose: () => void
}

const getStatus = (status: number | undefined) => {
    switch (status) {
        case 1:
            return (
                <Badge variant="secondary" className="select-none bg-blue-200 text-blue-800 hover:bg-blue-200">
                    To do
                </Badge>
            );
        case 0:
            return (
                <Badge variant="secondary" className="select-none bg-green-200 text-green-800 hover:bg-green-200">
                    Done
                </Badge>
            );
        default:
            return null;
    }
}

export default function ProjectProgressWeekDetail({ projectProgressId, currentProjectProgressWeek, refresh, onClose }: ProjectProgressWeekProps) {
    const [openEditWeek, setOpenEditWeek] = useState<boolean>(false);

    useEffect(() => {
        setOpenEditWeek(false);
    }, [currentProjectProgressWeek])

    return (
        <div className="h-[calc(100vh-188px)] max-h-[calc(100vh-188px)] p-4 rounded-xl border bg-card text-card-foreground shadow">
            {/* header */}
            <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2">
                    <Calendar1 className="size-4 text-primary" />
                    Week: {currentProjectProgressWeek?.weekNumber}
                    {getStatus(currentProjectProgressWeek?.status)}
                </h3>
                {!openEditWeek && <div className="flex items-center gap-2">
                    {currentProjectProgressWeek?.status !== 0 &&
                        <Button
                            size={"sm"}
                            variant={"outline"}
                            onClick={() => { setOpenEditWeek(!openEditWeek) }}
                        >
                            <Pencil />
                            Edit
                        </Button>
                    }
                    {currentProjectProgressWeek?.status !== 0 && <EvaluationWeek
                        data={
                            {
                                "projectProgressId": projectProgressId,
                                currentProjectProgressWeek
                            }
                        }
                        refresh={refresh}
                    />}
                    <Button size={"icon"} variant={"ghost"} onClick={onClose}><X /></Button>
                </div>}
            </div>

            {/* body */}
            {openEditWeek
                ?
                <UpdateProjectProgressWeek projectProgressId={projectProgressId} currentProjectProgressWeek={currentProjectProgressWeek} refresh={refresh} onClose={() => { setOpenEditWeek(false) }} />
                :
                <div className="space-y-4 max-h-[calc(100%-52px)] overflow-y-scroll">
                    <h4 className="text-sm text-muted-foreground">
                        Meeting location: <span className="font-semibold text-sm text-foreground">{currentProjectProgressWeek?.meetingLocation}</span>
                    </h4>
                    <div className="space-y-2">
                        <h3 className="text-sm text-muted-foreground">Meeting content:</h3>
                        <div className="space-y-2">
                            {currentProjectProgressWeek?.meetingContent?.split("\n")?.map((task: string, index: number) => (
                                <p key={index} className="font-semibold text-sm">{task}</p>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-sm text-muted-foreground">
                            Task description:
                        </h3>
                        <div className="space-y-2">
                            {currentProjectProgressWeek?.taskDescription?.split("\n")?.map((task: string, index: number) => (
                                <p key={index} className="font-semibold text-sm">{task}</p>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-sm text-muted-foreground">
                            Summary from leader:
                        </h3>
                        <div className="space-y-2">
                            {currentProjectProgressWeek?.summary}
                        </div>
                    </div>
                </div>}
        </div>
    )
}