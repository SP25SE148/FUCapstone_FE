"use client";

import OverallStats from "@/components/layout/overall-stats";

const tasks = [
  {
    id: "1",
    title: "Task 1",
    assignedTo: "Person 1",
    status: "Todo",
    createdDate: "2025-03-10",
    updatedDate: "2025-03-10",
  },
  {
    id: "2",
    title: "Task 2",
    assignedTo: "Person 2",
    status: "Inprocess",
    createdDate: "2025-03-10",
    updatedDate: "2025-03-10",
  },
  {
    id: "3",
    title: "Task 3",
    assignedTo: "",
    status: "Unassigned",
    createdDate: "2025-03-10",
    updatedDate: "2025-03-10",
  },
];

export default function TasksOverallStats() {
  const unassignedTasks = tasks.filter(task => task.status === "Unassigned");
  const assignedTasks = tasks.filter(task => task.status !== "Unassigned");

  const items = [
    { title: "Total Tasks", stat: tasks.length },
    { title: "Unassigned Tasks", stat: unassignedTasks.length },
    { title: "Assigned Tasks", stat: assignedTasks.length }
  ];

  return (
    OverallStats({ items })
  );
}