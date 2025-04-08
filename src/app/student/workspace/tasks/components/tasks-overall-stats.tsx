"use client";

import { useStudentTasks } from "@/contexts/student/student-task-context";

import OverallStats from "@/components/layout/overall-stats";

export default function TasksOverallStats() {
  const { tasks } = useStudentTasks();
  const todoTasks = tasks.filter(task => task.status === 2);
  const inProgressTasks = tasks.filter(task => task.status === 1);
  const doneTasks = tasks.filter(task => task.status === 0);

  const items = [
    { title: "Total Task(s)", stat: tasks.length },
    { title: "Todo Task(s)", stat: todoTasks.length },
    { title: "In Progress Task(s)", stat: inProgressTasks.length },
    { title: "In Done Task(s)", stat: doneTasks.length }
  ];

  return (
    OverallStats({ items })
  );
}