"use client";

import TasksTable from "@/app/student/workspace/(tasks)/components/tasks-table";
import TasksOverallStats from "@/app/student/workspace/(tasks)/components/tasks-overall-stats";
import { StudentTaskProvider } from "@/contexts/student/student-task-context";

export default function TasksPage() {
  return (
    <StudentTaskProvider>
      <div className="flex flex-col gap-4">
        <TasksOverallStats />
        <TasksTable />
      </div>
    </StudentTaskProvider>
  );
}