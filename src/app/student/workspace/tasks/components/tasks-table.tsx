"use client";

import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

import { ProjectProgress } from "@/types/types";
import { useStudentTasks } from "@/contexts/student/student-task-context";

import AddTask from "@/app/student/workspace/tasks/components/add-task";
import NoProgress from "@/app/student/workspace/tasks/components/no-progress";

import { DataTable } from "@/app/student/components/data-table";
import { Button } from "@/components/ui/button";
import { columns } from "@/app/student/workspace/tasks/components/tasks-table-columns";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "@/components/ui/card";

export default function TasksTable() {
  const { tasks, fetchProgressTask, groupInfo, getProjectProgressOfGroup } =
    useStudentTasks();
  const [showCreateTask, setShowCreateTask] = useState(false);
  const [projectProgress, setProjectProgress] = useState<ProjectProgress>();

  useEffect(() => {
    const fetchTasks = async () => {
      if (groupInfo?.id) {
        const projectProgress = await getProjectProgressOfGroup(groupInfo.id);
        setProjectProgress(projectProgress);
        if (projectProgress?.id) {
          await fetchProgressTask(projectProgress.id);
        }
      }
    };

    fetchTasks();
  }, [groupInfo]);

  const noProgress = !projectProgress;

  const handleCreateTask = () => {
    setShowCreateTask(true);
  };

  return noProgress ? <NoProgress /> :
    <Card className="min-h-[calc(100vh-16px)]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="font-semibold tracking-tight text-xl">
              Tasks
            </CardTitle>
            <CardDescription>
              List of Task that students can register for
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={handleCreateTask}>
              <Plus className="mr-2 h-4 w-4" />
              Create
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={tasks} />
      </CardContent>
      {showCreateTask && <AddTask onClose={() => setShowCreateTask(false)} />}
    </Card>

}
