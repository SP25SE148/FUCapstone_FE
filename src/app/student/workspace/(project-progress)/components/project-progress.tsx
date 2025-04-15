"use client";

import { useEffect, useState } from "react";
import {
  Calendar1,
  CalendarIcon,
  ClipboardX,
  ClockIcon,
  FilePlus,
  LayoutList,
  X,
} from "lucide-react";

import { getProjectProgressWeekStatus } from "@/utils/statusUtils";
import { ProjectProgress, ProjectProgressWeek } from "@/types/types";
import { useStudentTasks } from "@/contexts/student/student-task-context";

import LeaderEvaluationWeek from "@/app/student/workspace/(project-progress)/components/leader-evaluation-week";

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
import { useRouter } from "next/navigation";

export default function ProjectProgressView() {
  const router = useRouter();
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

  const createTask = () => {
    router.push("/student/workspace/tasks");
  };

  return (
    <Card className="min-h-[calc(100vh-60px)]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-semibold tracking-tight text-xl">
              Project Progress
            </CardTitle>
            <CardDescription>
              Detail information of project progress
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="default" onClick={createTask}>
              <FilePlus /> Creat Task
            </Button>
          </div>
        </div>
      </CardHeader>
      {projectProgress ? (
        <CardContent className="grid grid-cols-2 gap-4">
          <div className="h-[calc(100vh-188px)] max-h-[calc(100vh-188px)] overflow-y-auto space-y-2 rounded-xl shadow">
            <Card className="sticky top-0 z-10 border-none shadow-md bg-gradient-to-r from-primary to-primary/90 text-primary-foreground">
              <CardContent className="p-2 flex items-center justify-between gap-2">
                <div className="flex-1 grid grid-cols-2 gap-2">
                  <div className="flex items-center gap-2">
                    <CalendarIcon className="size-4" />
                    <span className="font-medium flex items-center gap-2">
                      Meeting date:
                      <Badge
                        variant="outline"
                        className="font-semibold bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20"
                      >
                        {projectProgress?.meetingDate || "Not scheduled"}
                      </Badge>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ClockIcon className="size-4" />
                    <span className="font-medium flex items-center gap-2">
                      Slot:
                      <Badge
                        variant="outline"
                        className="font-semibold bg-primary-foreground/10 text-primary-foreground border-primary-foreground/20"
                      >
                        {projectProgress?.slot || "Not assigned"}
                      </Badge>
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
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
                        {getProjectProgressWeekStatus(
                          projectProgressWeek?.status
                        )}
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
                  {getProjectProgressWeekStatus(
                    currentProjectProgressWeek?.status
                  )}
                </h3>
                <div className="flex items-center gap-2">
                  {currentProjectProgressWeek?.status === 1 &&
                    currentProjectProgressWeek?.summary === null && (
                      <LeaderEvaluationWeek
                        data={{
                          projectProgressId: projectProgress?.id,
                          projectProgressWeekId: currentProjectProgressWeek?.id,
                          projectProgressWeek:
                            currentProjectProgressWeek?.weekNumber,
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
                    <div
                      dangerouslySetInnerHTML={{
                        __html: currentProjectProgressWeek?.summary || "",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-[calc(100vh-188px)] max-h-[calc(100vh-188px)] rounded-xl border bg-card text-card-foreground shadow">
              <div className="h-full flex flex-col items-center justify-center gap-8">
                <LayoutList className="size-20 text-primary" />
                <div className="space-y-2">
                  <p className="text-xl font-bold text-center text-primary">
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
              <p className="text-xl font-bold text-center text-primary">
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
