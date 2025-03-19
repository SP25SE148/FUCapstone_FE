"use client";

import { useEffect, useState } from "react";
import { columns } from "@/app/student/workspace/tasks/components/tasks-table-columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Plus } from "lucide-react";
import TaskHistory from "@/app/student/workspace/tasks/components/task-history";
import AddTask from "@/app/student/workspace/tasks/components/add-task";
import { useStudentTasks } from "@/contexts/student/student-task-context";
import { DataTable } from "@/components/ui/data-table";

export default function TasksTable() {
  const { tasks, fetchProgressTask, groupInfo, getProjectProgressOfGroup } =
    useStudentTasks();
  const [showHistory, setShowHistory] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      if (groupInfo?.id) {
        const projectProgress = await getProjectProgressOfGroup(groupInfo.id);
        if (projectProgress?.id) {
          await fetchProgressTask(projectProgress.id);
        }
      }
    };

    fetchTasks();
  }, [groupInfo]);

  const handleShowHistory = () => {
    setShowHistory(true);
  };

  const handleCreateTask = () => {
    setShowCreateTask(true);
  };

  return (
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
            <Button variant="outline" onClick={handleShowHistory}>
              <Clock className="mr-2 h-4 w-4" />
              History
            </Button>
            <Button variant="outline" onClick={handleCreateTask}>
              <Plus className="mr-2 h-4 w-4" />
              Create
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={tasks.slice().reverse()} />
      </CardContent>
      {showHistory && <TaskHistory onClose={() => setShowHistory(false)} />}
      {showCreateTask && <AddTask onClose={() => setShowCreateTask(false)} />}
    </Card>
  );
}
