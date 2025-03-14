import TasksTable from "@/app/student/workspace/(tasks)/components/tasks-table";
import TasksOverallStats from "@/app/student/workspace/(tasks)/components/tasks-overall-stats";

export default function TasksPage() {
  return (
      <div className="flex flex-col gap-4">
        <TasksOverallStats />
        <TasksTable />
      </div>
  );
}