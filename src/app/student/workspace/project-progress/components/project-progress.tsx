"use client";

import { useEffect, useState } from "react";
import { Calendar1, ClipboardX, LayoutList, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useStudentTasks } from "@/contexts/student/student-task-context";
import { ProjectProgress, ProjectProgressWeek } from "@/types/types";
import LeaderEvaluationWeek from "@/app/student/workspace/project-progress/components/leader-evaluation-week";

const getStatus = (status: number | undefined) => {
  switch (status) {
    case 1:
      return (
        <Badge
          variant="secondary"
          className="select-none bg-blue-200 text-blue-800 hover:bg-blue-200"
        >
          To do
        </Badge>
      );
    case 0:
      return (
        <Badge
          variant="secondary"
          className="select-none bg-green-200 text-green-800 hover:bg-green-200"
        >
          Done
        </Badge>
      );
    default:
      return null;
  }
};

export default function ProjectProgressView() {
  const { getProjectProgressOfGroup } = useStudentTasks();
  const { groupInfo } = useStudentTasks();
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const [projectProgress, setProjectProgress] = useState<ProjectProgress>();
  const [currentProjectProgressWeek, setCurrentProjectProgressWeek] =
    useState<ProjectProgressWeek | null>();

  useEffect(() => {
    (async () => {
      if (!groupInfo?.id) return;
      const projectProgressDetail = await getProjectProgressOfGroup(
        groupInfo.id
      );
      setProjectProgress(projectProgressDetail);
      setCurrentProjectProgressWeek(null);
    })();
  }, [groupInfo, isRefresh]);

  return (
    <Card className="min-h-[calc(100vh-60px)]">
      <div className="flex items-center justify-between">
        <CardHeader>
          <CardTitle className="font-semibold tracking-tight text-xl text-primary">
            Project Progress
          </CardTitle>
          <CardDescription>
            Detail information of project progress
          </CardDescription>
        </CardHeader>
      </div>
      {projectProgress ? (
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="h-[calc(100vh-188px)] max-h-[calc(100vh-188px)] overflow-y-auto space-y-2 rounded-xl shadow">
            {projectProgress?.projectProgressWeeks?.map(
              (projectProgressWeek: ProjectProgressWeek, index) => (
                <Card
                  key={index}
                  className="bg-primary/5 cursor-pointer hover:bg-primary/20"
                  onClick={() => {
                    setCurrentProjectProgressWeek(projectProgressWeek);
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
                          <p className="font-semibold">
                            Week: {projectProgressWeek?.weekNumber}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Click to view task description
                          </p>
                        </div>
                        {getStatus(projectProgressWeek?.status)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            )}
          </div>
          {currentProjectProgressWeek ? (
            <div className="h-[calc(100vh-188px)] max-h-[calc(100vh-188px)] p-4 rounded-xl border bg-card text-card-foreground shadow">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-semibold flex items-center gap-2">
                  <Calendar1 className="size-4 text-primary" />
                  Week: {currentProjectProgressWeek?.weekNumber}
                </h3>
                <div className="flex items-center gap-2">
                  {currentProjectProgressWeek?.status === 1 &&
                    currentProjectProgressWeek?.summary === null && (
                      <LeaderEvaluationWeek
                        data={{
                          projectProgressId: projectProgress?.id,
                          projectProgressWeekId: currentProjectProgressWeek?.id,
                        }}
                        refresh={() => setIsRefresh(!isRefresh)}
                      />
                    )}
                  <Button
                    size={"icon"}
                    variant={"ghost"}
                    onClick={() => {
                      setCurrentProjectProgressWeek(null);
                    }}
                  >
                    <X />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-sm text-muted-foreground">
                  Meeting location:{" "}
                  <span className="font-semibold text-sm">
                    {currentProjectProgressWeek?.meetingLocation}
                  </span>
                </h4>
                <div className="space-y-2">
                  <h3 className="text-sm text-muted-foreground">
                    Meeting content:
                  </h3>
                  <p className="font-semibold tracking-tight text-sm text-justify italic">
                    {currentProjectProgressWeek?.meetingContent}
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm text-muted-foreground">
                    Task description:
                  </h3>
                  <div className="space-y-2">
                    {currentProjectProgressWeek?.taskDescription
                      ?.split("\n")
                      ?.map((task: string, index: number) => (
                        <p key={index} className="font-semibold text-sm">
                          {task}
                        </p>
                      ))}
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-sm text-muted-foreground">
                      Summary from leader:
                    </h3>
                    <ul className="space-y-2 list-disc list-inside">
                      {currentProjectProgressWeek?.summary
                        ?.split("\n")
                        ?.map((line: string, index: number) => (
                          <li key={index} className="font-semibold text-sm">
                            {line}
                          </li>
                        ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ) : (
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
            </div>
          )}
        </CardContent>
      ) : (
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
      )}
    </Card>
  );
}