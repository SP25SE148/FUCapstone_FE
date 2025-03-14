"use client";

import { useState } from "react";
import { columns } from "@/app/student/workspace/(tasks)/components/tasks-table-columns";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Plus } from "lucide-react";
import TaskHistory from "@/app/student/workspace/(tasks)/components/task-history";
import AddTask from "@/app/student/workspace/(tasks)/components/add-task";
import { tasks as initialTasks } from "@/app/student/workspace/(tasks)/data";
import { TaskDataTable } from "@/app/student/workspace/(tasks)/components/task-data-table";

export default function TasksTable() {
  const [tasks, setTasks] = useState(initialTasks);
  const [showHistory, setShowHistory] = useState(false);
  const [showCreateTask, setShowCreateTask] = useState(false);

  const handleShowHistory = () => {
    setShowHistory(true);
  };

  const handleCreateTask = () => {
    setShowCreateTask(true);
  };

  const handleAddTask = (task) => {
    setTasks([...tasks, task]);
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
        <TaskDataTable columns={columns} data={tasks} />
      </CardContent>
      {showHistory && <TaskHistory onClose={() => setShowHistory(false)} />}
      {showCreateTask && (
        <AddTask
          onClose={() => setShowCreateTask(false)}
          onAdd={handleAddTask}
        />
      )}
    </Card>
  );
}
