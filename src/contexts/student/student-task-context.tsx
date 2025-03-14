"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useApi } from "@/hooks/use-api";
import { toast } from "sonner";

export interface Task {
  TaskId: string;
  KeyTask: string;
  Description: string;
  Summary: string;
  AssigneeId: string;
  ProjectProgressId: string;
  Status: string;
  Priority: string;
  DueDate: string;
}

export interface Member {
  id: string;
  groupId: string;
  studentId: string;
  studentFullName: string;
  studentEmail: string;
  isLeader: boolean;
  status: string;
}

export interface Group {
  id: string;
  campusName: string;
  semesterName: string;
  majorName: string;
  capstoneName: string;
  groupCode: string;
  topicCode: string;
  groupMemberList: Member[];
  status: string;
}

interface ProjectProgress {
  id: string;
  meetingDate: string;
  projectProgressWeeks: {
    id: string;
    weekNumber: number;
    taskDescription: string;
    status: number;
    meetingLocation: string | null;
    meetingContent: string | null;
  }[];
}

interface StudentTaskContextProps {
  tasks: Task[];
  groupInfo: Group | null;
  createTask: (task: Task) => Promise<void>;
  fetchGroupInfo: () => Promise<void>;
  updateTask: (task: Task) => void;
  getProjectProgressOfGroup: (groupId: string) => Promise<ProjectProgress>;
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
  const { callApi } = useApi();
  const [groupInfo, setGroupInfo] = useState<Group | null>(null);
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

  const fetchGroupInfo = async () => {
    const response = await callApi("fuc/Group/information", {
      method: "GET",
    });
    setGroupInfo(response?.value);
  };

  const getProjectProgressOfGroup = async (groupId: string) => {
    const response = await callApi(`fuc/group/${groupId}/progress`);
    return response?.value;
  };

  const createTask = async (task: Task) => {
    const response = await callApi("fuc/group/progress/tasks", {
      method: "POST",
      body: {
        TaskId: "00000000-0000-0000-0000-000000000000",
        KeyTask: task.KeyTask,
        Description: task.Description,
        Summary: task.Summary,
        AssigneeId: task.AssigneeId,
        ProjectProgressId: task.ProjectProgressId,
        Status: task.Status,
        Priority: task.Priority,
        DueDate: task.DueDate,
      },
    });

    if (response?.isSuccess) {
      toast.success("Task created successfully");
      setTasks([...tasks, { ...task, id: response.value.id }]);
    } else {
      toast.error("Error creating task", {
        description: response?.error?.message || "Failed to create task",
      });
    }
  };

  const updateTask = (task: Task) => {
    setTasks(tasks.map((t) => (t.id === task.id ? task : t)));
  };

  useEffect(() => {
    fetchGroupInfo();
  }, []);

  return (
    <StudentTaskContext.Provider value={{ tasks, createTask, updateTask, groupInfo, fetchGroupInfo, getProjectProgressOfGroup }}>
      {children}
    </StudentTaskContext.Provider>
  );
};