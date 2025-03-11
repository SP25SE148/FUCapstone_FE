"use client";

import React, { createContext, useContext, useState } from "react";

export interface Task {
  id: string;
  keyTask: string;
  description: string;
  summary: string;
  assignee: string;
  status: string;
  priority: string;
  dueDate: string;
}

interface StudentTaskContextProps {
  tasks: Task[];
  createTask: (task: Task) => void;
  updateTask: (task: Task) => void;
}

const StudentTaskContext = createContext<StudentTaskContextProps | undefined>(undefined);

export const useStudentTasks = () => {
  const context = useContext(StudentTaskContext);
  if (!context) {
    throw new Error("useStudentTasks must be used within a StudentTaskProvider");
  }
  return context;
};

export const StudentTaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      keyTask: "TASK-1",
      description: "Description for Task 1",
      summary: "Summary for Task 1",
      assignee: "Person 1",
      status: "Todo",
      priority: "Medium",
      dueDate: "2025-03-15",
    },
    {
      id: "2",
      keyTask: "TASK-2",
      description: "Description for Task 2",
      summary: "Summary for Task 2",
      assignee: "Person 2",
      status: "Inprocess",
      priority: "High",
      dueDate: "2025-03-20",
    },
  ]);

  const createTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const updateTask = (task: Task) => {
    setTasks(tasks.map(t => (t.id === task.id ? task : t)));
  };

  return (
    <StudentTaskContext.Provider value={{ tasks, createTask, updateTask }}>
      {children}
    </StudentTaskContext.Provider>
  );
};